//Tile Width
TILE_WIDTH = 100;
// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.initialLocation = -100;
    this.speed = 100;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < 550) {
        this.x += (this.speed * dt);
    } else {
        this.x = this.initialLocation;
    }
    if (this.x < player.x + 20 && this.x + 60 > player.x && this.y < player.y + 60 && this.y + 40 > player.y) {
        player.reset();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var myPlayer = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 420;
};

myPlayer.prototype.update = function() {

    // If the player reaches the water
    if (this.y < 20) {
        this.reset();
    }
};

myPlayer.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

myPlayer.prototype.handleInput = function(direction) {
    if (direction == 'left' && this.x > 0) {
        this.x -= TILE_WIDTH;
    }
    if (direction == 'right' && this.x < 400) {
        this.x += TILE_WIDTH;
    }
    if (direction == 'up' && this.y > 3) {
        this.y -= TILE_WIDTH;
    }
    if (direction == 'down' && this.y < 400) {
        this.y += TILE_WIDTH;
    }
};

// Is called when the player is reset to the starting point
myPlayer.prototype.reset = function() {
    this.x = 200;
    this.y = 420;
};

// Now instantiate your objects.
var e1 = new Enemy(-90, 60);
var e2 = new Enemy(-190, 140);
var e3 = new Enemy(-290, 230);
var e4 = new Enemy(-390, 140);
var e5 = new Enemy(-490, 60);
var e6 = new Enemy(-890, 230);

// Place all enemy objects in an array called allEnemies
var allEnemies = [e1, e2, e3, e4, e5, e6];
// Place the player object in a variable called player
var player = new myPlayer();

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