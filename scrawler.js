var input = './top500sites.txt';
var output = './top500sites/';

var fs = require('fs');
var child_process = require('child_process');
var command = 'wget -E -H -p -nd -nH -e robots=off -Ptop500/%dir %domain';
var failed = [];

fs.readFile(input, 'utf8', function (err, data) {
    if (err) {
        console.log('Invalid input');
    } else {
        var sites = data.split('\r\n');
        sites.forEach(function (domain) {
            var cmd = command.replace('%dir', domain).replace('%domain', domain);
            console.log('executing ' + cmd);
            var child = exec(cmd, function (error, stdout, stderr) {
                  console.log('stderr: ' + stderr);
                  if (error !== null) {
                      console.log('exec error: ' + error);
                      failed.push(domain);
                  }
            });
        });
    }
});

process.on('exit', function () {
    console.log('Failed:' + failed);
});