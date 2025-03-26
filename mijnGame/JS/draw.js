function drawPacman(color) {
    let pac = pacmen[color];
    image(pacmanTextures[color][pac.direction][pac.textureIndex], pac.x, pac.y);
}

function drawGhost(color) {
    let ghost = ghosts[color];
    image(ghostTextures[color][ghost.direction][ghost.textureIndex], ghost.x, ghost.y);
}

function drawTelemetry() {

    let score = pacmen["yellow"].score + pacmen["red"].score;
    fill(255);
    textSize(40);
    text("Score: "  + score, width - 1175, 25);

    displayStopwatch();
}
function drawRoster(c, r) {
    for (var c = 0; c < width; c += 25) {
        for (var r = 0; r < height; r += 25) {
            push();
            stroke(75);
            strokeWeight(1);
            fill(0);
            rect(c, r, 25, 25);
            pop();
        }
    }
}

function drawHeart(x, offset) {
    for (let i = 0; i < 3; i++) {
        image(healed_heart, i * x + offset, 17);
    }
}

function drawPoints() {
    for (let point of points) {
        if (!point.isCollected) {
            fill(255, 255, 0); 
            ellipse(point.x, point.y, 5, 5); 
        }
    }
}

function drawLShapeWall(x, y, width, height, thickness, rotation = 0) {
    let wall = new Wall(x, y, width, height, true);

    switch (rotation % 360) {
        
        case 0 : 
            wall.addSegment(x, y, thickness, height);
            wall.addSegment(x, y + height - thickness, width, thickness);
            break;
        case 90: 
            wall.addSegment(x, y, thickness, height);
            wall.addSegment(x, y, width, thickness);
            break;
        case 180: 
            wall.addSegment(x + width - thickness, y, thickness, height);
            wall.addSegment(x,y, width, thickness);
            break;
        case 270: 
            wall.addSegment(x + width - thickness, y, thickness, height);
            wall.addSegment(x, y + height - thickness, width, thickness);
            break;
    }
    
    

    return wall;
}

function drawTShapeWall(x, y, width, height, thickness, rotation = 0) {
    let wall = new Wall(x, y, width, height, true);

    switch (rotation % 360) {
        case 0:   
            wall.addSegment(x, y, width, thickness);
            wall.addSegment(x + (width / 2) - (thickness / 2), y, thickness, height);
            break;
        case 90: 
            wall.addSegment(x, y, thickness, height);
            wall.addSegment(x, y + (height / 2) - (thickness / 2), width, thickness);
            break;
        case 180: 
            wall.addSegment(x, y + height - thickness, width, thickness);
            wall.addSegment(x + (width / 2) - (thickness / 2), y, thickness, height);
            break;
        case 270: 
            wall.addSegment(x + width - thickness, y, thickness, height);
            wall.addSegment(x, y + (height / 2) - (thickness / 2), width, thickness);
            break;
    }

    return wall;
}


function drawSquareWall(x, y, size) {
    return new Wall(x, y, size, size);
}

