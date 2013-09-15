js.utils
==============

<p>General Utilities</p>


### Usage

#### Object
* Copy the 'srcobj' to the 'destobj' <br/>

    <pre><code>var destobj = {},
srcobj = {foo: 'foo'};
  require("js.utils").Object.copy(srcobj, destobj);
</code></pre>

### Reference

#### Object

* copy(srcobj, destobj, override)
    + srcobj {Object} The source object
    + destobj {Object} The destination object
    + override {Object} Override the existing property (deault to false)


