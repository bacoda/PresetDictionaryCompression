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

var base_gzip, lzma, lzma_dict, gzip_dict;

var keyword_size = 0, total_gzip_compressed_size = 0, total_7zip_compressed_size = 0, total_dict_compressed_size = 0;
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
    if (relative.indexOf(PATH.sep) != -1)
        return;

    console.log('Parsing webpage:' + directory);

    var name = PATH.basename(directory);

    var fileFinder = finder(directory);
    fileFinder.on('file', function (file, stat) {
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
		
    // gzip
	if (rebase) {
	    localTask.addTask(function (callback) {
	        gzip(path, function () {
	            gzip_size = fs.statSync(path + '.gz').size;
	            base_gzip.total += gzip_size;
	            base_gzip.sizes[path] = gzip_size;
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
		        var cat_size = fs.statSync(cat_file + '.7z').size - keyword_size + 90;

		        if (cat_size > gzip_size) {
		            console.log('Unexpected growth in size. ' + gzip_size + '->' + cat_size + ' ' + path);
		            cat_size = gzip_size;
		        }

		        lzma_dict.total += cat_size;
		        callback();
		    });
		});
	}
		
	localTask.once('complete', completion);
	localTask.run();
}

function dump() {
    console.log('gzip size:' + gzip.total);

    if (lzma) {
        console.log('lzma size:' + lzma.total + ' Compared with gzip:' + 100*(gzip.total - lzma.total)/gzip.total);
    }
    if (lzma_dict) {
        console.log('lzma with dict size:' + lzma_dict.total + ' Compared with gzip:' + 100 * (gzip.total - lzma_dict.total) / gzip.total);
    }
    if (gzip_dict) {
        console.log('gzip with dict size:' + gzip_dict.total + ' Compared with gzip:' + 100 * (gzip.total - gzip_dict.total) / gzip.total);
    }
}

function saveResult(obj) {
    if (obj) {
        var file = PATH.dirname(input_folder) + '.' + obj['type'];
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
    //console.log('saving result to file');
    //var result = '';
    //output.forEach(function (obj) {
    //    var str = obj.site + '\t' + obj.type + '\t' + obj.size + '\t' + (obj.size2 || '') + '\n';
    //    result += str;
    //});
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
    keyword_size = fs.statSync(zipped).size;
    console.log('Dictionary compressed size:' + keyword_size);

    var base_file_path = PATH.dirname(input_folder) + '.gzip';
    console.log('Reading gzip data from ' + base_file_path);

    if (fs.existsSync(base_file_path)) {
        var base_str = fs.readFileSync(folder, 'utf-8');
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

    if (command_line.lzma_dict) {
        lzma_dict = {
            type: 'shared dictionary lzma',
            total: 0,
        };
    }

    if (command_line.gzip_dict) {
        gzip_dict = {
            type: 'shared dictionary gzip',
            total: 0,
        };
    }

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

        console.log('====ready to run tasks. ' + tasks.getTotals());
        tasks.run();
    });

    intervalId = setInterval(dump, 10000);
});
