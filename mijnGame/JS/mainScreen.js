

var l1Data;
var walls = [];
let yPacmanTextures = {};  
let rPacmanTextures = {};
let yPacX = 450;
let yPacY = 450;
let rPacX = 700;
let rPacY = 700;
let yPacLives = 3;
let rPacLives = 3;
let pacTextureIndex = 0; 
let animationCounter = 0; 
let animationDelay = 3;   
let healed_heart;
let broken_heart;


// [Up, Right, Down, Left]
let pacSpeeds = [25, 25, 25, 25];
let directions = ["up", "right", "down", "left"];
let yPacDirection = directions[1];  
let rPacDirection = directions[3];



function preload() {
    l1Data = loadJSON('assets/level/1.json');
    healed_heart = loadImage('assets/sprites/healed_heart.png');
    
    
    let colors = ["yellow","red"]; 

    for (let color of colors) {
        yPacmanTextures[color] = {}; 
        rPacmanTextures[color] = {};
        for (let dir of directions) {
            yPacmanTextures[color][dir] = [];
            rPacmanTextures[color][dir] = [];
            for (let i = 0; i < 3; i++) { 
                let texture = loadImage(`assets/sprites/pacman/${color}/${dir}-${i}.png`);
                yPacmanTextures[color][dir].push(texture);
                rPacmanTextures[color][dir].push(texture);
            }
        }
    }
}

function setup() {
    jsonDataToArray();
    createCanvas(windowWidth, windowHeight);
    textAlign(CENTER, CENTER);
    frameRate(10);  
}

function draw() {
    background(0);
    if (keyIsDown(13)){
        drawRoster(100,100);
    }


    

    movePacman();
    image(yPacmanTextures["yellow"][yPacDirection][pacTextureIndex], yPacX, yPacY);
    image(rPacmanTextures["red"][rPacDirection][pacTextureIndex], rPacX, rPacY);
    image(yPacmanTextures["yellow"][directions[1]][1], 15, 15);
    image(rPacmanTextures["red"][directions[1]][1], 165,15);
    
    drawHeart(25, 50);
    drawHeart(25, 200);
    

    push();
    for (var i = 0; i < walls.length; i++) {
        walls[i].draw();
    }
    pop();

    
}


function movePacman() {
    let newX = yPacX;
    let newY = yPacY;

    let moving = false;  

    if (keyIsDown(RIGHT_ARROW)) { 
        newX += pacSpeeds[1]; 
        yPacDirection = "right"; 
        moving = true;
    }
    if (keyIsDown(LEFT_ARROW)) { 
        newX -= pacSpeeds[3]; 
        yPacDirection = "left"; 
        moving = true;
    }
    if (keyIsDown(UP_ARROW)) { 
        newY -= pacSpeeds[0]; 
        yPacDirection = "up"; 
        moving = true;
    }
    if (keyIsDown(DOWN_ARROW)) { 
        newY += pacSpeeds[2]; 
        yPacDirection = "down"; 
        moving = true;
    }

    
    if (moving) {
        animationCounter++;
        if (animationCounter >= animationDelay) { 
            pacTextureIndex = (pacTextureIndex + 1) % 3; 
            animationCounter = 0; 
        }
    }

    if (!checkCollision(newX, newY)) {
        yPacX = constrain(newX, 0, windowWidth - 25);
        yPacY = constrain(newY, 0, windowHeight - 25);
    }

    
}

function checkCollision(x, y) {
    for (let wall of walls) {
        if (x + 25 > wall.x && x < wall.x + wall.wallWidth &&
            y + 25 > wall.y && y < wall.y + wall.wallHeight) {
            return true; 
        }
    }
    return false; 
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
    for (var i = 0; i < 3; i++) {
        image(healed_heart, i * x + offset, 17); // Adjust position dynamically
    }
}