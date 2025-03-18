/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
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


//up 38, down 40

  "UP": 73,
  "DOWN": 75,
}



function CreateItem(id, speedX, speedY){
  var obj = {
    id: id,
    x: parseFloat($(id).css("left")),
    y: parseFloat($(id).css("top")),
    speedX: speedX,
    speedY: speedY,
    width: $(id).width(),
    height: $(id).height(),
  }
  return obj
}

//randomNum = (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -1 : 1);
var paddleLeft =  CreateItem("#paddleLeft", 0, 0);
var paddleRight =  CreateItem("#paddleRight", 0, 0);
var ball = CreateItem("#ball", (Math.random() > 0.5 ? -3 : 3), (Math.random() > 0.5 ? -3 : 3))

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
    collideAction(paddleLeft)
    collideAction(paddleRight)


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

function wallCollisionP(obj){
  if(obj.x > BOARD_WIDTH - PADDLE_WIDTH || obj.x < 0){
    obj.x -= obj.speedX;
  }
  if(obj.y > BOARD_HEIGHT - PADDLE_HEIGHT || obj.y < 0){
    obj.y -= obj.speedY;
  }
}

function wallCollisionB(obj){
 /* if(obj.x > BOARD_WIDTH - BALL_WIDTH || obj.x < 0){
    obj.speedX = -obj.speedX;
  }

  */
  if(obj.y > BOARD_HEIGHT - BALL_WIDTH || obj.y < 0){
    obj.speedY = -obj.speedY 
  }
}

function gameReset (obj){
   if(obj.x > BOARD_WIDTH - BALL_WIDTH || obj.x < 0){
    obj.x -= obj.speedX; obj.y -= obj.speedY || alert("hit");
  }

  
}

//determine if objects collide


function doCollide(obj) {
  // TODO: calculate and store the remaining
  // sides of the obj1
  obj.leftX = obj.x;
  obj.topY = obj.y;
  obj.rightX = obj.x + obj.width; 
  obj.bottomY = obj.y + obj.height;
  
  /*
  // TODO: Do the same for obj2
  obj2.leftX = obj2.x;
  obj2.topY = obj2.y;
  obj2.rightX = obj2.x + obj2.width; 
  obj2.bottomY = obj2.y + obj2.height;

  // TODO: Return true if they are overlapping, false otherwise
if(
  obj2.rightX > obj1.leftX &&
  obj2.leftX < obj1.rightX &&
  obj2.bottomY > obj1.topY &&
  obj2.topY < obj1.bottomY 
  
 
  ){
    return true;
  } else {
    return false;
  }
  */

}  


function collideAction(paddleLeft, paddleRight){
  if(doCollide(paddleLeft, paddleRight, ball)){
    console.log("tagged");
    ball.speedX *= 1.5;
    ball.speedY *= 1.5;
  }
}

function moveGameItem(obj){
  obj.x += obj.speedX;
  obj.y += obj.speedY;
}
  
//check boundaries of paddles [CHECK]

//handle what happens if ball hits the walls
//handle what happens when ball hits paddles
//handle what happens when someone wins
//handles the points
//handles the game reset


  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
