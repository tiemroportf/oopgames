class Wall {
    constructor(x, y, width, height, isSegmented = false) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.isSegmented = isSegmented; 

        if (this.isSegmented) {
            this.segments = []; 
        } else {
            this.segments = null; 
        }
    }

    addSegment(x, y, width, height) {
        if (!this.segments) {
            this.segments = []; 
        }
        this.segments.push({ x, y, width, height });
    }

    draw() {
        push();
        noFill();
        stroke('blue');
        strokeWeight(1);
        if (this.isSegmented && Array.isArray(this.segments)) {
            for (let segment of this.segments) {
                rect(segment.x, segment.y, segment.width, segment.height);
            }
        } else {
            rect(this.x, this.y, this.width, this.height);
        }
        pop();
    }
}
