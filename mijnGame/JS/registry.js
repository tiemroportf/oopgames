function endGame() {
    let bothDead = Object.values(pacmen).every(pac => pac.lives === 0);
    let totalScore = Object.values(pacmen).reduce((sum, pac) => sum + pac.score, 0);

    if (bothDead) {
        
        
        noLoop(); 
        filter(BLUR, 5); 
        textSize(50);
        fill(255, 0, 0);
        textFont(font);
        text("GAME OVER", width / 2, height / 2);
        textSize(25);
        text("FINAL SCORE: " + totalScore, width/2, height / 2 + 40);


        let totalMilliseconds = elapsedTime;
        let minutes = floor(totalMilliseconds / 60000);
        let seconds = floor((totalMilliseconds % 60000) / 1000);
        let milliseconds = nf(totalMilliseconds % 1000, 3);
        let formattedMilliseconds = milliseconds.substring(0, 2); 

        text(`TIME SURVIVED: ${nf(minutes, 2)}:${nf(seconds, 2)}:${formattedMilliseconds}`, width / 2, height / 2 + 70);

        stopwatchRunning = false;
        
    }
}

function registerUI() {
    
    sbtn.setStyle("fillBg", color(255, 255, 0));
    sbtn.setStyle("font", font);
    

}

function startGame() {
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

    for (let color in pacmen) {
        drawPacman(color);
        movePacman(color);
    }

    for (let color in ghosts) {
        drawGhost(color);
        moveGhost(color);
    }
 
 


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
    

    if (stopwatchRunning) {
        elapsedTime = millis() - startTime;
    }

    push();
    walls.forEach(wall => wall.draw());
    pop();


    checkPacGhostCollision();
    endGame();
}