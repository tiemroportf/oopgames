function validatePointPos(x, y) {
    let minX = 325, minY = 75;
    let maxX = 1575, maxY = windowHeight - 50;

    if (x < minX || x > maxX || y < minY || y > maxY) {
        return false; 
    }
    if ( (x <= 575 && x >= 500 &&  y <=  275  && y >= 200)) {
        return false;
    }

    for (let wall of walls) {
        if (wall.isSegmented && Array.isArray(wall.segments)) {
            for (let segment of wall.segments) {
                if (x >= segment.x && x < segment.x + segment.width &&
                    y >= segment.y && y < segment.y + segment.height) {
                    return false; 
                }
            }
        } else if (x >= wall.x && x < wall.x + wall.width && y >= wall.y && y < wall.y + wall.height) {
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