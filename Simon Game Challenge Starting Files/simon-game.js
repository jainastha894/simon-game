var buttonColours=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;
var started=false;

function nextSequence(){

    level++;

  //5. Inside nextSequence(), update the h1 with this change in the value of level.
  $("#level-title").text("Level " + level);
userClickedPattern=[];
  
    var randomNumber= Math.floor(Math.random()*4);
// randomNumber can choose numbers from 0 to 3 
  
    var randomChosenColor=buttonColours[randomNumber];
    gamePattern.push(randomChosenColor);
    console.log("gamepattern: "+gamePattern)

    animation(randomChosenColor);

    playSound(randomChosenColor);
    
   

}

$(".btn").click(function() {

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
  
    console.log("userclickedpattern: "+userClickedPattern)
    playSound(userChosenColour);
    animation(userChosenColour);
  
    //2. Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
    checkAnswer(userClickedPattern.length-1);
  });


function checkAnswer(currentLevel){
if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
    console.log("success");
    if(userClickedPattern.length===gamePattern.length){
        setTimeout(function(){
            nextSequence();
        },1000)
    }
}
else{
    console.log("wrong");
 
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
     
    },500)
    
    startOver();
}

}
function startOver(){
    started=false;
    
    $("h1").text(" game over press any key to restart");
    
    level=0;
    gamePattern=[];
    userClickedPattern=[];
}

function playSound(randomChosenColor1){
    var audio = new Audio("sounds/" + randomChosenColor1 + ".mp3");
    audio.play();
}
function animation(currentColor){
    $('#'+currentColor).addClass("pressed");
    setTimeout(function(){
        $('#'+currentColor).removeClass("pressed");
    },100)
}

$(document).keydown(function(){
    if(!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started=true;

    }

})



