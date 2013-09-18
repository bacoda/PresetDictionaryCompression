var fs = require('fs');
var child_process = require('child_process');
var command_line = require('optimist').argv;
var path = require('path');
var util = require('util');
var finder = require('findit');
var taskgroup = require('taskgroup').TaskGroup;

var directory = command_line._[0];
var keyword = command_line.dict || 'keyword.txt';
var keyword_size = 0;
var total_compressed_size = 0, total_dict_compressed_size = 0;
var count = 0;
var output = [];

function fileExt(path) {
    var ext = path.extname(path).toLowerCase;
    if (ext == '.htm')
        ext = '.html';
    return ext;
}

function zip(file, completion) {
    var command = '7zr a "' + file + '.7z" "' + file + '"';
    child_process.exec(command, function (error, stdout, stderr) {
        if (error) {
            console.error(error);
            console.error('when executing command: ' + command);
            process.exit(1);
        }
        completion();
    });
}

function testSite(directory) {
    var name = path.basename(directory);
    //output[name] = {
    //    totalSize:0,
    //    cssCount:0,
    //    cssCompressedSize: 0,
    //    cssCompressedSize2: 0,
    //    htmlCount: 0,
    //    htmlCompressedSize: 0,
    //    htmlCompressedSize2: 0,
    //    jsCount: 0,
    //    jsCompressedSize: 0,
    //    jsCompressedSize2: 0,
    //};

    finder(directory).on('file', function (file, stat) {
        tasks.addTask(function (completion) {
            var type = fileExt(path);
            if (type == '.css' || type == '.html' || type == '.js') {
                count++;
                benchmarkFile(name, file, type, completion);
            } else {
                output.push({
                    site: site,
                    type: type,
                    size: stat.size
                });
                completion();
            }
        });
    });
}

function benchmarkFile(site, path, type, completion) {
    console.log('testing ' + path);
    zip(path, function () {
        var zipped = path + '.7z';
        var size = fs.statSync(zipped).size;

        var cat_file = path + '.dict';
        var command = 'cat "' + keyword + '" "' + path + '" > "' + cat_file + '"'
        child_process.exec(command, function (error, stdout, stderr) {
            if (error) {
                console.error(error);
                console.error('when executing command: ' + command);
                process.exit(1);
            }

            zip(cat_file, function () {
                var cat_size = fs.statSync(cat_file + '.7z').size - keyword_size + 90;
                total_compressed_size += size;
                total_dict_compressed_size += cat_size;
                console.log('Compressed size: ' + size + ' With dict:' + cat_size + ' Ratio:' + (size-cat_size)*100/size);
                output.push({
                    site: site,
                    type: type,
                    size: size,
                    size2: cat_size
                });

                count--;
                if (count == 0) {
                    console.log('Original compressed size:' + total_compressed_size + ' With dict:' + total_dict_compressed_size + ' Ratio:' +
                        (total_compressed_size - total_dict_compressed_size) * 100 / total_compressed_size);
                }

                completion();
            });
        });
    });
}


console.log('Benchmarking with dictionary: ' + keyword + ' in ' + directory);

if (!fs.existsSync(keyword)) {
    console.error('File not exist');
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

    finder(directory).on('directory', function (path, stat) {
        testSite(path);
    });

    tasks.run();
});

