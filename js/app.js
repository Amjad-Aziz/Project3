// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
	

    this.sprite = 'images/enemy-bug.png';

    // Width and Height are added to detect collisions
    this.width = 80;
    this.height = 50;
	
    // Initial speed
	
    this.speed = 1;
    this.speed = (Math.random() + 1) * this.speed * 200;    
	// The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

	
	if(this.x <500){
        this.x += this.speed * (dt);
    } else {
        this.x = -200;
    }
	};


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {

    // X and Y paramaters as placeholders
    this.x = x;
    this.y = y;

    // Set the players initial score to 0
    this.score = 0;

    // Load the player image
    this.sprite = 'images/char-boy.png';

    // Width and Height are added to detect collisions
    this.width = 80;
    this.height = 50;

    // Initial speed
    this.speed = 1;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
Player.prototype.update = function(dt) {
    if (this.y <= 0) {
        this.reset(202, 405); // setting the Y coordinate >
        this.score += 100; // adds to score when player hits water
        console.log(this.score);
        document.getElementById("score").innerHTML = this.score;
    }
};



// Player movement is the same width and height of the canvas squares
Player.prototype.handleInput = function(direction) {
    if (direction === 'left' && this.x > 0) {
        this.x -= 102;
    }
    if (direction === 'right' && this.x < 400) {
        this.x += 102;
    }
    if (direction === 'up' && this.y > 0) {
        this.y -= 83;
    }
    if (direction === 'down' && this.y < 400) {
        this.y += 83;
    }

};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies


var allEnemies = [
    new Enemy(-200, 55, 1),
    new Enemy(-200, 140, 1),
    new Enemy(-200, 225, 1)
];


// Place the player object in a variable called player
var player = new Player(202, 405);

// Reset players position after collision with enemies
Player.prototype.reset = function(x, y) {
    if (this.y> 0) {
        this.score -= 50; // subtracts from the score when player hits an enemy
        document.getElementById('score').innerHTML = this.score;
    }
    this.x = x;
    this.y = y;
};

// Checks collisions between player and Enemy
function checkCollisions(Enemy, player) {
    for (var i = 0; i < Enemy.length; i++) {
        if (Enemy[i].x < player.x + player.width &&
            Enemy[i].x + Enemy[i].width > player.x &&
            Enemy[i].y < player.y + player.height &&
            Enemy[i].height + Enemy[i].y > player.y) {
            player.reset(202, 405);
        }
    }
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
