var keywords={}, frequent={}, thread=0, intervalId, file_list=[];
var fs = require('fs');
var output = 'keyword.txt';
var MAX_SESSION = 50;
var frequency = 5;
var min_keyword_length = 4;

if (process.argv.length < 3) {
    console.log('invalid arguments');
    process.exit(0);
}

var directory = process.argv[2];
console.log('extracting keywords from directory ' + directory);

var regex = /[-_a-zA-Z]{2,}/gm;
regex.compile(regex);

var keyword_underscore_regex = /[a-zA-Z]+/g;
keyword_underscore_regex.compile(keyword_underscore_regex);

var keyword_camel_regex = /[A-Z]?[a-z]+/g;
keyword_camel_regex.compile(keyword_camel_regex);

function parse_source_file(path) {
    path = path.toLowerCase();
    if (path.indexOf('.html') == path.length - 5 ||
        path.indexOf('.htm') == path.length - 4 ||
        path.indexOf('.css') == path.length - 4 ||
        path.indexOf('.js') == path.length - 3) {

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
                            var words = [], split=[];
                            words.push(keyword);

                            if (keyword.indexOf('_') != -1 || keyword.indexOf('-') != -1) {
                                split = keyword.match(keyword_underscore_regex);
                            } else if (keyword.toLowerCase() != keyword && keyword.toUpperCase() != keyword) {
                                split = keyword.match(keyword_camel_regex);
                            }

                            if (split.length > 1) {
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
    } else {
        console.log('==============' + thread + ' in progress, ' + file_list.length + ' left==============');
    }
}

intervalId = setInterval(checkResult, 1000);