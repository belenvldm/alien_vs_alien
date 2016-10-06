var Jueguin = Jueguin || {};

// Creo las variables del juego
var playerUno;			// Jugador uno
var playerDos;			// Jugador dos
var starsUno;			// Grupo de estrellas para el jugador uno
var starsDos;			// Grupo de estrellas para el jugador dos
var keyA;				// Control izquierdo jugador uno
var keyD;				// Control derecho jugador uno
var keyW;				// Control arriba jugador uno
var keyS;				// Control abajo jugador uno
var keyQ;				// Control bomba jugador uno
var keyTab;				// Control correr jugador uno
var cursors;			// Controles jugador dos
var keyGuion;			// Control bomba jugador uno
var keyCtrl;			// Control correr jugador uno
var scoreUno;			// Puntaje jugador uno
var scoreDos;			// Puntaje jugador dos
var map;				// Mapa con el tilemap
var backgroundLayer;	// El laberinto del tile map
var blockLayer;			// El fonde del tile map
var corre;				// Booleano primer jugador
var correDos;			// Booleano segundo jugador

Jueguin.GameState = {
    init: function() {
	    this.VELOCITY_INI = 0;
	    this.VELOCITY_POS = 100;
	    this.VELOCITY_NEG = -100;
	    this.RUN_POS = 200;
	    this.RUN_NEG = -200;
	    corre = false;
	    correDos = false;
    },

    create: function() {
		this.game.physics.startSystem(Phaser.Physics.ARCADE);		// Fisica del juego
		
    	// this.background = this.add.sprite(0, 0, 'background');		// Agrego el fondo
    	// Armo el mapa
    	map = this.add.tilemap('myTilemap');						// Agrego el mapa
    	map.addTilesetImage('tilealien1', 'myTileset');				// Seteo las tiles
		
		backgroundLayer = map.createLayer('fondin');				// Creo el layer del fondo
		blockLayer = map.createLayer('laberintin');					// Creo el layer del labrinto
		
		map.setCollisionBetween(1, 2, true, 'laberintin');  		// Seteo la colision de la capa blockLayer
    	// !Armo el mapa
	    
	    // Settings primer jugador
    	playerUno = this.game.add.sprite(this.game.world.width - 960, this.game.world.height - 712, 'playerUno'); // lo agrego al escenario

	    this.game.physics.arcade.enable(playerUno);					// le doy la fisica

    	playerUno.body.gravity.y = 0; 								// seteo la gravedad del jugador
    	playerUno.body.collideWorldBounds = true;					// Colisiona con los bordes
	    playerUno.animations.add('left', [0, 1, 2, 3], 10, true);	// armo la animacion "left", le digo que frames usar, cada cuanto
	    playerUno.animations.add('right', [5, 6, 7, 8], 10, true);  // armo la animacion "right", le digo que frames usar, cada cuanto

	    playerUno.body.velocity.x = 0;

	    // Seteo los controles, cada key a la variable que corresponde
    	keyA = Jueguin.game.input.keyboard.addKey(Phaser.Keyboard.A);
    	keyD = Jueguin.game.input.keyboard.addKey(Phaser.Keyboard.D);
    	keyW = Jueguin.game.input.keyboard.addKey(Phaser.Keyboard.W);
    	keyS = Jueguin.game.input.keyboard.addKey(Phaser.Keyboard.S);
    	keyQ = Jueguin.game.input.keyboard.addKey(Phaser.Keyboard.Q);
    	keyTab = Jueguin.game.input.keyboard.addKey(Phaser.Keyboard.ONE);
	    // !Settings primer jugador

	    // Creo el grupo de estrellas para el primer jugador
	    starsUno = this.game.add.group();	// Creo el grupo
	    starsUno.enableBody = true;

	    // Creo 8 estrellas del grupo, y las muestro, les seteo gravedad y rebote
	    for (var i = 0; i < 8; i++)
	    {
	        var star = starsUno.create(i * 140, 0, 'starUno');
	        star.body.gravity.y = 300;
	        star.body.bounce.y = 0.7 + Math.random() * 0.2;
	    }
	    // !Grupo de estrellas para el primer jugador

    	// Settings controles segundo jugador
    	playerDos = this.game.add.sprite(this.game.world.width - 130, this.game.world.height - 82, 'playerDos');
	    this.game.physics.arcade.enable(playerDos);
    	playerDos.body.gravity.y = 0;
    	playerDos.body.collideWorldBounds = true;
	    playerDos.animations.add('left', [0, 1, 2, 3], 10, true);
	    playerDos.animations.add('right', [5, 6, 7, 8], 10, true);

	    playerDos.body.velocity.x = 0;
    	cursors = this.game.input.keyboard.createCursorKeys();
    	keyGuion = Jueguin.game.input.keyboard.addKey(Phaser.Keyboard.QUOTES);
    	keyCtrl = Jueguin.game.input.keyboard.addKey(Phaser.Keyboard.UNDERSCORE);
    	// !Settings controles segundo jugador

    	// Creo el grupo de estrellas para el segundo jugador
	    starsDos = this.game.add.group();
	    starsDos.enableBody = true;

	    // Creo 8 estrellas del grupo, y las muestro, les seteo gravedad y rebote
	    for (var i = 0; i < 8; i++)
	    {
	        var star = starsUno.create(i * 120, 0, 'starDos');
	        star.body.gravity.y = 300;
	        star.body.bounce.y = 0.7 + Math.random() * 0.2;
	    }
	    // !Grupo de estrellas para el segundo jugador
    },

    update: function() {
	    this.game.physics.arcade.collide(playerUno, blockLayer);	// Seteo la colision del chaboncito con el laberinto
	    this.game.physics.arcade.collide(playerDos, blockLayer);

	    // Actualizo parametros del jugador uno
	    this.game.physics.arcade.overlap(playerUno, starsUno, collectStar, null, this);	// Fisica
	    playerUno.body.velocity.x = this.VELOCITY_INI;				// Sete la velocidad inicial, asi qeuda cuando suelto las keys
	    playerUno.body.velocity.y = this.VELOCITY_INI;

	    // update de los controles
	    runner();	// Llamo la funcio que verifica si alguno corre

	    if (keyA.isDown) {
	    	if (corre) {
	    		playerUno.body.velocity.x = this.RUN_NEG;
	    	} else {
	    		playerUno.body.velocity.x = this.VELOCITY_NEG;
	    	}
	     	playerUno.animations.play('left');
	    } else if (keyD.isDown) {
	    	if (corre) {
	    	   	playerUno.body.velocity.x = this.RUN_POS;
	    	} else {
	    	   	playerUno.body.velocity.x = this.VELOCITY_POS;
	    	}
	        playerUno.animations.play('right');
	    } else if (keyW.isDown) {
	    	if (corre) {
	    	   	playerUno.body.velocity.y = this.RUN_NEG;
	    	} else {
	    	   	playerUno.body.velocity.y = this.VELOCITY_NEG;
	    	}
	     	playerUno.animations.play('left');
	    } else if (keyS.isDown) {
	    	if (corre) {
	    		playerUno.body.velocity.y = this.RUN_POS;
	    	} else {
	    		playerUno.body.velocity.y = this.VELOCITY_POS;
	    	}
	        playerUno.animations.play('right');
	    } else {
	        playerUno.animations.stop();
	        playerUno.frame = 4;
	    }

	    if (keyQ.isDown) {
	    	// LLAMO AL ESTADO BOMBA
	    	alert("hola");
	    }
	    // !Actualizo parametros del jugador uno

	    // Actualizo parametros del jugador dos
	    this.game.physics.arcade.overlap(playerDos, starsUno, collectStar, null, this);
	    playerDos.body.velocity.x = playerDos.body.velocity.y = this.VELOCITY_INI;	     
	    if (cursors.left.isDown) {
	    	if (correDos) {
	    		playerDos.body.velocity.x = this.RUN_NEG;
	    	} else {
	    		playerDos.body.velocity.x = this.VELOCITY_NEG;
	    	}
	     	playerDos.animations.play('left');
	    } else if (cursors.right.isDown) {
	    	if (correDos) {
	        	playerDos.body.velocity.x = this.RUN_POS;
	    	} else {
	        	playerDos.body.velocity.x = this.VELOCITY_POS;
	    	}
	        playerDos.animations.play('right');
	    } else if (cursors.up.isDown) {
	    	if (correDos) {
	    		playerDos.body.velocity.y = this.RUN_NEG;
	    	} else {
	    		playerDos.body.velocity.y = this.VELOCITY_NEG;
	    	}
	        playerDos.animations.play('left');
	    } else if (cursors.down.isDown) {
	    	if (correDos) {
	    		playerDos.body.velocity.y = this.RUN_POS;
	    	} else {
	    		playerDos.body.velocity.y = this.VELOCITY_POS;
	    	}
	        playerDos.animations.play('right');
	    } else {
	        playerDos.animations.stop();
	        playerDos.frame = 4;
	    }

	    if (keyGuion.isDown) {
	    	// LLAMO AL ESTADO BOMBA
	    	alert("hola");
	    }
	    // !Actualizo parametros del jugador dos

	    function runner() {
	    	if (keyTab.isDown) {
	    		corre = true;
	    	} else if (keyCtrl.isDown) {
	    		correDos = true;
	    	} else {
	    		corre = correDos = false;
	    	}
	    }

	    // Funcion para recolectar estrellas
	    function collectStar (player, star) {
	    	star.kill();
		}
    },

    bomba: function() {

    }
};