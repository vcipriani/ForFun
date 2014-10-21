Frogger-esque Game
===============================
[Demo](http://htmlpreview.github.io/?https://github.com/vcipriani/ForFun/blob/master/frontend-nanodegree-arcade-game-master/index.html)

This is a project that HackReactor and Udacity put together.  It was really awesome to work on.  I have the core game functionality down.  The enemies move, the player can move the hero and the game stops on a collision or when the hero reaches the water.  I added a debug mode to make fine tuning the collision detection easier.  If you set debugCollision=true in the console, boxes will be drawn to show collision areas and the coordinates will be logged to the screen.

**To Do**  
-Reset functionality within the app instead of requiring page refresh  
-Win/loss tracking  
-Choose number of enemies  
-Zombie enemies - change the movement logic so the enemies travel in 2D and at random  
-Switch to refactored engine2.js - I refactored the code to be much cleaner; however, the "Game Over"/"Game Won" text quit working when I refactored it.  I haven't identified the bug yet.  It is strange because the core code relevant to the text rendering didn't really change.