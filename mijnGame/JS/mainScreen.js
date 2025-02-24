var l1Data;
var walls = [];

let pacmanTextures = {};  
let healed_heart;
let broken_heart;
let animationDelay= 3;


let pacSpeeds = {up: 25, right: 25, down: 25, left: 25};
let directions = ["up", "right", "down", "left"];

let pacmen = {
    yellow: {x: 450 ,y: 450, lives: 3, textureIndex: 0, animationCounter: 0,  direction: directions[1]},
    red: {x: 700, y: 700, lives: 3, textureIndex: 0, animationCounter: 0,  direction: directions[3]}
}
let controls = {};

function preload() {
    l1Data = loadJSON('assets/level/1.json');
    healed_heart = loadImage('assets/sprites/healed_heart.png');
    
    
    

    let colors = ["yellow", "red"];
    for (let color of colors) {
        pacmanTextures[color] = {};
        for (let dir of directions) {
            pacmanTextures[color][dir] = Array.from({ length: 3 }, (_, i) => 
                loadImage(`assets/sprites/pacman/${color}/${dir}-${i}.png`)
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
        yellow: {up: 87, down: 83, left: 65, right: 68},
        red: {up: UP_ARROW, down: DOWN_ARROW, left: LEFT_ARROW, right: RIGHT_ARROW}
    }
}

function draw() {
    background(0);
    if (keyIsDown(13)){
        drawRoster(100,100);
    }


    movePacman("yellow");
    movePacman("red");

    drawPacman("yellow");
    drawPacman("red");

    let iconsX = [20, 170]; 
    let iconsY = 17;  
    let colors = ["yellow", "red"];

    for (let i = 0; i < colors.length; i++) {
        let color = colors[i];
        image(pacmanTextures[color]["right"][pacmen[color].textureIndex], iconsX[i], iconsY);
    }


    drawHeart(25, 50);
    drawHeart(25, 200);
    

    push();
    walls.forEach(wall => wall.draw());
    pop();

    
}

function movePacman(color) {

    if (pacmen[color] == null) { 
        console.log("Color doesn't exist!!!")
        return;
    }
    let pac = pacmen[color];
    let control = controls[color];
    let newX = pac.x, newY = pac.y;
    let moving = false; 

    for (let dir of directions) {
        if (keyIsDown(control[dir])){
            if (dir == "up") newY -= pacSpeeds[dir];
            if (dir == "down") newY += pacSpeeds[dir]; 
            if (dir == "left") newX -= pacSpeeds[dir];
            if (dir == "right") newX += pacSpeeds[dir];
            pac.direction = dir;
            moving = true;
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
    
}

function drawPacman(color) {
    let pac = pacmen[color];
    image(pacmanTextures[color][pac.direction][pac.textureIndex], pac.x, pac.y);
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