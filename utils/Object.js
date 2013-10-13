var _jsutilsModuleObject = function () {

    var _vars = {};

    return {

        internal: function(refs) {
            _vars = refs;

        },

        /**
         *  Check if a given object contains a value
         *
         * @param obj The referenced object
         * @param value The value to be searched
         *
         * @returns {boolean} If the value contains in the obj return true else return false
         */
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

        /**
         * Copy the source object's properties to the destination object.
         * TODO TBD make it more robust, recursion and function support
         *
         * @param srcobj The source object
         * @param destobj The destination object
         * @param override Override existing property [false as default]
         */
        copy: function (srcobj, destobj, override) {

            var name, obj,
                me = this,
                idx = 0, size = 0, item;

            override = (override || false);

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
                                if (!destobj[name] || (destobj[name] && override)) {
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
        // nodejs support
        _jsutilsModuleObject.internal({
            typedas: require("typedas"),
            arrayutils: require("./Array.js")
        });
        module.exports = _jsutilsModuleObject;

    }
} else {
    define(["typedas", "array"], function(typedasref, arrayref) {

        _jsutilsModuleObject.internal({typedas: typedAs, arrayutils: arrayref});
        return _jsutilsModuleObject;
    });
}

