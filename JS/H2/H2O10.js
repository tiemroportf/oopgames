var animatie = [];
var aantalBeeldjes = 6;
var nummer = 0;

function preload() {
  for (var b = 0;b < aantalBeeldjes;b++) {
    nieuw_beeldje = loadImage("images/sprites/Jos_losse_beeldjes/Jos-" + b +".png");
    animatie.push(nieuw_beeldje);
  }
}

function setup() {
  canvas = createCanvas(460,460);
  canvas.parent('processing');
  noStroke();
  frameRate(5);
  textFont("Georgia");
  textSize(18);
}

function draw() {
  background('lavender');
  image(animatie[nummer],0,0);
  nummer++;

  if (nummer == animatie.length) {
    nummer = 0;
  }
  
  text("frameCount=" + frameCount,5,20);
  text("nummer=" + nummer,5,40);
}