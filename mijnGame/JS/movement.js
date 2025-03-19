function checkPacGhostCollision() {
    for (let pacColor in pacmen) {
        let pac = pacmen[pacColor];
        for (let ghostColor in ghosts) {
            let ghost = ghosts[ghostColor];
            let now = millis();

            if (!pac.lastHitTime[ghostColor]) pac.lastHitTime[ghostColor] = 0;

            let touching = dist(pac.x, pac.y, ghost.x, ghost.y) < 25;

            if (touching && now - pac.lastHitTime[ghostColor] > 1000) {
                pac.lastHitTime[ghostColor] = now;
                decreaseLives(pacColor);
            }
        }
    }
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






function checkCollision(x, y) {
    
    return walls.some(wall => 
        x + 25 > wall.x && x < wall.x + wall.wallWidth &&
        y + 25 > wall.y && y < wall.y + wall.wallHeight
    ); 
}