/**
 * Samus Aran
 *
 * @type {*}
 */
game.SamusEntity = game.AnimatedEntity.extend({

    init: function (x, y, settings) {
        var self = this;

        //  Call the constructor
        self.parent(x, y, settings);

        //  Set gravity
        self.gravity = 0.35;

        //  Set the default horizontal / vertical acceleration
        self.setVelocity(4, 1);

        self.setMaxVelocity(4, 12);

        //  Adjust the bounding box
        self.updateColRect(20, 24, 12, 64);

        //  Set the display to follow Samus on both axis
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);

        //  Setup animations
        self.addAnimations();
        self.setAnimation('idle_intro');
    },

    animations: {
        idle_intro: [0],
        idle_left: [2],
        idle_left_shooting: [2],
        idle_left_shooting_up: [47],
        idle_right: [1],
        idle_right_shooting: [1],
        idle_right_shooting_up: [46],

        jumping_spinning_left: [34, 35, 36, 37],
        jumping_spinning_right: [30, 31, 32, 33],
        jumping_up_left: [25],
        jumping_up_left_shooting: [25],
        jumping_up_left_shooting_up: [29],
        jumping_up_right: [19],
        jumping_up_right_shooting: [19],
        jumping_up_right_shooting_up: [27],

        running_left: [12, 13, 14],
        running_left_shooting: [9, 10, 11],
        running_left_shooting_up: [21, 22, 23],
        running_right: [6, 7, 8],
        running_right_shooting: [3, 4, 5],
        running_right_shooting_up: [15, 16, 17]
    },

    facing: null,
    idle: true,
    running: false,

    handleJump: function () {
        var self = this;

        if (me.input.isKeyPressed('jump')) {
            // make sure we are not already jumping or falling
            if (!self.jumping && !self.falling) {

                // set current vel to the maximum defined value
                // gravity will then do the rest
                self.vel.y = -self.maxVel.y * me.timer.tick;

                // set the jumping flag
                self.jumping = true;

                if (self.isCurrentAnimation('idle_left'))
                    self.setAnimation('jumping_up_left');

                else if (self.isCurrentAnimation('idle_right'))
                    self.setAnimation('jumping_up_right');

                else if (self.isCurrentAnimation('running_left'))
                    self.setAnimation('jumping_spinning_left');

                else if (self.isCurrentAnimation('running_right'))
                    self.setAnimation('jumping_spinning_right');
            }
        }
    },

    handleMoveLeftRight: function () {
        var self = this;

        if (me.input.isKeyPressed('left')) {
            self.idle = false;
            self.vel.x -= self.accel.x * me.timer.tick;

            if (!self.falling && !self.jumping) {
                self.facing = self.directions.Left;
                self.setAnimation('running_left');
            }
            else if (self.isCurrentAnimation('running_left'))
                self.setAnimation('jumping_up_left');
        }

        else if (me.input.isKeyPressed('right')) {
            self.idle = false;
            self.vel.x += self.accel.x * me.timer.tick;

            if (!self.falling && !self.jumping) {
                self.facing = self.directions.Right;
                self.setAnimation('running_right');
            }
            else if (self.isCurrentAnimation('running_right'))
                self.setAnimation('jumping_up_right');

        }

        else {
            self.vel.x = 0;

            if (self.jumping || self.falling) return false;

            if (self.facing === self.directions.Left)
                self.setAnimation('idle_left');
            else if (self.facing === self.directions.Right)
                self.setAnimation('idle_right');
        }
    },

    update: function () {
        var self = this;

        self.handleMoveLeftRight();
        self.handleJump();

        //  Update Samus' movement
        this.updateMovement();

        this.parent();
        return true;
    }

});
