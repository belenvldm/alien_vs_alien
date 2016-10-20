var Jueguin = Jueguin || {};

Jueguin.PreloadState = {
    preload: function() {
        // Cargo las imagenes que voy a usar
        this.load.tilemap('myTilemap', 'assets/tilemap/mapita.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('myTileset', 'assets/tilemap/tilealien1.jpg');
        this.load.spritesheet('playerUno', 'assets/img/player_uno.png', 32, 48);
        this.load.spritesheet('playerDos', 'assets/img/player_dos.png', 32, 48);
        this.load.image('starUno', 'assets/img/estre_uno.png');
        this.load.image('starDos', 'assets/img/estre.png');
        this.load.image('bombaUno', 'assets/img/boom_uno.png', 48, 48);
        this.load.image('bombaDos', 'assets/img/boom.png', 48, 48);
        this.load.image('explosion', 'assets/img/fire.png');
        this.load.image('bgWin', 'assets/img/back.png');
    },

    create: function() {
        this.state.start('Game');
    }
};