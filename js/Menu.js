var Jueguin = Jueguin || {};

Jueguin.MenuState = {
    init: function() {

    },

    preload: function () {

    },

    create: function () {
        button = this.game.add.button(this.game.world.centerX, this.game.world.centerY + 180, 'button', actionOn, this, 1, 0);
        button.anchor.setTo(0.5);
        
        function actionOn() {
            this.actionOnClick();
        }
    },

    actionOnClick: function () {
        Jueguin.game.state.start('Boot');
    }
};