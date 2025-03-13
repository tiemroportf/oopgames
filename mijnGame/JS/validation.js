function validatePointPos(x, y) {
    let minX = 75, minY = 50;
    let maxX = windowWidth - 75, maxY = windowHeight - 50;

    if (x < minX || x > maxX || y < minY || y > maxY) {
        return false; 
    }

    for (let wall of walls) {
        if (x >= wall.x && x < wall.x + wall.wallWidth && y >= wall.y && y < wall.y + wall.wallHeight) {
            return false; 
        }
    }

    return true; 
}

function validatePointCollection() {
    let pacColors = ["yellow", "red"];
    
    for (let color of pacColors) {

        let pac = pacmen[color];
        let pacCenterX = pac.x + 12.5; 
        let pacCenterY = pac.y + 12.5;

        for (let point of points) {
            if (!point.isCollected && dist(pacCenterX, pacCenterY, point.x, point.y) < 8) {
                point.isCollected = true;
                pac.score += 10;
                break; 
            }
        }
    }
}