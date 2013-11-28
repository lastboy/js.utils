var _stub = function () {
    },
    _global = require("./Global.js"),
    _impl,
    _console,
    _isLog,
    _consoleimpl = {},
    _consolestub = {};

(function () {

    _isLog = function () {
        return (_global.exists("log") ? _global.get("log") : true);
    };

    _console = function (action, args) {
        if (_isLog()) {
            console[action].apply(console, args);
        } else {
            _consolestub[action].apply(_consolestub, args);
        }
    };

    _impl = {
        log: function () {
            _console("log", arguments);
        },
        error: function () {
            _console("error", arguments);
        },
        warn: function () {
            _console("warn", arguments);
        }
    };


    _consoleimpl = {log: _impl.log, error: _impl.error, warn: _impl.warn};
    _consolestub = {log: _stub, error: _stub, warn: _stub};


})();
module.exports = _consoleimpl;
