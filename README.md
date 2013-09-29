js.utils
==============

<p>General Utilities</p>

* Object
    + copy/clone object
    + contains  - validate if an object contains a given value

* NPM
    + info      - Get information about the list of installed packages
    + installed - Check if a package has already been installed

* Template
    + Load and compile a template with underscore


## Usage


### Object
* Copy the 'srcobj' to the 'destobj' <br/>

    <pre><code>var destobj = {},
srcobj = {foo: 'foo'};
  require("js.utils").Object.copy(srcobj, destobj);
</code></pre>

* Validate if 'foo' exists in a given array <br/>

    <pre><code>require("js.utils").Object.contains(['foo'], 'foo');
</code></pre>


### NPM
* get all local packages information

    <pre><code>require("js.utils").NPM.info({details: true}, function(err) {
           var data = this.data;
           // go over the array data
           data.forEach(function(item) {
               if (item) {
                   console.log(" details: ", JSON.stringify(item.get("details")));
               }
           });
       });
</code></pre>

* check if the package 'bower' was installed
    <pre><code>require("js.utils").NPM.installed({list: ["bower"]},
        function(err) {
            console.log("Bower was: ", (this.data.bower ? "" : "not"), " installed");
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


### NPM

<p>Get information about the list of installed packages</p>
* info(config, callback)
    + config properties:
        + global    {Boolean}   the packages are global, optional values are true/false (defaults to false)
        + details   {Boolean}   Whether to display the full details or just the basic details. (defaults to false)
        + list      {Array}     specific list of packages names (or else result all)
        + depth     {string}    npm argument for how deep the rabbit hole goes (defaults to 2)
                                -1 for unlimited (Not recommended, this will throw an error, this is npm behaviour)
    + callback {Function}   callback function for collecting the results. (get the data: this.data)
        + err       {String} In case an error occurred this variable will contain the error data or else 'undefined'
        + this.data {Object}    Array object containing the information about the packages that was found.
                                Array item - instance of Package class

* installed(config, callback)
    + config properties:
        + global    {Boolean}   the packages are global, optional values are true/false
        + list      {Array}     specific list of packages names (or else result all)
        + depth     {string}    npm argument for how deep the rabbit hole goes.
                                -1 for unlimited (Not recommended, this will throw an error, this is npm behaviour)
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
