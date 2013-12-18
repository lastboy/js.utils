var _jsutilsModuleTask = function () {

    var _vars = {},
        _me;

    _me = {

        internal: function(refs) {
            _vars = refs;

        },

        jshint: function(config) {

            function codeProcess(code, opt) {
                return _vars.jshint(code, opt, { assert:true });
            }

            var idx= 0, size, item, itemCode,
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
            opt = ( ("opt" in config && config.opt) ?  config.opt : opt);

            if (src) {
                if (_vars.typedas.isArray(src)) {
                    code = null;
                    size = src.length;
                    for (idx=0; idx<size; idx++) {
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
         * @param config The configuration
         *
         */
        minify: function (config) {

            var src,
                suffix = "-min",
                result;

            if (config) {
                if ("suffix" in config) {
                    suffix = config.suffix;
                }
                if ("src" in config) {
                    src = config.src;
                    if (src) {
                        result = _vars.uglify.minify(src)
                    }
                }
            }

            return result;
        },

        e2e: function(config) {
            var src,
                msg,
                minify = {},
                jshint = {},
                result = {jshint:null, minify:null};

            if (config) {
                if ("minify" in config && config.minify)  {
                    minify  = config.minify;
                }
                if ("jshint" in config && config.jshint)  {
                    jshint = config.jshint;
                }
                if (!("src" in config && config.src)) {
                    msg = "\n [js.utils Task e2e] 'src' is a required";
                    console.error(msg);
                    _vars.log.error(msg);
                }
            } else {
                msg = "\n [js.utils Task e2e] no valid configuration was found";
                console.error(msg);
                _vars.log.error(msg);
            }

            minify.src = config.src;
            jshint.src = config.src;

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
                return _me.minify(minify);
            }
        }

    };

    return _me;
}();


if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
        // nodejs support
        _jsutilsModuleTask.internal({
            fs: require("fs"),
            typedas: require("typedas"),
            uglify: require("uglify-js"),
            jshint: require("jshint").JSHINT,
            log: require("./Logger.js")
        });
        module.exports = _jsutilsModuleTask;

    }
} else {
   // No impl, for the web, just yet ...
}

