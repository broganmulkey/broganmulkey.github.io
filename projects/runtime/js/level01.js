var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            "name": "Robot Romp",
            "number": 1, 
            "speed": -3,
            "gameItems": [

                //foliage 
                { "type": "coin", "x": 500, "y": groundY - 5, "velocityX": -2},
                { "type": "blueberry", "x": 800, "y": groundY - 10, "velocityX": -2},   { "type": "thornBushL", "x": 800, "y": groundY -70},    
                { "type": "thornBushS", "x": 1000, "y": groundY - 10},
                { "type": "snakeTree", "x": 1500, "y": groundY - 110},
                { "type": "thornBushS", "x": 1800, "y": groundY - 10},
                { "type": "thornBushS", "x": 2000, "y": groundY - 10},
                { "type": "blueberry", "x": 2100, "y": groundY - 10, "velocityX": -2},   { "type": "thornBushL", "x": 2100, "y": groundY -70},
                { "type": "blueberry", "x": 2300, "y": groundY - 10, "velocityX": -2},   { "type": "thornBushL", "x": 2300, "y": groundY -70},   
                { "type": "coin", "x": 2350, "y": groundY - 5, "velocityX": -2},
                { "type": "snakeTree", "x": 2500, "y": groundY - 110},
                { "type": "thornBushS", "x": 2550, "y": groundY - 10},
                { "type": "thornBushS", "x": 2700, "y": groundY - 10},
                { "type": "thornBushS", "x": 2800, "y": groundY - 10},
                { "type": "blueberry", "x": 3000, "y": groundY - 10, "velocityX": -2},   { "type": "thornBushL", "x": 3000, "y": groundY -70}, 
                { "type": "coin", "x": 3100, "y": groundY - 5, "velocityX": -2},
                { "type": "thornBushS", "x": 3200, "y": groundY - 10},
                { "type": "thornBushS", "x": 3400, "y": groundY - 10},
                { "type": "blueberry", "x": 3500, "y": groundY - 10, "velocityX": -2},   { "type": "thornBushL", "x": 3500, "y": groundY -70}, 
                { "type": "snakeTree", "x": 3500, "y": groundY - 110},
                { "type": "blueberry", "x": 3800, "y": groundY - 10, "velocityX": -2},   { "type": "thornBushL", "x": 3800, "y": groundY -70}, 
                { "type": "blueberry", "x": 3900, "y": groundY - 10, "velocityX": -2},   { "type": "thornBushL", "x": 3900, "y": groundY -70}, 
                { "type": "thornBushS", "x": 4000, "y": groundY - 10},
                { "type": "coin", "x": 4100, "y": groundY - 5, "velocityX": -2},
                { "type": "blueberry", "x": 4200, "y": groundY - 10, "velocityX": -2},   { "type": "thornBushL", "x": 4200, "y": groundY -70}, 
                { "type": "blueberry", "x": 4400, "y": groundY - 10, "velocityX": -2},   { "type": "thornBushL", "x": 4400, "y": groundY -70}, 
                { "type": "snakeTree", "x": 4600, "y": groundY - 110},
                { "type": "thornBushS", "x": 4900, "y": groundY - 10},
                { "type": "thornBushS", "x": 5000, "y": groundY - 10},
                { "type": "coin", "x": 5100, "y": groundY - 5, "velocityX": -2},
                { "type": "blueberry", "x": 5100, "y": groundY - 10, "velocityX": -2},   { "type": "thornBushL", "x": 5100, "y": groundY -70},
                { "type": "blueberry", "x": 5200, "y": groundY - 10, "velocityX": -2},   { "type": "thornBushL", "x": 5200, "y": groundY -70},
                { "type": "blueberry", "x": 5400, "y": groundY - 10, "velocityX": -2},   { "type": "thornBushL", "x": 5400, "y": groundY -70},
                { "type": "snakeTree", "x": 5600, "y": groundY - 110},
                { "type": "snakeTree", "x": 5800, "y": groundY - 110},
                { "type": "coin", "x": 5800, "y": groundY - 5, "velocityX": -2},
                { "type": "blueberry", "x": 5800, "y": groundY - 10, "velocityX": -2},   { "type": "thornBushL", "x": 5800, "y": groundY -70},
                { "type": "blueberry", "x": 6000, "y": groundY - 10, "velocityX": -2},   { "type": "thornBushL", "x": 6000, "y": groundY -70},
                { "type": "thornBushS", "x": 6100, "y": groundY - 10},
                { "type": "snakeTree", "x": 6300, "y": groundY - 110},
                { "type": "blueberry", "x": 6350, "y": groundY - 10, "velocityX": -2},   { "type": "thornBushL", "x": 6350, "y": groundY -70},
                { "type": "snakeTree", "x": 6400, "y": groundY - 110},
                { "type": "thornBushS", "x": 6550, "y": groundY - 10},
                { "type": "coin", "x": 6600, "y": groundY - 5, "velocityX": -2},
                { "type": "thornBushS", "x": 6600, "y": groundY - 10},
                { "type": "snakeTree", "x": 6700, "y": groundY - 110},
                { "type": "blueberry", "x": 6700, "y": groundY - 10, "velocityX": -2},   { "type": "thornBushL", "x": 6700, "y": groundY -70},
                { "type": "blueberry", "x": 6900, "y": groundY - 10, "velocityX": -2},   { "type": "thornBushL", "x": 6900, "y": groundY -70},
                { "type": "coin", "x": 7000, "y": groundY - 5, "velocityX": -2},
                //physical enemy
                { "type": "snake", "x": 1000, "y": groundY - 20, "velocityX": -2.5},
                { "type": "snake", "x": 2000, "y": groundY - 20, "velocityX": -2.5},
                { "type": "snake", "x": 2500, "y": groundY - 20, "velocityX": -2.5},
                { "type": "meat", "x": 2580, "y": groundY - 10, "velocityX": -2.5},   { "type": "alligator", "x": 2500, "y": groundY - 20, "velocityX": -2.5},
                { "type": "snake", "x": 3000, "y": groundY - 20, "velocityX": -2.5},
                { "type": "snake", "x": 3300, "y": groundY - 20, "velocityX": -2.5},
                { "type": "snake", "x": 3800, "y": groundY - 20, "velocityX": -2.5},
                { "type": "snake", "x": 4000, "y": groundY - 20, "velocityX": -2.5},
                { "type": "meat", "x": 4580, "y": groundY - 10, "velocityX": -2.5},   { "type": "alligator", "x": 4500, "y": groundY - 20, "velocityX": -2.5},
                { "type": "snake", "x": 4800, "y": groundY - 20, "velocityX": -2.5},
                { "type": "snake", "x": 5000, "y": groundY - 20, "velocityX": -2.5},
                { "type": "snake", "x": 5500, "y": groundY - 20, "velocityX": -2.5},
                { "type": "meat", "x": 5580, "y": groundY - 10, "velocityX": -2.5},   { "type": "alligator", "x": 5500, "y": groundY - 20, "velocityX": -2.5},
                { "type": "meat", "x": 6580, "y": groundY - 10, "velocityX": -2.5},   { "type": "alligator", "x": 6500, "y": groundY - 20, "velocityX": -2.5},
                { "type": "meat", "x": 7580, "y": groundY - 10, "velocityX": -2.5},   { "type": "alligator", "x": 7500, "y": groundY - 20, "velocityX": -2.5},
                { "type": "meat", "x": 8580, "y": groundY - 10, "velocityX": -2.5},   { "type": "alligator", "x": 8500, "y": groundY - 20, "velocityX": -2.5},
                { "type": "meat", "x": 9580, "y": groundY - 10, "velocityX": -2.5},   { "type": "alligator", "x": 9500, "y": groundY - 20, "velocityX": -2.5},






            ]
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(true);

        // TODO 6 and on go here
        // BEGIN EDITING YOUR CODE HERE
        
        //function that creates thornBushL at any given x & y value
        
        function createthornBushL(x, y){
            var hitZoneSize = 25; // the size of the hitzone assigned to the variable hitZoneSize
            var damageFromObstacle = 15; // sets the damagae amount and assigns to a variable called damageFromObstacle
            var thornBushLHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);  // creates the obstacle and assigns it to thornBushLHitZone
            thornBushLHitZone.x = x; // assigns the x value using the argument passed as the x parameter
            thornBushLHitZone.y = y; // assigns the y value using the argument passed as the y parameter
            game.addGameItem(thornBushLHitZone); //adds the hitzone to the game
            var obstacleImage = draw.bitmap("img/thornBushL.png"); //draws the image as a bitmap and stores is to obstacle image
            thornBushLHitZone.addChild(obstacleImage); // adds obstacleImage as a child of the thornBushLHitZone
            obstacleImage.x = -45; //modify the x value of the image to line up with the hitzone
            obstacleImage.y = -75; //modify the y value of the image to line up with the hitzone
            thornBushLHitZone.onProjectileCollision = function () {                
                thornBushLHitZone.fadeOut();
                console.log(levelData.gameItems)
            };

        }

        function createthornBushS(x, y){
            var hitZoneSize = 25; // the size of the hitzone assigned to the variable hitZoneSize
            var damageFromObstacle = 10; // sets the damagae amount and assigns to a variable called damageFromObstacle
            var thornBushSHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);  // creates the obstacle and assigns it to thornBushSHitZone
            thornBushSHitZone.x = x; // assigns the x value using the argument passed as the x parameter
            thornBushSHitZone.y = y; // assigns the y value using the argument passed as the y parameter
            game.addGameItem(thornBushSHitZone); //adds the hitzone to the game
            var obstacleImage = draw.bitmap("img/thornBushS.png"); //draws the image as a bitmap and stores is to obstacle image
            thornBushSHitZone.addChild(obstacleImage); // adds obstacleImage as a child of the thornBushSHitZone
            obstacleImage.x = -50; //modify the x value of the image to line up with the hitzone
            obstacleImage.y = -65; //modify the y value of the image to line up with the hitzone
        }

        function createsnakeTree(x, y){
            var hitZoneSize = 25; // the size of the hitzone assigned to the variable hitZoneSize
            var damageFromObstacle = 20; // sets the damagae amount and assigns to a variable called damageFromObstacle
            var snakeTreeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);  // creates the obstacle and assigns it to thornBushSHitZone
            snakeTreeHitZone.x = x; // assigns the x value using the argument passed as the x parameter
            snakeTreeHitZone.y = y; // assigns the y value using the argument passed as the y parameter
            game.addGameItem(snakeTreeHitZone); //adds the hitzone to the game
            var snakeTreeImage = draw.bitmap("img/snakeTree.png"); //draws the image as a bitmap and stores is to obstacle image
            snakeTreeHitZone.addChild(snakeTreeImage); // adds snakeTreeImage as a child of the snakeTreeHitZone
            snakeTreeImage.x = -55; //modify the x value of the image to line up with the hitzone
            snakeTreeImage.y = -215; //modify the y value of the image to line up with the hitzone
            snakeTreeImage.scaleX = 0.7
            snakeTreeImage.scaleY = 0.7
        }


        function createSpike(x, y){
            var hitZoneSize = 25; // the size of the hitzone assigned to the variable hitZoneSize
            var damageFromObstacle = 10; // sets the damagae amount and assigns to a variable called damageFromObstacle
            var spikeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);  // creates the obstacle and assigns it to sawBladeHitZone
            spikeHitZone.x = x; // assigns the x value using the argument passed as the x parameter
            spikeHitZone.y = y; // assigns the y value using the argument passed as the y parameter
            game.addGameItem(spikeHitZone); //adds the hitzone to the game
            var obstacleImage = draw.bitmap("img/sawblade.png"); //draws the image as a bitmap and stores is to obstacle image
            spikeHitZone.addChild(obstacleImage); // adds obstacleImage as a child of the sawBladeHitZone
            obstacleImage.x = -25; //modify the x value of the image to line up with the hitzone
            obstacleImage.y = -25; //modify the y value of the image to line up with the hitzone
        }
        
        //createSawBlade(200, groundY - 100);
        //createSawBlade(400, groundY - 110);
        //createSawBlade(600, groundY);

     function createSnake (x, y, velocityX){
        var snake = game.createGameItem("snake", 25); // create the gameItem and store it to the variable snake 
        var greenSnake = draw.bitmap("img/greenSnake.png"); //draws the image as a bitmap and stores is to snake image
        greenSnake.x = -25; // stores a value as the x value of the gameItem
        greenSnake.y = -25; // stores a value as the y value of the gameItem
        snake.addChild(greenSnake); //adds the gameItem as a child of snake
        snake.x = x; //stores the value passed as the x argument as the snakes x value
        snake.y = y; //stores the value passed as the y argument as the snakes x value
        game.addGameItem(snake); // adds the snake as an item to the game
        snake.velocityX = velocityX; // assigns a value to the velocityX of an snake to make it move
       

        snake.onPlayerCollision = function () {
            game.changeIntegrity(-15) // subtracts from the health when halle collides with a snake
        };
        snake.onProjectileCollision = function () {
            game.increaseScore(0); // adds to score when halle shots the snake
            game.changeIntegrity(0) // adds to health when halle shots the snake
            snake.fadeOut(); //fades snake out when halle shots them 
        };
    }
//bear
    function createAlligator (x, y, velocityX){
        var alligator = game.createGameItem("alligator", 25); // create the gameItem and store it to the variable bear 
        var greenAlligator = draw.bitmap("img/Alligator.png"); //draws the image as a bitmap and stores is to bear image
        greenAlligator.x = -105; // stores a value as the x value of the gameItem
        greenAlligator.y = -95; // stores a value as the y value of the gameItem
        alligator.addChild(greenAlligator); //adds the gameItem as a child of alligator
        alligator.x = x; //stores the value passed as the x argument as the alligators x value
        alligator.y = y; //stores the value passed as the y argument as the alligators x value
        game.addGameItem(alligator); // adds the alligator as an item to the game
        alligator.velocityX = velocityX; // assigns a value to the velocityX of an alligator to make it move
        
        alligator.onPlayerCollision = function () {
            game.changeIntegrity(-50) // subtracts from the health when halle collides with a alligator
        };
        alligator.onProjectileCollision = function () {
            game.increaseScore(0); // adds to score when halle shots the alligator
            game.changeIntegrity(0) // adds to health when halle shots the alligator
            alligator.fadeOut(); //fades alligator out when halle shots them 
        };
    }

    function createBlueberry (x, y, velocityX){
        var blueberry = game.createGameItem("blueberry", 25); // create the gameItem and store it to the variable bear 
        var berryImage = draw.bitmap("img/blueberry.png"); //draws the image as a bitmap and stores is to bear image
        berryImage.x = -25; // stores a value as the x value of the gameItem
        berryImage.y = -35; // stores a value as the y value of the gameItem
        blueberry.addChild(berryImage); //adds the gameItem as a child of blueberry
        blueberry.x = x; //stores the value passed as the x argument as the blueberry x value
        blueberry.y = y; //stores the value passed as the y argument as the blueberry x value
        game.addGameItem(blueberry); // adds the blueberry as an item to the game
        blueberry.velocityX = velocityX; // assigns a value to the velocityX of an blueberry to make it move
        berryImage.scaleX = 0.4
        berryImage.scaleY = 0.4

        blueberry.onPlayerCollision = function () {
            blueberry.fadeOut(); //fades blueberry out when halle shots them 
            game.changeIntegrity(10) // subtracts from the health when halle collides with a blueberry
        };
    }

    function createCoin (x, y, velocityX){
        var coin = game.createGameItem("coin", 25); // create the gameItem and store it to the variable coin 
        var coinImage = draw.bitmap("img/coin.png"); //draws the image as a bitmap and stores is to coin image
        coinImage.x = -25; // stores a value as the x value of the gameItem
        coinImage.y = -35; // stores a value as the y value of the gameItem
        coin.addChild(coinImage); //adds the gameItem as a child of coin
        coin.x = x; //stores the value passed as the x argument as the coin x value
        coin.y = y; //stores the value passed as the y argument as the coin x value
        game.addGameItem(coin); // adds the coin as an item to the game
        coin.velocityX = velocityX; // assigns a value to the velocityX of an coin to make it move
        coinImage.scaleX = 1
        coinImage.scaleY = 1

        coin.onPlayerCollision = function () {
            coin.fadeOut(); //fades coin out when halle shots them 
            game.changeIntegrity(0) // subtracts from the health when halle collides with a coin
            game.increaseScore(100); // adds to score when halle collides with the coin
        };
    }
    function createMeat (x, y, velocityX){
        var meat = game.createGameItem("meat", 25); // create the gameItem and store it to the variable bear 
        var meatImage = draw.bitmap("img/meat.png"); //draws the image as a bitmap and stores is to bear image
        meatImage.x = -25; // stores a value as the x value of the gameItem
        meatImage.y = -85; // stores a value as the y value of the gameItem
        meat.addChild(meatImage); //adds the gameItem as a child of meat
        meat.x = x; //stores the value passed as the x argument as the meat x value
        meat.y = y; //stores the value passed as the y argument as the meat x value
        game.addGameItem(meat); // adds the meat as an item to the game
        meat.velocityX = velocityX; // assigns a value to the velocityX of an meat to make it move
        meatImage.scaleX = 0.4
        meatImage.scaleY = 0.4

        meat.onPlayerCollision = function () {
            meat.fadeOut(); //fades meat out when halle shots them 
            game.changeIntegrity(30) // subtracts from the health when halle collides with a meat
        };
    }
       // createEnemy(400,groundY - 50, -1.5);
     /*   function createReward (hitBoxSize, image, offsetX, offsetY, x, y, velocityX, health){
            var reward = game.createGameItem("reward", hitBoxSize);
            var item = draw.bitmap(image);
            item.x = offsetX;
            item.y = offsetY;
            reward.addChild(item);
            reward.x = x;
            reward.y = y;
            game.addGameItem(reward);
            reward.velocityX = velocityX;
            reward.onPlayerCollision = function () {
                game.increaseScore(health)                
                reward.fadeOut();
                console.log("collision detected")
            };
        }

       */

        //loop for gameItems
        
        for (var i = 0; i < levelData.gameItems.length; i++){
            var gameItem = levelData.gameItems[i]; // assigns the current index of the gameItem array to the gameItem variable
            if(gameItem.type === "thornBushL"){ //checks the type of the game item
                createthornBushL(gameItem.x, gameItem.y); //  if the type is true it executes createthornBushL
            }
            if(gameItem.type === "thornBushS"){ //checks the type of the game item
                createthornBushS(gameItem.x, gameItem.y); //  if the type is true it executes createthornBushS
            }
            if(gameItem.type === "snakeTree"){ //checks the type of the game item
                createsnakeTree(gameItem.x, gameItem.y); //  if the type is true it executes createsnakeTree
            }
            if(gameItem.type === "enemy"){ //checks the type of the game item
                createEnemy(gameItem.x, gameItem.y); //  if the type is true it executes createEnemy
            }
            if(gameItem.type === "snake"){ //checks the type of the game item
                createSnake(gameItem.x, gameItem.y, gameItem.velocityX); //  if the type is true it executes createSnake
            }
            if(gameItem.type === "alligator"){ //checks the type of the game item
                createAlligator(gameItem.x, gameItem.y, gameItem.velocityX); //  if the type is true it executes createAlligator
            }
            if(gameItem.type === "blueberry"){ //checks the type of the game item
                createBlueberry(gameItem.x, gameItem.y, gameItem.velocityX); //  if the type is true it executes createBlueberry
            }
            if(gameItem.type === "coin"){ //checks the type of the game item
                createCoin(gameItem.x, gameItem.y, gameItem.velocityX); //  if the type is true it executes createCoin    
            }
            if(gameItem.type === "meat"){ //checks the type of the game item
                createMeat(gameItem.x, gameItem.y, gameItem.velocityX); //  if the type is true it executes createMeat
            }
            if (gameItem.type === "reward") {
                createReward(gameItem.x, gameItem.y);
            }
        
        }

        
        if (levelData.gameItems[1].collected === true){
            createReward(gameItem.hitBoxSize, gameItem.image, gameItem.offsetX, gameItem.offsetY, levelData.gameItems[1].x, levelData.gameItems[1].y, gameItem.velocityX, gameItem.health)
        
            console.log(levelData.gameItems[1].collected);
        }


        // DO NOT EDIT CODE BELOW HERE
    }
    
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}
