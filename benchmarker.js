var fs = require('fs');
var child_process = require('child_process');
var command_line = require('optimist').argv;
var PATH = require('path');
var util = require('util');
var finder = require('findit');
var taskgroup = require('taskgroup').TaskGroup;

// params
var input_folder = command_line.i;
var output_file = command_line.o;
var keyword = command_line.dict || 'keyword.txt';

var base_gzip, lzma, lzma_dict, gzip_dict, zopfli;

var current_gzip_textual_size = 0;  // gzip size of all compressible files(html/css/js) processed so far
var current_gzip_other_size = 0;    // gzip size of all other files processed so far
var dict_lzma_size, dict_gzip_size;
var rebase = false;
var output = [];
var intervalId;

function fileExt(path) {
    if (path.length > 5)
        path = path.substr(path.length - 5);
    var ext = PATH.extname(path).toLowerCase();
    if (ext == '.htm')
        ext = '.html';
    return ext;
}

function gzip(file, completion) {
    var command = 'gzip --best -f -c "' + file + '" > "' + file + '.gz"';
    child_process.exec(command, function (error, stdout, stderr) {
        if (error) {
            console.error(error);
            console.error('when executing command: ' + command);
            process.exit(1);
        }
        completion();
    });
}

function gzip_zopfli(file, completion) {
    var command = './zopfli "' + file + '"';
    child_process.exec(command, function (error, stdout, stderr) {
        if (error) {
            console.error(error);
            console.error('when executing command: ' + command);
            process.exit(1);
        }
        completion();
    });
}

function zip(file, completion) {
    var command = '7zr a -t7z -m0=lzma -mx=9 -mfb=64 -md=2m -ms=on "' + file + '.7z" "' + file + '"';
    child_process.exec(command, function (error, stdout, stderr) {
        if (error) {
            console.error(error);
            console.error('when executing command: ' + command);
            process.exit(1);
        }
        completion();
    });
}

function appendOutput(obj) {
    var str = obj.site + '\t' + obj.type + '\t' + obj.size + '\t' + (obj.size_7z || '') + '\t' + (obj.size_dict || '') + '\n';
    fs.appendFileSync(output_file, str);
}

function testPage(directory, callback) {
    var base = PATH.resolve(input_folder);
    var current = PATH.resolve(directory);
    var relative = PATH.relative(base, current);
    if (relative.indexOf(PATH.sep) != -1 || current == PATH.resolve(input_folder)) {
        callback();
        return;
    }

    var stats = tasks.getTotals();
    console.log('Testing webpage ' + stats.completed + '/' + stats.total + ':' + directory + '\t');
    
    var name = PATH.basename(directory);
    if (base_gzip.pages[name]) {
        console.error('Error: Ignoring duplicate page folder: ' + name);
        callback();
        return;
    }
    var page_info = base_gzip.pages[name];
    
    base_gzip.pages[name] = {
        files:{},
        stats:{
          total:0,
          other:0,
          html:0,
          css:0,
          js:0
        }
    };
    
    var files_task = new taskgroup().setConfig({concurrency: 16});
  
    var fileFinder = finder(directory);
    fileFinder.on('file', function (file, stat) {
        files_task.addTask(function (completion) {
            var type = fileExt(file);
            var file_name = PATH.basename(file);

            if (!page_info[file_name])
                page_info[file_name] = {
                    type:type,
                    size:0
                };
                
            var file_info = page_info[file_name];
            
            if (type == '.css' || type == '.html' || type == '.js') {
                benchmarkFile(file_info, file, completion);
                
                if (rebase) {
                    if (type == '.css')
                        page_info.stats.css += file_info.size;
                    else if (type == '.html')
                        page_info.stats.html += file_info.size;
                    else
                        page_info.stats.js += file_info.size;
                }
            } else {
                if (type != '.7z' && type != '.dict' && type != '.gz') {
                    if (rebase) {
                        file_info.size = fs.statSync(file).size;
                        page_info.stats.other += file_info.size;
                    }
                }
                completion();
            }
        });
    });

    fileFinder.on('end', function() {
       files_task.run();
       files_task.once('complete', function() {
          current_gzip_textual_size += page_info.stats.html + page_info.stats.css + page_info.stats.js;
          current_gzip_other_size += page_info.stats.other;
          
          dumpPage(name);
          dumpTotal();
          callback();
       });
    });
}

function benchmarkFile(file_info, path, completion) {
    var cat_file = path + '.dict';
    var command = 'cat "' + keyword + '" "' + path + '" > "' + cat_file + '"';
      
    var localTask = new taskgroup();
    
    if (command_line.verbose) {
        console.log('Testing file:' + path);
    }

      // gzip
    if (rebase) {
        localTask.addTask(function (callback) {
            gzip(path, function () {
                file_info.size = fs.statSync(path + '.gz').size;
                callback();
            });
        });
    } else if (!file_info.size) {
        console.error('Failed to get size for ' + path);
        process.exit(1);
    }
      
      // cat
    if (lzma_dict || gzip_dict) {
      localTask.addTask(function (callback) {
          child_process.exec(command, function (error, stdout, stderr) {
              if (error) {
                  console.error(error);
                  console.error('when executing command: ' + command);
                  process.exit(1);
              }
              callback();
          });
      });
    }
      
      // 7zip
    if (lzma) {
      localTask.addTask(function (callback) {
          zip(path, function () {
              var zipped = path + '.7z';
              var size_7z = fs.statSync(zipped).size;
              if (size_7z > gzip_size)
                  size_7z = gzip_size;
              lzma.total += size_7z;
              callback();
          });
      });
    }
        
    // 7zip with dict
    if (lzma_dict) {
      localTask.addTask(function (callback) {
          zip(cat_file, function () {
              var cat_size = fs.statSync(cat_file + '.7z').size - dict_lzma_size + 90;

              if (cat_size > gzip_size) {
                  console.log('Unexpected growth in size. ' + gzip_size + '->' + cat_size + ' ' + path);
                  cat_size = gzip_size;
              }

              lzma_dict.total += cat_size;
              callback();
          });
      });
    }
    
    if (gzip_dict) {
        localTask.addTask(function (callback) {
            gzip(cat_file, function () {
                var size = fs.statSync(cat_file + '.gz').size - dict_gzip_size;
                if (size > gzip_size) {
                    console.log('Unexpected growth in size. ' + gzip_size + '->' + size + ' ' + path);
                    size = gzip_size;
                }
                gzip_dict.total += size;
                callback();
            });
        });
    }

    if (zopfli) {
      localTask.addTask(function (callback) {
        gzip_zopfli(path, function(){
          var size = fs.statSync(path + '.gz').size;
          if (size > gzip_size) {
            size = gzip_size;
          }
          zopfli.total += size;
          callback();
        });
      });
    }

    localTask.once('complete', function() {
        completion();
    });
    localTask.run();
}

function percent(gzip, other) {
    var result = (gzip-other)*100/gzip;
    return result.toPrecision(3) + '%';
}

function dumpPage(name) {
    //var str = 'gzip:' + current_gzip_size;
}

// for a single compression algorithm
function dumpTotalScheme(obj, total) {
    if (obj) {
        var total_size = obj.total + (total ? current_gzip_other_size : 0);
        var gzip_size = current_gzip_textual_size + (total ? current_gzip_other_size : 0);
        return obj.type + ':\t' + total_size + '('+ percent(gzip_size, total_size) + ')\t';
    }
    return '';
}

function dumpTotal() {
    var str = 'Overall stats(textual content) gzip:' + current_gzip_textual_size + '\t' +
              dumpTotalScheme(gzip_dict) + 
              dumpTotalScheme(lzma) +
              dumpTotalScheme(lzma_dict) +
              dumpTotalScheme(zopfli);

    console.log(str);
    
    var str = 'Overall stats                  gzip:' + current_gzip_textual_size + current_gzip_other_size +  '\t' +
              dumpTotalScheme(gzip_dict, true) + 
              dumpTotalScheme(lzma, true) +
              dumpTotalScheme(lzma_dict, true) +
              dumpTotalScheme(zopfli, true);

    console.log(str);
}

function saveResult(obj) {
    if (obj) {
        var file = PATH.basename(input_folder) + '.' + obj['type'];
        console.log('Writing result to ' + file);
        fs.writeFileSync(file, JSON.stringify(obj));
    }
}

function done() {
    saveResult(base_gzip);
    saveResult(gzip_dict);
    saveResult(lzma);
    saveResult(lzma_dict);
    saveResult(zopfli);
}

console.log('Benchmarking with dictionary: ' + keyword + ' in ' + input_folder + ' output: ' + output);

if (!fs.existsSync(keyword)) {
    console.error('Dictionary file not exist');
    process.exit(1);
}

var tasks = new taskgroup();

zip(keyword, function () {
    var zipped = keyword + '.7z';
    dict_lzma_size = fs.statSync(zipped).size;
    console.log('Dictionary lzma compressed size:' + dict_lzma_size);

    gzip(keyword, function () {
        var zipped = keyword + '.gz';
        dict_gzip_size = fs.statSync(zipped).size;
        console.log('Dictionary gzip compressed size:' + dict_gzip_size);

        var base_file_path = PATH.basename(input_folder) + '.gzip';
        console.log('Reading gzip data from ' + base_file_path);

        if (fs.existsSync(base_file_path)) {
            var base_str = fs.readFileSync(base_file_path, 'utf-8');
            base_gzip = JSON.parse(base_str);
        } else {
            console.log('Found no base file, will rebase');
            rebase = true;
            base_gzip = {
                total: 0,
                type: 'gzip',
                pages: {},
            };
        }

        if (command_line.lzma) {
            lzma = {
                type: 'lzma',
                total: 0,
            };
        }

        if (command_line.lzmadict) {
            lzma_dict = {
                type: 'shared dictionary lzma',
                total: 0,
            };
        }

        if (command_line.gzipdict) {
            gzip_dict = {
                type: 'shared dictionary gzip',
                total: 0,
            };
        }

        if (command_line.zopfli) {
          zopfli = {
            type: 'zopfli',
            total: 0
          };
        }

        console.log('Scanning folders...');

        var siteFinder = finder(input_folder);
        siteFinder.on('directory', function (path, stat) {
            tasks.addTask(function (completion) {
                testPage(path, completion);
            });
        });

        siteFinder.on('end', function () {
            tasks.once('complete', function () {
                console.log('==============done=============');
                done();
            });

            console.log('Compression testing...');
            tasks.run();
        });
    });
});
