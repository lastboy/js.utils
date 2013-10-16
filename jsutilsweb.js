var jsutils = this;

jsutils.jsutilsObject = {};
jsutils.jsutilsArray = {};
jsutils.jsutilsTemplate = {};


define(["jsutilsObjectModule", "jsutilsArrayModule", "jsutilsTemplateModule"], function (obj, arr, tpl) {


    jsutils.jsutilsObject = obj;
    jsutils.jsutilsArray = arr;
    jsutils.jsutilsTemplate = tpl;

});
