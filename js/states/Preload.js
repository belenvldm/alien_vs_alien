var Jueguin = Jueguin || {};

Jueguin.PreloadState = {
    preload: function() {
        // Cargo las imagenes que voy a usar
        this.load.tilemap('myTilemap', 'assets/tilemap/mapita.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('myTileset', 'assets/tilemap/tilealien1.jpg');
        // this.load.image('background', 'assets/img/background.jpg');
        this.load.spritesheet('playerUno', 'assets/img/player_uno.png', 32, 48);
        this.load.spritesheet('playerDos', 'assets/img/player_dos.png', 32, 48);
        this.load.image('starUno', 'assets/img/estre.png');
        this.load.image('starDos', 'assets/img/estre_uno.png');
    },

    create: function() {
        this.state.start('Game');
    }
};