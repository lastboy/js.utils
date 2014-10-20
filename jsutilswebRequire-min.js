var jsutils = this;

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
        "jsutils": "target/jsutils-require-min",
        "testunit": "test/test"
    },

    shim: {
        'underscore': {
            exports: "_"
        },
        "jsutils": {
            "deps": ["underscore"],
            "exports": "jsutils"
        },
        "testunit": {
            "deps": ["jsutils"] 
        }
    },
    
    out: "jsutils-min.js",
    name: "jsutilsweb"

});


require(["testunit"], function (test) {
    
    jsutils.listen(test.jsutilsOnReady);
    
});
