var process1, process2;
module.exports = function(callback) {

    var os = require("os"),
        fs = require("fs"),
        spawn = require('child_process').spawn,
        command,
        args,
    //requireargs = ["../node_modules/requirejs/bin/r.js", "-o", "build-require.js"],
        requireargs = ["build-require.js"],
        flatargs = ["build-flat.js"];


    function _mv(srcpath, targetpath, callback) {
        var source = fs.createReadStream(srcpath);
        var dest = fs.createWriteStream(targetpath);

        source.pipe(dest);
        source.on('end', function() {
            fs.unlinkSync(srcpath);
            if (callback) {
                callback.call(this);

            }
        });
        source.on('error', function(err) {
            console.error(err);
        });
    }

    if (os.platform() === "win32") {
        command = "cmd";
        args = ["/c"];
        requireargs.unshift("node");
        flatargs.unshift("node");

    } else {
        command = "node";
        args = [];
    }

    console.log("\n building  AMD version ... ", command, args.concat(requireargs));
    process1 = spawn(command, args.concat(requireargs), {cwd: "./build/"});

    process1.stdout.on('data', function (data) {
        var buffer = new Buffer(data);
        console.log('stdout: ', buffer.toString("utf8"));
    });

    process1.stderr.on('data', function (data) {
        var buffer = new Buffer(data)
        console.log('stderr: ', buffer.toString("utf8"));
    });

    process1.on('close', function (code) {

        console.log('[require build] exited with code ' + code);

        console.log("\n building none AMD version ... ");
        process2 = spawn(command, args.concat(flatargs), {cwd: "./build/"});

        process2.stdout.on('data', function (data) {
            var buffer = new Buffer(data)
            console.log('stdout: ', buffer.toString("utf8"));
        });

        process2.stderr.on('data', function (data) {
            var buffer = new Buffer(data)
            console.log('stderr: ', buffer.toString("utf8"));
        });

        process2.on('close', function (code) {

            var files = [
                "jsutils-min.js",
                "jsutils-min-all.js",
                "jsutils-require-min.js"
            ]

            // copy artifact to the target folder
            if (fs.existsSync("target")) {
                files.forEach(function(file) {
                    var name = "target/" + file;
                    if (fs.existsSync(name)) {
                        fs.unlinkSync(name);
                    }
                });

            } else {
                fs.mkdirSync(require("path").resolve("target"));
            }


            files.forEach(function(file) {
                var name = "target/" + file;
                _mv("./build/" + file, name, callback);
            });

        });
    });
};