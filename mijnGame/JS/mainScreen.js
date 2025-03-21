let l1Data;
let walls = [];
let font;
let gui;
let sbtn, ebtn;

let startTime = 0;
let elapsedTime = 0;
let stopwatchRunning = false;

let gameStarted = false;

let maxPoints = 0;

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
        pacmanTextures[color]["death"] = Array.from({ length: 3 }, (_, i) => 
            loadImage(`assets/sprites/pacman/${color}/d-${i}.png`)
        );
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
    textFont(font);
    frameRate(10);  

    controls = {
        pacmen: {
            yellow: {up: 87, down: 83, left: 65, right: 68},
            red: {up: 73, down: 75, left: 74, right: 76} 
        },
        ghosts: {
            green: {up: 104, down: 101, left: 100, right: 102},
            orange: {up: UP_ARROW, down: DOWN_ARROW, left: LEFT_ARROW, right: RIGHT_ARROW}
        }
        
    }
    setupPoints();
    gui = createGui();
    gui.loadStyle("TerminalYellow");


    sbtn = createButton("Start Game", width / 2 - 130, height / 2, 200, 50);
    ebtn = createButton("End Game", width / 2 - 75, height / 2 + 90);
}

function draw() {
    background(0);
    if (keyIsDown(13)){
        drawRoster();
    }

    drawGui();
    registerUI();

    

    if (!gameStarted) {
        return;
    }else {
        startGame();
        startStopwatch();
    }
   
    for (let point in points) {
        
    }
    

}

function pacDeathAnim() {
    for (let pacColor in pacmen) {
        let pac = pacmen[color];
    }
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


function setupPoints() {
    for (let x = 75; x <= 1875; x += 25) {
        for (let y = 50; y <= windowHeight -25; y += 25) {
            if (validatePointPos(x, y)) { 
                points.push({ x: x + 12, y: y + 12, isCollected: false });
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



