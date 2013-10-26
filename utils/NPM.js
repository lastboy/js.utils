var _spawn = require('child_process'),
    _log = require("./Logger.js"),
    _object = require("./Object.js"),
    _q = require("q"),
    _os = require('os');

/**
 * Check if the current OS is Linux
 *
 * @returns {boolean} in case running OS is linux return true else false
 */
function isLinux() {
    return (_os.platform() == "linux" || _os.platform() == "darwin");
}

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
            command = 'npm',
            args = config.args,
            process,
            isdetails = config.details,
            callback = config.callback,
            datavar = "";

        if (isLinux()) {
            process = _spawn.spawn(command, config.args);

        } else {
            // probably windows
            args.unshift(command);
            args.unshift("/c");
            command = "cmd";
            process = _spawn.spawn(command, config.args);
        }

        if (process) {

            process.stdout.on('data', function (data) {

                if (data) {
                    datavar += (new Buffer(data).toString("utf8"));
                }
            });

            process.stderr.on('data', function (data) {
                var buf, err;

                if (data && config.debug) {
                    buf = new Buffer(data);
                    err = buf.toString('utf8');
                    if (err) {
                        if (err.indexOf("extraneous") != -1) {
                            _log.warn("Warning: there's a dependencies 'problems' section about 'extraneous'. It does not affect this process.\n");

                        } else if (err.indexOf("max depth reached") != -1) {

                            _log.warn("Warning: there's a dependencies 'problems' section about 'max depth reached'. It does not affect this process.\n");

                        } else {
                            _log.warn("[js.utils.NPM info] Warnings occurred while looking for the package:", err);
                        }
                    }
                }

            });

            process.on('close', function (code) {
                var infos;

                if (datavar) {
                    if (config.debug) {
                        console.log("JSON Tree: ", datavar);
                    }

                    try {
                        listobj = JSON.parse(datavar);

                    } catch (e) {
                        if (config.debug) {
                            console.error(e);
                        }
                    }

                    if (listobj) {
                        infos = _process(listobj, isdetails, config.list);
                        callback.call(infos);
                    }
                } else {
                    console.error("[js.utils NPM] Due to errors, failed to parse the JSON tree (set debug to 1 for more details)");
                }
            });
        }
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
                depth = "10",
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