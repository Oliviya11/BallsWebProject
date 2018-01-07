var Track = require('./Track');
var Ball = require('./Ball');
var Gun = require('./Gun');

function GameManager() {
    var BALL_VELOCITY = 2;
    var BALL_RADIUS = 12;
    var BALL_NUMBER = 4;
    var currentPos = [], balls = [];

    var track = null;
    var offset = null;



    this.getNumOffset = function (velocity) {
        return track.length / velocity;
    };

    this.getBallsPositionOnTrack = function (ball_pos) {
        return track.getPointAt(ball_pos);
    };

    this.createBalls = function () {
        var ball_pos = 0;
        for (var i=0; i<BALL_NUMBER; ++i) {
            this.createBall(i, ball_pos);
            currentPos[i] = ball_pos;
            ball_pos+=BALL_RADIUS*2;
        }
    };

    this.createBall = function (num, ball_pos) {
        var point = track.getPointAt(ball_pos);
        var my_ball = new Ball.Ball(num, point, BALL_RADIUS, "yellow");

        balls[num] = my_ball;
    };

    this.moveBall = function(num) {
        var offset = track.length / this.getNumOffset(BALL_VELOCITY);
        if (track && currentPos[BALL_NUMBER -1] < track.length - 10) {
            currentPos[num] +=offset;
            balls[num].move(this.getBallsPositionOnTrack(currentPos[num]));
        }
    };

    this.moveBalls = function() {
        for (var i=0; i<BALL_NUMBER; ++i) {
            this.moveBall(i);
        }
    };

    this.launch = function () {
        track = Track.createTrack();
        this.createBalls();
        var self = this;
        var gun = new Gun.Gun();
        view.onFrame  = function (event) {
            self.moveBalls();
            gun.move();
            gun.shoot();
        };
    };

}

module.exports.GameManager = GameManager;

