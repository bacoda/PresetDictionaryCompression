var fs = require('fs');
var child_process = require('child_process');
var command_line = require('optimist').argv;
var path = require('path');
var uuid = require('uuid');
var util = require('util');

var encoder = 'p7zip %path';
var directory = command_line._[0];
var keyword = command_line.dict || 'keyword.txt';
var keyword_size = 0;

console.log('Benchmarking with dictionary: ' + keyword + ' in ' + directory);

child_process.exec(encoder.replace('%path', keyword), function (error, stdout, stderr) {
    var zipped = keyword + '.7z';
    console.log(zipped);
    console.log(fs.statSync(zipped));

    keyword_size = util.inspect(fs.statSync(zipped)).size;
    console.log('Dictionary compressed size:' + keyword_size);

    require('findit')(directory).on('file', function (file, stat) {
        console.log(file);
    });

});

process.on('exit', function () {
});