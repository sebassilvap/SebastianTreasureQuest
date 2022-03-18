//alert('testing that the js file works!'); // testing
// *************************************************************************************************************************



// *************************************************************************************************************************
// -------------------------------------- VARIABLES FOR THE SYSTEM --------------------------------------
// *************************************************************************************************************************

// Array of Button Colours
var buttonColours = ["red", "blue", "green", "yellow"];

// Empty Array --> gamePattern
var gamePattern = [];

// Empty Array --> User Clicked Patern
var userClickedPattern = [];

// boolean variable to know if the game has started or not
var started = false;

// int variable to track the current level
var level = 0;



// *************************************************************************************************************************
// -------------------------------------- JQUERY EXPRESSIONS FOR THE SYSTEM --------------------------------------
// *************************************************************************************************************************

// jQuery for clicking the anchor tag "here"
// -----------------------------------------
$('a').click(function () {
  if (started === false) {
    showCurrentLevel();
    nextSequence();
    started = true;
  }
});

// jQuery for keypressing - the 1st time call nextSequence()
// ---------------------------------------------------------
$(document).keypress(function() {
  if (started === false) {
    // h1 starts with: "PRESS ANY KEY TO START PLAYING" || then it changes to: "LEVEL 0, LEVEL 1, ETC..."
    showCurrentLevel();
    nextSequence();
    started = true;
  }
}); // END JQUERY


// jQuery to detect if a button is pressed + Handler Function
// ----------------------------------------------------------
$(".btn").click(function() {
  if (started === true) {
    // save the id of the button, which was pressed
    var userChosenColour = $(this).attr("id");

    // save this variable in the array: userClickedPattern
    userClickedPattern.push(userChosenColour);
    //console.log(userClickedPattern); --> just to verify the creation of the pattern on the console

    // play a sound after the user makes a click
    playSound(userChosenColour);

    // animate the button after being pressed
    animatePress(userChosenColour);

    // call checkAnswer with the index of the last answer in the user's sequence as the input
    checkAnswer(userClickedPattern.length - 1);
  } else {
    // small animation to remind the user to press a key before to start!
    playSound("wrong");
    $("body").addClass("game-over");
    showAlert();
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 800);
  }
}); // END JQUERY




// *************************************************************************************************************************
// -------------------------------------- FUNCTIONS FOR THE SYSTEM --------------------------------------
// *************************************************************************************************************************


// Function to create a random number from 0 till 3
// -------------------------------------------------
function nextSequence() {
  userClickedPattern = []; // reset this when I pass to other level
  level++; // every time this function is called the level is increased
  showCurrentLevel();
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  // Use jQuery to select the button with the same id as the randomChosenColour
  // Use Google/Stackoverflow to figure out how you can use jQuery to animate a flash to the button selected in step 1.
  $("#" + randomChosenColour).fadeIn(150).fadeOut(150).fadeIn(150);

  // play the sound in the random pattern generation
  playSound(randomChosenColour)

}


// Function --> playSound, given as input the name of the colour
// -------------------------------------------------------------
function playSound(name) {
  // Use Google/Stackoverflow to figure out how you can use Javascript to play the sound for the button colour selected in step 1.
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


// Function --> animatePress, it makes an animation when I click a button
// ----------------------------------------------------------------------
function animatePress(currentColor) {
  // jQuery to add the class ".pressed" to the button that gets clicked
  $("#" + currentColor).addClass("pressed");

  // Remove the class ".pressed" after 100 milliseconds
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100); // the 2nd parameter is the time for the animation
}


// Function --> checkAnswer, takes as input the current level
// ----------------------------------------------------------
function checkAnswer(currentLevel) {

  // if statement to check if the most recent user answer is the same as the game pattern
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    playSound("wrong"); // play a sound when I make a mistake on the game

    // add an animation when I make game over / make a mistake on the game
    $("body").addClass("game-over");

    // show game over on the screen
    showGameOver();

    // display the class "game-over" on the screen for 200 ms.
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 800);

    // restart the game!
    startOver();
  }
}


// Function --> startOver(), after game over to restart the game
// -------------------------------------------------------------
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}



// *************************************************************************************************************************
// ------------------------------------- FUNCTIONS FOR DISPLAYING MESSAGES TO THE USER -------------------------------------
// *************************************************************************************************************************

// Function --> showCurrentLevel, it shows the level of difficulty (on the screen)
// -------------------------------------------------------------------------------
function showCurrentLevel() {
  $("#level-title").text("LEVEL " + level);
}


// Function --> showGameOver, it shows a game over screen
// ------------------------------------------------------
function showGameOver() {
  $("#level-title").html("GAME OVER, PRESS ANY KEY TO RESTART! 😥 OR CLICK <a href='#'>HERE</a>");
  $('a').click(function () {
    if (started === false) {
      showCurrentLevel();
      nextSequence();
      started = true;
    }
  });
}


// Function --> showAlert, it shows an alert when I try to start playing without pressing a key
// --------------------------------------------------------------------------------------------
function showAlert () {
  $("#level-title").html("PLEASE PRESS FIRST ANY KEY TO START 🐣😛 OR CLICK <a href='#'>HERE</a>");
  $('a').click(function () {
    if (started === false) {
      showCurrentLevel();
      nextSequence();
      started = true;
    }
  });
}
