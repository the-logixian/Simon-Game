var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;
var started = false;

// Detect keypress to start the game
$(document).keypress(function() {
  if (!started) {
    $("h1").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// Add a separate reset function
function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  started = false;
}


function checkAnswer(currentLevel) {
    // Check if the most recent answer matches the game pattern
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");

    // Check if the user has completed the full sequence for this level
    if (userClickedPattern.length === gamePattern.length) {
      // Wait 1 second then advance to the next level
      setTimeout(function() {
        nextSequence();
      }, 1000);

      // Reset user input for the next round
      userClickedPattern = [];
    }

  } else {
    var wrongSound = new Audio("./sounds/wrong.mp3");
    wrongSound.play();

    // 2. Flash the game-over class on the body
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    // 3. Update the h1 message
    $("h1").text("Game Over, Press Any Key to Restart");

    startOver();
  }
}

$(".btn").click(function() {
    var userChosenColor = $(this).attr("id");

     userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);

    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
})



function nextSequence() {

    level++;
    $("h1").text("Level " + level);


    var randomNumber = Math.floor(Math.random() * 4);
    
    var randomChosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
        var activeKey = $("." + currentColor);

    activeKey.addClass("pressed");

    setTimeout(function() {
        activeKey.removeClass("pressed");
    }, 100);

}
