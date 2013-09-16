var keywords={}, frequent={}, thread=0, intervalId, file_list=[];
var fs = require('fs');
var output = 'keyword.txt';
var MAX_SESSION = 50;
var frequency = 5;

if (process.argv.length < 3) {
    console.log('invalid arguments');
    process.exit(0);
}

var directory = process.argv[2];
console.log('extracting keywords from directory ' + directory);

var regex = /[-a-zA-Z]{2,}/gm;
regex.compile(regex);

function parse(path) {
    thread++;

    console.log('parsing ' + path);
    fs.readFile(path, 'utf8', function (err, data) {
        if (err) {
            console.error('Error occured when reading ' + path + ' error:' + err);
        }
        else {
            var matches = data.match(regex);
            if (matches) {
                matches.forEach(function (keyword) {
                    if (keywords[keyword]) {
                        keywords[keyword]++;
                        if (keywords[keyword] > 10) {
                            frequent[keyword] = true;
                        }
                    } else {
                        keywords[keyword] = 1;
                    }
                });
            }
        }

        thread--;
        schedule();
    });
}

function schedule() {
    if (file_list.length && thread < MAX_SESSION) {
        var path = file_list.pop();
        parse(path);
    }

    console.log('==============' + thread + ' in progress, ' + file_list.length + ' left==============');
}

function add_task(path) {
    path = path.toLowerCase();
    if (path.indexOf('.html') == path.length - 5 ||
        path.indexOf('.htm') == path.length - 4 ||
        path.indexOf('.css') == path.length - 4 ||
        path.indexOf('.js') == path.length - 3) {
        file_list.push(path);
        schedule();
    }
}

function parse_dir(dir) {
    fs.readdir(dir, function (err, files) {
        if (err) {
            console.log('Error when processing directory ' + dir);
            process.exit(1);
        } else if (files && files.length != 0) {
            files.forEach(function (path) {
                if (path != '.svn') {
                    var file_path = dir + '/' + path;

                    fs.lstat(file_path, function (err, stats) {
                        if (!stats) {
                            console.error('Ignoring ' + file_path);
                        } else if (stats.isFile()) {
                            parse(file_path);
                        } else {
                            parse_dir(file_path);
                        }
                    });
                }
            });
        }
    });
}

parse_dir(directory);

function checkResult() {
    if (thread == 0) {
        console.log('========================End======================');
        clearInterval(intervalId);

        var tuples = [];

        for (var key in keywords)
            tuples.push([key, keywords[key]]);

        tuples.sort(function (a, b) {
            a = a[1];
            b = b[1];

            return a < b ? 1 : (a > b ? -1 : 0);
        });

        var result;
        for (var i = 0; i < tuples.length; i++) {
            var key = tuples[i][0];
            var value = tuples[i][1];

            if (value < frequency)
                break;
            result += key + ' ';
        }

        console.log('Length: ' + result.length);
        
        fs.writeFile(output, result, function (err) {
            if (err) throw err;
            console.log('Saved!');
        });
    }
}

intervalId = setInterval(checkResult, 1000);