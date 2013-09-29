var _spawn = require('child_process'),
    _log = require("./Logger.js"),
    _object = require("./Object.js"),
    _q = require("q");

module.exports = function () {

    var _module;

    function _Package(config) {

        this.config = (config || {});
    }

    _Package.prototype.getDetails = function () {
        return this.config["details"];
    };

    _Package.prototype.getName = function () {
        return this.config["name"];
    };

    _Package.prototype.get = function (key) {
        return this.config[key];
    };

    _Package.prototype.set = function (key, value) {
        this.config[key] = value;
    };

    function _process(listobj, isdetails, list) {
        var key, item, infos = [], obj;

        if ('dependencies' in listobj) {
            obj = listobj['dependencies'];
            for (key in obj) {
                item = obj[key];
                if (item && (!list || _object.contains(list, key))) {
                    if (isdetails) {
                        infos.push(new _Package({name: key, details: item}));
                    } else {
                        infos.push(key);
                    }
                }
            }
        }

        return infos;
    }

    function _$lookup(config) {
        var listobj,
            process = _spawn.spawn('npm', config.args),
            isdetails = config.details,
            callback = config.callback;

        process.stdout.on('data', function (data) {
            if (data) {
                if (config.debug) {
                    _log.log("\n> running command: npm ", config.args.join(" "));

                } else {
                    _log.log("\n>");
                }

                try {
                    listobj = JSON.parse(data);

                } catch (e) {
                    _log.error("[js.utils.NPM info] Error occurred while looking for the package: ", e);
                }
            }
        });

        process.stderr.on('data', function (data) {
            _log.warn("[js.utils.NPM info] Warnings occurred while looking for the package:", JSON.parse(data));
        });

        process.on('close', function (code) {
            var infos;

            if (listobj) {
                infos = _process(listobj, isdetails, config.list);
                callback.call(infos);
            }
        });

    }

    function _$installed(config) {
        var list,
            resultlist = {},
            callback,
            args = {callback: function () {
                var me = this;

                if (callback) {
                    list.forEach(function (item) {
                        if (_object.contains(me, item)) {
                            resultlist[item] = true;
                        } else {
                            resultlist[item] = false;
                        }
                    });

                    callback.call(this, resultlist);
                }
            }};

        if (config) {
            if ('list' in config) {
                list = config.list;
                callback = config.callback;
                _object.copy(config, args);
                _module.info(args);
            } else {
                _log.error("\n [js.utils NPM installed] 'list' is a required parameter");
                return undefined;
            }
        } else {
            _log.error("\n [js.utils NPM installed] missing configuration");
        }
    }

    _module = {

        info: function (config, callbackresult) {

            var args = [],
                list,
                depth = "2",
                details = false,
                debug = 0,
                resultlist,
                callback = function () {
                    if (config.callback) {
                        config.callback.call(this, resultlist);
                    } else {
                        deferred.resolve(this);
                    }
                },
                deferred,
                value;

            if (config) {

                if (config.global) {
                    args.push("-global");
                }
                list = (config.list || list);
                depth = (config.depth || depth);
                debug = (config.debug || debug);
                details = (('details' in config) ? config.details : details);
            }

            args.push("list");
            args.push("-json");
            if (depth !== "-1") {
                args.push(["-depth=", depth].join(""));
            }

            function _lookup() {
                deferred = _q.defer();

                _$lookup({args: args, list: list, details: details, callback: callback, debug:debug});

                return deferred.promise;
            }


            _lookup().then(function (val) {
                value = val;
                if (callbackresult) {
                    callbackresult.call({data:val});
                }

            },function (err) {
                if (callbackresult) {
                    callbackresult.call({data:(value || {})}, err);
                }
            });
        },

        installed: function (config, callback) {

            var deferred;


            function _install() {

                deferred = _q.defer();

                config.callback = function (result) {
                    deferred.resolve(result);
                };

                _$installed(config);

                return deferred.promise;
            }

            _install().then(function (val) {
                if (callback) {
                    callback.call({data:val})
                }

            });

        }

    };

    return _module;
}();