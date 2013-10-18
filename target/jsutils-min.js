
var underscore;var _jsutilsModuleArray = function () {
        var _vars = {};
        return {
            internal: function (refs) {
                _vars = refs;
            },
            cleanupArray: function (arr) {
                var newArr = [];
                if (arr && _vars.typedas.isArray(arr)) {
                    arr.forEach(function (item) {
                        if (item !== null && item !== undefined) {
                            newArr.push(item);
                        }
                    });
                }
                return newArr;
            },
            removeArrayItemByValue: function (arr, value) {
                var newArr = [], counter = 0;
                if (arr && _vars.typedas.isArray(arr)) {
                    arr.forEach(function (item) {
                        if (item !== value && item !== null && item !== undefined) {
                            newArr.push(item);
                        }
                        counter++;
                    });
                }
                return newArr;
            }
        };
    }();
if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
        _jsutilsModuleArray.internal({ typedas: require('typedas') });
        module.exports = _jsutilsModuleArray;
    }
} else {
    var jsutilsArrayModule = function (typedasref) {
            _jsutilsModuleArray.internal({ typedas: typedAs });
            return _jsutilsModuleArray;
        }(typedAs);
};
var _jsutilsModuleObject = function () {
        var _vars = {};
        return {
            internal: function (refs) {
                _vars = refs;
            },
            contains: function (obj, value) {
                var key;
                if (obj) {
                    for (key in obj) {
                        if (_vars.typedas.isObject(value) || _vars.typedas.isArray(value)) {
                            if (JSON.stringify(obj[key]) === JSON.stringify(value)) {
                                return true;
                            }
                        } else {
                            if (obj[key] === value) {
                                return true;
                            }
                        }
                    }
                }
                return false;
            },
            copy: function (srcobj, destobj, override) {
                var name, obj, me = this, idx = 0, size = 0, item;
                override = override || false;
                if (srcobj && destobj) {
                    for (name in srcobj) {
                        if (srcobj.hasOwnProperty(name)) {
                            obj = destobj[name];
                            if (_vars.typedas.isObject(srcobj[name])) {
                                if (!destobj[name]) {
                                    destobj[name] = {};
                                }
                                arguments.callee.call(me, srcobj[name], destobj[name], override);
                            } else if (_vars.typedas.isArray(srcobj[name])) {
                                if (!obj) {
                                    destobj[name] = srcobj[name];
                                } else if (_vars.typedas.isArray(obj)) {
                                    _vars.arrayutils.cleanupArray(srcobj[name]);
                                    if (override) {
                                        destobj[name] = srcobj[name];
                                    } else {
                                        size = destobj[name].length;
                                        for (idx = 0; idx < size; idx++) {
                                            item = obj[idx];
                                            srcobj[name] = _vars.arrayutils.removeArrayItemByValue(srcobj[name], item);
                                        }
                                        destobj[name] = destobj[name].concat(srcobj[name]);
                                    }
                                }
                            } else {
                                if (override || obj === undefined) {
                                    if (!destobj[name] || destobj[name] && override) {
                                        destobj[name] = srcobj[name];
                                    }
                                }
                            }
                        }
                    }
                }
            }
        };
    }();
if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
        _jsutilsModuleObject.internal({
            typedas: require('typedas'),
            arrayutils: require('./Array.js')
        });
        module.exports = _jsutilsModuleObject;
    }
} else {
    var jsutilsObjectModule = function (typedasref, arrayref) {
            _jsutilsModuleObject.internal({
                typedas: typedAs,
                arrayutils: arrayref
            });
            return _jsutilsModuleObject;
        }(typedAs, jsutilsArrayModule);
};
var _jsutilsUnderscore, _jsutilsModuleTemplate = function () {
        var _cache = {}, _vars = {};
        return {
            internal: function (refs) {
                _vars = refs;
            },
            underscore: _vars._,
            readTemplateFile: function (name, path) {
                if (!path) {
                    _vars.log.error('[js.utils Template.readTemplateFile] \'path\' argument is no valid ');
                }
                var content, file = [
                        path,
                        name
                    ].join('/');
                file = _vars.path.normalize(file);
                try {
                    file = [
                        file,
                        'tpl'
                    ].join('.');
                    content = _cache[file];
                    if (!content) {
                        content = _vars.fs.readFileSync(file, 'utf8');
                    }
                    _cache[file] = content;
                } catch (e) {
                    _vars.log.warn('[js.utils Template.readTemplateFile] File failed to load ', file, e);
                }
                return content;
            },
            template: function (config) {
                if (!config) {
                    return undefined;
                }
                var name = config.name, path = config.path, data = config.data, content = config.content, funcTpl = content || this.readTemplateFile(name, path), template;
                if (funcTpl) {
                    template = _vars._.template(funcTpl);
                } else {
                    _vars.log.warn('[js.utils Template.template] Failed to process template ');
                    return undefined;
                }
                if (template) {
                    return template(data);
                }
            }
        };
    }();
if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
        _jsutilsUnderscore = require('underscore');
        _jsutilsUnderscore.templateSettings = { interpolate: /\{\{(.+?)\}\}/g };
        _jsutilsModuleTemplate.internal({
            fs: require('fs'),
            log: require('./Logger.js'),
            path: require('path'),
            _: _jsutilsUnderscore
        });
        module.exports = _jsutilsModuleTemplate;
    }
} else {
    var jsutilsTemplateModule = function (underscore) {
            _jsutilsModuleTemplate = function () {
                _.templateSettings = { interpolate: /\{\{(.+?)\}\}/g };
                return {
                    template: function (config) {
                        if (!config) {
                            return undefined;
                        }
                        var data = config.data, content = config.content, template;
                        if (content) {
                            template = _.template(content);
                        } else {
                            console.warn('[js.utils Template.template] Failed to process template ');
                            return undefined;
                        }
                        if (template) {
                            return template(data);
                        }
                    }
                };
            }();
            return _jsutilsModuleTemplate;
        }(underscore);
};
var jsutils = this;
jsutils.jsutilsObject = {};
jsutils.jsutilsArray = {};
jsutils.jsutilsTemplate = {};
var jsutilsweb = function (obj, arr, tpl) {
        jsutils.jsutilsObject = obj;
        jsutils.jsutilsArray = arr;
        jsutils.jsutilsTemplate = tpl;
    }(jsutilsObjectModule, jsutilsArrayModule, jsutilsTemplateModule);