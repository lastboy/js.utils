var _typedas = require("typedas");

module.exports = function () {

    return {

        /**
         * Clean empty entries out of an existing array
         *
         * @param arr {Array} The array to be cleaned
         * @returns {Array} The new cleaned Array
         */
        cleanupArray: function (arr) {
            var newArr = [];

            if (arr && _typedas.isArray(arr)) {
                arr.forEach(function (item) {
                    if (item !== null && item !== undefined) {
                        newArr.push(item)
                    }
                });
            }

            return newArr;
        },


        /**
         * Remove Array's item
         *
         * @param arr {Array} The given array
         * @param value {Object} The value to be removed
         * @returns {Array} The new Array
         */
        removeArrayItemByValue: function (arr, value) {
            var newArr = [],
                counter = 0;

            if (arr && _typedas.isArray(arr)) {

                arr.forEach(function (item) {
                    if (item !== value && item !== null && item !== undefined) {
                        newArr.push(item);
                    }
                    counter++;
                });
            }

            return newArr;
        }
    };
}();
