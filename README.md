js.utils
==============

<p>General Utilities</p>


## Usage

### Object
* Copy the 'srcobj' to the 'destobj' <br/>

    <pre><code>var destobj = {},
srcobj = {foo: 'foo'};
  require("js.utils").Object.copy(srcobj, destobj);
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


### Template

<p>Load and compile template with underscore</p>

* template(config)
    + Config properties:
        + name     {String} The name of the template e.g. /scraps/test (optional in case content exists)
        + path     {String} The full path where the templates exists (optional) e.g. /home/../test.tpl
        + content  {String} The string content instead of the file content (optional in case name exists & overrides the file content)
        + data     {Object} The data object properties (see underscore template)



