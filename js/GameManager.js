var Track = require('./Track');
var Ball = require('./Ball');
var Gun = require('./Gun');

function GameManager () {
  var BALL_VELOCITY = 2.5;
  var BALL_RADIUS = 12;
  var BALL_NUMBER = 30;
  var currentPos = [], balls = [];

  var track = null;
  var offset = null;
  var gun = null;
  var col_emit = false;
  var id = null;
  this.moveChain = false;

  this.getNumOffset = function (velocity) {
    return track.length / velocity;
  };

  this.getBallsPositionOnTrack = function (ball_pos) {
    return track.getPointAt(ball_pos);
  };

  this.createBalls = function () {
    var ball_pos = 0;
    for (var i = 0; i < BALL_NUMBER; ++i) {
      this.createBall(i, ball_pos);
      currentPos[i] = ball_pos;
      ball_pos += BALL_RADIUS * 2;
    }
  };

  this.createBall = function (num, ball_pos) {
    var point = track.getPointAt(ball_pos);
    var my_ball = new Ball.Ball(num + 1, point, BALL_RADIUS, 'yellow');

    balls[num] = my_ball;
  };

  this.moveBall = function (num, vel) {
    var offset = track.length / this.getNumOffset(vel);
    if (track && currentPos[BALL_NUMBER - 1] < track.length - 10) {
      currentPos[num] += offset;
      balls[num].move(this.getBallsPositionOnTrack(currentPos[num]));
      if (gun.isShoot()) {
        this.onCollide(num, balls[num]);
      }
    }
  };

  this.moveBalls = function () {
    for (var i = 0; i < BALL_NUMBER; ++i) {
      this.moveBall(i, BALL_VELOCITY);
    }
  };

  this.launch = function () {
   // var f = new Foo('MyFoo');
    track = Track.createTrack();
    this.createBalls();
    var self = this;
    gun = new Gun.Gun();
    view.onFrame = function (event) {
      self.moveBalls();
      gun.move();
      gun.shoot();
    };
  };

  this.onCollide = function (num, ball) {
    //splice
    if (!this.moveChain) {
      var id = ball.colide(gun.getGunBall());
      if (id) {
         this.moveChain = true;
         for (var i = id; i < BALL_NUMBER; ++i) {
         currentPos[i] += (BALL_RADIUS * 2);
         }
      }
    }
  };

}
var Instance = null;
function createInstance() {
  Instance = new GameManager();
}

createInstance();

//var ins = createInstance();
//console.log(ins);
module.exports.Instance = Instance;

