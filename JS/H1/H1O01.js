function setup() {
  canvas = createCanvas(1000, 450);
  background('grey');
  canvas.parent('processing');
  
  noLoop();
}

function draw() {
  // groene cirkel zonder rand
  
  noStroke();
  fill('green');
  ellipse(250, 250 ,300);
  
  // witte rechthoek met rode rand
  
  stroke('red');
  fill('white');
  strokeWeight(10);
  rect(650,100,250,300);  
}

