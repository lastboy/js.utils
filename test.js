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

    _log.log("\n Testing copied objects... compare length: ", compare.length);
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

    _log.log("\n Testing contains objects... ");

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

function loadTemplateTest() {

    _log.log(" Testing Template Loading... ");

    _log.log(" Test 1... ");
    var out = require("./jsutils.js").Template.template({
        path: "./test",
        name: "templateTest",
        data: {
            status: "successfully"
        }
    });

    console.log("Template output: ", out);

    _log.log(" Test 2... ");
    var out = require("./jsutils.js").Template.template({
        path: "/home/arik/dev/projects/lastboy/js.utils/test/",
        name: "templateTest",
        data: {
            status: "successfully"
        }
    });

    console.log("Template output: ", out);

    _log.log(" Test 3... ");
    var out = require("./jsutils.js").Template.template({
        content: "Custom content Test was loaded {{status}}.",
        name: "templateTest",
        data: {
            status: "successfully"
        }
    });

    console.log("Template output: ", out);

}

function NPMTest() {


    /**
     *  Test for NPM info & installed methods
     *
     */
    require("./jsutils.js").NPM.info({global: false, details: true, debug:1, list:["typedas"]}, function(err) {
        console.log("> ... Test 1, get info details ");
        var data = this.data;
        data.forEach(function(item) {
            if (item) {
                console.log(" details: ", JSON.stringify(item.get("details")));
            }
        });

    });

    /**
     *  Test for NPM info & installed methods
     *
     */
    require("./jsutils.js").NPM.info({global: false, details: true, debug:1}, function(err) {
        console.log("> ... Test 2, get info details ");
        var data = this.data;
        data.forEach(function(item) {
            if (item) {
                console.log(" details: ", JSON.stringify(item.get("details")));
            }
        });

    });

    require("./jsutils.js").NPM.installed({list: ["bower"], debug:1, depth: 10}, function(err) {
        console.log("> ... Test 3, check if bower installed");
        console.log(this);
    });

    require("./jsutils.js").NPM.installed({list: ["typedas"]}, function(err) {
        console.log("> ... Test 4, check if typedas installed");
        console.log(this);
    });


}

function tests() {

    var destobj = {},
        srcobj = {foo: 'foo', nested: [ {inner: [1, 1] }]};

    require("./jsutils.js").Object.copy(srcobj, destobj);

    if (!compareTest([srcobj, destobj])) {
        console.error("[utils object test] Compare test failed for Object.copy utility");
    }

    containsTest();

    loadTemplateTest();

    NPMTest();
}


tests();