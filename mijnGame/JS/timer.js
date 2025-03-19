function startStopwatch() {
    if (!stopwatchRunning) {
        startTime = millis();
        stopwatchRunning = true;
    }
}



function displayStopwatch() {
    let totalMilliseconds = elapsedTime;
    let minutes = floor(totalMilliseconds / 60000); 
    let seconds = floor((totalMilliseconds % 60000) / 1000); 

    let milliseconds = nf(totalMilliseconds % 1000, 3); 
    let formattedMilliseconds = milliseconds.substring(0, 2); 

    fill(255);
    textSize(40);
    textFont(font);
    text(`Time survived: ${nf(minutes, 2)}:${nf(seconds, 2)}:${formattedMilliseconds}`, width - 800, 25);

    
}