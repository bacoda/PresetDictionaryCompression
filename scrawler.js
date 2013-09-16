var input = './top500sites.txt';
var output = './top500sites/';

var fs = require('fs');
var child_process = require('child_process');
var command = 'wget -E -H -p -nd -nH -e robots=off -Ptop500/%dir %domain';
var failed = [];
var MAX_SESSION = 50;
var sites = [];
var sessions = 0;

function get(domain) {
    var cmd = command.replace('%dir', domain).replace('%domain', domain);
    console.log('executing ' + cmd);
    var child = child_process.exec(cmd, function (error, stdout, stderr) {
        console.log('stderr: ' + stderr);
        if (error !== null) {
            console.log('exec error: ' + error);
            failed.push(domain);
        }

        if (sites.length != 0)
            get(sites.pop());
        else
            sessions--;
            
        console.log('=========' + sessions + ' tasks in progress. ' + sites.length + ' left. ' + failed.length + ' failed.=========');
    });
}

fs.readFile(input, 'utf8', function (err, data) {
    if (err) {
        console.log('Invalid input');
    } else {
        sites = data.split(/\r?\n/);
        while (sessions < MAX_SESSION) {
            sessions++;
            var domain = sites.pop();
            if (domain)
                get(domain);
        }
    }
});

process.on('exit', function () {
    console.log('Failed:' + failed);
});