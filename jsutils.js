
if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
        // nodejs support

        var _global = require("./utils/Global.js");

        module.exports = function () {

            var _module = {

                Object: require("./utils/Object.js"),
                Array: require("./utils/Array.js"),
                Template: require("./utils/Template.js"),
                NPM: require("./utils/NPM.js"),
                Task: require("./utils/Task.js"),

                // require libxmljs in case of enable
                // XML: require("./utils/XML.js"),

                init: function (config) {
                    if (config) {
                        if ('log' in config) {
                            _global.set("log", config.log);
                        }
                    }
                },

                testlog: function () {
                    require("./utils/Logger.js").log(".... testing the log... ");
                }

            };

            return _module;

        }();

    }

} else {

    define(["jsutilsObjectModule", "jsutilsArrayModule", "jsutilsTemplateModule"], function (obj, arr, tpl) {

        var _jsutils = function() {
            
            var __jsutils = {};
                
            return {
                
                init: function(obj, arr, tpl) {

                    __jsutils.jsutilsObject = obj;
                    __jsutils.jsutilsArray = arr;
                    __jsutils.jsutilsTemplate = tpl; 
                    __jsutils.listen = function(jsutilsOnReady) {

                        var jsutilsOnReadyListener,
                            jsutilsOnReadyDefaultListener = function () {
                                console.log("js.utils is ready (jsutilsReady callback can be overriden [e.g. jsutilsOnReady=function(obj, arr, tpl){}]");
                            };

                        if (typeof jsutilsOnReady !== "undefined") {
                            jsutilsOnReadyListener = jsutilsOnReady;
                        } else {
                            jsutilsOnReadyListener = jsutilsOnReadyDefaultListener;
                        }
                        jsutilsOnReadyListener.call(jsutils, obj, arr, tpl);
                    }; 
                    
                },
                
                getJSUtils: function() {
                    return __jsutils;
                }                               
            }
            
        },
        
        jsutilsh = new _jsutils();

        jsutilsh.init(obj, arr, tpl);
        
        return jsutilsh; 
            
    });


}