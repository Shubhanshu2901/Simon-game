var gamePattern = [];
var userClickedPattern = [];
var level = 0;

var buttonColors = ["red","blue","green","yellow"];

$(".btn").click(function (){
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  console.log(userClickedPattern);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});

$(document).keydown(function(){
  if(level == 0)
  {
    $("h1").text("level " + level);
    nextSequence();
  }
});

function playSound(name){
  var audio = new Audio(name + ".mp3");
  audio.play();
}

function nextSequence(){
  level++;
  $("h1").text("level " + level);
  var nextNumber = Math.floor(Math.random()*4);

  var chosenColor =  buttonColors[nextNumber];
  gamePattern.push(chosenColor);
  console.log(gamePattern);
  colorClass = "#" + chosenColor;
  $(colorClass).fadeOut(100).fadeIn(100);
  playSound(chosenColor);

}

function checkAnswer(index){
  if(gamePattern[index] === userClickedPattern[index])
  {
    if(gamePattern.length === userClickedPattern.length)
    {
      setTimeout(function(){nextSequence();}, 1000);
      userClickedPattern = [];
    }
  }
  else
  {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){$("body").removeClass("game-over");}, 200);
    userClickedPattern = [];
    gamePattern = [];
    level = 0;
    $("h1").text("game over, press any key to restart");
  }
}

function animatePress(color){
  $('#' + color).addClass('pressed');
  setTimeout(function(){$('#' + color).removeClass('pressed');}, 100);
}
