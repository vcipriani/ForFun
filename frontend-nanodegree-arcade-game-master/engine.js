var Engine = (function(global) {
    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        patterns = {},
        lastTime;

    canvas.width = 505;
    canvas.height = 606;
    doc.body.appendChild(canvas);

    function main() {
        var now = Date.now(),
        dt = (now - lastTime) / 1000.0;
        
        //Run as long gas gameOn = true
        //If there is a collision false will propogate up to update().
        var gameOn = true;
        gameOn = update(dt);
        
        render();
        lastTime = now;
        
        var session; //variable to assign the AnimationFrame to.  Necessary to stop it later
        if(gameOn){
            session = win.requestAnimationFrame(main);
        }
        //gameOn=false (ie. collision), then game over!
        else{
            gameOver(session);
        }
    };

    function init() {
        allEnemies = generateEnemies(3);
        player = new Player();
        reset();
        lastTime = Date.now();
        main();
    }

    //Function to control game over
    function gameOver(session){
       win.cancelAnimationFrame(session);
        ctx.font="60px Verdana";
        ctx.fillStyle = 'red';
        ctx.fillText("GAME OVER!",65,120)
    }
    
   // function betweenBounds
    //Test two objects to determine if they have collided
    //Assume objects have properties- x, y, height, width (where x,y are the top left location)

    
    function update(dt) {
        return updateEntities(dt);
        //return !checkCollisions();
    }

    
    
    function updateEntities(dt) {
       return allEnemies.every(function(enemy) {
            enemy.update(dt,'froggerStyle');
            return !enemy.checkCollision(player);
        });
       //player.update();  I choose not to use this as I felt like I was adding abstraction and wasn't sure why
    }

    function render() {
        var rowImages = [
                'images/water-block.png',
                'images/stone-block.png',
                'images/stone-block.png',
                'images/stone-block.png',
                'images/grass-block.png',
                'images/grass-block.png'
            ],
            numRows = 6,
            numCols = 5,
            row, col;

        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {
                ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
            }
        }

        renderEntities();
    }

    function renderEntities() {
        allEnemies.forEach(function(enemy) {
            enemy.render();
        });
        player.render();
    }

    function reset() {
        // noop
    }

    Resources.load([
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/enemy-bug.png',
        'images/char-boy.png'
    ]);
    Resources.onReady(init);

    global.ctx = ctx;
    
})(this);
