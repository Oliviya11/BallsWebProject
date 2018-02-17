var Track = require('./Track');
var Ball = require('./Ball');
var Gun = require('./Gun');
var ColorManager = require('./ColorManager');
var Colors = require('./Colors').Colors;

function GameManager () {
  var BALL_VELOCITY = 1.5;
  var BALL_RADIUS = 12;
  var MOVE_CRASHED = 0.5;
  var ballNumber = Colors.length;
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
  this.changed = false;

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
        if (num > 0 && balls[num].collide(balls[num - 1])) {
          if (!this.stopBalls) {
            balls[num].increaseTrackPos(MOVE_CRASHED);
          }
        }
        if (this.idToDestroy.length === 0) {
          if (num > 0 && balls[num].getPos() - balls[num - 1].getPos() > BALL_RADIUS * 2 + MOVE_CRASHED) {
            balls[num - 1].increaseTrackPos(MOVE_CRASHED);
          }
        }
      }
      this.collideAllBalls();
    }
  };

  this.collideAllBalls = function () {
    for (var i = 0; i < this.idToDestroy.length; ++i) {
      this.collideBack(this.idToDestroy[i] - 1, this.idToDestroy[i], offset, i);
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
      var id = ball.collideId(gun_ball);
      if ((id != null && !isNaN(id)) || id === 0) {
        var pos = balls[id].getTrackPos();
        var offset = balls[id].getOffset();
        var k = 0;
        for (var i = id; i < ballNumber; ++i) {
          balls[i].increaseTrackPos(BALL_RADIUS * 2);
        }
        this.createNewBall(id, pos, offset);
        this.moveChain = true;
        this.showAnimation = true;
        this.increaseIdToDestroy(id);
        var self = this;
        setTimeout(function () {
          self.initBallsIdDestroy(id);
        }, 200);
        gun.removeCurrBallImpl();
      }
    }
  };

  this.createNewBall = function (id, pos, offset) {
    this.changed = true;
    var color = gun.getGunBall().getColor();
    this.colorManager.increase(color);
    var new_ball = this.createBallImpl(id, pos, color);
    balls.splice(id, 0, new_ball);
    balls[id].setTrackPos(pos);
    balls[id].setOffset(offset);
    ballNumber++;
    this.setIds(id + 1, 1);
    var self = this;
    this.setFalseChanged();
  };

  this.increaseIdToDestroy = function (id) {
    console.log('before increase: ', this.idToDestroy);
    if (this.idToDestroy.length > 0) {
      var found = false;
      var i = 1;
      if (id > 0 && id < this.idToDestroy[0]) {
        i = 0;
        found = true;
      }
      while (i > 0 && i < this.idToDestroy.length) {
        if (id > this.idToDestroy[i - 1] && id < this.idToDestroy[i]) {
          found = true;
          break;
        } else {
          ++i;
        }
      }
      if (found) {
        for (var k = i; k < this.idToDestroy.length; ++k) {
          this.idToDestroy[k]++;
        }
      }
    }
    console.log('after decrease: ', this.idToDestroy);
  };

  this.sortIdToDestroy = function () {
    this.idToDestroy.sort(function (a, b) {
      return a - b;
    });
  };

  this.decreaseIdToDestroy = function (num, id) {
    console.log('before decrease: ', this.idToDestroy);
    var found = false;
    this.sortIdToDestroy();
    var k = 0;
    while (k < this.idToDestroy.length) {
      if (this.idToDestroy[k++] > id) {
        found = true;
        break;
      }
    }
    if (found) {
      for (var i = k - 1; i < this.idToDestroy.length; ++i) {
        if (this.idToDestroy[i] > 0) {
          this.idToDestroy[i] -= num;
        }
      }
    }
    this.sortIdToDestroy();
    this.idToDestroy = this.removeDuplicateUsingSet(this.idToDestroy);
  };

  this.setFalseChanged = function () {
    var self = this;
    setTimeout(function () {
      self.changed = false;
    }, 200);
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
      var nextId = -1;
      var ballsIdDestroy = leftBalls.concat([id], rightBalls);
      if (ballsIdDestroy[0]) {
        var beginId = ballsIdDestroy[0] - 1;
        var endId = ballsIdDestroy[num - 1] + 1;
        if (balls[beginId] && balls[endId] && balls[beginId].getColor() === balls[endId].getColor()) {
          this.moveChainBack(ballsIdDestroy);
          nextId = beginId + 1;
        } else {
          this.stopChain(ballsIdDestroy);
        }
      }
      for (var i = 0; i < ballsIdDestroy.length; ++i) {
        var id = ballsIdDestroy[i];
        balls[id].remove();
      }
      if (ballsIdDestroy[0]) {
        this.idToDestroy.push(ballsIdDestroy[0]);
      }
      this.decreaseIdToDestroy(num, ballsIdDestroy[0]);
      this.destroyBalls(ballsIdDestroy);
      var self = this;
      if (nextId > 0) {
        setTimeout(function () {
          self.initBallsIdDestroy(nextId);
        }, 200);
      }
    }
   // alert(this.idToDestroy);
  };
  this.removeDuplicateUsingSet = function (arr) {
    var unique_array = Array.from(new Set(arr));
    return unique_array;
  };
  this.changeBallsMove = function (idBegin, idEnd, offset) {
    for (var i = idBegin; i < idEnd; ++i) {
      if (balls[i]) {
        balls[i].setOffset(offset);
      }
    }
  };
  this.moveChainBack = function (ballsIdDestroy) {
    var num = ballsIdDestroy.length;
    this.changeBallsMove(ballsIdDestroy[num - 1] + 1, ballNumber, -4 * offset);
  };
  this.stopChain = function (ballsIdDestroy) {
    this.stopBalls = true;
    var num = ballsIdDestroy.length;
    this.changeBallsMove(ballsIdDestroy[num - 1] + 1, ballNumber, 0);
  };
  this.collideBack = function (beginId, endId, offset, pos) {
    if (!this.changed) {
      if ((beginId < 0 ||
        endId >= ballNumber)) {
        this.collideBackImpl(beginId, endId, pos);
      }
      if (balls[beginId] && balls[endId] && (balls[beginId].collide(balls[endId]))) {
        if (Math.abs(balls[beginId].getPos() - balls[endId].getPos()) <= BALL_RADIUS * 2) {
           // alert('beginId: ' + beginId + 'endId: ' + endId);
          this.collideBackImpl(beginId, endId, pos);
        }
      }
    }
  };

  this.collideBackImpl = function (beginId, endId, pos) {
    var finalId = this.idToDestroy[pos+1] ? this.idToDestroy[pos+1] : ballNumber;
    if (balls[beginId]) {
      this.changeBallsMove(endId, finalId, balls[beginId].getOffset());
    }
    this.stopBalls = false;
    this.idToDestroy.splice(pos, 1);
   // this.idToDestroy.shift();
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
    var splicedBalls = balls.splice(ballsIdDestroy[0], num);
    ballNumber -= num;
    this.setIds(ballsIdDestroy[0], -num);
    this.decreaseColors(splicedBalls);
  };

  this.decreaseColors = function (splicedBalls) {
    for (var i = 0; i < splicedBalls.length; ++i) {
      this.colorManager.decrease(splicedBalls[i].getColor());
    }
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

