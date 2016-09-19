var Jueguin = Jueguin || {};

Jueguin.game = new Phaser.Game(1024, 768, Phaser.AUTO);

Jueguin.game.state.add('Menu', Jueguin.IniState);
Jueguin.game.state.add('Boot', Jueguin.BootState);
Jueguin.game.state.add('Preload', Jueguin.PreloadState);
Jueguin.game.state.add('Game', Jueguin.GameState);

Jueguin.game.state.start('Menu');