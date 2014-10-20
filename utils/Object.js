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
                    if (_vars._.isObject(value) || _vars._.isArray(value)) {
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

                        if (_vars._.isArray(srcobj[name])) {

                            if (!obj) {
                                destobj[name] = srcobj[name];

                            } else if (_vars._.isArray(obj)) {

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

                        } else if (_vars._.isObject(srcobj[name])) {
                            if (!destobj[name]) {
                                destobj[name] = {};
                            }
                            arguments.callee.call(me, srcobj[name], destobj[name], override);

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
        },

        /**
         * Is the object empty ?
         *
         * @param srcobj {Object} The object reference
         * @returns {boolean} If the object is null || undefined || has no values {} return true or else false
         */
        empty: function(srcobj) {

            var key,
                n= 0,
                result = false;

            if (!srcobj) {
                return true;
            }

            if (Object.keys) {
                result = (Object.keys(srcobj).length === 0);

            } else {
                for (key in srcobj) {
                    if (srcobj.hasOwnProperty(key)) {
                        n++;
                        break;
                    }
                }

                result = (n === 0);
            }

            return result;
        },

        /**
         * Inspect a given string and try to resolve its object
         *
         * @param obj The reference object
         * @param query The query to apply over the referenced object
         */
        resolve: function (obj, query) {

            if (!obj || !query) {
                return obj;
            }

            var keys = query.split("."),
                size = keys.length,
                counter = 0,
                key;

            while (counter < size) {
                key = keys[counter];
                if (key && obj[key]) {
                    obj = obj[key];
                    counter++;
                } else {
                    counter = size;
                    console.warn("[js.utils Object] resolve failed: ", query);
                    return null;
                }
            }

            return obj;
        }

    };
}();


if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
        // nodejs support
        _jsutilsModuleObject.internal({
            _: require("underscore"),
            arrayutils: require("./Array.js")
        });
        module.exports = _jsutilsModuleObject;

    }
} else {
    define(["underscore", "jsutilsArrayModule"], function(underscoreref, arrayref) {

        _jsutilsModuleObject.internal({_: _, arrayutils: arrayref});
        return _jsutilsModuleObject;
    });
}

