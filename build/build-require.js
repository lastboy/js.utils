var requirejs = require('requirejs'),
    jsutils = this;

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

    out: "jsutils-require-min.js",
    name: "jsutilswebRequire",

    optimize: "none",

    exclude: ["underscore"],


    findNestedDependencies: true,
    wrap: false,
    optimize: 'none'


}, function() {
    console.log('build successfully...');

}, function (err) {
    console.log(err);
});
