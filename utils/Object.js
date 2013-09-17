var typedas = require("typedas"),
    arrayutils = require("./Array.js");

module.exports = function () {

    return {

        /**
         *  Check if a given object contains a value
         *
         * @param obj The object that might contains
         * @param value The value to be searched
         *
         * @returns {boolean} If the value contains in the obj return true else return false
         */
        contains: function (obj, value) {
            var key;

            if (obj) {
                for (key in obj) {
                    if (typedas.isObject(value) || typedas.isArray(value)) {
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
         * Copy the source object's properties.
         * TODO TBD make it more robust, recursion and function support
         * TODO move to a common module
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

                        if (typedas.isObject(srcobj[name])) {
                            if (!destobj[name]) {
                                destobj[name] = {};
                            }
                            arguments.callee.call(me, srcobj[name], destobj[name], override);

                        } else if (typedas.isArray(srcobj[name])) {

                            if (!obj) {
                                destobj[name] = srcobj[name];

                            } else if (typedas.isArray(obj)) {

                                arrayutils.cleanupArray(srcobj[name]);
                                if (override) {
                                    destobj[name] = srcobj[name];

                                } else {
                                    size = destobj[name].length;
                                    for (idx = 0; idx < size; idx++) {
                                        item = obj[idx];
                                        srcobj[name] = arrayutils.removeArrayItemByValue(srcobj[name], item);
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
