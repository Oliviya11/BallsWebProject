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
  var balls = [];
  this.colorManager = new ColorManager.ColorManager();
  var stop = false;
  var track = null;
  var offset = null;
  var gun = null;
  var col_emit = false;
  var id = null;
  this.moveChain = false;
  this.showAnimation = false;
  this.stopBalls = false;
  this.idToDestroy = [];
  this.increaseDestroy = false;

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
      ball_pos += BALL_RADIUS * 2 + MOVE_CRASHED;
    }
  };

  this.createBall = function (num, ball_pos, color) {
    balls[num] = this.createBallImpl(num, ball_pos, color);
    balls[num].setOffset(offset);
    balls[num].setTrackPos(ball_pos);
  };

  this.createBallImpl = function (num, ball_pos, color) {
    var point = track.getPointAt(ball_pos);
    return new Ball.Ball(num, point, BALL_RADIUS, color);
  };

  this.moveBall = function (num) {
    if (track && balls[ballNumber - 1].getTrackPos() < track.length - 10) {
      balls[num].increaseTrackPos(balls[num].getOffset());
      if (gun.isShoot()) {
        this.onCollide(num, balls[num]);
      }
      if (balls[num]) {
        balls[num].move(this.getBallsPositionOnTrack(balls[num].getTrackPos()));
        if (num > 0 && balls[num].colide(balls[num - 1])) {
          if (!this.stopBalls) {
            balls[num].increaseTrackPos(MOVE_CRASHED);
          }
        }
      }
      this.collideAllBalls();
    }
  };

  this.collideAllBalls = function () {
    if (this.idToDestroy.length > 0 && !this.changed) {
      this.collideBack(this.idToDestroy[0] - 1, this.idToDestroy[0], offset);
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
        var pos = balls[id].getTrackPos();
        var offset = balls[id].getOffset();
        var k = 0;
        for (var i = id; i < ballNumber; ++i) {
          balls[i].increaseTrackPos(BALL_RADIUS * 2);
        }
        this.createNewBall(id, pos, offset);
        this.moveChain = true;
        this.showAnimation = true;
        this.initBallsIdDestroy(id);
        gun.removeCurrBallImpl();
      }
    }
  };

  this.createNewBall = function (id, pos, offset) {
    var new_ball = this.createBallImpl(id, pos, gun.getGunBall().getColor());
    balls.splice(id, 0, new_ball);
    balls[id].setTrackPos(pos);
    balls[id].setOffset(offset);
    ballNumber++;
    this.setIds(id + 1, 1);
  };

  this.increaseIdToDestroy = function (id) {
    if (this.idToDestroy.length > 0) {
      // console.log('before: ', this.idToDestroy);
      this.changed = true;
      var found = false;
      var i = 1;
      if (id > 0 && id < this.idToDestroy[0]) {
        i = 0;
        found = true;
      }
      while (i > 0 && i < this.idToDestroy.length) {
        if (id > this.idToDestroy[i - 1] && id < this.idToDestroy[i]
          || id > this.idToDestroy[this.idToDestroy.length - 1]) {
          found = true;
          break;
        } else {
          ++i;
        }
      }
      if (found) {
        this.idToDestroy[i]++;
      }
      this.changed = false;
    }
  };

  this.decreaseId = function (num) {
    this.changed = true;
    var reverse = false;
    console.log('not reversed: ', this.idToDestroy);
    for (var i = 1; i < this.idToDestroy.length; ++i) {
      if (this.idToDestroy[i-1] > this.idToDestroy[i]) {
        this.idToDestroy[i-1] -= num;
        reverse = true;
      }
    }
    if (reverse) {
      this.idToDestroy.reverse();
    }
    console.log('reversed: ', this.idToDestroy);
    this.changed = false;
  };
  this.setIds = function (begin, delta) {
    for (var i = begin; i < ballNumber; ++i) {
      var new_id = balls[i].getId() + delta;
      balls[i].setId(new_id);
    }
  };

  this.initBallsIdDestroy = function (id) {
    var rightBalls = this.countRight(id);
    var leftBalls = this.countLeft(id);
    var num = leftBalls.length + 1 + rightBalls.length;
    if (num > 2) {
      var ballsIdDestroy = leftBalls.concat([id], rightBalls);
      if (ballsIdDestroy[0]) {
        this.stopChain(ballsIdDestroy);
      }
      for (var i = 0; i < ballsIdDestroy.length; ++i) {
        var id = ballsIdDestroy[i];
        balls[id].remove();
        //balls[id].setRemoved();
      }
      // this.moveChainBack();
      //
      this.idToDestroy.push(ballsIdDestroy[0]);
      this.decreaseId(num-1);
      this.destroyBalls(ballsIdDestroy);
    } else {
      console.log('increase');
      this.increaseIdToDestroy(id);
    }
  };
  this.changeBallsMove = function (idBegin, idEnd, offset) {
    for (var i = idBegin; i < idEnd; ++i) {
      balls[i].setOffset(offset);
    }
  };
  this.moveChainBack = function (ballsIdDestroy) {
    var num = ballsIdDestroy.length;
    this.changeBallsMove(ballsIdDestroy[num - 1] + 1, ballNumber, -2 * offset);
  };
  this.stopChain = function (ballsIdDestroy) {
    this.stopBalls = true;
    var num = ballsIdDestroy.length;
    this.changeBallsMove(ballsIdDestroy[num - 1] + 1, ballNumber, 0);
  };
  this.collideBack = function (beginId, endId, offset) {

    if (beginId < 0 || endId >= ballNumber || balls[beginId].colide(balls[endId]) ||
      balls[endId].colide(balls[beginId])) {
      console.log('beginId: ', beginId);
      console.log('endId: ', endId);
      var finalId = this.idToDestroy[1] ? this.idToDestroy[1] : ballNumber;
     // if (endId == 18) finalId = ballNumber;
      this.changeBallsMove(endId, finalId, offset);
      this.stopBalls = false;
      this.idToDestroy.shift();
    }
  };

  this.changePos = function (idBegin, idEnd, offset) {
    var i = idBegin + 1;
    while (i < idEnd && balls[i].getTrackPos() - balls[i - 1].getTrackPos() <= BALL_RADIUS * 2 + MOVE_CRASHED) {
      balls[i].setOffset(offset);
      balls[i - 1].setOffset(offset);
      i++;
    }
  };
  this.destroyBalls = function (ballsIdDestroy) {
    var num = ballsIdDestroy.length;
    balls.splice(ballsIdDestroy[0], num);
    ballNumber -= num;
    this.setIds(ballsIdDestroy[0], -num);
  };

  this.countRight = function (id) {
    var ids = [];
    var counter = 0;
    var i = id + 1;
    while (i < ballNumber && balls[i].getColor() === balls[i - 1].getColor()) {
      ids[counter++] = balls[i].getId();
      ++i;
    }
    return ids;
  };

  this.countLeft = function (id) {
    var ids = [];
    var counter = 0;
    var i = id - 1;
    while (i > -1 && balls[i].getColor() === balls[i + 1].getColor()) {
      ids[counter++] = balls[i].getId();
      --i;
    }
    return ids.reverse();
  };

}
var Instance = null;
function createInstance () {
  Instance = new GameManager();
}
createInstance();

module.exports.Instance = Instance;

