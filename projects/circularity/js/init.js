var init = function (window) {
    'use strict';
    var 
        draw = window.opspark.draw,
        physikz = window.opspark.racket.physikz,
        
        app = window.opspark.makeApp(),
        canvas = app.canvas, 
        view = app.view,
        fps = draw.fps('#000');
        
    
    window.opspark.makeGame = function() {
        
        window.opspark.game = {};
        var game = window.opspark.game;
        
        ////////////////////////////////////////////////////////////
        ///////////////// PROGRAM SETUP ////////////////////////////
        ////////////////////////////////////////////////////////////
        
        // TODO 1 : Declare and initialize our variables
        var circle;       // variable to hold a single circle when creating circles / iterating
        var circles = [];  // variable to store all circles in one Array
        
        // TODO 2 : Create a function that draws a circle 
        function drawCircle() {           // Code to draw a circle
        circle = draw.randomCircleInArea(canvas, true, true, '#999', 2);    //calls a function from the draw library and then uses draw.randomCircleInArea to give a random size color and location to the circle
        physikz.addRandomVelocity(circle, canvas);                          //stores the output of the function in circle/ uses physikz library to then add a random velocity and direction to our circle 
        view.addChild(circle);                                              //adds the circle as a child of view (we did that in the first week)
        circles.push(circle);                                               //saves the circle into the array by using the .push method 
        }   

        // TODO 3 / 7 : Call the drawCircle() function 
       for (var loopsCompleted = 0; loopsCompleted <1000; loopsCompleted++) {           //loop that starts at 0 circles and stops when 1000 circles have been made
        drawCircle();                                                                   //the function call that draws the circle in the loop

       }

        ////////////////////////////////////////////////////////////
        ///////////////// PROGRAM LOGIC ////////////////////////////
        ////////////////////////////////////////////////////////////
        
        /* 
        This Function is called 60 times/second producing 60 frames/second.
        In each frame, for every circle, it should redraw that circle
        and check to see if it has drifted off the screen.         
        */
        function update() {
            // TODO 4 : Update the circle's position //
            
            //repetitive code added to loop through hardcoded index values in todo 8

            // TODO 5 / 10 : Call game.checkCirclePosition() on your circles.
            
            //repetitive code added to loop through hardcoded index values in todo 8

            // TODO 8 : Iterate over the array
            for (var i = 0; i < circles.length; i++) {    //for loop that starts at 0 and stops when the entire circle array is completed
                var eachCircle = circles[i];              //makes sure that each circle follows the for loop
                physikz.updatePosition(eachCircle)        //calling the function that updates the position of the circle 
                game.checkCirclePosition(eachCircle)      //calling the function that checks the position of each circle 
            }
          
        }
    
        /* 
        This Function should check the position of a circle that is passed to the 
        Function. If that circle drifts off the screen, this Function should move
        it to the opposite side of the screen.
        */
        game.checkCirclePosition = function(circle) {           //function that checks the position of the circle

            // if the circle has gone past the RIGHT side of the screen then place it on the LEFT
            if ( circle.x > canvas.width ) {
                circle.x = 0;
            }
            
            // TODO 6 : YOUR CODE STARTS HERE //////////////////////
            if ( circle.x < 0) {               // This If statement sees if circle.x is off the left side of the screen 
                circle.x = canvas.width;       // if it is then it sets it to the right side of the screen 
            }                                  // 
            if ( circle.y < 0) {               // This If statement checks if the circle goes past the top of the screen 
                circle.y = canvas.height;      // if it does then it gets transported to the bottom of the screen 
            }                                  // 
            if ( circle.y > canvas.height) {   // This if statement checks if the circle goes past the bottom of the screen 
                circle.y = 0;                  // if it is then it sets the circle to the top of the screen 
            }                                  //

            // YOUR TODO 6 CODE ENDS HERE //////////////////////////
        }
        
        /////////////////////////////////////////////////////////////
        // --- NO CODE BELOW HERE  --- DO NOT REMOVE THIS CODE --- //
        /////////////////////////////////////////////////////////////
        
        view.addChild(fps);
        app.addUpdateable(fps);
        
        game.circle = circle;
        game.circles = circles;
        game.drawCircle = drawCircle;
        game.update = update;
        
        app.addUpdateable(window.opspark.game);
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = init;
}
