//  The Game
var game = {

    'onload': function () {
        //  Initialize video
        if (!me.video.init("screen", 640, 480, true, 'auto')) {
            alert("Your browser does not support HTML5 canvas.");
            return;
        }

        //  Add "#debug" to the URL to enable the debug panel
        if (document.location.hash === "#debug") {
            window.onReady(function () {
                me.plugin.register.defer(debugPanel, "debug");
            });
        }

        //  Initialize the audio
        me.audio.init('mp3,ogg');

        //  Set a callback to run when loading is complete
        me.loader.onload = this.loaded.bind(this);

        //  Load the resources
        me.loader.preload(game.resources);

        //  Initialize the melonJS and display the loading screen
        me.state.change(me.state.LOADING);
    },

    //  Run once game resources loaded
    'loaded': function () {
        me.state.set(me.state.MENU, new game.TitleScreen());
        me.state.set(me.state.PLAY, new game.PlayScreen());

        //  Add Samus to the entity pool
        me.entityPool.add('samusAran', game.SamusEntity);

        //  Enable keyboard (joypad to come later..  ;-)  )
        me.input.bindKey(me.input.KEY.LEFT, 'left');
        me.input.bindKey(me.input.KEY.RIGHT, 'right');
        me.input.bindKey(me.input.KEY.X, 'jump', true);
        me.input.bindKey(me.input.KEY.Z, 'shoot', true);

        // Start the game.
        me.state.change(me.state.PLAY);
    }
};

window.onReady(function onReady() {
    game.onload();
})