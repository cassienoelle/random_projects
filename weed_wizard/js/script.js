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
var drugsWidth = 75;
var drugsHeight = drugsWidth;
var drugsMin = 75;
var drugsMax = 150;
// How much bigger the drugs gets with each successful dodge
var drugsWidthIncrease = 5;

// The speed and velocity of our drugs
var drugsSpeed = 5;
var drugsVX = 5;
// How much faster the drugs gets with each successful dodge
var drugsSpeedIncrease = 0.5;

// The larper image
var larper;

// The position of the drugs
var larperX;
var larperY;
// The size of the drugs, aspect ratio maintained
var larperWidth = 150;
var larperHeight = larperWidth;
// How much bigger the drugs gets with each successful dodge
var larperWidthIncrease = 5;

// The speed and velocity of our drugs
var larperSpeed = 7;
var larperVY = 7;
// How much faster the drugs gets with each successful dodge
var larperSpeedIncrease = 0.5;

// Second level drugs image
var drugsLevelUp;

// How many points the player has made
var points = 0;

// How many dodges
var dodges = 0;

// youLose
var lose;
var loseText;

//running
var running = true;

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
  drugs = loadImage("assets/images/weed.png");
  // Load the second level drugs image, pills
  drugsLevelUp = loadImage("assets/images/pill.png")
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

  // Put the larper to the top at a random x coordinate
  larperX = random(0,width);
  larperY = 0;

  // Style text and display at bottom right of canvas
  fill(255);
  textFont(khandFont);
  textSize(60);
  textAlign(RIGHT, BOTTOM);
  textX = width - 10;
  textY = height;
}

// draw()
//
// Handle moving the avatar and drugs and checking for points and
// game over situations.
function draw() {

  gameRunning();

}

function gameRunning() {
  if (running === true) {

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


      // Move the avatar according to its calculated velocity
      avatarX = avatarX + avatarVX;
      avatarY = avatarY + avatarVY;

      // The drugs always moves at drugsSpeed (which increases)
      drugsVX = drugsSpeed;
      // Update the drugs's position based on its velocity
      drugsX = drugsX + drugsVX;

      // The larper always moves at larperSpeed (which increases)
      larperVY = larperSpeed;
      // Update the larper's position based on its velocity
      larperY = larperY + larperVY;


      // Text to display successful points on canvas using correct grammar
        if (points === 1) {
          // Singular if 1 dodge
          text(points + " POINT!", textX, textY);
        }
        else {
          // Plural if zero or multiple points
          text(points + " POINTS!", textX, textY);
        }


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
        drugsWidth = random(drugsMin, drugsMax);
        drugsHeight = drugsWidth;
        drugsSpeed = 5;
        // Reset the avatar's position
        //avatarX = width/2;
        //avatarY = height/2;
      }



      // Check if the avatar has gone off the screen (cheating!)
      if (avatarX < 0 || avatarX > width || avatarY < 0 || avatarY > height) {
        // If they went off the screen they lose in the same way as above.
        console.log("YOU LOSE!");
        lose = true;
        youLose();
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

      // Check if the larper has moved all the way across the screen
      if (larperY > height) {
        // Reset the larper's position to the left at a random height
        larperY = 0;
        larperX = random(0,width);
        // Increase the larper's speed and size to make the game harder
        larperSpeed = larperSpeed + larperSpeedIncrease;
        larperWidth = larperWidth + larperWidthIncrease;
        larperHeight = larperWidth;
      }


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

      // Display the drugs
      if (points >= 10) {
        drugsMin = 50;
        drugsMax = 75;
        drugs = drugsLevelUp;
      }
      image(drugs, drugsX, drugsY, drugsWidth, drugsHeight);

      // Display the larper
      image(larper, larperX, larperY, larperWidth, larperHeight);

      // Display our avatar
      image(avatar, avatarX, avatarY, avatarWidth, avatarHeight);
  }

  // Check if the larper and avatar overlap - if they do the wizard loses
  // We do this by checking if the distance between the centre of the drugs
  // and the centre of the avatar is less that their combined radii
  if (dist(larperX,larperY,avatarX,avatarY) < larperWidth/2 + avatarWidth/2) {
    // Tell the player they lost
    console.log("YOU LOSE!");
    // Reset the game
    lose = true;
    youLose();
  }
}

function youLose() {
  if (lose === true) {
    running = false;
    noTint();
    background(0);
    drugsSpeed = 0;
    larperSpeed = 0;
    textSize(60);
    fill(255);
    textAlign(CENTER);
    text("GAME OVER \n click to play again", width/2, height/2);
    // update dodges counter
    dodges = dodges + 1;
    points = 0;
    // Reset the avatar's position
    avatarX = width/2;
    avatarY = height/2;
    // Reset the larper's position
    larperX = 0;
    larperY = random(0,width);
    // Reset the larper's size and speed
    larperWidth = 150;
    larperHeight = larperWidth;
    larperSpeed = 10;
    drugsX = 0;
    drugsY = random(0,height);
    drugsWidth = drugsMin;
    drugsHeight = drugsWidth;
    drugsSpeed = 5;
  }
  else if (lose === false) {
    fill(255);
    textFont(khandFont);
    textSize(60);
    textAlign(RIGHT, BOTTOM);
    textX = width - 10;
    textY = height;
    running = true;
  }
}

  function mouseClicked() {
    console.log("running");
    lose = false;
    fill(255);
    textFont(khandFont);
    textSize(60);
    textAlign(RIGHT, BOTTOM);
    textX = width - 10;
    textY = height;
    running = true;
  }
