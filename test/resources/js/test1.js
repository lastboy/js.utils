function test() {
    // this content is to be minified

    this.x1 = 1;
    this.y1 = 1;


    this.getX1 = function() {
        console.log(document.location.href);
        return this.x1;
    };

    this.getY1 = function() {
        return this.y1;
    };


}