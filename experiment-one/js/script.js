/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/

var ship = {
  angle: 0,
  speed: 0,
  x: 0,
  y: 0,
}
function setup() {
  createCanvas(500,500);
  ship.x = width/2;
  ship.y = height/2;
}
function draw() {
  handleInput();
  moveShip();
  drawShip();
}
function handleInput() {
  if (keyIsDown(LEFT_ARROW)) {
    ship.angle -= 0.1;
  }
  else if (keyIsDown(RIGHT_ARROW)) {
    ship.angle += 0.1;
  }
  if (keyIsDown(UP_ARROW)) {
    ship.speed = 5;
  }
  else if (keyIsDown(DOWN_ARROW)) {
    ship.speed = 0;
  }
}
function moveShip() {
  // The magic lines for calculating velocity!
  var vx = ship.speed * cos(ship.angle);
  var vy = ship.speed * sin(ship.angle);
  ship.x += vx;
  ship.y += vy;
}
function drawShip() {
  push();
  translate(ship.x,ship.y);
  rotate(ship.angle);
  ellipse(0,0,25,25);
  line(0,0,25,0);
  pop();
}




/*
var x1 = 0;
var x2 = 532;
var x3 = 1388;
var y1 = 0.01;
var y2;
var y3 = 1.0;


function preload() {

}
/////
function setup() {
  createCanvas(windowWidth,windowHeight);
}
/////
function draw() {
  background(255);
  textSize(30);
  fill(0);
  text("x1: " + x1,100,100);
  push()
  fill(255,0,0);
  text("x2: " + x2,100,150);
  pop();
  text("x3: " + x3,100,200);
  text("y1: " + y1,100,300);
  push();
  fill(255,0,0);
  text("y2: " + y2,100,350);
  pop();
  text("y3: " + y3,100,400);

  y2 = map(x2,x1,x3,y1,y3,true);

}*/
