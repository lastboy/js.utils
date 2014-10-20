var requirejs = require('requirejs'),
    fs = require("fs"),
    jsutils = this,
    counter = 0;

jsutils.jsutilsObject = {};
jsutils.jsutilsArray = {};
jsutils.jsutilsTemplate = {};

jsutils.underscore = (typeof _ !== "undefined" ? _ : undefined);

requirejs.optimize({

    baseUrl: "../",

    paths: {
        "underscore": "node_modules/underscore/underscore-min",
        "jsutilsObjectModule": "utils/Object",
        "jsutilsArrayModule": "utils/Array",
        "jsutilsTemplateModule": "utils/Template",
        "libDomReady": "lib/domReady"
    },


    "onBuildWrite": function( name, path, contents ) {
        //Additional processing
        var result = "";
        if (!counter) {
            counter++;
            result += "var underscore;";
            //result += fs.readFileSync("./node_modules/underscore/underscore-min.js") + "\n";
        }

        result += require('amdclean').clean(contents);
        return result;
    },

    findNestedDependencies: true,
    wrap: false,
//    optimize: 'none',

    out: "jsutils-min.js",
    name: "jsutilsweb",

    include:["jsutilsTemplateModule","jsutilsArrayModule", "jsutilsTemplateModule"],
    excludeShallow: [
        "underscore"
    ]


}, function() {
    console.log('build successfully...');

}, function (err) {
    console.log(err);
});


//var concat = require('concat-files');
//concat([
//    "../node_modules/underscore/underscore-min.js",
//    'jsutils-min.js'
//
//], 'jsutils-min-all.js', function () {
//    console.log('jsutils-min-all.js created');
//});