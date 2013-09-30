var _global = require("./utils/Global.js");


module.exports = function() {

    var _module = {

        Object: require("./utils/Object.js"),
        Array: require("./utils/Array.js"),
        Template: require("./utils/Template.js"),
        NPM: require("./utils/NPM.js"),

        init: function(config) {
            if (config) {
                if ('log' in config) {
                    _global.set("log", config.log);
                }
            }
        },

        testlog: function() {
            require("./utils/Logger.js").log(".... testing the log... ");
        }

    };

    return _module;

}();