/**
 * Global variable manager
 *
 * @type {module.exports}
 */
module.exports = function() {

    // Setting global environment
    global.jsutils = {};


    return {

        exists: function(key) {
            return (key in global.jsutils);
        },

        set: function(key, value) {
            global.jsutils[key] = value;
        },

        get: function(key) {
            return global.jsutils[key];

        }

    }

}();