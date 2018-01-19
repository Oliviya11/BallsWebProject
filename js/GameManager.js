var Track = require('./Track');
var Ball = require('./Ball');
var Gun = require('./Gun');
var ColorManager = require('./ColorManager');
var Colors = require('./Colors').Colors;

function GameManager () {
  var BALL_VELOCITY = 1;
  var BALL_RADIUS = 12;
  var MOVE_CRASHED = 0.5;
  var ballNumber = 30;
  var currentPos = [], balls = [], offsets = [];
  this.colorManager = new ColorManager.ColorManager();

  var stop = false;

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
    for (var i = 0; i < ballNumber; ++i) {
      this.createBall(i, ball_pos, Colors[i]);
      currentPos[i] = ball_pos;
      ball_pos += BALL_RADIUS * 2 + MOVE_CRASHED;
      offsets[i] = track.length / this.getNumOffset(BALL_VELOCITY);
    }
  };

  this.createBall = function (num, ball_pos, color) {
    balls[num] = this.createBallImpl(num, ball_pos, color);
  };

  this.createBallImpl = function (num, ball_pos, color) {
    var point = track.getPointAt(ball_pos);
    return new Ball.Ball(num, point, BALL_RADIUS, color);
  };

  this.moveBall = function (num, vel) {
    if (track && currentPos[ballNumber - 1] < track.length - 10) {
       currentPos[num] += offset;
      if (gun.isShoot()) {
        this.onCollide(num, balls[num]);
      }
      if (balls[num]) {
        balls[num].move(this.getBallsPositionOnTrack(currentPos[num]));
        if (num > 0 && balls[num].colide(balls[num - 1])) {
          currentPos[num] += MOVE_CRASHED;
        }
      }
    }
  };

  this.moveBalls = function () {
    for (var i = 0; i < ballNumber; ++i) {
      this.moveBall(i, BALL_VELOCITY);
    }
  };

  this.launch = function () {
    // var f = new Foo('MyFoo');
    track = Track.createTrack();
    offset = track.length / this.getNumOffset(BALL_VELOCITY);
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
      var gun_ball = gun.getGunBall();
      var id = ball.colide(gun_ball);
      if (id != null) {
        var pos = currentPos[id];
        var k = 0;
        for (var i = id; i < ballNumber; ++i) {
          currentPos[i] += BALL_RADIUS * 2;
        }
        this.createNewBall(id, pos);
        this.moveChain = true;
        this.destroyBalls(id);
        gun.removeCurrBallImpl();
      }
    }
  };

  this.createNewBall = function (id, pos) {
    var new_ball = this.createBallImpl(id, pos, gun.getGunBall().getColor());
    balls.splice(id, 0, new_ball);
    currentPos.splice(id, 0, pos);
    ballNumber++;
    this.setIds(id+1, 1);
    //console.log("balls: ", balls);
  };

  this.setIds = function (begin, delta) {
    for (var i = begin; i < ballNumber; ++i) {
      var new_id = balls[i].getId() + delta;
      balls[i].setId(new_id);
    }
  };

  this.destroyBalls = function (id) {
    var rightBalls = this.countRight(id);
    var leftBalls = this.countLeft(id);
    var num = leftBalls.length + 1 + rightBalls.length;
    if (num > 2) {
      var ballsIdDestroy = leftBalls.concat([id], rightBalls);
      for (var i = 0; i < ballsIdDestroy.length; ++i) {
        var id = ballsIdDestroy[i];
        balls[id].remove();
      }
      var self = this;
      //console.log(balls.splice(ballsIdDestroy[0], num));
      //console.log(currentPos.splice(ballNumber-num, num));
     // ballNumber -= num;
     // self.setIds(ballsIdDestroy[0], -num);
    }
  };
  this.countRight = function (id) {
    var ids = [];
    var counter = 0;
    var i = id + 1;
    while (i < ballNumber && balls[i].getColor() === balls[i-1].getColor()) {
      ids[counter++] = balls[i].getId();
      ++i;
    }
    return ids;
  };

  this.countLeft = function (id) {
    var ids = [];
    var counter = 0;
    var i = id - 1;
    while (i > -1 && balls[i].getColor() === balls[i+1].getColor()) {
      ids[counter++] = balls[i].getId();
      --i;
    }
    return ids.reverse();
  }

}
var Instance = null;
function createInstance () {
  Instance = new GameManager();
}
createInstance();

module.exports.Instance = Instance;

