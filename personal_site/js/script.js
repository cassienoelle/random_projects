//---------------comments------------------
//
//
//
//-----------------------------------------

var canvas;

// covers the site content
var contentCover;
// The color of the content cover [R,G,B]
var coverColor = [
  255,
  110,
  37
];
var coverAlpha = 255;

// preload()
//
//
function preload() {

}

// setup()
//
//
function setup() {
  createCanvas(windowWidth,windowHeight);

}

// draw()
//
//
function draw() {
  background(0);
  drawCover();

}

// drawCover()
//
// Draws content cover as rows of squares (pixels)
// forming one solid rectangle
function drawCover() {
  var size = 20;
  var x = 0;
  var y = 0;
  var numSquares = width / size; // total squares per row
  var numRows = height / size; // total rows of squares
  var s; // counter for number of squares
  var r; // counter for number of rows

  // Draw rows of squares until canvas is covered
  for (r = 0; r <= numRows; r++) {
    // Fill each row with alternating colored squares
    for (s = 0; s <= numSquares; s++) {
      noStroke();
      fill(coverColor[0],coverColor[1],coverColor[2]);
      rect(x,y,size,size);
      x += size;
    }
    // Reset x position and move down to y position of next row
    y += size;
    x = 0;
  }
}

// pixelateCover()
//
// pixelation animation that erases content cover
// and reveals content behind
function pixelateCover() {

}
