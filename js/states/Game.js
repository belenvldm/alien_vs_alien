var Jueguin = Jueguin || {};

// Creo las variables del juego
var playerUno;
var playerDos;
var starsUno;
var starsDos;

Jueguin.GameState = {
    init: function() {

    },

    create: function() {
		this.game.physics.startSystem(Phaser.Physics.ARCADE);

    	this.background = this.add.sprite(0, 0, 'background');

    	playerUno = this.game.add.sprite(32, this.game.world.height - 270, 'playerUno');
	    this.game.physics.arcade.enable(playerUno);
    	playerUno.body.bounce.y = 0.4;
    	playerUno.body.gravity.y = 400;
    	playerUno.body.collideWorldBounds = true;
	    playerUno.animations.add('left', [0, 1, 2, 3], 10, true);
	    playerUno.animations.add('right', [5, 6, 7, 8], 10, true);

	    playerUno.body.velocity.x = 0;

	    starsUno = this.game.add.group();
	    starsUno.enableBody = true;

	    for (var i = 0; i < 8; i++)
	    {
	        var star = starsUno.create(i * 120, 0, 'starUno');
	        star.body.gravity.y = 300;
	        star.body.bounce.y = 0.7 + Math.random() * 0.2;
	    }

    	cursors = this.game.input.keyboard.createCursorKeys();
    },

    update: function() {

	    // this.game.physics.arcade.collide(playerUno, platforms);

	    this.game.physics.arcade.overlap(playerUno, starsUno, collectStar, null, this);

	    playerUno.body.velocity.x = 0;

	    if (cursors.left.isDown) {
	    	if (score > 50) {
	        	playerUno.body.velocity.x = -70;
	    	} else if (score > 30) {
	        	playerUno.body.velocity.x = -150;
	    	} else {
	        	playerUno.body.velocity.x = -250;
	    	}
	        playerUno.animations.play('left');
	    } else if (cursors.right.isDown) {
	        if (score > 50) {
	        	playerUno.body.velocity.x = 70;
	    	} else if (score > 30) {
	        	playerUno.body.velocity.x = 150;
	    	} else {
	        	playerUno.body.velocity.x = 250;
	    	}
	        playerUno.animations.play('right');
	    } else {
	        playerUno.animations.stop();
	        playerUno.frame = 4;
	    }

	    function collectStar (player, star) {
	    	star.kill();
		}
    },
};