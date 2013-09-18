var fs = require('fs');
var child_process = require('child_process');
var command_line = require('optimist').argv;
var PATH = require('path');
var util = require('util');
var finder = require('findit');
var taskgroup = require('taskgroup').TaskGroup;

var directory = command_line.i;
var output_file = command_line.o;
var keyword = command_line.dict || 'keyword.txt';
var keyword_size = 0;
var total_gzip_compressed_size = 0, total_7zip_compressed_size = 0, total_dict_compressed_size = 0;
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
    console.log('Parsing folder:' + directory);

    var name = PATH.basename(directory);
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

    var fileFinder = finder(directory);
    fileFinder.on('file', function (file, stat) {
        tasks.addTask(function (completion) {
            var type = fileExt(file);
            if (type == '.css' || type == '.html' || type == '.js') {
                benchmarkFile(name, file, type, completion);
            } else {
                if (type != '.7z' && type != '.dict' && type != '.gz') {
                    appendOutput({
                        site: name,
                        type: type,
                        size: stat.size
                    });
                }
                completion();
            }
        });
    });

    fileFinder.on('end', callback);
}

function benchmarkFile(site, path, type, completion) {
    zip(path, function () {
        var zipped = path + '.7z';
        var size = fs.statSync(zipped).size;

        var cat_file = path + '.dict';
		var cat_size, gzip_size;
        var command = 'cat "' + keyword + '" "' + path + '" > "' + cat_file + '"';
		
		var localTask = new taskgroup();
		localTask.addTask(function(callback){
	        child_process.exec(command, function (error, stdout, stderr) {
	            if (error) {
	                console.error(error);
	                console.error('when executing command: ' + command);
	                process.exit(1);
	            }
				callback();
			});	
		});
		
		localTask.addTask(function(callback){
            zip(cat_file, function () {
                cat_size = fs.statSync(cat_file + '.7z').size - keyword_size + 90;
                total_7zip_compressed_size += size;
                total_dict_compressed_size += cat_size;
                callback();
            });			
		});
		
		localTask.addTask(function(callback){
			gzip(path, function(){
				gzip_size = fs.statSync(path + '.gz').size;
				total_gzip_compressed_size += gzip_size;
				callback();
			});
		});

		localTask.addTask(function(){
	        appendOutput({
	            site: site,
	            type: type,
	            size: gzip_size,
	            size_7z: size,
				size_dict: cat_size
	        });			
		});
		
		localTask.once('complete', completion);
		localTask.run();
    });
}

function dump() {
    console.log('gzip size:' + total_gzip_compressed_size
	 	+ ' 7zip:' + total_7zip_compressed_size + '(' + 100*(total_gzip_compressed_size - total_7zip_compressed_size)/total_gzip_compressed_size + ')'
	 	+ ' Dict:' + total_dict_compressed_size + '(' + 100*(total_gzip_compressed_size - total_dict_compressed_size)/total_gzip_compressed_size + ')');
}

function done() {
    dump();

    clearInterval(intervalId);

    //console.log('saving result to file');
    //var result = '';
    //output.forEach(function (obj) {
    //    var str = obj.site + '\t' + obj.type + '\t' + obj.size + '\t' + (obj.size2 || '') + '\n';
    //    result += str;
    //});
}

console.log('Benchmarking with dictionary: ' + keyword + ' in ' + directory + ' output: ' + output);

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

    var siteFinder = finder(directory);
    siteFinder.on('directory', function (path, stat) {
        tasks.addTask(function (completion) {
            testSite(path, completion);
        });
    });

    siteFinder.on('end', function () {
        tasks.once('complete', function () {
            console.log('done!!!!!!!!!!!!!!!!');
            done();
        });

        console.log('====ready to run tasks. ' + tasks.getTotals());
        tasks.run();
    });

    intervalId = setInterval(dump, 10000);
});
