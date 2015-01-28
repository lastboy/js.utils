var _log,
    _jsutils,
    _Object,
    _Array,
    _Template,
    _Task;


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

    var empty1 = {}, empty2 = {x:1}, empty3, Empty = function(){}, test = ["1", 2, "3", [
            {foo: [1, 2]}
        ]],
        objutils = _Object,
        testmsg = " Contains objects: " + JSON.stringify(test) + ",  ";

    if (objutils.empty(empty1)) {
        _log.log(" Empty object test 1 - empty " + " - passed");
    }

    if (!objutils.empty(empty2)) {
        _log.log(" Empty object test 2 - not empty " + " - passed");
    }

    empty3 = new Empty();
    Empty.prototype.x = 1;
    if (objutils.empty(empty3)) {
        _log.log(" Empty object test 3 - empty " + " - passed \n");
    }

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

    _Template.setMustache(true);
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
    _jsutils.NPM.info({global: false, details: true, debug: 0, list: ["underscore"]}, function (err) {
        console.log("\n> ... Test 1, get info details ");
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
        console.log("\n> ... Test 2, get info details ");
        var data = this.data;
        data.forEach(function (item) {
            if (item) {
                console.log(" details: ", JSON.stringify(item.get("details")));
            }
        });

    });


    _jsutils.NPM.installed({list: ["bower"], debug: 0, depth: "10"}, function (err) {
        console.log("\n> ... Test 3, check if bower installed locally");
        console.log(this);
    });

   _jsutils.NPM.installed({global: true, list: ["bower"], debug: 0, depth: "10"}, function (err) {
        console.log("\n> ... Test 3.1, check if bower installed globally");
        console.log(this);
    });


    _jsutils.NPM.installed({list: ["underscore"], depth: "-1"}, function (err) {
        console.log("\n> ... Test 4, check if underscore installed");
        console.log(this);
    });


}


function XMLTest() {

    console.log("\n>### ... XML Test string 1, true ");
    _jsutils.init({log: true});

    /**
     *  Test for NPM info & installed methods
     *
     */
    console.log("XML validation test: result: ", _jsutils.XML.validate({
        content: {
            xml: '<?xml version="1.0" encoding="UTF-8" ?><test_elt>Test String</test_elt>',
            xsd: '<?xml version="1.0" encoding="UTF-8" ?><xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema"><xs:element name="test_elt" type="xs:string"/></xs:schema>'
        }
    }));


    console.log("\n>### ... XML Test int 2, true ");
    _jsutils.init({log: true});

    /**
     *  Test for NPM info & installed methods
     *
     */
    console.log("XML validation test: result: ", _jsutils.XML.validate({
        content: {
            xml: '<?xml version="1.0" encoding="UTF-8" ?><test_elt>666</test_elt>',
            xsd: '<?xml version="1.0" encoding="UTF-8" ?><xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema"><xs:element name="test_elt" type="xs:int"/></xs:schema>'
        }
    }));


    console.log("\n>### ... XML Test int 3, false ");
    _jsutils.init({log: true});

    /**
     *  Test for NPM info & installed methods
     *
     */
    console.log("XML validation test: result: ", _jsutils.XML.validate({
        content: {
            xml: '<?xml version="1.0" encoding="UTF-8" ?><test_elt>false</test_elt>',
            xsd: '<?xml version="1.0" encoding="UTF-8" ?><xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema"><xs:element name="test_elt" type="xs:int"/></xs:schema>'
        }
    }));


    console.log("\n>### ... XML Test Junit 4, true ");
    _jsutils.init({log: true});

    /**
     *  Test for NPM info & installed methods
     *
     */
    console.log("XML validation test: result: ", _jsutils.XML.validate({
        file: {
            xml: require('path').join(__dirname, '../test/resources/TESTS-TestSuites.xml'),
            xsd: require('path').join(__dirname, '../test/resources/junit4.xsd')
        }
    }));
}

/*
    Single API Tasks calls
 */
function TaskTest() {

    console.log("\n>### ... Task Test minify 1, true ");
    _jsutils.init({log: true});


    var result = _jsutils.Task.jshint({
        code: require("fs").readFileSync("./test/resources/js/test1.js", "utf8")
    });

    result = _jsutils.Task.jshint({
        src: ["./test/resources/**/test1.js"]
    });

    console.log( "JShint file : result: ",
        result, "test: ", result.success
    );

    if (result.success) {
        console.log( "Minified file : result: ",
            _jsutils.Task.minify({
                src: ["./test/resources/**/test1.js","./test/resources/js/test2.js" ]
            })
        );
    }
}

function TaskConcat() {

    console.log("\n>### ... Task Test concat 2, true ");
    _jsutils.init({log: true});

    console.log( "Minified file : result: ",
        _jsutils.Task.concat({
            src: ["./test/resources/**/test1.js","./test/resources/js/test2.js" ]
        })
    );
}

/*
    E2E Prod Tasks
 */
function ProdTaskTest() {

    console.log("\n>### ... Task Test e2e prod  3, true ");
    _jsutils.init({log: true});

    console.log( "Minified file : result: ",
        _jsutils.Task.prod({
            src: ["./test/resources/**/test1.js","./test/resources/js/test2.js" ],
            out: {
                banner: "This is a test minified content",
                name: "testx-min.js",
                path: "./test/out"
            },
            jshint: {
                opt: {
                    "strict": false,
                    "curly": true,
                    "eqeqeq": true,
                    "immed": false,
                    "latedef": true,
                    "newcap": false,
                    "noarg": true,
                    "sub": true,
                    "undef": true,
                    "boss": true,
                    "eqnull": true,
                    "node": true,
                    "es5": false
                },

                globals: {
                    document: true
                }

            }
        })
    );
}

/*
 E2E Dev Tasks
 */
function DevTaskTest() {

    console.log("\n>### ... Task Test e2e Dev 4, true ");

    console.log( "Dev : result: ",
        _jsutils.Task.dev({
            src: ["./test/resources/**/test1.js","./test/resources/js/test2.js" ],
            out: {
                banner: "This is a test unminified content",
                name: "test-unmin.js",
                path: "./test/out"
            },
            jshint: {
                globals: {
                    document: true
                }
            }
        })
    );
}

/*
 Multi E2E Dev Tasks
 */
function MultiDevTaskTest() {

    console.log("\n>### ... Task Test Multi e2e Dev 5, true ");

    var result =  _jsutils.Task.dev([{
        src: ["./test/resources/**/test1.js","./test/resources/js/test2.js" ],
        out: {
            banner: "This is a test unminified content",
            name: "testx-unmin.js",
            path: "./test/out"
        },
        jshint: {
            globals: {
                document: true
            }
        }
    }, {
        src: ["./test/resources/**/test1.js","./test/resources/js/test2.js" ],
        out: {
            banner: "This is a test unminified content",
            name: "testy-unmin.js",
            path: "./test/out"
        },
        jshint: {
            globals: {
                document: true
            }
        }
    }]);

    console.log( "Dev : result: ",
            result
    );
}



if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
        _log = require("./../utils/Logger.js");
        _jsutils = require("./../jsutils.js");
        _Object = _jsutils.Object;
        _Array = _jsutils.Array;
        _Template = _jsutils.Template,
        _Task = _jsutils.Task;

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

        // XMLTest();

        TaskTest();

        TaskConcat();

        ProdTaskTest();

        DevTaskTest();

        MultiDevTaskTest();
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

        _Template.setMustache(true);
        console.log("Running template test... ", _Template.template({
            data: {test: "test"},
            content: "This is a '{{test}}'"
        }));
    }

    if (typeof require !== "undefined") {

        define([], function() {

            var jsutilsOnReady = function(obj, arr, tpl) {
                _Object = obj;
                _Array = arr;
                _Template = tpl;
                _log = console;
    
                btest();
            };
            
            return {jsutilsOnReady: jsutilsOnReady}
        });
    } else {
        _Object = jsutilsObject;
        _Array = jsutilsArray;
        _Template = jsutilsTemplate;
        _log = console;

        btest();
    }

}
