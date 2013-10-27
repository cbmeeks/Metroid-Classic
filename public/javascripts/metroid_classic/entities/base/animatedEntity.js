game.AnimatedEntity = game.GameEntity.extend({

    init: function (x, y, settings) {
        var self = this;
        self.parent(x, y, settings);

        self.name = self.name || '';
    },


    addAnimations: function () {
        var self = this;

        var anims = self.animations;
        if (anims) {

            _.each(anims, function (data, root_name) {
                self.renderable.addAnimation(root_name, data);
            });
        }
    },

    isCurrentAnimation: function (name) {
        return this.renderable.isCurrentAnimation(name);
    },

    setAnimation: function (name, onAnimationFinished) {
        var self = this;

        if (!self.renderable.isCurrentAnimation(name)) {
            self.renderable.setCurrentAnimation(name, onAnimationFinished);
        }
    }
});

