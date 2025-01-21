let gui;
let start, controls;
var gameStarted = false;
var pacLives = 3;

var l1Data;
var walls = [];
var rosterEnabled = true;


//let btnFont;

function preload() {
    //btnFont = loadFont('../assets/PacfontGood-yYye.ttf');
    l1Data = loadJSON('assets/level/1.json');
}


function setup() {
    jsonDataToArray();
    createCanvas(windowWidth, windowHeight);
    textSize(40);
    textAlign(CENTER,CENTER);
    frameRate(144);
    

    gui = createGui();
   //initBtns();
    

}

function draw() {
    background(0);
    if (keyIsDown(13)){
        drawRoster(100,100);

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
    start.setStyle("font", "System Bold")
    start.onPress = startGame;

}

