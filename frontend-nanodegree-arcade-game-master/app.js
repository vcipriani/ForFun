// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = Resources.get('images/enemy-bug.png');
    this.x = 5;
    this.y = 5;

}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(this.sprite, this.x, this.y);
}

//Player Class
var Player = function (){
    this.sprite = Resources.get('images/char-boy.png');
    this.x = 100;
    this.y = 100;
}

Player.prototype.update = function(dt) {
  
}

Player.prototype.render = function() {
      ctx.drawImage(this.sprite, this.x, this.y);
}

Player.prototype.handleInput = function(dir){
    switch(dir){
        case 'left':
            this.x--;
            break;
        case 'right':
            this.x++;
            break;
        case 'up':    
            this.y--;
            break;
        case 'down':
            this.y++;
            break;
        default: alert('Error - hit default case in handleInput')
    }
    this.render();
    
}

//Create empty player and enemy variables. Variables are actually loaded from the init() function in engine.js.  Resoures are not loaded during app.js execution and was getting undefined sprite as a result
var player = {}; 
var allEnemies = [];

//Function to generate a given number of enemies
function generateEnemies(numEnemies){
    var allEnemies = [];
    for(var i=1; i<=numEnemies; i++){
        allEnemies.push(new Enemy());
    }
    return allEnemies;
}



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
