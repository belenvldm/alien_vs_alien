var Jueguin = Jueguin || {};
var button; // Creo la variable para el boton

// Creo el estado del Menu
Jueguin.MenuState = {
    init: function() {
        // Establezco que se vea la totalidad del juego
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        // Centro el state en la pantalla
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
    },

    preload: function () {
        // Cargo el boton
        this.game.load.spritesheet('button', 'assets/img/button_sprite_sheet.png', 192, 71);
    },

    create: function () {
        // Situo el boton y le setteo el ancla en el medio
        button = this.game.add.button(this.game.world.centerX, this.game.world.centerY + 180, 'button', actionOn, this, 1, 0);
        button.anchor.setTo(0.5);
        
        // Disparo una accion
        function actionOn() {
            this.actionOnClick();
        }
    },

    actionOnClick: function () {
        // Voy al Boot
        Jueguin.game.state.start('Boot');
    }
};