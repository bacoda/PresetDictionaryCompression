var keywords={}, frequent={}, thread=0, intervalId;
var fs = require('fs');
var output = 'keyword.txt';

if (process.argv.length != 3) {
    console.log('invalid arguments');
    process.exit(0);
}

var directory = process.argv[2];
console.log('extracting keywords from directory ' + directory);

var regex = /[-a-zA-Z]{2,}/gm;
regex.compile(regex);

function parse(path) {
    path = path.toLowerCase();
    if (path.indexOf('.html') == path.length - 5 ||
        path.indexOf('.htm') == path.length - 4 ||
        path.indexOf('.css') == path.length - 4 ||
        path.indexOf('.js') == path.length - 3) {

        thread++;

        console.log('parsing ' + path);
        fs.readFile(path, 'utf8', function (err, data) {
            if (err)
                console.log('error occured');
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
        });
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
                            console.error('undefained stats for ' + file_path);
                            process.exit(1);
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

            if (value < 2)
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