var Jueguin = Jueguin || {};

Jueguin.BootState = {
    init: function() {
    	this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	    this.scale.pageAlignHorizontally = true;
	    this.scale.pageAlignVertically = true;
    },

    // preload: function() {
    // },

    create: function() {
    	this.state.start('Preload');
    }
};