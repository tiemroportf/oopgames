var l1Data;
var walls = [];
var font;

let pacmanTextures = {};  
let ghostTextures = {};
let healed_heart;
let broken_heart;
let animationDelay = 3;


let pacSpeeds = {up: 25, right: 25, down: 25, left: 25};
let ghostSpeeds = {up: 25, right: 25, down: 25, left: 25};

let directions = ["up", "right", "down", "left"];

let pacmen = {
    yellow: {x: 450 ,y: 450, score: 0, lives: 3, textureIndex: 0, animationCounter: 0,  direction: directions[1], lastHitTime: {}, canMove: true},
    red: {x: 700, y: 700, score: 0,lives: 3, textureIndex: 0, animationCounter: 0,  direction: directions[3], lastHitTime: {}, canMove: true}
};

let ghosts =  {
    green: {x: 1000, y: 500, lives: 100, textureIndex: 0, animationCounter: 0, direction: directions[0]},
    orange: {x: 1050, y: 500, lives: 100, textureIndex: 0, animationCounter: 0, direction: directions[0]}
};
let controls = {};
let points = [];

function preload() {
    l1Data = loadJSON('assets/level/1.json');
    healed_heart = loadImage('assets/sprites/healed_heart.png');
    font = loadFont('assets/font/Minecraft.ttf');
    

    let pacColors = ["yellow", "red"];
    for (let color of pacColors) {
        pacmanTextures[color] = {};
        for (let dir of directions) {
            pacmanTextures[color][dir] = Array.from({ length: 3 }, (_, i) => 
                loadImage(`assets/sprites/pacman/${color}/${dir}-${i}.png`)
            );
           
        }
    }

    let ghostColors = ["orange", "green"];
    for (let color of ghostColors) {
        ghostTextures[color] = {};
        for (let dir of directions) {

            
             
            ghostTextures[color][dir] = Array.from( {length: 1 }, (_, i) => 
               loadImage(`assets/sprites/ghosts/${color}/${dir}-${i}.png`)
            );
            
        }
    }
}

function setup() {
    jsonDataToArray();
    createCanvas(windowWidth, windowHeight);
    textAlign(CENTER, CENTER);
    frameRate(10);  

    controls = {
        pacmen: {
            yellow: {up: 87, down: 83, left: 65, right: 68},
            red: {up: UP_ARROW, down: DOWN_ARROW, left: LEFT_ARROW, right: RIGHT_ARROW} 
        },
        ghosts: {
            green: {up: 104, down: 98, left: 100, right: 102},
            orange: {up: 73, down: 75, left: 74, right: 76}
        }
        
    }
    setupPoints();

}

function draw() {

    background(0);
    if (keyIsDown(13)){
        drawRoster();
    }
    drawScore();


    if (keyIsDown(79)) {
        for (let color in pacmen) {

            let pac = pacmen[color];

            if (pac.lives < 0){
                return console.error("Error: Lives can't be less or than zero!!");
            }
            decreaseLives(color);
            
        }
        console.log(pacmen["yellow"].lives);
        console.log(pacmen["red"].lives);
    }
    
    drawPoints();
 
    drawPacman("yellow");
    drawPacman("red");

    drawGhost("green");
    drawGhost("orange");

    movePacman("yellow");
    movePacman("red");

    moveGhost("green");
    moveGhost("orange");


    let iconsX = [20, 170]; 
    let iconsY = 17;  
    let colors = ["yellow", "red"];

    for (let i = 0; i < colors.length; i++) {
        let color = colors[i];
        image(pacmanTextures[color]["right"][pacmen[color].textureIndex], iconsX[i], iconsY);
    }

    for (let color in pacmen) {
        let pac = pacmen[color]; 
        let startX = (color === "red") ? 200 : 50; 
    
        for (let i = 0; i < pac.lives; i++) {
            let heartX = startX + (i * 30); 
            image(healed_heart, heartX, 17); 
        }
    }
    

    

    push();
    walls.forEach(wall => wall.draw());
    pop();

    endGame();
}

function movePacman(color) {
    if (pacmen[color] == null) { 
        console.log("Color doesn't exist!!!")
        return;
    }

    let pac = pacmen[color];
    let type = "pacmen";
    let control = controls[type][color];
    let newX = pac.x, newY = pac.y;
    let moving = false; 

    for (let dir of directions) {
        let key = control[dir];
        
        if (keyIsDown(key) && ![98, 100, 102, 104].includes(key) && pac.canMove) {
            if (dir == "up") newY -= pacSpeeds[dir];
            if (dir == "down") newY += pacSpeeds[dir]; 
            if (dir == "left") newX -= pacSpeeds[dir];
            if (dir == "right") newX += pacSpeeds[dir];
            pac.direction = dir;
            moving = true;
        }

        if (pac.lives === 0) {
            pac.canMove = false;
        }
    }

    if (moving) {
        pac.animationCounter = (pac.animationCounter + 1) % animationDelay;
        if (pac.animationCounter == 0) {
            pac.textureIndex = (pac.textureIndex + 1) % 3;
        }
    }

    if (!checkCollision(newX, newY)) {
        pac.x = constrain(newX, 0, windowWidth - 25);
        pac.y = constrain(newY, 0, windowHeight - 25);

        
    }

    if (pac.x < 75) pac.x = 1825;
    if (pac.x > 1825){
        pac.x = 75;
    }

    for (let ghostColor in ghosts) {
        let ghost = ghosts[ghostColor];
        let now = millis(); // Get current time

        if (!pac.lastHitTime[ghostColor]) pac.lastHitTime[ghostColor] = 0;

        let touching = dist(pac.x, pac.y, ghost.x, ghost.y) < 25;
        
        if (touching && now - pac.lastHitTime[ghostColor] > 1000) {
            pac.lastHitTime[ghostColor] = now;
            decreaseLives(color);
        }
    }

    
    
}

function moveGhost(color) {
    if (ghosts[color] == null) { 
        return console.log("Color doesn't exist!!!");
    }

    
    let ghost = ghosts[color];
    let type = "ghosts";
    let control = controls[type][color];
    let newX = ghost.x, newY = ghost.y;
    let moving = false; 

    for (let dir of directions) {
        let key = control[dir];
        if (keyIsDown(key) && ![UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW].includes(key)) {
            if (dir == "up") newY -= ghostSpeeds[dir];
            if (dir == "down") newY += ghostSpeeds[dir]; 
            if (dir == "left") newX -= ghostSpeeds[dir];
            if (dir == "right") newX += ghostSpeeds[dir];
            ghost.direction = dir;
            moving = true;
        }
    }

    

    if (!checkCollision(newX, newY)) {
        ghost.x = constrain(newX, 0, windowWidth - 25);
        ghost.y = constrain(newY, 0, windowHeight - 25);
    }

    validatePointCollection();
}

function drawPacman(color) {
    let pac = pacmen[color];
    image(pacmanTextures[color][pac.direction][pac.textureIndex], pac.x, pac.y);
}

function drawGhost(color) {
    let ghost = ghosts[color];
    image(ghostTextures[color][ghost.direction][ghost.textureIndex], ghost.x, ghost.y);
}

function drawScore() {

    let score = pacmen["yellow"].score + pacmen["red"].score;
    text("Score: "  + score, 1000, 25);
}




function checkCollision(x, y) {
    
    return walls.some(wall => 
        x + 25 > wall.x && x < wall.x + wall.wallWidth &&
        y + 25 > wall.y && y < wall.y + wall.wallHeight
    ); 
}

function jsonDataToArray() {
    var wall,x,y,wallWidth, wallHeight;
    var wallData = l1Data['walls'];
    for (var i = 0; i < wallData.length; i++) {
        wall = wallData[i];
        x = wall['location']['x'];
        y = wall['location']['y'];
        wallWidth = wall['width'];
        wallHeight = wall['height'];
        walls.push(new Wall(x, y, wallWidth, wallHeight));
    }
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
            fill(255, 255, 0); // Yellow points
            ellipse(point.x, point.y, 5, 5); // Small dot centered in grid
        }
    }
}

function setupPoints() {
    for (let x = 75; x <= 1875; x += 25) {
        for (let y = 50; y <= windowHeight -25; y += 25) {
            if (validatePointPos(x, y)) { // Only draw if it's a valid spot
                points.push({ x: x + 12, y: y + 12, isCollected: false });
            }
        }
    }
}

function validatePointPos(x, y) {
    // Define map boundaries
    let minX = 75, minY = 50;
    let maxX = windowWidth - 75, maxY = windowHeight - 25;

    // Check if outside the map
    if (x < minX || x > maxX || y < minY || y > maxY) {
        return false; 
    }

    

    // Check if it's inside a wall
    for (let wall of walls) {
        if (
            x >= wall.x && x < wall.x + wall.wallWidth &&
            y >= wall.y && y < wall.y + wall.wallHeight
        ) {
            return false; // The position is inside a wall
        }
    }

    return true; // The position is valid
}

function validatePointCollection() {
    let pacColors = ["yellow", "red"];
    for (let color of pacColors) {
        let pac = pacmen[color]
        for (let point of points) {
            if (!point.isCollected && dist(pac.x, pac.y, point.x, point.y) < 25) {
                point.isCollected = true;
                pac.score += 10;
            

            }
        }
    }
    
}

function decreaseLives(color) {

    let pac = pacmen[color];
    if (pac.lives > 0) {
        pac.lives--;
    }


}

function endGame() {
    let bothDead = Object.values(pacmen).every(pac => pac.lives === 0);

    if (bothDead) {
        
        
        noLoop(); // Stops the draw loop, freezing the game
        filter(BLUR, 5); // Apply blur effect when both Pacmen are dead
        textSize(50);
        fill(255, 0, 0);
        textFont(font);
        text("GAME OVER", width / 2, height / 2);
        textSize(35);
        text("FINAL SCORE: ", width/2, height / 2 + 40);
    }
}







