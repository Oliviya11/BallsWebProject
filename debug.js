(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
function Ball(id, center, radius, color ) {

    this.id = id;

    var ball = new Path.Circle({
        center: center,
        radius: radius,
        fillColor: 'yellow'
    });

    this.getId = function() {
        return this.id;
    };

    this.move = function(pos) {
         ball.position = pos;
    };
}

module.exports.Ball = Ball;



},{}],2:[function(require,module,exports){
var Track = require('./Track');
var Ball = require('./Ball');

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
        view.onFrame  = function (event) {
            self.moveBalls();
        };
    };

}

module.exports.GameManager = GameManager;


},{"./Ball":1,"./Track":3}],3:[function(require,module,exports){
var WINDOW_WIDTH = view.size.width;
var WINDOW_HEIGHT = view.size.height;

function createTrack() {
    track = new Path();
    track.add(new Point(WINDOW_WIDTH/8, WINDOW_HEIGHT/2));
    track.add(new Point(WINDOW_WIDTH/5, WINDOW_HEIGHT/4.5));
    track.add(new Point(WINDOW_WIDTH/2, WINDOW_HEIGHT/4));
    track.add(new Point(WINDOW_WIDTH*0.8, WINDOW_HEIGHT/2));
    track.add(new Point(WINDOW_WIDTH*0.75, WINDOW_HEIGHT*0.8));
    track.add(new Point(WINDOW_WIDTH*0.5, WINDOW_HEIGHT*0.83));
    track.add(new Point(WINDOW_WIDTH*0.3, WINDOW_HEIGHT*0.7));
    track.add(new Point(WINDOW_WIDTH*0.3, WINDOW_HEIGHT*0.45));
    track.add(new Point(WINDOW_WIDTH*0.5, WINDOW_HEIGHT*0.46));

    track.strokeColor = 'brown';
    track.strokeWidth = 25;

    track.smooth();
    var finish  = new Path.Circle({
        center: track.getPointAt(track.length),
        radius: 26,
        fillColor: 'brown'
    });

    return track;
    //offset = track.length / getNumOffset(2);

}

module.exports.createTrack = createTrack;
},{}],4:[function(require,module,exports){
var GameManager = require('./GameManager');

var game_manager =  new GameManager.GameManager();
game_manager.launch();

},{"./GameManager":2}]},{},[4]);
