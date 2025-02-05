var pacLives = 3;

var l1Data;
var walls = [];

let pacmanTextures = [];
let pacX = 450;
let pacY = 450;

// [Up, Right, Down, Left]
let pacSpeeds = [25,25,25,25];
let directions = ["up", "right", "down", "left"];
let pacDirection = directions[3];



function preload() {
    l1Data = loadJSON('assets/level/1.json');
    pacmanTextures = loadImage('assets/sprites/pacman/' + directions[3] +'.png');
}


function setup() {
    jsonDataToArray();
    createCanvas(windowWidth, windowHeight);
    textAlign(CENTER,CENTER);
    frameRate(10);
}

function draw() {
    background(0);
    
    if (keyIsDown(13)){
        drawRoster(100,100);

    }
    image(pacmanTextures, pacX,pacY);
    pacX = constrain(pacX, 0, windowWidth - 25);
    pacY = constrain(pacY, 0, windowHeight - 25);

    if (keyIsDown(RIGHT_ARROW)) {
        pacX +=pacSpeeds[1]; 
        walls.forEach((wall) => {
            let wx = wall.x;
            let wy = wall.y;
            let ww = wall.wallWidth;
            let wh = wall.wallHeight;

                        
    
            if (pacX + 25 > wx && pacX < wx + ww && pacY + 25 > wy && pacY < wy + wh) {
                pacX -= pacSpeeds[1]; // Move Pac-Man back
            }
        });

        if (pacX > 1825) {
            pacX = 75;
        }

    }
    if (keyIsDown(LEFT_ARROW)) {
        pacX -=pacSpeeds[3];  
        walls.forEach((wall) => {
            let wx = wall.x;
            let wy = wall.y;
            let ww = wall.wallWidth;
            let wh = wall.wallHeight;
    
            if (pacX < wx + ww && pacX + 25 > wx && pacY + 25 > wy && pacY < wy + wh) {
                pacX += pacSpeeds[3]; // Move Pac-Man back if a collision occurs
            }
        });

        if (pacX < 75 ) {
            pacX = 1825;
        }
        
        
    }
    if (keyIsDown(UP_ARROW)) {
        pacY -=pacSpeeds[0];  
        walls.forEach((wall) => {
            let wx = wall.x;
            let wy = wall.y;
            let ww = wall.wallWidth;
            let wh = wall.wallHeight;
    
            if (pacX + 25 > wx && pacX < wx + ww && pacY < wy + wh && pacY + 25 > wy) {
                pacY += pacSpeeds[0]; // Move Pac-Man back if a collision occurs
            }
        });
    }
    if (keyIsDown(DOWN_ARROW)) { 
        pacY +=pacSpeeds[2]; 
        walls.forEach((wall) => {
            let wx = wall.x;
            let wy = wall.y;
            let ww = wall.wallWidth;
            let wh = wall.wallHeight;
    

            if (pacX + 25 > wx && pacX < wx + ww && pacY + 25 > wy && pacY < wy + wh) {
                pacY -= pacSpeeds[2]; // Move Pac-Man back if a collision occurs
            }
        });
    
    
    }

    
    


    
    push();
    for (var i = 0; i < walls.length; i++) {
        walls[i].teken();
    }
    pop();
   

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

function drawRoster(columns, rows) {
    for (var columns = 0;columns < width;columns += 25) {
        for (var rows = 0; rows < height; rows += 25) {

            push();
            stroke(75)
            strokeWeight(1);
            fill(0);
            rect(columns,rows,25,25);
            pop();

            
        }
        
    }
}






