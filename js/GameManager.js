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
    if (this.idToDestroy.length > 0 && !this.increaseDestroy) {
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
    this.increaseIdToDestroy(id);
    var new_ball = this.createBallImpl(id, pos, gun.getGunBall().getColor());
    balls.splice(id, 0, new_ball);
    balls[id].setTrackPos(pos);
    balls[id].setOffset(offset);
    ballNumber++;
    this.setIds(id + 1, 1);
  };

  this.increaseIdToDestroy = function(id) {
     this.increaseDestroy = true;
     for (var i = 0; i < this.idToDestroy.length; ++i) {
       if (id < this.idToDestroy[i]) {
         this.idToDestroy[i]++;
       }
     }
     this.increaseDestroy = false;
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
      this.stopChain(ballsIdDestroy);
      for (var i = 0; i < ballsIdDestroy.length; ++i) {
        var id = ballsIdDestroy[i];
        balls[id].remove();
        //balls[id].setRemoved();
      }
     // this.moveChainBack();
      this.idToDestroy.push(ballsIdDestroy[0]);
      console.log('this.idToDestroy', this.idToDestroy);
      this.destroyBalls(ballsIdDestroy);
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
    if (beginId < 0 || endId >= ballNumber || balls[beginId].colide(balls[endId])) {
      // console.log('beginId: ', beginId);
      // console.log('endId: ', endId);
      this.changeBallsMove(endId, ballNumber, offset);
      this.stopBalls = false;
      this.idToDestroy.shift();
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

