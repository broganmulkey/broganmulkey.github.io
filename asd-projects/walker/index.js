/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  const BOARD_WIDTH = $("#board").width();
  const BOARD_HEIGHT = $("#board").height();
  const WALKER_WIDTH = $("#walker").width();
  const WALKER_HEIGHT = $("#walker").height();

  const KEY = {
    LEFT: 37,
    RIGHT: 39,
    UP: 38,
    DOWN: 40,

    A: 65,
    W: 87,
    D: 68,
    S: 83,
  }



  // Game Item Objects

  
  var walker = Walker("#walker",  0, 0, 0, 0, WALKER_WIDTH, WALKER_HEIGHT);
  var walker2 = Walker("#walker2",  BOARD_HEIGHT - WALKER_HEIGHT, BOARD_WIDTH - WALKER_WIDTH, 0, 0, WALKER_WIDTH, WALKER_HEIGHT);
  
  
  
  //{
  //  posX: BOARD_HEIGHT - WALKER_HEIGHT,
  //  posY: BOARD_WIDTH - WALKER_WIDTH,
  //  speedX: 0,
  //  speedY: 0,
  //  width: WALKER_WIDTH,
  //  height: WALKER_HEIGHT,
 // }







  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);  
  $(document).on('keyup', handleKeyUp);                          // change 'eventType' to the type of event you want to handle

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    repositionGameItem(walker);
    repositionGameItem(walker2);
    wallCollision(walker);
    wallCollision(walker2);
    redrawGameItem(walker);
    redrawGameItem(walker2);
    collideAction();
    
  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    if (event.which === KEY.LEFT) {
      walker.speedX = -5;
    }
    if (event.which === KEY.RIGHT) {
      walker.speedX = 5;
    }
    if (event.which === KEY.UP) {
      walker.speedY = -5;
    }
    if (event.which === KEY.DOWN) {
      walker.speedY = 5;
    }
  

  if (event.which === KEY.A) {
    walker2.speedX = -5;
  }
  if (event.which === KEY.D) {
    walker2.speedX = 5;
  }
  if (event.which === KEY.W) {
    walker2.speedY = -5;
  }
  if (event.which === KEY.S) {
    walker2.speedY = 5;
  }
}

  function handleKeyUp(event) {
    if (event.which === KEY.LEFT) {
      walker.speedX = 0;
    }
    if (event.which === KEY.RIGHT) {
      walker.speedX = 0;
    }
    if (event.which === KEY.UP) {
      walker.speedY = 0;
    }
    if (event.which === KEY.DOWN) {
      walker.speedY = 0;
    }

    if (event.which === KEY.A) {
      walker2.speedX = 0;
    }
    if (event.which === KEY.D) {
      walker2.speedX = 0;
    }
    if (event.which === KEY.W) {
      walker2.speedY = 0;
    }
    if (event.which === KEY.S) {
      walker2.speedY = 0;
    }
    
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  
  function doCollide(obj1, obj2) {
    // TODO: calculate and store the remaining
    // sides of the obj1
    obj1.leftX = obj1.posX;
    obj1.topY = obj1.posY;
    obj1.rightX = obj1.posX + obj1.width; 
    obj1.bottomY = obj1.posY + obj1.height;
    
    // TODO: Do the same for obj2
    obj2.leftX = obj2.posX;
    obj2.topY = obj2.posY;
    obj2.rightX = obj2.posX + obj2.width; 
    obj2.bottomY = obj2.posY + obj2.height;
  
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
		
}
function collideAction(){
  if(doCollide(walker,walker2)){
    console.log("tagged");
    walker.posX = 0;
    walker.posY = 0;
    walker2.posX = BOARD_WIDTH - WALKER_WIDTH;
    walker2. posY = BOARD_HEIGHT - WALKER_HEIGHT;
    alert("Tag You're It!");
  }
}

  function repositionGameItem(obj){
    obj.posX += obj.speedX;
    obj.posY += obj.speedY;
  }

  function redrawGameItem(obj){
    $(obj.id).css("left", obj.posX);
    $(obj.id).css("top", obj.posY);

  }

  function wallCollision(obj){
    if(obj.posX > BOARD_WIDTH - WALKER_WIDTH || obj.posX < 0){
      obj.posX -= obj.speedX;
    }
    if(obj.posY > BOARD_HEIGHT - WALKER_HEIGHT || obj.posY < 0){
      obj.posY -= obj.speedY;
    }

   
  }

  function Walker(id, posX, posY, speedX, speedY, width, height){
    let obj = {
      id: id,
      posX: posX,
      posY: posY,
      speedX: speedX,
      speedY: speedY,
      width: width,
      height: height,
    }
    return obj;
  }

  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
