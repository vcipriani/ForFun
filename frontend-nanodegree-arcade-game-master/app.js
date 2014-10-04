// Enemies our player must avoid
var Enemy = function(locationArr) {

    this.sprite = Resources.get('images/enemy-bug.png');
    this.x = locationArr[0];
    this.y = locationArr[1];

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
    this.x = 200;
    this.y = 380;
}

//I don't think we really need this. Unclear what it should do unless it is to extract some logic out of handleInput
Player.prototype.update = function(){ 
}

Player.prototype.render = function() {
      ctx.drawImage(this.sprite, this.x, this.y);
}

Player.prototype.handleInput = function(dir){
    switch(dir){
        case 'left':
            this.x-=10;
            break;
        case 'right':
            this.x+=10;
            break;
        case 'up':    
            this.y-=10;
            break;
        case 'down':
            this.y+=10;
            break;
        default: alert('Error - hit default case in handleInput')
    }
}

//Create empty player and enemy variables. Variables are actually loaded from the init() function in engine.js.  Resoures are not loaded during app.js execution and was getting undefined sprite as a result
var player = {}; 
var allEnemies = [];
var enemyLocation = [[5,55],[400,140],[200,220]]
//Function to generate a given number of enemies
function generateEnemies(numEnemies){
    var allEnemies = [];
    for(var i=0; i<numEnemies; i++){
        allEnemies.push(new Enemy(enemyLocation[i]));
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
