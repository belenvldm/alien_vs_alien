var Jueguin = Jueguin || {}; // Creo la variable del juego

Jueguin.game = new Phaser.Game(1400, 768, Phaser.AUTO); // Instancio Phaser y especifico las dimensiones

// Cargo los estados
Jueguin.game.state.add('Menu', Jueguin.MenuState);
Jueguin.game.state.add('Boot', Jueguin.BootState);
Jueguin.game.state.add('Preload', Jueguin.PreloadState);
Jueguin.game.state.add('Game', Jueguin.GameState);

// Llamo a Menu
Jueguin.game.state.start('Menu');