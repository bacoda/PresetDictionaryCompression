var fs = require('fs');
var child_process = require('child_process');
var command_line = require('optimist').argv;
var path = require('path');
var util = require('util');
var taskgroup = require('taskgroup').TaskGroup;

var directory = command_line._[0];
var keyword = command_line.dict || 'keyword.txt';
var keyword_size = 0;

function includeFile(path) {
    var lower_path = path.toLowerCase();
    if (lower_path.indexOf('.html') == path.length - 5 ||
        lower_path.indexOf('.htm') == path.length - 4 ||
        lower_path.indexOf('.css') == path.length - 4 ||
        lower_path.indexOf('.js') == path.length - 3)
        return true;

    return false;
}

function zip(file, completion) {
    var command = '7zr a ' + file + '.7z ' + file;
    child_process.exec(command, function (error, stdout, stderr) {
        if (error) {
            console.error(error);
            console.error('when executing command: ' + command);
            process.exit(1);
        }
        completion();
    });
}

function benchmarkFile(path, completion) {
    if (!includeFile(path)) {
        completion();
        return;
    }

    console.log('testing ' + path);
    zip(path, function () {
        var zipped = path + '.7z';
        var size = fs.statSync(zipped).size;

        var cat_file = path + '.dict';
        var command = 'cat "' + keyword + '" "' + path + '" > "' + cat_file + '"'
        console.log(command);
        child_process.exec(command, function (error, stdout, stderr) {
            if (error) {
                console.error(error);
                console.error('when executing command: ' + command);
                process.exit(1);
            }

            var command = encoder + ' "' + cat_file + '"';
            zip(cat_file, function () {
                var cat_size = fs.statSync(cat_file + '.7z').size - keyword_size;
                console.log('Compressed size: ' + size + ' With dict:' + cat_size);
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
    concurrency: 1
});

child_process.exec(encoder + ' ' + keyword, function (error, stdout, stderr) {
    if (error) {
        console.error(error);
        process.exit(1);
    }

    var zipped = keyword + '.7z';
    keyword_size = fs.statSync(zipped).size;
    console.log('Dictionary compressed size:' + keyword_size);

    require('findit')(directory).on('file', function (file, stat) {
        tasks.addTask(function (completion) {
            benchmarkFile(file, completion);
        });
    });

    tasks.run();
});

