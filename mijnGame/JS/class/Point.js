class Point {

    constructor(x,y) {
        this.pointX = x;
        this.pointY = y;
    }

    draw(){
        push();
        noStroke();
        fill('yellow');
        circle(this.x, this.y, 10);
        pop();
    }
}