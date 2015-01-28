var _jsutilsUnderscore ,
    _jsutilsModuleTemplate = function () {

        var _cache = {},
            _vars = {},
            _defaultUnderscoreSettings,
            _isMustache = false;


        return {

            setMustache: function (bool) {
                _isMustache = bool;

                if (_isMustache) {
                    // underscore settings for like mustache parametrization style {{foo}}
                    _vars._.templateSettings = {
                        interpolate: /\{\{(.+?)\}\}/g
                    };

                } else {
                    _vars._.templateSettings = _defaultUnderscoreSettings;
                }
            },

            isMustache: function () {
                return _isMustache;
            },

            internal: function (refs) {
                _vars = refs;
                _defaultUnderscoreSettings = _vars._.templateSettings;
            },

            underscore: _vars._,

            /**
             * Load template file content of tpl type
             * Note: No need for the extension on the file name
             *
             * @param name The name of the template e.g. /scraps/test
             * @param path The full path where the templates exists (optional) e.g. /home/../test
             * @returns {*}
             */
            readTemplateFile: function (name, path) {
                if (!path) {
                    _vars.log.error("[js.utils Template.readTemplateFile] 'path' argument is no valid ");
                }

                var content,
                    file = [path, name].join("/");

                file = _vars.path.normalize(file);

                try {
                    file = [file, "tpl"].join(".");
                    content = _cache[file];
                    if (!content) {
                        content = _vars.fs.readFileSync(file, "utf8");
                    }

                    // cache the file content
                    _cache[file] = content;

                } catch (e) {
                    _vars.log.warn("[js.utils Template.readTemplateFile] File failed to load ", file, e);
                }

                return content;
            },

            /**
             * Load and compile template with underscore
             *
             * @param config The params:
             *      name The name of the template e.g. /scraps/test (optional in case content exists)
             *      path The full path where the templates exists (optional) e.g. /home/../test.tpl
             *      content The string content instead of the file content (optional in case name exists & overrides the file content)
             *      data The data object properties (see underscore template)
             */
            template: function (config) {
                if (!config) {
                    return undefined;
                }
                var name = config.name,
                    path = config.path,
                    data = config.data,
                    content = config.content,
                    funcTpl = (content || this.readTemplateFile(name, path)),
                    template;

                if (funcTpl) {
                    template = _vars._.template(funcTpl);

                } else {
                    _vars.log.warn("[js.utils Template.template] Failed to process template ");
                    return undefined;
                }

                if (template) {
                    return template(data);
                }
            }
        }

    }();

if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
        // nodejs support

        _jsutilsUnderscore = require("underscore");

        _jsutilsModuleTemplate.internal({
            fs: require("fs"),
            log: require("./Logger.js"),
            path: require("path"),
            _: _jsutilsUnderscore
        });
        module.exports = _jsutilsModuleTemplate;

    }
} else {
    define(["underscore"], function (underscore) {
        // browser support
        _jsutilsModuleTemplate = function () {

            var _defaultUnderscoreSettings = _.templateSettings,
                _isMustache = false;


            return {

                setMustache: function (bool) {
                    _isMustache = bool;

                    if (_isMustache) {
                        // underscore settings for like mustache parametrization style {{foo}}
                        _.templateSettings = {
                            interpolate: /\{\{(.+?)\}\}/g
                        };

                    } else {
                        _.templateSettings = _defaultUnderscoreSettings;
                    }
                },

                isMustache: function () {
                    return _isMustache;
                },

                /**
                 * Load and compile template with underscore
                 *
                 * @param config The params:
                 *      name The name of the template e.g. /scraps/test (optional in case content exists)
                 *      path The full path where the templates exists (optional) e.g. /home/../test.tpl
                 *      content The string content instead of the file content (optional in case name exists & overrides the file content)
                 *      data The data object properties (see underscore template)
                 */
                template: function (config) {
                    if (!config) {
                        return undefined;
                    }
                    var data = config.data,
                        content = config.content,
                        template;

                    if (content) {
                        template = _.template(content);

                    } else {
                        console.warn("[js.utils Template.template] Failed to process template ");
                        return undefined;
                    }

                    if (template) {
                        return template(data);
                    }
                }
            }
        }();
        return _jsutilsModuleTemplate;
    });
}