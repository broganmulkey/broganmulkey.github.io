/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  


let scoreLeft = 0;
let scoreRight = 0;
const WINNING_SCORE = 1;

function runProgram(){
  updateScore();
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  const FRAME_RATE = 60;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  const BOARD_WIDTH = $("#board").width()
  const BOARD_HEIGHT = $("#board").height()
  const PADDLE_WIDTH = $("#paddleLeft").width();
  const PADDLE_HEIGHT = $("#paddleLeft").height();
  const BALL_WIDTH = $("#ball").width();



  // Game Item Objects
const KEY = {
  "W": 87,
  "S": 83,


//normal keycodes for arrows
"UP": 38,
"DOWN": 40,

//Keycodes for I and K for braydon keyboard
/*
  "UP": 73,
  "DOWN": 75,
  */
}



function CreateItem(id, speedX, speedY){
  return {
    id: id,
    x: parseFloat($(id).css("left")),
    y: parseFloat($(id).css("top")),
    speedX: speedX,
    speedY: speedY,
    width: $(id).width(),
    height: $(id).height(),
  };
}

//randomNum = (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -1 : 1);
var scoreBoard = CreateItem("#scoreBoard",0,0);
var paddleLeft =  CreateItem("#paddleLeft", 0, 0);
var paddleRight =  CreateItem("#paddleRight", 0, 0);

var ball = CreateItem("#ball", (Math.random() > 0.5 ? -3 : 3), (Math.random() > 0.5 ? -3 : 3));
  ball.x = BOARD_WIDTH / 2 - BALL_WIDTH / 2; // Set ball starting position to center
  ball.y = BOARD_HEIGHT / 2 - BALL_WIDTH / 2;

  // one-time setup
  
  
  let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);
     // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keyup', handleKeyUp);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    drawGameItem(paddleLeft)
    drawGameItem(paddleRight)
    drawGameItem(ball)
    moveGameItem(paddleLeft)
    moveGameItem(paddleRight)
    moveGameItem(ball)
    wallCollisionP(paddleLeft);//:3
    wallCollisionP(paddleRight);//:3
    wallCollisionB(ball);//:3
    gameReset(ball);
    paddleCollisions(ball)
    checkBoundaries(ball)
  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    if(event.which === KEY.W){
      paddleLeft.speedY = -5;
    }
    if(event.which === KEY.S){
      paddleLeft.speedY = 5;
    }
    if(event.which === KEY.UP){
      paddleRight.speedY = -5;
    }
    if(event.which === KEY.DOWN){
      paddleRight.speedY = 5;
    }
  }



  function handleKeyUp(event){
    if(event.which === KEY.W || event.which === KEY.S){
      paddleLeft.speedY = 0;
    }
    if(event.which === KEY.UP || event.which === KEY.DOWN){
      paddleRight.speedY = 0;
    }
  }
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

// Movement Helpers
function drawGameItem(obj){
  $(obj.id).css("left", obj.x);
  $(obj.id).css("top", obj.y);

}

//handles what happens if paddle hits wall
function wallCollisionP(obj){
  obj.y = Math.max(0, Math.min(obj.y, BOARD_HEIGHT - PADDLE_HEIGHT));
}


//handles what happens if ball hits wall

function wallCollisionB(obj){

  if(obj.y > BOARD_HEIGHT - BALL_WIDTH || obj.y < 0){
    obj.speedY = -obj.speedY;
  }
}

//handle what happens when ball hits paddles
function paddleCollisions(obj){
  if (
    obj.x <= paddleLeft.x + paddleLeft.width && 
    obj.y + obj.height >= paddleLeft.y && 
    obj.y <= paddleLeft.y + paddleLeft.height &&
    obj.speedX < 0
  ) {
    obj.speedX = -obj.speedX * 1.2;
  }
  
  if (
    obj.x + obj.width >= paddleRight.x && 
    obj.y + obj.height >= paddleRight.y && 
    obj.y <= paddleRight.y + paddleRight.height &&
    obj.speedX > 0
  ) {
    obj.speedX = -obj.speedX * 1.2;
  }
}


function moveGameItem(obj){
  obj.x += obj.speedX;
  obj.y += obj.speedY;
}
  
//check boundaries of paddles [CHECK]
function checkBoundaries(obj){
  if(obj.x > BOARD_WIDTH - obj.width || obj.x < 0){
    obj.x = BOARD_WIDTH/2 - obj.width/2;
  }
}



function updateScore(){
  $("#scoreLeft").text(scoreLeft);
  $("#scoreRight").text(scoreRight);

}

function checkWin(){
  if (scoreLeft >= WINNING_SCORE){
    endGame("Player 1 Wins!");
  } else if (scoreRight >= WINNING_SCORE){
    endGame("Player 2 Wins!");
  }
}



function gameReset (obj){
  if(obj.x > BOARD_WIDTH - BALL_WIDTH) {
    scoreLeft++;
    updateScore();
    checkWin();
  } else if (obj.x < 0){
    scoreRight++;
    updateScore();
    checkWin();
  } else {
    return;
  }

  if(scoreLeft < WINNING_SCORE && scoreRight < WINNING_SCORE) {
    obj.x = BOARD_WIDTH / 2 - BALL_WIDTH / 2 ; 
    obj.y = BOARD_HEIGHT / 2 - BALL_WIDTH / 2 ; 

    obj.speedX = (Math.random() > 0.5 ? -3 : 3) * (Math.random() * 0.5 + 1);
    obj.speedY = (Math.random() > 0.5 ? -3 : 3) * (Math.random() * 0.5 + 1);
  }
}
//function to end the game

  function endGame(winnerText) {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  
    $("#winnerText").text(winnerText);
    $("#winnerBox").css("display", "block");

    // Play Again button action
    $("#playAgainBtn").click(function() {
      location.reload(); 
    });
  }
}
