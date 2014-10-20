js.utils
==============

<p>Utilities for:</p>

* Object
    + copy/clone an object
    + contains  - Validates if an object contains a given value
    + empty     - Validates is the object empty

* NPM
    + info      - Get information about the list of installed packages
    + installed - Check if a package has already been installed

* Template
    + Load and compile a template with underscore

* Task
    + Lint, concat and/or minify a set of resources (currently JS file type supported)


## Usage

### Initial settings
* Set the log on/off (by default set to on)
  <pre><code>require("js.utils").init({log: false});
  </code></pre>

### Object
* Copy the 'srcobj' to the 'destobj' <br/>
    <pre><code>var destobj = {},
srcobj = {foo: 'foo'};
  require("js.utils").Object.copy(srcobj, destobj);
</code></pre>

* Validates if 'foo' exists in a given array <br/>
    <pre><code>require("js.utils").Object.contains(['foo'], 'foo');
</code></pre>

* Validates if an object is empty <br/>
    <pre><code>require("js.utils").Object.empty({});
</code></pre>

### NPM
* get all local packages information
    <pre><code>require("js.utils").NPM.info({details: true}, function(err) {
           var data = this.data;
           // go over the array data
           data.forEach(function(item) {
               if (item) {
                   console.log(" details: ",
                        JSON.stringify(item.get("details")));
               }
           });
       });
</code></pre>

* check if the package 'bower' was installed
    <pre><code>require("js.utils").NPM.installed({list: ["bower"]},
        function(err) {
            console.log("Bower was: ",
                (this.data.bower ? "" : "not"),
                " installed");
        });
</code></pre>

### Template
* Compile a given template as a file or string value using underscore (Mustache Style). <br/>
    <pre><code>var out = require("js.utils").Template.template({
           content: "Custom content Test was loaded {{status}}.",
           name: "templateTest",
           data: {
               status: "successfully"
           }
       });
</code></pre>

### Task
* Prepare your resources for Development (dev api) and/or Production (prod api) with <br/>
    JSHint & UglifyJS
    <pre><code>
        require("js.utils").Task.dev([{
               src: ["./test/resources/test1.js","./test/resources/test2.js" ],
               out: {
                   banner: "This is a test minified content",
                   name: "testx-min.js",
                   path: "./test/out"
               }
           }, {
               src: ["./test/resources/test1.js","./test/resources/test2.js" ],
               out: {
                   banner: "This is a test minified content",
                   name: "testy-min.js",
                   path: "./test/out"
               }
           }]);
</code></pre>

* Or use separate API minify/jshint/concat <br/>
    <pre><code>
        require("js.utils").Task.jshint({
                src: ["./test/resources/test1.js"]
            });

        require("js.utils").Task.minify({
                src: ["./test/resources/test1.js","./test/resources/test2.js" ]
            })
</code></pre>

## Browser Support

### Usage

* AMD
    * See jsutilswebRequire-min.js file, as an example of requirejs project style

        define([], function() {
    
            var jsutilsOnReady = function(obj, arr, tpl) {
              
                // use object, array or template 
              
            };
            
            return jsutilsOnReady;
        });

* None AMD

    + js.utils global variables for the web:
        + jsutilsObject;
        + jsutilsArray;
        + jsutilsTemplate;  

### Download

* None AMD
    * with NO dependencies: [jsutils-min.js](https://raw.github.com/lastboy/js.utils/master/target/jsutils-min.js)
        * manually download
            * [Underscore](http://underscorejs.org/)
    * with dependencies: [jsutils-min-all.js](https://raw.github.com/lastboy/js.utils/master/target/jsutils-min-all.js)
        * underscore is already inside

* AMD
   * [jsutils-require-min.js](https://raw.github.com/lastboy/js.utils/master/target/jsutils-require-min.js)

## Reference

### Object

<p>Copy the source object's properties to the destination object.</p>

* copy(srcobj, destobj, override)
    + srcobj {Object} The source object
    + destobj {Object} The destination object
    + override {Object} Override the existing property (deault to false)


<p>Check if a given object contains a value</p>

* contains(obj, value)
    + obj {Object} The referenced object
    + value {Object} The value to be searched

<p>Is the object empty ?</p>

* empty(srcobj)
    + srcobj {Object} The object reference
returns {boolean} If the object is [null || undefined || has no values {}] return true or else false

<p>Inspect a given string and try to resolve its object</p>

* resolve(srcobj)
    + srcobj {Object} The object reference


### NPM

<p>Get information about the list of installed packages</p>

* info(config, callback)
    + config properties:
        + global    {Boolean}   the packages are global, optional values are true/false (defaults to false)
        + details   {Boolean}   Whether to display the full details or just the basic details. (defaults to false)
        + list      {Array}     specific list of packages names (or else result all)
        + depth     {string}    npm argument for how deep the rabbit hole goes (defaults to 10)
            + -1 for unlimited (Not recommended, NPM will might throw an error about "max depth reached")
    + callback {Function}   callback function for collecting the results. (get the data: this.data)
        + err       {String} In case an error occurred this variable will contain the error data or else 'undefined'
        + this.data {Object}    Array object containing the information about the packages that was found.
                                Array item - instance of Package class

* installed(config, callback)
    + config properties:
        + global    {Boolean}   the packages are global, optional values are true/false
        + list      {Array}     specific list of packages names (or else result all)
        + depth     {string}    npm argument for how deep the rabbit hole goes.
            + -1 for unlimited (Not recommended, NPM will might throw an error about "max depth reached")
    + callback {Function}       callback function for collecting the results. (get the data: this.data)
        + err       {String}    In case an error occurred this variable will contain the error data or else 'undefined'
        + this.data {Object}    An object containing the packages names with a true/false value indicating if the package installed.

* Package class
    + getDetails    Get the full details if the 'details' flag was set to true
    + getName       Get the package name
    + get(key)      Get the property by its key
        + opt keys  'name', 'dependencies', 'detail', etc.. (see package.json for more information)

### Template

<p>Load and compile template with underscore</p>

* template(config)
    + Config properties:
        + name     {String} The name of the template e.g. /scraps/test (optional in case content exists)
        + path     {String} The full path where the templates exists (optional) e.g. /home/../test.tpl
        + content  {String} The string content instead of the file content (optional in case name exists & overrides the file content)
        + data     {Object} The data object properties (see underscore template)

### Task

<p>Prepare your project for development / production using, JSHint & UglifyJS</p>
TBD

## Behavior

* NPM List
    <p>For getting the installed packages I'm using The NPM list command that might throw an error about problems.<br/>
    Those problems will be described as part of the NPM information tree. Those errors are not really functional errors but more like packages problems. <br/>
    The methods used in this module will still function as expected. I just forward the NPM error. (you can turn the log off if needed) NPM problems:</p>
    + max depth reached
        This can be handled, if you don't need a really deep information use the 'depth' property to adjust.
    +  extraneous
        It's not on your package.json, if it's installed don't worry about this message.

For more information see the [NPM docs](https://npmjs.org/doc/)

