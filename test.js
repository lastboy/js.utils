var _log = require("./utils/Logger.js");

function compareTest(objects) {
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

            } else {
                _log.log(" Compare objects [ " + (counter-1) + " , " + counter + " ],  failed" );
                n++;
            }

        }
        counter++;
    });

    return (n > 0 ? false : true);
}

function containsTest() {

    _log.log(" Testing contains objects... ");

    var test = ["1", 2, "3", [{foo: [1, 2]}]],
        objutils = require("./jsutils.js").Object,
        testmsg = " Contains objects: " + JSON.stringify(test) + ",  ";


    if (objutils.contains(test, [{foo:[1, 2]}])) {
        _log.log( testmsg + ", [{foo:[1, 2]}]" + " - passed");
    } else {
        _log.log( testmsg + ", [{foo:[1, 2]}] - failed");
    }

     if (objutils.contains(test, 2)) {
        _log.log( testmsg + ", 2 - passed");
    } else {
        _log.log( testmsg + ", 2 - failed");
    }

     if (!objutils.contains(test, "2")) {
        _log.log( testmsg + ", \"2\" - passed");
    } else {
        _log.log( testmsg + " - failed");
    }

    objutils.contains(test, [{foo:[1, 2]}]);
}

function test() {

    var destobj = {},
        srcobj = {foo: 'foo', nested: [ {inner: [1, 1] }]};

    require("./jsutils.js").Object.copy(srcobj, destobj);

    if (!compareTest([srcobj, destobj])) {
        console.error("[utils object test] Compare test failed for Object.copy utility");
    }

    containsTest();
}


test();