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
                { "type": "thornBushS", "x": 800, "y": groundY - 10},
                { "type": "thornBushL", "x": 600, "y": groundY -70, collected: false},
               // { "type": "thornBushL", "x": 800, "y": groundY - 110},
               // { "type": "thornBushL", "x": 1000, "y": groundY - 110},

               // { "type": "enemy", "x": 400, "y": groundY - 50},
               // { "type": "enemy", "x": 600, "y": groundY - 50},

               // {"type": "reward", "hitBoxSize": 25, "image":"img/blueberry.png", "offsetX": -25, "offsetY": -25, "x": 600, "y": groundY -100, "velocityX": -2, "health": 20},
                



              
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
            var damageFromObstacle = 10; // sets the damagae amount and assigns to a variable called damageFromObstacle
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
                levelData.gameItems.push({ "type": "reward", "hitBoxSize": 25, "image":"img/blueberry.png", "offsetX": -25, "offsetY": -25, "x": x, "y": y, "velocityX": -2, "health": 20 })
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
            obstacleImage.x = -55; //modify the x value of the image to line up with the hitzone
            obstacleImage.y = -65; //modify the y value of the image to line up with the hitzone
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

     function createEnemy (x, y, velocityX){
        var enemy = game.createGameItem("enemy", 25); // create the gameItem and store it to the variable enemy 
        var redSquare = draw.rect(50, 50, "red"); // draws a rectangle and stores it in the gameItem variable
        redSquare.x = -25; // stores a value as the x value of the gameItem
        redSquare.y = -25; // stores a value as the y value of the gameItem
        enemy.addChild(redSquare); //adds the gameItem as a child of enemy
        enemy.x = x; //stores the value passed as the x argument as the enemys x value
        enemy.y = y; //stores the value passed as the y argument as the enemys x value
        game.addGameItem(enemy); // adds the enemy as an item to the game
        enemy.velocityX = velocityX; // assigns a value to the velocityX of an enemy to make it move
        
        enemy.onPlayerCollision = function () {
            game.changeIntegrity(-10) // subtracts from the health when halle collides with an enemy
        };
        enemy.onProjectileCollision = function () {
            game.increaseScore(100); // adds to score when halle shots the enemy
            game.changeIntegrity(10) // adds to health when halle shots the enemy
            enemy.fadeOut(); //fades enemy out when halle shots them 
        };
    }

       // createEnemy(400,groundY - 50, -1.5);
        function createReward (hitBoxSize, image, offsetX, offsetY, x, y, velocityX, health){
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

       

        //loop for gameItems
        
        for (var i = 0; i < levelData.gameItems.length; i++){
            var gameItem = levelData.gameItems[i]; // assigns the current index of the gameItem array to the gameItem variable
            if(gameItem.type === "thornBushL"){ //checks the type of the game item
                createthornBushL(gameItem.x, gameItem.y); //  if the type is true it executes createthornBushL
            }
            if(gameItem.type === "thornBushS"){ //checks the type of the game item
                createthornBushS(gameItem.x, gameItem.y); //  if the type is true it executes createthornBushS
            }
            if(gameItem.type === "enemy"){ //checks the type of the game item
                createEnemy(gameItem.x, gameItem.y); //  if the type is true it executes createEnemy
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
