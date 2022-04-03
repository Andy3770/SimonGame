var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var startGame = false;

$(document).keypress(function(){
  if (!startGame) {
    $("#level-title").text("Level " + level);
    nextSequence();
    startGame = true;
  }
});

$(".btn").click(function(){
  var userChosenColour =  $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
      console.log(userClickedPattern);
      console.log(gamePattern);
      console.log("Success");
      if(userClickedPattern.length === gamePattern.length){
        setTimeout(function(){
          nextSequence();

        }, 1000);
      }

    }

    else {
      console.log("wrong");
      var wrong = $("body").addClass("game-over");

      playSound("wrong");
      setTimeout(function(){
        wrong.removeClass("game-over");

      }, 200);

      $("h1").text("Game Over, Press Any key to restart");

      startOver();

    }

}

function nextSequence() {

  userClickedPattern = []; //empty the array
  level++; //increase the level for every nextSequence call

  $("#level-title").text("Level " + level);

  var randomNo = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNo];
  gamePattern.push(randomChosenColour);
  //console.log(gamePattern);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

}

function playSound(name) {

  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  var activeColour = $("#" + currentColour).addClass("pressed");

  setTimeout(function(){
    activeColour.removeClass("pressed");

  }, 100);
}

function startOver() {
    level = 0;
    gamePattern = [];
    startGame = false;
}
