var buttonColors=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;
var started=false;

$(document).keypress(function() {
if (!started) {
      $(".level-title").text("Level " + level);

  nextSequence();
started=true;
}
});


$(".btn").click(function(){

  var userChosenColor=$(this).attr("id");//name of the corresponding id
    userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);

});

function startOver(){
  started=false;
  gamePattern=[];
  level=0;
}


function nextSequence(){
  userClickedPattern = [];

  level++;
  $(".level-title").text("Level "+level);
  var randomNumber=Math.floor(Math.random()*4);
  var randomChosenColor=buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  animatePress(randomChosenColor);
    playSound(randomChosenColor);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

}

function playSound(name){
  var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}

 function animatePress(name){
   $("#"+name).fadeOut(100);
   $("#"+name).addClass("pressed");
$("#"+name).fadeIn(100);
setTimeout(() => {    $("#"+name).removeClass("pressed")
 ; }, 100);
 }


function checkAnswer(currentLevel){
if (gamePattern[currentLevel]===userClickedPattern[currentLevel]) {

  if (userClickedPattern.length === gamePattern.length){

        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);
}
}else{
  var audio=new Audio("sounds/wrong.mp3");
  audio.play();
  $("body").addClass("game-over");

  setTimeout(function(){
    $("body").removeClass("game-over");

  },100);
  $(".level-title").text("Game Over, Press Any Key to Restart.");

startOver();

}

}
