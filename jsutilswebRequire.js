var jsutils = {};

jsutils.jsutilsObject = {};
jsutils.jsutilsArray = {};
jsutils.jsutilsTemplate = {};

/**
 * RequireJS Main Configuration
 */
require.config({

    baseUrl: ".",

    paths: {
        "underscore": "node_modules/underscore/underscore-min",
        "jsutilsObjectModule": "utils/Object",
        "jsutilsArrayModule": "utils/Array",
        "jsutilsTemplateModule": "utils/Template",
        "libDomReady": "lib/domReady"
    },

    shim: {
        'underscore': {
            exports: "_"
        },
        'jsutilsObjectModule': {
            deps: ['underscore']          
        }, 
        'jsutilsArrayModule': {
            deps: ['underscore']          
        },
        'jsutilsTemplateModule': {
            deps: ['underscore']          
        }
    },
    
    out: "jsutils-min.js",
    name: "jsutils"

});


require(["libDomReady", "jsutils"], function (domReady, jsutilsref) {
    domReady(function () {
        
        jsutils = jsutilsref.getJSUtils();
               
    });
});

//require(["libDomReady", "jsutilsObjectModule", "jsutilsArrayModule", "jsutilsTemplateModule"], function (domReady, obj, arr, tpl) {
//    domReady(function () {
//
//        var jsutilsOnReadyListener,
//            jsutilsOnReadyDefaultListener = function() {
//                console.log("js.utils is ready (jsutilsReady callback can be overriden [e.g. jsutilsOnReady=function(obj, arr, tpl){}]");
//            };
//
//        jsutils.jsutilsObject = obj;
//        jsutils.jsutilsArray =  arr;
//        jsutils.jsutilsTemplate =  tpl;
//
//        if (typeof jsutilsOnReady !== "undefined") {
//            jsutilsOnReadyListener = jsutilsOnReady;
//        } else {
//            jsutilsOnReadyListener = jsutilsOnReadyDefaultListener;
//        }
//        jsutilsOnReadyListener.call(jsutils, obj, arr, tpl);
//    });
//});
