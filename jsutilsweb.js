var jsutils = this,
    jsutilsOnReady = function() {
        console.log("js.utils is ready (jsutilsReady callback can be overriden [e.g. jsutilsOnReady=function(obj, arr, tpl){}]");
    };

jsutils.jsutilsObject = {};
jsutils.jsutilsArray = {};
jsutils.jsutilsTemplate = {};


/**
 * RequireJS Main Configuration
 */
require.config({

    baseUrl: ".",

    paths: {
        "typedas": "node_modules/typedas/typedAs",
        "underscore": "node_modules/underscore/underscore-min",
        "object": "utils/Object",
        "array": "utils/Array",
        "template": "utils/Template"
    },


    out: "jsutils-min.js",
    name: "jsutilsweb"

});

require(["lib/domReady", "object", "array", "template"], function (domReady, obj, arr, tpl) {
    domReady(function () {
        jsutils.jsutilsObject = obj;
        jsutils.jsutilsArray =  arr;
        jsutils.jsutilsTemplate =  tpl;
        jsutilsOnReady.call(jsutils, obj, arr, tpl);
    });
});
