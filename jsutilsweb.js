var jsutils = this;

jsutils.jsutilsObject = {};
jsutils.jsutilsArray = {};
jsutils.jsutilsTemplate = {};



define(["libDomReady", "jsutilsObjectModule", "jsutilsArrayModule", "jsutilsTemplateModule"], function (domReady, obj, arr, tpl) {
    domReady(function () {

        var jsutilsOnReadyListener,
            jsutilsOnReadyDefaultListener = function() {
            console.log("js.utils is ready (jsutilsReady callback can be overriden [e.g. jsutilsOnReady=function(obj, arr, tpl){}]");
        };

        jsutils.jsutilsObject = obj;
        jsutils.jsutilsArray =  arr;
        jsutils.jsutilsTemplate =  tpl;

        if (typeof jsutilsOnReady !== "undefined") {
            jsutilsOnReadyListener = jsutilsOnReady;
        } else {
            jsutilsOnReadyListener = jsutilsOnReadyDefaultListener;
        }
        jsutilsOnReadyListener.call(jsutils, obj, arr, tpl);
    });
});
