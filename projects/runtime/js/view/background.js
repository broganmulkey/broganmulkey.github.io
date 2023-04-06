var background = function (window) {
    'use strict';
    
    window.opspark = window.opspark || {};
    var draw = window.opspark.draw;
    var createjs = window.createjs;
    
    /*
     * Create a background view for our game application
     */
    window.opspark.makeBackground = function(app,ground) {
        /* Error Checking - DO NOT DELETE */
        if(!app) {
            throw new Error("Invalid app argument");
        }
        if(!ground || typeof(ground.y) == 'undefined') {
            throw new Error("Invalid ground argument");
        }
        
        // useful variables
        var canvasWidth = app.canvas.width;
        var canvasHeight = app.canvas.height;
        var groundY = ground.y;
        
        // container which will be returned
        var background;
        
        // ANIMATION VARIABLES HERE:
        var foregroundTrees = [];
        var bigTrees = [];
        var stars = ["img/star1.png", "img/star2.png", "img/star3.png", "img/star4.png", "img/star5.png"] //array that holds stars

        window.stars = stars;
        // called at the start of game and whenever the page is resized
        // add objects for display in background. draws each image added to the background once


        function render() {
            background.removeAllChildren();

            // TODO: 2 - Part 2
            // this fills the background with a obnoxious yellow
            // you should modify this to suit your game
            var ctx = canvas.getContext("2d"); 
            var grd = ctx.createLinearGradient(0,canvasHeight,0,0);
            grd.addColorStop(0.26, "#ffffff");
            grd.addColorStop(0.3,"#C724B1");
            grd.addColorStop(1,"#000000"); 
            grd.addColorStop(0.1,"#000000");
            var backgroundFill = draw.rect(canvasWidth, groundY, grd);
            background.addChild(backgroundFill);
            //thanks Tony
            
            // TODO: 3 - Add a moon and starfield
            
            //loop that draws stars
            /*
            for(var i = 0; i < 30; i++){ 
                var circle = draw.circle(10, "white", "LightGray", 2); // draws a circle and stores it in the circle variable
                circle.x = canvasWidth * Math.random(); // takes the width of the canvas then multiplies it by a random decimal and makes that the x value
                circle.y = groundY * Math.random(); // takes groundY and multiplies i times by a random decimal and makes that the y value
                background.addChild(circle); // adds that circle to the background as a child
            }
            */

            //you need to add comments to lines 31, 60 - 70, and 134 - 138
            for (var i = 0; i < 100; i++){
                var rand = getRandomInt(0, 4);
                var randX = getRandomInt(-100, canvasWidth);
                var randY = getRandomInt(-100, groundY - 150);
                var star = draw.bitmap(stars[rand]);
                star.x = randX;
                star.y = randY;
                star.scaleX = 0.20;
                star.scaleY = 0.20;
                background.addChild(star);
            }

       

            var moon = draw.bitmap("img/moon.png"); // draws the image as a bitmap and stores it to the variable moon
            moon.x = canvasWidth - 350; //creates an x key for the moon object and assigns it a value of 300
            moon.y = groundY - 700;; //creates an y key for the moon object and assigns it a value of 200
            moon.scaleX = 1; // scale the x value of the moon
            moon.scaleY = 1; // scale the y value of the moon
            background.addChild(moon); // add the moon as a child to background
            
            // TODO 5: Part 1 - Add bigTrees!     Q: This is before TODO 4 for a reason! Why?
          // var bigTreeHeights = [480, 650, 650, 650, 650, 650, 650, 650, 650, 650, 650, 650, 650, 650, 650]; //created an array of bigTree heights and stores them as heights for the bigTree 
           // var bigTreeColors = [ "black" , "blue", "grey", "orange", "red"] //created an array of bigTree colors and stores them as colors for the bigTree 
            //loop that will create the bigTrees
            
            for (var i = 0; i < 10; i++) {
                var bigTreeHeight = 470;  // creates a variable called bigTreeHeight and stores 300 as the height of the bigTree
                var bigTree = draw.bitmap("img/backgroundTree.png");// draws a rectangle and stores it in the variable bigTree
                bigTree.x = 200 * i * getRandomInt(1, 5); //multiplies 200 times the current iteration of the loop so that the bigTrees are 200 pixles apart and stores it as the x value of bigTree
                bigTree.y = groundY - bigTreeHeight; // subtracts bigTree height from groundY and sets it as the Y value
                background.addChild(bigTree); // adds the builing as a child to background
                bigTrees.push(bigTree); //adds the bigTrees to the bigTrees array
              }

              for (var i = 0; i < 10; i++) {
                var bigTreeHeight = 330;  // creates a variable called bigTreeHeight and stores 300 as the height of the bigTree
                var bigTree = draw.bitmap("img/backgroundTree.png");// draws a rectangle and stores it in the variable bigTree
                bigTree.x = 270 * i * getRandomInt(1, 5); //multiplies 200 times the current iteration of the loop so that the bigTrees are 200 pixles apart and stores it as the x value of bigTree
                bigTree.y = groundY - bigTreeHeight; // subtracts bigTree height from groundY and sets it as the Y value
                bigTree.scaleX = 0.7
                bigTree.scaleY = 0.7
                background.addChild(bigTree); // adds the builing as a child to background
                bigTrees.push(bigTree); //adds the bigTrees to the bigTrees array
              }
             
            // TODO 4: Part 1 - Add a forgroundtree
          
            for (var i = 0; i < 6; i++){
                var treeHeight = 470;  // creates a variable called bigTreeHeight and stores 300 as the height of the bigTree
                var tree = draw.bitmap("img/backgroundTree.png");// draws a rectangle and stores it in the variable bigTree
                tree.x = 200 * i * getRandomInt(1, 5); //multiplies 200 times the current iteration of the loop so that the bigTrees are 200 pixles apart and stores it as the x value of bigTree
                tree.y = groundY - treeHeight; // subtracts Tree height from groundY and sets it as the Y value
                background.addChild(tree); // adds the builing as a child to background
                foregroundTrees.push(tree); //adds the Trees to the bigTrees array
                console.log(foregroundTrees)
            }
        } // end of render function - DO NOT DELETE
        
        
        // Perform background animation
        // called on each timer "tick" - 60 times per second
        function update() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;
            
            // TODO 4: Part 2 - Move the tree!
            /*
            tree.x = tree.x - 1; //takes current x pos of tree and subtracrs from the current x pos to make it move from left to right
            //checks if the tree has moved off the canvas if it has it resets to the right side of the canvas
            if (tree.x < -300) {
            tree.x = canvasWidth;
            }
            */
            for (var i = 0; i < foregroundTrees.length; i++){
                var tree = foregroundTrees[i];
                tree.x = tree.x -0.8 // moves the tree
                if (tree.x < -300) { // checks the position of the tree
                    tree.x = canvasWidth + getRandomInt(0, 200); //resets the tree to the right side of the canvas
                }
            }
            // TODO 5: Part 2 - Parallax
            // loops through the bigTree array to access each index of the array, to access each index of the array, moves it, and check its position on the canvas then resets to right side if off the right
            for (var i = 0; i < bigTrees.length; i++){
                var bigTree = bigTrees[i];
                bigTree.x = bigTree.x -0.3 // moves the bigTree
                if (bigTree.x < -300) { // checks the position of the bigTree
                    bigTree.x = canvasWidth + getRandomInt(0, 200); //resets the bigTree to the right side of the canvas
                }
            }
           
         
        } // end of update function - DO NOT DELETE
        
        //HELPER FUNCTIONS//
        //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
          }

        
        /* Make a createjs Container for the background and let it know about the render and upate functions*/
        background = new createjs.Container();
        background.resize = render;
        background.update = update;
        
        /* make the background able to respond to resizing and timer updates*/
        app.addResizeable(background);
        app.addUpdateable(background);
        
        /* render and return the background */
        render();
        return background;
    };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = background;
}
