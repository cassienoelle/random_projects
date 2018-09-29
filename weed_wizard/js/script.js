/*********************************************************

Weed Wizard

A psychedelic birthday game
Inspired by Huntress Manwitch

*********************************************************/

// The avatar image
var avatar;

// The position of our avatar
var avatarX;
var avatarY;

// The size of our avatar, aspect ratio maintained
var avatarWidth = 50;
var avatarHeight = avatarWidth * (600/400);
// How much bigger or smaller the avatar gets with each successful dodge
var avatarWidthChange;

// The speed and velocity of our avatar
var avatarSpeed = 10;
var avatarVX = 0;
var avatarVY = 0;
// How much faster or slower the avatar gets with each successful dodge
var avatarSpeedChange;

// The enemy image
var enemy;

// The position of the enemy
var enemyX;
var enemyY;
// The size of the enemy, aspect ratio maintained
var enemyWidth = 75;
var enemyHeight = enemyWidth * (275/400);
// How much bigger the enemy gets with each successful dodge
var enemyWidthIncrease = 5;

// The speed and velocity of our enemy
var enemySpeed = 5;
var enemyVX = 5;
// How much faster the enemy gets with each successful dodge
var enemySpeedIncrease = 0.5;

// How many dodges the player has made
var dodges = 0;

// In case of emergency: shrink enemy
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
  // Load the enemy, an image of a human brain
  enemy = loadImage("assets/images/brain.png");
  // Load our avatar, an image of a human heart
  avatar = loadImage("assets/images/heart.png");
}

// setup()
//
// Make the canvas, position the avatar and enemy, add text to track dodges
function setup() {
  // Create our playing area
  createCanvas(500,500);

  // Put the avatar in the centre
  avatarX = width/2;
  avatarY = height/2;

  // Put the enemy to the left at a random y coordinate within the canvas
  enemyX = 0;
  enemyY = random(0,height);

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
// Handle moving the avatar and enemy and checking for dodges and
// game over situations.
function draw() {
  // A black background that pulses white every 1.8 seconds
  // If emergency shrink used, background turns purple
  if (frameCount % (60 * 1.8) === 1) {
    background(255);
  } else if (shrinkUsed === true) {
    background(75,0,130);
  } else {
    background(0);
  }

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
  // Shrink enemy when space bar typed
    keyTyped();

  // Move the avatar according to its calculated velocity
  avatarX = avatarX + avatarVX;
  avatarY = avatarY + avatarVY;

  // The enemy always moves at enemySpeed (which increases)
  enemyVX = enemySpeed;
  // Update the enemy's position based on its velocity
  enemyX = enemyX + enemyVX;

  // Check if the enemy and avatar overlap - if they do the player loses
  // We do this by checking if the distance between the centre of the enemy
  // and the centre of the avatar is less that their combined radii
  if (dist(enemyX,enemyY,avatarX,avatarY) < enemyWidth/2 + avatarWidth/2) {
    // Tell the player they lost
    console.log("YOU LOSE!");
    // Reset the enemy's position
    enemyX = 0;
    enemyY = random(0,height);
    // Reset the enemy's size and speed
    enemyWidth = 75;
    enemyHeight = enemyWidth * (275/400);
    enemySpeed = 5;
    // Reset the avatar's position
    avatarX = width/2;
    avatarY = height/2;
    // Reset the avatar's size and speed
    avatarWidth = 50;
    avatarHeight = avatarWidth * (600/400);
    avatarSpeed = 10;
    // Reset the dodge counter
    dodges = 0;
    // Reset the emergency shrink button
    shrinkUsed = false;
  }

  // Check if the avatar has gone off the screen (cheating!)
  if (avatarX < 0 || avatarX > width || avatarY < 0 || avatarY > height) {
    // If they went off the screen they lose in the same way as above.
    console.log("YOU LOSE!");
    enemyX = 0;
    enemyY = random(0,height);
    enemyWidth = 75;
    enemyHeight = enemyWidth * (275/400);
    enemySpeed = 5;
    avatarX = width/2;
    avatarY = height/2;
    avatarWidth = 50;
    avatarHeight = avatarWidth * (600/400);
    avatarSpeed = 10;
    dodges = 0;
    shrinkUsed = false;
  }

  // Check if the enemy has moved all the way across the screen
  if (enemyX > width) {
    // This means the player dodged so update its dodge statistic
    dodges = dodges + 1;
    // Tell them how many dodges they have made in console
    //console.log(dodges + " DODGES!");
    // Reset the enemy's position to the left at a random height
    enemyX = 0;
    enemyY = random(0,height);
    // Increase the enemy's speed and size to make the game harder
    enemySpeed = enemySpeed + enemySpeedIncrease;
    enemyWidth = enemyWidth + enemyWidthIncrease;
    enemyHeight = enemyWidth * (275/400);
    // Change the avatar's speed by a random amount
    // Speed must remain above 0
    avatarSpeedChange =  random(-0.5, 0.5);
    if (avatarSpeed + avatarSpeedChange > 0) {
      avatarSpeed += avatarSpeedChange;
      console.log("speed = " + avatarSpeed);
    }
    // Change the avatar's size by a random amount
    // Size must remain above 0
    avatarWidthChange = random(-5, 5);
    if (avatarWidth + avatarWidthChange > 0) {
      avatarWidth += avatarWidthChange;
      avatarHeight = avatarWidth * (600/400);
      console.log("width = " + avatarWidth);
    }
  }

  // Text to display successful dodges on canvas using correct grammar
  if (dodges === 1) {
    // Singular if 1 dodge
    text(dodges + " DODGE!", textX, textY);
  }
  else {
    // Plural if zero or multiple dodges
    text(dodges + " DODGES!", textX, textY);
  }

  // Display our avatar
  image(avatar, avatarX, avatarY, avatarWidth, avatarHeight);

  // Display the enemy
  image(enemy, enemyX, enemyY, enemyWidth, enemyHeight);

}

// keyTyped()
//
// Handles additional keyboard commands from player
// Emergency shrink command
function keyTyped() {
  // If space bar pressed and emergency shrink not used, shrink avatar
  // Works once per game play
  if (keyCode === 32 && shrinkUsed === false) {
    enemyWidth = 50;
    enemyHeight = enemyWidth * (275/400);
    shrinkUsed = true;
    console.log("SHRUNK!");
  }

}
