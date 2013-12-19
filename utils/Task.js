var _jsutilsModuleTask = function () {

    var _vars = {},
        _me,
        _local;

    _local = {

        /**
         *  Configuration validation
         *
         *  @param config {Object} E2E configuration
         *  @param action {String} The method to be invoked (_dev | _prod | _write)
         *  @private
         */
        _validate: function (config, action) {

            var result = [];

            if (_vars.typedas.isArray(config)) {

                config.forEach(function (item) {
                    if (item && _local[action]) {
                        result.push(_local[action](item));
                    }
                });

                return result;

            } else {
                return _local[action](config);
            }
        },

        /**
         *  Write the content to a file
         *
         *  @param out {Object} The output configuration
         *  @param content {String} The content to be saved
         *  @private
         */
        _write: function(out, content) {

            if (!out) {
                _vars.log.warn("\n [js.utils write file] no valid output configuration");
                return undefined;
            }

            var file = ("name" in out && out.name),
                path, banner = (("banner" in out && out.banner) || undefined);
            if (file && content) {
                path = (("path" in out && out.path) || path);
                path = _vars.path.resolve(path);
                if (!_vars.fs.existsSync(path)) {
                    _vars.fs.mkdirp.sync(path);
                }
                file = _vars.path.resolve(_vars.path.join(path, file));
                if (banner) {
                    banner = ["/*", banner, "*/"].join(" ");
                }
                _vars.fs.writeFileSync(file, (banner ? [banner, content].join("") : content));
            } else {
                _vars.log.warn("\n [js.utils write file] no valid file name or content");
            }
        },

        // TODO generic code (parameters init) for _dev & _prod

        /**
         * E2E development process
         * Files that are validated with lint (jshint) and concatinated
         *
         * @param config {Object} The files configuration
         * @returns {String} The concateneted string | {Array} The concatenated strings for all the configurations
         * @private
         */
        _dev: function (config) {

            var src,
                msg,
                concat = {},
                jshint = {},
                result = {jshint: null, concat: null},
                out, output;

            if (config) {
                out = ("out" in config && config.out);
                if ("concat" in config) {
                    if (!config.concat) {
                        concat = null;
                    } else {
                        concat = config.concat;
                    }
                }
                if ("jshint" in config) {
                    if (!config.jshint) {
                        jshint = null;
                    } else {
                        jshint = config.jshint;
                    }
                }
                if (!("src" in config && config.src)) {
                    msg = "\n [js.utils Task dev] 'src' is a required";
                    console.error(msg);
                    _vars.log.error(msg);
                }
            } else {
                msg = "\n [js.utils Task dev] no valid configuration was found";
                console.error(msg);
                _vars.log.error(msg);
            }

            if (concat) {
                concat.src = config.src;
            }
            if (jshint) {
                jshint.src = config.src;
            }

            // jshint process
            if (jshint) {
                result.jshint = _me.jshint(jshint);

                if (!result.jshint.success) {
                    console.error(result.jshint.errors);
                    return undefined;
                }
            }

            // minification process
            if (concat) {
                output = _me.concat(concat);
                if (out) {
                    _local._write(out, output);
                }
                return output;
            }
        },

        /**
         * E2E production process
         * Files that are validated with lint (jshint), concatinated and minified (uglifyjs)
         *
         * @param config {Object} The files configuration
         * @returns {String} The concateneted string | {Array} The minified strings for all the configurations
         * @private
         */
        _prod: function (config) {
            var src,
                msg,
                minify = {},
                jshint = {},
                result = {jshint: null, minify: null},
                out, output;

            if (config) {
                out = ("out" in config && config.out);
                if ("minify" in config) {
                    if (!config.minify) {
                        minify = null;
                    } else {
                        minify = config.minify;
                    }
                }
                if ("jshint" in config) {
                    if (!config.jshint) {
                        jshint = null;
                    } else {
                        jshint = config.jshint;
                    }
                }
                if (!("src" in config && config.src)) {
                    msg = "\n [js.utils Task prod] 'src' is a required";
                    console.error(msg);
                    _vars.log.error(msg);
                }
            } else {
                msg = "\n [js.utils Task prod] no valid configuration was found";
                console.error(msg);
                _vars.log.error(msg);
            }

            if (minify) {
                minify.src = config.src;
            }
            if (jshint) {
                jshint.src = config.src;
            }

            // jshint process
            if (jshint) {
                result.jshint = _me.jshint(jshint);

                if (!result.jshint.success) {
                    console.error(result.jshint.errors);
                    return undefined;
                }
            }

            // minification process
            if (minify) {
                output = _me.minify(minify);
                if (out) {
                    _local._write(out, output);
                }
                return output;
            }
        }
    };


    _me = {

        internal: function (refs) {
            _vars = refs;

        },

        /**
         * Concat single or multi files
         *
         * @param config {Object{ The configuration
         *          - src {Array} Array of file(s) path | {String} Single file path
         *          -
         *
         * @returns {string}
         */
        concat: function (config) {
            var idx = 0, size, item,
                src = ("src" in config && config.src),
                contentList = [];

            if (src) {
                if (_vars.typedas.isArray(src)) {
                    size = src.length;
                    for (idx = 0; idx < size; idx++) {
                        item = src[idx];
                        if (item) {
                            contentList.push(_vars.fs.readFileSync(item, "utf8"));
                        }
                    }
                } else if (_vars.typedas.isString(src)) {
                    contentList.push(_vars.fs.readFileSync(src, "utf8"));
                }
            }

            return contentList.join("\n");

        },

        /**
         * Lint the given files
         *
         * @param config {object} The configuration
         *          - src {Object} The file to be linted (overrides the code property)
         *          - code {String} The content string to be linted (optional)
         *          - opt {Object} The jshint parameters
         *
         * @returns {{success: *, errors: (*|Array|Array)}}
         */
        jshint: function (config) {

            function codeProcess(code, opt) {
                return _vars.jshint(code, opt, { assert: true });
            }

            var idx = 0, size, item, itemCode,
                validcode,
                code, opt = {
                    "strict": false,
                    "curly": true,
                    "eqeqeq": true,
                    "immed": false,
                    "latedef": true,
                    "newcap": false,
                    "noarg": true,
                    "sub": true,
                    "undef": true,
                    "boss": true,
                    "eqnull": true,
                    "node": true,
                    "es5": false
                }, src;

            src = ("src" in config && config.src);
            code = ("code" in config && config.code);
            opt = ( ("opt" in config && config.opt) ? config.opt : opt);

            if (src) {
                if (_vars.typedas.isArray(src)) {
                    code = null;
                    size = src.length;
                    for (idx = 0; idx < size; idx++) {
                        item = src[idx];
                        if (item) {
                            itemCode = _vars.fs.readFileSync(item, "utf8");
                            validcode = codeProcess(itemCode, opt);
                            if (!validcode) {
                                break;
                            }
                        }
                    }
                } else if (_vars.typedas.isString(src)) {
                    code = _vars.fs.readFileSync(src, "utf8");
                }
            }

            if (code) {
                validcode = codeProcess(code, opt);
            }

            return {success: validcode, errors: _vars.jshint.errors};
        },

        /**
         *  Minify given files / stream
         *
         * @param config {Object} The configuration
         *          -  src {Array|String} The given file(s) to be minified
         *
         * @return {String} The minified string
         */
        minify: function (config) {

            var src,
                result;

            if (config) {
                if ("src" in config) {
                    src = config.src;
                    if (src) {
                        result = _vars.uglify.minify(src)
                    }
                }
            }

            return result;
        },

        write: function(config) {
            _local._write(config);
        },

        dev: function (config) {
            return _local._validate(config, "_dev");
        },

        prod: function(config) {
            return _local._validate(config, "_prod");
        }

    };

    return _me;
}();


if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
        // nodejs support
        _jsutilsModuleTask.internal({
            fs: require("fs.extra"),
            typedas: require("typedas"),
            uglify: require("uglify-js"),
            jshint: require("jshint").JSHINT,
            log: require("./Logger.js"),
            path: require("path")
        });
        module.exports = _jsutilsModuleTask;

    }
} else {
    // No impl, for the web, just yet ...
}

