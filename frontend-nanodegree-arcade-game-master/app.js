//TODOS
///Refactor collision logic
///Add GameCharacter method that returns the collision box parameters as an object and refactor code to leverage it.
//Refactor enemy.update and add zombie mode



//Superclass of Enemy and Player
//We will store common properties and methods here
//You should not instantiate this class unless it is to create a subclass

//Setting to true draws squares over the collision box
var debugCollision = false;

GameCharacter = function(){
    //Start location where we will load sprite
    this.x = 0;
    this.y = 0;
    
    //The offset, in relation to above (x,y) that is used to determine where we start drawing the collision box
    this.xOff = 0;
    this.yOff = 0;
}


//Function to draw imag on canvas
GameCharacter.prototype.render = function() {
    ctx.drawImage(this.sprite, this.x, this.y);
    
    //Draws debug boxes if enabled
    if(debugCollision){
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(this.x+this.xOff,this.y+this.yOff,this.width,this.height);
    }
}

//Function to calculate the collision box in relation to the canvas (0,0 at top left)
GameCharacter.prototype.returnCollisionCoordinates = function(){ 
    return {x1: this.x + this.xOff,
            x2: this.x + this.xOff + this.width,
            y1: this.y + this.yOff,
            y2: this.y + this.yOff + this.height}
}

//Tests to see if a value falls within the provided bounds.  Returns true if so
GameCharacter.prototype.betweenBounds = function(input, bound1, bound2){
    //Assign variables based on size
    //Allows users to enter bounds in any order
    var b1 = Math.min(bound1,bound2);
    var b2 = Math.max(bound1,bound2);
    
    if(input>=b1 && input<=b2){
        return true
    }
    return false;
}


//Function to determine if an object has collided with another object
//The obj passed must also be on the GameCharacter prototype chain
//Returns true if the calling object overlaps with the passed in obj
GameCharacter.prototype.checkCollision = function(obj){
    
    //Store the collision box coordinates for each object
    var c = this.returnCollisionCoordinates();
    var t = obj.returnCollisionCoordinates();
    
    //Log Collision box locations if debug is enabled
    if(debugCollision){
    console.log(c);
    console.log(t);
    }
    
    //Test to see if there is overlap between boxes
    if(
         (this.betweenBounds(c.x1, t.x1, t.x2) && (this.betweenBounds(c.y1, t.y1, t.y2) || this.betweenBounds(c.y2, t.y1, t.y2)))
      || (this.betweenBounds(c.x2, t.x1, t.x2) && (this.betweenBounds(c.y1, t.y1, t.y2) || this.betweenBounds(c.y2, t.y1, t.y2)))
      || (this.betweenBounds(t.x1, c.x1, c.x2) && (this.betweenBounds(t.y1, c.y1, c.y2) || this.betweenBounds(t.y2, c.y1, c.y2)))
      || (this.betweenBounds(t.x2, c.x1, c.x2) && (this.betweenBounds(t.y1, c.y1, c.y2) || this.betweenBounds(t.y2, c.y1, c.y2)))
    )
    
    {
        return true;
    }
    
    return false;
    
}


// Enemies our player must avoid
// Pass in array containing x,y coordinates to determine start location
var Enemy = function(locationArr) {

    this.sprite = Resources.get('images/enemy-bug.png');
    this.x = Math.random()*400;//Random x starting location (can also use locationArr[0] for static)
    this.y = locationArr[1]; //See array enemyLocation
    
    //Dimensions of collision area (in reference from x,y)
    this.width = 80;
    this.height = 65;
    
    this.xOff = 9;
    this.yOff = 80;
    
    //The following assigns the initial direction of the enemy based on the starting location
    if(locationArr[0]<200){
        this.xIncrement = 1;
    }
    else {this.xIncrement = -1}
}


Enemy.prototype = new GameCharacter();



// Update the enemy's position
// Parameter: dt, a time delta between ticks
// Parameter: type, determines the method of movement. Options are:
//  froggerStyle - only allows for horizontal movement of enemies
//  zombie (not implemented yet) - creates a more random 2d movement
//  This could use some refactoring
Enemy.prototype.update = function(dt, type) {  
    var speedFactor = 50;
    bounds = {x: [5,400], y: [55,220]}
    
    if(type="froggerStyle"){
        //Checks to determine if the enemy has reached the boundary of the game
        //Sends them in opposite direction if so
        if(this.x>=bounds.x[0] && this.x<=bounds.x[1]) {
            this.x += this.xIncrement*dt*speedFactor;
        }
        else{
            this.xIncrement *= -1;
            this.x += this.xIncrement*dt*speedFactor;
        }
    }
    
    else if(type="zombie"){
      //TODO
    }
}


//Player Class
var Player = function (){
    this.sprite = Resources.get('images/char-boy.png');
    
    //Location where we draw sprite
    this.x = 200;
    this.y = 380;
    
    //Offset of where we start the collision area (in reference from sprite start)
    this.xOff = 37;
    this.yOff = 120;
    
    //Dimensions of collision area
    this.width = 30;
    this.height= 20;
}


Player.prototype = new GameCharacter();


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

//I don't think we really need this. Unclear what it should do unless it is to extract some logic out of handleInput
//Player.prototype.update = function(){ 
//}


//Create empty player and enemy variables. Variables are actually loaded from the init() function in engine.js.  Resoures are not loaded during app.js execution and was getting undefined sprite as a result
var player = {}; 
var allEnemies = [];

//Array of starting locations
var enemyLocation = [[200,220],[5,55],[400,140]]

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
