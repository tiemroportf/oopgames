let gui;
let start, controls;
var gameStarted = false;
var pacLives = 3;

var l1Data;
var walls = [];

let pacman;
let pacX = 450;
let pacY = 450;

// [North, East, South, West]
let pacSpeeds = [25,25,25,25];
let directions = ["North", "East", "South", "West"];
let pacDirection = "East";


//let btnFont;

function preload() {
    //btnFont = loadFont('../assets/PacfontGood-yYye.ttf');
    l1Data = loadJSON('assets/level/1.json');
    pacman = loadImage('assets/sprites/pacman/0.png');
}


function setup() {
    jsonDataToArray();
    
    
    createCanvas(windowWidth, windowHeight);
    
    textAlign(CENTER,CENTER);
    frameRate(10);
    

    gui = createGui();
   //initBtns();



}

function draw() {
    background(0);
    if (keyIsDown(13)){
        drawRoster(100,100);

    }
    image(pacman, pacX,pacY);
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

function drawRoster(columns) {

    
    for (var columns = 0;columns < width;columns += 25) {
        for (var rows = 0; rows < height; rows += 25) {
            stroke(75)
            strokeWeight(1);
            fill(0);
            rect(columns,rows,25,25);
        }
    }
    
    
}
function startGame() {
    start.visible = false;
    gameStarted = true;
   
    
    
}
function initBtns() {
    start = createButton("Start Game", width/2 -75, height / 2 -250);
    start.setStyle("fillBg", color('#2121DE'));
    start.setStyle("textSize", 18);
    start.setStyle("font", "System Bold");
    start.onPress = startGame;

}



