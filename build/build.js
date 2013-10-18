var os = require("os"),
    fs = require("fs"),
    spawn = require('child_process').spawn,
    process1, process2,
    command,
    args,
    //requireargs = ["../node_modules/requirejs/bin/r.js", "-o", "build-require.js"],
    requireargs = ["build-require.js"],
    flatargs = ["build-flat.js"];


function _mv(srcpath, targetpath) {
    var source = fs.createReadStream(srcpath);
    var dest = fs.createWriteStream(targetpath);

    source.pipe(dest);
    source.on('end', function() {
        fs.unlinkSync(srcpath);
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

console.log("\n building require version ... ", command, args.concat(requireargs));
process1 = spawn(command, args.concat(requireargs));

process1.stdout.on('data', function (data) {
    console.log('stdout: ' + data);
});

process1.stderr.on('data', function (data) {
    console.log('stderr: ' + data);
});

process1.on('close', function (code) {

    console.log('[require build] exited with code ' + code);

    console.log("\n building none require version ... ");
    process2 = spawn(command, args.concat(flatargs));

    process2.stdout.on('data', function (data) {
        console.log('stdout: ' + data);
    });

    process2.stderr.on('data', function (data) {
        console.log('stderr: ' + data);
    });

    process2.on('close', function (code) {

        var files = [
            "jsutils-min.js",
            "jsutils-require-min.js"
        ]

        // copy artifact to the target folder
        if (fs.existsSync("../target")) {
            files.forEach(function(file) {
                var name = "../target/" + file;
                if (fs.existsSync(name)) {
                    fs.unlinkSync(name);
                }
            });
            //fs.unlinkSync("../target");

        } else {
            fs.mkdirSync("../target");
        }


        files.forEach(function(file) {
            var name = "../target/" + file;
            _mv("./" + file, name);
        });



        console.log('[none require build] exited with code ' + code);
    });
});