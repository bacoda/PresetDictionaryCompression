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

var current_gzip_size = 0, dict_lzma_size, dict_gzip_size;
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

function testSite(directory, callback) {
    var base = PATH.resolve(input_folder);
    var current = PATH.resolve(directory);
    var relative = PATH.relative(base, current);
    if (relative.indexOf(PATH.sep) != -1) {
        callback();
        return;
    }

    if (command_line.verbose) {
        console.log('Parsing webpage:' + directory);
    }

    var name = PATH.basename(directory);

    var fileFinder = finder(directory);
    fileFinder.on('file', function (file, stat) {
        //if (command_line.verbose) {
        //    console.log('Adding file:' + file);
        //}

        tasks.addTask(function (completion) {
            var type = fileExt(file);
            if (type == '.css' || type == '.html' || type == '.js') {
                benchmarkFile(name, file, type, completion);
            } else {
                if (type != '.7z' && type != '.dict' && type != '.gz') {
                }
                completion();
            }
        });
    });

    fileFinder.on('end', callback);
}

function benchmarkFile(site, path, type, completion) {
  var gzip_size;

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
              gzip_size = fs.statSync(path + '.gz').size;
              base_gzip.total += gzip_size;
              base_gzip.sizes[path] = gzip_size;

              if (command_line.verbose) {
                  console.log('Gzip size:' + gzip_size);
              }
              callback();
          });
      });
  } else {
      gzip_size = base_gzip.sizes[path];
      if (!gzip_size) {
          console.error('Failed to get size for ' + path);
          process.exit(1);
      }
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
    current_gzip_size += gzip_size;
    completion();
  });
  localTask.run();
}

function percent(gzip, other) {
  var result = (gzip-other)*100/gzip;
  return result.toPrecision(3) + '%';
}

function dump() {
    var stats = tasks.getTotals();
    var str = 'Progress:' + (stats.completed*100/stats.total).toPrecision(3) + '% \tgzip:' + current_gzip_size;

    if (gzip_dict) {
        str += 'gzip(dict):' + gzip_dict.total + '('+ percent(current_gzip_size, gzip_dict.total) + ')';
    }
    if (lzma) {
        str += '\tlzma:' + lzma.total + '(' + percent(current_gzip_size, lzma.total) + ')';
    }
    if (lzma_dict) {
        str +='\tlzma(dict):' + lzma_dict.total + '(' + percent(current_gzip_size, lzma_dict.total) + ')';
    }
    if (zopfli) {
        str += '\tzopfli:' + zopfli.total + '(' + percent(current_gzip_size, zopfli.total) + ')';
    }
    
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
    dump();

    clearInterval(intervalId);

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
tasks.setConfig({
    concurrency: 30
});

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
                sizes: {},
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
                testSite(path, completion);
            });
        });

        siteFinder.on('end', function () {
            tasks.once('complete', function () {
                console.log('==============done!!!!!!!!!!!!!!!!');
                done();
            });

            console.log('Compression testing...');
            tasks.run();
        });

        intervalId = setInterval(dump, 2000);
    });
});
