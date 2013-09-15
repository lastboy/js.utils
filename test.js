// TODO testing..

function compare(objects) {
    var compare = [], n= 0,
        anchor, counter=0;

    // serialize the given objects
    if (objects && objects.length) {
        objects.forEach(function(item) {
            compare.push(JSON.stringify(item));
        });
    }

    // compare the objects
    compare.forEach(function(item){

        if (counter === 0) {
            anchor = item;

        } else {

            if (item && item === anchor) {
                anchor = item;

            } else {
                n++;
            }

        }
        counter++;
    });

    return (n > 0 ? false : true);
}

function test() {

    var destobj = {},
        srcobj = {foo: 'foo'};

    require("js.utils").Object.copy(srcobj, destobj);

    if (!compare([srcobj, destobj])) {
        console.error("[utils object test] Compare test failed for Object.copy utility");
    }
}


test();