var fs = require('fs');
var command_line = require('optimist').argv;

var keywords={}, frequent={}, thread=0, intervalId, file_list=[];
var output = 'keyword.txt';
var MAX_SESSION = 50;
var frequency = 5;
var min_keyword_length = 4;
var size = 100; // kb
var regex = /-/;
regex.compile(/[-_a-zA-Z]{2,}/gm);
var keyword_underscore_regex = /-/;
keyword_underscore_regex.compile(/[a-zA-Z]+/g);
var keyword_camel_regex = /-/;
keyword_camel_regex.compile(/[A-Z]?[a-z]+/g);

if (process.argv.length == 2) {
    console.log('extract.js [-s kb] target_directory');
    process.exit(0);
}

if (!command_line._) {
    console.log('Missing target directory');
    process.exit(0);
}

var directory = command_line._[0];
if (command_line.s)
    size = command_line.s;

console.log('Extracting keywords from directory ' + directory + ' maximum size: ' + size + ' kb');



function parse_source_file(path) {
    var lower_path = path.toLowerCase();
    if (lower_path.indexOf('.html') == path.length - 5 ||
        lower_path.indexOf('.htm') == path.length - 4 ||
        lower_path.indexOf('.css') == path.length - 4 ||
        lower_path.indexOf('.js') == path.length - 3) {

        if (command_line.v)
            console.log('parsing ' + path);

        fs.readFile(path, 'utf8', function (err, data) {
            if (err) {
                console.error('Error occured when reading ' + path + ' error:' + err);
            } else {
                var matches = data.match(regex);
                if (matches) {
                    matches.forEach(function (keyword) {
                        if (keyword.length >= min_keyword_length) {
                            // split someThing/some_Thing to some and Thing
                            var words = [], split = [];
                            words.push(keyword);

                            if (keyword.indexOf('_') != -1 || keyword.indexOf('-') != -1) {
                                split = keyword.match(keyword_underscore_regex);
                            } else if (keyword.toLowerCase() != keyword && keyword.toUpperCase() != keyword) {
                                split = keyword.match(keyword_camel_regex);
                            }

                            if (split && split.length > 1) {
                                words.push(split);
                                //console.log('Keyword ' + keyword + ' split into ' + words);
                            }

                            if (keywords[keyword]) {
                                keywords[keyword]++;
                            } else {
                                keywords[keyword] = 1;
                            }
                        }
                    });
                } else {
                    console.log('No keyword for ' + path);
                }
            }

            thread--;
            schedule();
        });
    } else {
        thread--;
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
                    add_task(file_path);
                }
            });
        }

        thread--;
        schedule();
    });
}

function parse_path(path) {
    thread++;
    fs.lstat(path, function (err, stats) {
        if (!stats) {
            console.error('Ignoring ' + path);
            thread--;
            schedule();
        } else if (stats.isFile()) {
            parse_source_file(path);
        } else {
            parse_dir(path);
        }
    });
}

function schedule() {
    if (file_list.length && thread < MAX_SESSION) {
        var path = file_list.pop();
        parse_path(path);
    }

    //console.log('==============' + thread + ' in progress, ' + file_list.length + ' left==============');
}

function add_task(path) {
    file_list.push(path);
    schedule();
}


add_task(directory);

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

        var result = '';
        for (var i = 0; i < tuples.length; i++) {
            var key = tuples[i][0];
            var value = tuples[i][1];

            if (value < frequency || result.length >= size*1024)
                break;
            result += key + ' ';
        }

        console.log('Length: ' + result.length);

        fs.writeFile(output, result, function (err) {
            if (err) throw err;
            console.log('Saved!');
        });
    } else {
        console.log('==============' + thread + ' in progress, ' + file_list.length + ' left==============');
    }
}

intervalId = setInterval(checkResult, 1000);