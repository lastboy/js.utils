var _log,
    _jsutils,
    _Object,
    _Array,
    _Template;


function compareTest(objects) {
    var compare = [], n = 0,
        anchor, counter = 0;

    // serialize the given objects
    if (objects && objects.length) {
        objects.forEach(function (item) {
            try {
                compare.push(JSON.stringify(item));

            } catch (e) {
                _log.error("Test Error: ", e)
            }

        });
    }

    _log.log("\n Testing copied objects... compare length: ", compare.length);
    // compare the objects
    compare.forEach(function (item) {

        if (counter === 0) {
            anchor = item;

        } else {

            if (item && item == anchor) {
                anchor = item;
                _log.log(" Compare objects [ " + (counter - 1) + " , " + counter + " ],  passed");

            } else {
                _log.log(" Compare objects [ " + (counter - 1) + " , " + counter + " ],  failed");
                n++;
            }

        }
        counter++;
    });

    return (n > 0 ? false : true);
}

function containsTest() {

    _log.log("\n Testing contains objects... ");

    var test = ["1", 2, "3", [
            {foo: [1, 2]}
        ]],
        objutils = _Object,
        testmsg = " Contains objects: " + JSON.stringify(test) + ",  ";


    if (objutils.contains(test, [
        {foo: [1, 2]}
    ])) {
        _log.log(testmsg + ", [{foo:[1, 2]}]" + " - passed");
    } else {
        _log.log(testmsg + ", [{foo:[1, 2]}] - failed");
    }

    if (objutils.contains(test, 2)) {
        _log.log(testmsg + ", 2 - passed");
    } else {
        _log.log(testmsg + ", 2 - failed");
    }

    if (!objutils.contains(test, "2")) {
        _log.log(testmsg + ", \"2\" - passed");
    } else {
        _log.log(testmsg + " - failed");
    }

    objutils.contains(test, [
        {foo: [1, 2]}
    ]);
}

function loadTemplateTest() {

    _log.log(" Testing Template Loading... ");

    _log.log(" Test 1... ");
    var out = _Template.template({
        path: "./test",
        name: "templateTest",
        data: {
            status: "successfully"
        }
    });

    console.log("Template output: ", out);

    _log.log(" Test 2... ");
    var out = _Template.template({
        path: "./test/",
        name: "templateTest",
        data: {
            status: "successfully"
        }
    });

    console.log("Template output: ", out);

    _log.log(" Test 3... ");
    var out = _Template.template({
        content: "Custom content Test was loaded {{status}}.",
        name: "templateTest",
        data: {
            status: "successfully"
        }
    });

    console.log("Template output: ", out);

}

function NPMTest() {

    console.log("\n>### ... Log Test 1, false ");
    _jsutils.init({log: false});
    console.log("\n>### ...  ");
    _jsutils.testlog();
    console.log("\n>### ... Log Test 1 true");
    _jsutils.init({log: true});
    _jsutils.testlog();
    console.log("\n>### \n");

    /**
     *  Test for NPM info & installed methods
     *
     */
    _jsutils.NPM.info({global: false, details: true, debug: 0, list: ["typedas"]}, function (err) {
        console.log("> ... Test 1, get info details ");
        var data = this.data;
        data.forEach(function (item) {
            if (item) {
                console.log(" details: ", JSON.stringify(item.get("details")));
            }
        });

    });


    /**
     *  Test for NPM info & installed methods
     *
     */
    _jsutils.NPM.info({global: false, details: true, debug: 0}, function (err) {
        console.log("> ... Test 2, get info details ");
        var data = this.data;
        data.forEach(function (item) {
            if (item) {
                console.log(" details: ", JSON.stringify(item.get("details")));
            }
        });

    });


    _jsutils.NPM.installed({list: ["bower"], debug: 0, depth: "10"}, function (err) {
        console.log("> ... Test 3, check if bower installed locally");
        console.log(this);
    });


    _jsutils.NPM.installed({list: ["typedas"], depth: "-1"}, function (err) {
        console.log("> ... Test 4, check if typedas installed");
        console.log(this);
    });


}


if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
        _log = require("./../utils/Logger.js");
        _jsutils = require("./../jsutils.js");
        _Object = _jsutils.Object;
        _Array = _jsutils.Array;
        _Template = _jsutils.Template;

        var destobj = {},
            srcobj = {foo: 'foo', nested: [
                {inner: [1, 1] }
            ]};

        _Object.copy(srcobj, destobj);

        if (!compareTest([srcobj, destobj])) {
            console.error("[utils object test] Compare test failed for Object.copy utility");
        }

        containsTest();

        loadTemplateTest();

        NPMTest();
    }
} else {

    function btest() {

        var destobj = {},
            srcobj = {foo: 'foo', nested: [
                {inner: [1, 1] }
            ]};

        _Object.copy(srcobj, destobj);

        if (!compareTest([srcobj, destobj])) {
            console.error("[utils object test] Compare test failed for Object.copy utility");
        }

        containsTest();

        console.log("Running template test... ", _Template.template({
            data: {test: "test"},
            content: "This is a '{{test}}'"
        }));
    }

    if (typeof require !== "undefined") {
        this.jsutilsOnReady = function(obj, arr, tpl) {
            _Object = obj;
            _Array = arr;
            _Template = tpl;
            _log = console;

            btest();

        };
    } else {
        _Object = jsutilsObject;
        _Array = jsutilsArray;
        _Template = jsutilsTemplate;
        _log = console;

        btest();
    }

}
