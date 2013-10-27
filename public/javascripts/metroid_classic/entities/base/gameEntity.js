game.GameEntity = me.ObjectEntity.extend({
    init: function (x, y, settings) {
        this.parent(x, y, settings);

        me.debug.renderHitBox = true;
    },


    directions: {
        Up: [0, -1],
        Right: [1, 0],
        Down: [0, 1],
        Left: [-1, 0]
    },

    disabled: false,


    disable: function () {
        this.disabled = true;
    },

    enable: function () {
        this.disabled = false;
    },

    enabled: function () {
        return !this.disabled;
    }

});