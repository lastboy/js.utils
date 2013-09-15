var _log = require("./utils/Logger.js");

function compare(objects) {
    var compare = [], n= 0,
        anchor, counter=0;

    // serialize the given objects
    if (objects && objects.length) {
        objects.forEach(function(item) {
            try {
                compare.push(JSON.stringify(item));

            } catch(e) {
                _log.error("Test Error: ", e)
            }

        });
    }

    _log.log(" Testing copied objects... compare length: ", compare.length);
    // compare the objects
    compare.forEach(function(item){

        if (counter === 0) {
            anchor = item;

        } else {

            if (item && item == anchor) {
                anchor = item;
                _log.log(" Compare objects [ " + (counter-1) + " , " + counter + " ],  passed" );
                _log.log(" output : [" + (counter-1) +  "] " + item );
                _log.log(" output : [" + (counter) +  "] " + item );

            } else {
                _log.log(" Compare objects [ " + (counter-1) + " , " + counter + " ],  failed" );
                n++;
            }

        }
        counter++;
    });

    return (n > 0 ? false : true);
}

function test() {

    var destobj = {},
        srcobj = {foo: 'foo', nested: [ {inner: [1, 1] }]};

    require("./jsutils.js").Object.copy(srcobj, destobj);

    if (!compare([srcobj, destobj])) {
        console.error("[utils object test] Compare test failed for Object.copy utility");
    }
}


test();