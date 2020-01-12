var buttonColor = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userChosenColor;
var userClickedPattern = [];
var pressedKey = false;
var level = 1;

$("body").keydown(function() {
  if (pressedKey===false) {
    pressedkey = true;
    nextSequence();
  }
  else {
    level--;
  }
});


function nextSequence() {
  $("#level-title").text("Level " + level++);
  var randomNumber = Math.floor((Math.random()) * 4);
  var randomChosenColor = buttonColor[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
  playSound(gamePattern[gamePattern.length - 1]);
  return randomNumber;
}

$(".btn").click(function(event) {
  userChosenColor = event.target.id;
  userClickedPattern.push(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
  playSound(userChosenColor);
  animatePress(userChosenColor);
});

function playSound(color) {
  // switch (color) {
  //   case ("red"):
  //     var redSound = new Audio('sounds/red.mp3');
  //     redSound.play();
  //     break;
  //
  //   case ("blue"):
  //     var blueSound = new Audio('sounds/blue.mp3');
  //     blueSound.play();
  //     break;
  //
  //   case ("green"):
  //     var greenSound = new Audio('sounds/green.mp3');
  //     greenSound.play();
  //     break;
  //
  //   case ("yellow"):
  //     var yellowSound = new Audio('sounds/yellow.mp3');
  //     yellowSound.play();
  //     break;
  // }
  var audio = new Audio('sounds/' + color + '.mp3');
  audio.play();
}

function animatePress(color) {
  $("#" + color).addClass("pressed");
  setTimeout(function() {
    $("#" + color).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        userClickedPattern = [];
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("fail");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    setTimeout(function() {
      $("body").removeClass("game-over");
    },200);
    startOver();
  }
}

function startOver() {
  gamePattern=[];
  userClickedPattern=[];
  pressedKey=false;
  level=0;
}
