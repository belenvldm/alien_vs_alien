var Jueguin = Jueguin || {};

// Creo las variables del juego
var playerUno;			// Jugador uno
var playerDos;			// Jugador dos
var keyA;				// Control izquierdo jugador uno
var keyD;				// Control derecho jugador uno
var keyW;				// Control arriba jugador uno
var keyS;				// Control abajo jugador uno
var keyQ;				// Control bomba jugador uno
var keyTab;				// Control correr jugador uno
var cursors;			// Controles jugador dos
var keyGuion;			// Control bomba jugador uno
var keyCtrl;			// Control correr jugador uno
var scoreUno;			// Puntaje del jugador uno
var unoTxt;				// Texto de puntaje jugador uno
var scoreUnoTxt;		// Texto de puntaje jugador uno
var scoreDos;			// Puntaje del jugador dos
var dosTxt;				// Texro de puntaje jugador dos
var scoreDosTxt;		// Texto de puntaje jugador dos
var map;				// Mapa con el tilemap
var backgroundLayer;	// El fonde del tile map
var blockLayer;			// El laberinto del tile map
var corre;				// Booleano primer jugador
var correDos;			// Booleano segundo jugador
var starsUno;			// Grupo de estrellas para el jugador uno
var starsUnoCentro;		// Grupo de estrellas para el jugador uno
var starsDosCentro;		// Grupo de estrellas para el jugador dos
var starsDos;			// Grupo de estrellas para el jugador dos
var bombaUno;			// Icono de bomba jugador uno
var bombaDos;			// Icono de bomba jugador dos
var posX;				// Poscicion en "X" del jugador uno 
var posY; 				// Poscicion en "Y" del jugador uno
var posXDos;			// Poscicion en "X" del jugador dos
var posYDos; 			// Poscicion en "Y" del jugador dos
var particleFire;		// Particulas de la explosion
var bombaDosX;			// Cordenadas de la bomba dos
var bombaDosY; 			// Cordenadas de la bomba dos
var winTxt;				// Texto ganador
var timeTxt;			// Texto time
var elTime;				// Counter


Jueguin.GameState = {
    init: function() {
	    this.VELOCITY_INI = 0;
	    this.VELOCITY_POS = 100;
	    this.VELOCITY_NEG = -100;
	    this.RUN_POS = 200;
	    this.RUN_NEG = -200;
	    corre = false;
	    correDos = false;
		scoreUno = 0;
		scoreDos = 0;
		tiempo = 20;
    },

    create: function() {
		this.game.physics.startSystem(Phaser.Physics.ARCADE);		// Fisica del juego
		
    	// this.background = this.add.sprite(0, 0, 'background');		// Agrego el fondo
    	// Armo el mapa
    	map = this.add.tilemap('myTilemap');						// Agrego el mapa
    	map.addTilesetImage('tilealien1', 'myTileset');				// Seteo las tiles
		
		backgroundLayer = map.createLayer('fondin');				// Creo el layer del fondo
		backgroundLayer.resizeWorld();
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
		
		// Creo los grupos de estrellas
		starsUno = this.game.add.emitter(this.game.world.width - 360, this.game.world.height - 720); // emitter, un grupo que genera objetos
		starsUno.makeParticles('starUno'); // Establezco que objetos
		starsUno.start(false, 3000, 500);  // Lo inicio y establezco cuanto duran los objetos y ccuanto tardan en aparecer

		starsDos = this.game.add.emitter(this.game.world.width - 960, this.game.world.height - 712);
		starsDos.makeParticles('starDos');
		starsDos.start(false, 3000, 500);
		
		starsUnoCentro = this.game.add.emitter(this.game.world.width - 550, this.game.world.height - 350);
		starsUnoCentro.makeParticles('starUno');
		starsUnoCentro.start(false, 10000, 600);
		
		starsDosCentro = this.game.add.emitter(this.game.world.width - 550, this.game.world.height - 350);
		starsDosCentro.makeParticles('starDos');
		starsDosCentro.start(false, 10000, 600);
		// !Creo los grupos de estrellas

	    // Seteo los controles, cada key a la variable que corresponde
    	keyA = Jueguin.game.input.keyboard.addKey(Phaser.Keyboard.A);
    	keyD = Jueguin.game.input.keyboard.addKey(Phaser.Keyboard.D);
    	keyW = Jueguin.game.input.keyboard.addKey(Phaser.Keyboard.W);
    	keyS = Jueguin.game.input.keyboard.addKey(Phaser.Keyboard.S);
    	keyQ = Jueguin.game.input.keyboard.addKey(Phaser.Keyboard.Q);
    	keyTab = Jueguin.game.input.keyboard.addKey(Phaser.Keyboard.ONE);
	    // !Settings primer jugador

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

    	// Textos de puntajes y tiempo
    	unoTxt = this.game.add.text(this.game.world.width - 10, 10, 'Score Violetin: ', {fontSize: '32px',fill: '#de98ff'});
    	scoreUnoTxt = this.game.add.text(this.game.world.width - 10, 40, '0', {fontSize: '32px',fill: '#de98ff'});

    	dosTxt = this.game.add.text(this.game.world.width - 10, this.game.world.height - 120, 'Score Rositin: ', {fontSize: '32px',fill: '#ff98b1'});
    	scoreDosTxt = this.game.add.text(this.game.world.width - 10, this.game.world.height - 90, '0', {fontSize: '32px',fill: '#ff98b1'});
    	// !Textos de puntajes

    	timeTxt = this.game.add.text(this.game.world.width - 10, this.game.world.centerY, 'Time: ', {fontSize: '32px',fill: '#de98ff'});
		elTime = this.game.time.events.add(Phaser.Timer.SECOND * 10, theEnd, this);  // Tiempo de juego

		function theEnd() {
			this.andTheWinnerIs();
			this.render();
		}
    },

    update: function() {
	    this.game.physics.arcade.collide(playerUno, blockLayer);	// Seteo la colision del chaboncito con el laberinto
	    this.game.physics.arcade.collide(playerDos, blockLayer);		
		this.game.physics.arcade.collide(starsUno, blockLayer);		// Seteo la colision de las estrellas con el laberinto
		this.game.physics.arcade.collide(starsDos, blockLayer);
		this.game.physics.arcade.collide(starsUnoCentro, blockLayer);
		this.game.physics.arcade.collide(starsDosCentro, blockLayer);
		this.game.physics.arcade.collide(playerUno, bombaUno);
		this.game.physics.arcade.collide(playerDos, bombaDos);
		this.game.physics.arcade.collide(particleFire, blockLayer);
		this.game.physics.arcade.overlap(playerUno, particleFire, tocado, null, this);
		this.game.physics.arcade.overlap(playerDos, particleFire, tocado, null, this);

	    // Actualizo parametros del jugador uno
	    this.game.physics.arcade.overlap(playerUno, starsUno, collectStar, null, this);			// Fisica
	    this.game.physics.arcade.overlap(playerUno, starsUnoCentro, collectStar, null, this);	// Fisica
	   
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
	    	posX = playerUno.position.x;	// Obtengo la posicion X del jugador
	    	posY = playerUno.position.y;	// Obtengo la posicion Y del jugador
	    	bomba(posX, posY,playerUno);	// Llamo la funcion bomba, pasando las posiciones del jugador
	    }
	    // !Actualizo parametros del jugador uno

	    // Actualizo parametros del jugador dos
	    this.game.physics.arcade.overlap(playerDos, starsDos, collectStar, null, this);
		this.game.physics.arcade.overlap(playerDos, starsDosCentro, collectStar, null, this);

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
	    	posXDos = playerDos.position.x;
	    	posYDos = playerDos.position.y;
	    	bomba(posXDos, posYDos, playerDos);
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
			if (player == playerUno) {
				scoreUno += 10;
            	scoreUnoTxt.text = scoreUno;
            } else {
            	scoreDos += 10;
            	scoreDosTxt.text = scoreDos;
            }

            star.kill();
		}
		
		// Funcion Bomba, explota y descuenta vida
		function bomba (posX, posY, player) {
			if (player == playerUno) {
				bombaUno = Jueguin.game.add.sprite(posX, posY, 'bombaUno'); // lo agrego al escenario
        		Jueguin.game.time.events.add(Phaser.Timer.SECOND * 2, explota, this); // Empieza el timer para el boom
        		bombaUno.lifespan = 2000;	// Desaparecer la bomba
			} else {
				bombaDos = Jueguin.game.add.sprite(posX, posY, 'bombaDos');
				Jueguin.game.time.events.add(Phaser.Timer.SECOND * 2, explotaDos, this);
        		bombaDos.lifespan = 2000;
			}
		}
			
		function explota() {
			boom(posX,posY);
		}

		function explotaDos() {
			bombaDosX = bombaDos.position.x;	// Obtengo la posicion X de la bomba
			bombaDosY = bombaDos.position.y;
			boom(bombaDosX,bombaDosY);
		}

		function boom(bombaX,bombaY) {
			particleFire = Jueguin.game.add.emitter(bombaX, bombaY);
			particleFire.makeParticles('explosion');
			particleFire.gravity = 0;
			particleFire.minParticleScale = 0.5;
    		particleFire.maxParticleScale = 1.5;
			particleFire.start(false, 600, 600);
		}

		function tocado(player) {
			if (player == playerUno) {
				resta = Math.floor(Math.random() * (10 - 4) + 4);
				scoreUno -= resta;
            	scoreUnoTxt.text = scoreUno;

			} else {
				resta = Math.floor(Math.random() * (10 - 4) + 4);
				scoreDos -= resta;
            	scoreDosTxt.text = scoreDos;
			}
		}
	},

	andTheWinnerIs: function () {
		bg = Jueguin.game.add.sprite(0, 0, 'bgWin');
		winTxt = Jueguin.game.add.text(Jueguin.game.world.centerX - 400, Jueguin.game.world.centerY - 60, "", {fontSize: '100px',fill: '#fff'});
		if (scoreUno > scoreDos) {
			winTxt.text = 'Ganaste!! Violetin';
		} else if (scoreUno < scoreDos) {
			winTxt.text = 'Ganaste!! Rositin';
		} else {
			winTxt.text = 'Empataron!!';
		}

		Jueguin.game.time.events.add(Phaser.Timer.SECOND * 2, inicio, this);

        function inicio() {
			Jueguin.game.state.start('Menu');
        }
	},

	render: function() {
		timeTxt.text = 'Time: ' + this.game.time.events.duration;
    }
};