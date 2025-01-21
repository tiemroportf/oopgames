class Wall  {

    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.wallWidth = w;
        this.wallHeight = h;
    }

    teken() {
        push();
        noFill();
        stroke('blue');
        strokeWeight(1);
        rect(this.x, this.y, this.wallWidth, this.wallHeight);
        pop();
    }
}