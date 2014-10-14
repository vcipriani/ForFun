var Engine = (function(global) {
    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        patterns = {},
        lastTime,
        session = {gameOn: true, //true,false
                   winCount: null,
                   losttCount: null
                   }

    canvas.width = 505;
    canvas.height = 606;
    doc.body.appendChild(canvas);
    
    
    var main = function () {
        var now = Date.now(),
        dt = (now - lastTime) / 1000.0;
        
        if(session.gameOn){
            win.requestAnimationFrame(main);
            updateEntities(dt);
        }
        
        //gameOn=false (ie. collision, win), then game over!
        else{
            gameOver();
        }
        
        render();
        lastTime = now;

    };

    function init() {
        allEnemies = generateEnemies(3);
        player = new Player();
        reset();
        lastTime = Date.now();
        main();
    }

    //Function to control game over
    function gameOver(){
        win.cancelAnimationFrame(session);
        console.log('hit gameOver');
        ctx.font="60px Verdana";
        ctx.fillStyle = 'red';
        ctx.fillText("GAME OVER!",65,120)

    }
    
    //Function to control win logic
    function gameWon(){
        console.log('hit win')
        ctx.font="60px Verdana";
        ctx.fillStyle = 'green';
        ctx.fillText("YOU WIN!!!",110,120)
    }
    

    //Updates the location of all enemies and check to see if they have collided w/ the player
    //Returns true if the game should continue running
    function updateEntities(dt) {
        
        //Check for player winning
        if(player.checkWin()){
            session.gameOn = false; 
            gameWon()
            return session.gameOn;
        };
        
        //Check for collisions 
       allEnemies.every(function(enemy) {
           enemy.update(dt,'froggerStyle');
           if (enemy.checkCollision(player)) {
               session.gameOn = false; 
               gameOver();
               return session.gameOn;
           }
           return true;   
        });
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
    
    return session;
})(this);
