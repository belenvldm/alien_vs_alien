var Jueguin = Jueguin || {};
var button;         // Creo la variable para el boton
var txtInstruc;     // Texto de instrucciones
var txtInstruc2;     // Texto de instrucciones

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
        txtInstruc = this.game.add.text(this.game.world.centerX - 500, this.game.world.centerY - 300, '       Violetin:\n w: up, s: down \n a: left, d: right \n q: bomba, 1: correr', {fontSize: '32px',fill: '#de98ff'});
        txtInstruc2 = this.game.add.text(this.game.world.centerX + 100, this.game.world.centerY - 300, '             Rositin:\n up_arrow: up, down_arrow: down \n left_arrow: left, right_arrow: right \n {: bomba, -: correr', {fontSize: '32px',fill: '#ff98b1'});


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