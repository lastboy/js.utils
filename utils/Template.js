var _ = require("underscore"),
    _fs = require("fs"),
    _log = require("./Logger.js"),
    _path = require("path");

// underscore settings for like mustache parametrization style {{foo}}
_.templateSettings = {
    interpolate : /\{\{(.+?)\}\}/g
};

module.exports = function () {

    var _cache = {};

    return {

        underscore: _,

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
                _log.error("[js.utils Template.readTemplateFile] 'path' argument is no valid ");
            }

            var content,
                file = [path, name].join("/");

            file = _path.normalize(file);

            try {
                file = [file, "tpl"].join(".");
                content = _cache[file];
                if (!content) {
                    content = _fs.readFileSync(file, "utf8");
                }

                // cache the file content
                _cache[file] = content;

            } catch (e) {
                _log.warn("[js.utils Template.readTemplateFile] File failed to load ", file, e);
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
        template: function(config){
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
                    template = _.template(funcTpl);

                } else {
                    _log.warn("[js.utils Template.template] Failed to process template ");
                    return undefined;
                }

            if (template) {
                return template(data);
            }
        }
    }

}();