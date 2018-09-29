/*********************************************************

Weed Wizard

A psychedelic birthday game
Inspired by Huntress Manwitch

*********************************************************/
// The background image
var backgroundImage;

// The avatar image
var avatar;

// The position of our avatar
var avatarX;
var avatarY;

// The size of our avatar, aspect ratio maintained
var avatarWidth = 150;
var avatarHeight = avatarWidth * (760/600);
// How much bigger or smaller the avatar gets with each successful dodge
var avatarWidthChange;

// The speed and velocity of our avatar
var avatarSpeed = 10;
var avatarVX = 0;
var avatarVY = 0;
// How much faster or slower the avatar gets with each successful dodge
var avatarSpeedChange;

// Values to change tint of avatar
var red;
var green;
var blue;
var choices = [125, 255];

// The drugs image
var drugs;

// The position of the drugs
var drugsX;
var drugsY;
// The size of the drugs, aspect ratio maintained
var drugsWidth = 50;
var drugsHeight = drugsWidth;
// How much bigger the drugs gets with each successful dodge
var drugsWidthIncrease = 5;

// The speed and velocity of our drugs
var drugsSpeed = 5;
var drugsVX = 5;
// How much faster the drugs gets with each successful dodge
var drugsSpeedIncrease = 0.5;

// How many points the player has made
var points = 0;

// In case of emergency: shrink drugs
var shrink;
// Limit to one use per game play
var shrinkUsed;

// Custom font, Khand SemiBold
var khandFont;
// Current positon of text
var textX;
var textY;

// preload()
//
// Load the font we're using before the program starts
function preload() {
  // Load Khand-SemiBold font
  khandFont = loadFont("assets/fonts/Khand-SemiBold.ttf");
  // Load the background, image of a forest
  backgroundImage = loadImage("assets/images/forest.jpg");
  // Load the drugs, an image of a marijuana leaf
  drugs = loadImage("assets/images/pill.png");
  // Load our avatar, an image of a wizard
  avatar = loadImage("assets/images/wizard.png");
  // Load the larper image
  larper = loadImage("assets/images/larper.png");

}

// setup()
//
// Make the canvas, position the avatar and drugs, add text to track points
function setup() {
  // Create our playing area
  createCanvas(1000,1000);

  // Put the avatar in the centre
  avatarX = width/2;
  avatarY = height/2;

  // Put the drugs to the left at a random y coordinate within the canvas
  drugsX = 0;
  drugsY = random(0,height);

  // Style text and display at bottom right of canvas
  fill(255);
  textFont(khandFont);
  textSize(32);
  textAlign(RIGHT, BOTTOM);
  textX = width - 10;
  textY = height;
}

// draw()
//
// Handle moving the avatar and drugs and checking for points and
// game over situations.
function draw() {

  // Display background
  imageMode(CENTER);
  image(backgroundImage, width/2, height/2);

  // Default the avatar's velocity to 0 in case no key is pressed this frame
  avatarVX = 0;
  avatarVY = 0;

  // Check which keys are down
  // Set the avatar's velocity based on its speed appropriately

  // Left and right
  if (keyIsDown(LEFT_ARROW)) {
    avatarVX = -avatarSpeed;
  }
  else if (keyIsDown(RIGHT_ARROW)) {
    avatarVX = avatarSpeed;
  }

  // Up and down (separate if-statements so you can move vertically and
  // horizontally at the same time)
  if (keyIsDown(UP_ARROW)) {
    avatarVY = -avatarSpeed;
  }
  else if (keyIsDown(DOWN_ARROW)) {
    avatarVY = avatarSpeed;
  }

  // Check for additional keyboard commands from player
  // Shrink drugs when space bar typed
    keyTyped();

  // Move the avatar according to its calculated velocity
  avatarX = avatarX + avatarVX;
  avatarY = avatarY + avatarVY;

  // The drugs always moves at drugsSpeed (which increases)
  drugsVX = drugsSpeed;
  // Update the drugs's position based on its velocity
  drugsX = drugsX + drugsVX;

  // Check if the drugs and avatar overlap - if they do the wizard gains a point
  // We do this by checking if the distance between the centre of the drugs
  // and the centre of the avatar is less that their combined radii
  if (dist(drugsX,drugsY,avatarX,avatarY) < drugsWidth/2 + avatarWidth/2) {
    // Tell the player they lost
    console.log("POINT!");
    // update points counter
    points = points + 1;
    // Reset the drugs's position
    drugsX = 0;
    drugsY = random(0,height);
    // Reset the drugs's size and speed
    drugsWidth = 50;
    drugsHeight = drugsWidth;
    drugsSpeed = 5;
    // Reset the avatar's position
    //avatarX = width/2;
    //avatarY = height/2;
    // Reset the emergency shrink button
    shrinkUsed = false;
  }

  // Check if the avatar has gone off the screen (cheating!)
  if (avatarX < 0 || avatarX > width || avatarY < 0 || avatarY > height) {
    // If they went off the screen they lose in the same way as above.
    console.log("YOU LOSE!");
    drugsX = 0;
    drugsY = random(0,height);
    drugsWidth = 50;
    drugsHeight = drugsWidth;
    drugsSpeed = 5;
    avatarX = width/2;
    avatarY = height/2;
    points = 0;
    shrinkUsed = false;
  }

  // Check if the drugs has moved all the way across the screen
  if (drugsX > width) {
    // Reset the drugs's position to the left at a random height
    drugsX = 0;
    drugsY = random(0,height);
    // Increase the drugs's speed and size to make the game harder
    drugsSpeed = drugsSpeed + drugsSpeedIncrease;
    drugsWidth = drugsWidth + drugsWidthIncrease;
    drugsHeight = drugsWidth;
  }

  // Text to display successful points on canvas using correct grammar
  if (points === 1) {
    // Singular if 1 dodge
    text(points + " POINT!", textX, textY);
  }
  else {
    // Plural if zero or multiple points
    text(points + " POINTS!", textX, textY);
  }

  // Display the drugs
  image(drugs, drugsX, drugsY, drugsWidth, drugsHeight);

  // Change tint every 5 framess
  if (frameCount % 5 === 1) {
    red = random(choices);
    blue = random(choices);
    green = random(choices);
    if (red === 125 && green === 125) {
      blue = 255;
    }
    tint(red, green, blue);
    console.log(red + " " + green + " " + blue);
  }

  // Display our avatar
  image(avatar, avatarX, avatarY, avatarWidth, avatarHeight);

}

// keyTyped()
//
// Handles additional keyboard commands from player
// Emergency shrink command
function keyTyped() {
  // If space bar pressed and emergency shrink not used, shrink avatar
  // Works once per game play
  if (keyCode === 32 && shrinkUsed === false) {
    drugsWidth = 50;
    drugsHeight = drugsWidth;
    shrinkUsed = true;
    console.log("SHRUNK!");
  }

}
