var Track = require('./Track');
var Ball = require('./Ball');
var Gun = require('./Gun');

function GameManager () {
  var BALL_VELOCITY = 2;
  var BALL_RADIUS = 12;
  var ballNumber = 5;
  var currentPos = [], balls = [];
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
      this.createBall(i, ball_pos);
      currentPos[i] = ball_pos;
      ball_pos += BALL_RADIUS * 2;
    }
  };

  this.createBall = function (num, ball_pos) {
    balls[num] = this.createBallImpl(num, ball_pos, 'yellow');
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
      balls[num].move(this.getBallsPositionOnTrack(currentPos[num]));
      if (num > 0 && balls[num].colide(balls[num-1])) {
        currentPos[num] += offset;
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
        /*
        for (var j = id+1; j < ballNumber; ++j) {
          if (balls[j].colide(balls[j-1])) {
            console.log("collide");
            currentPos[j] += 0.5;
          }
        }
        */
        this.createNewBall(id, pos);
        this.moveChain = true;
      }
    }
  };

  this.createNewBall = function (id, pos) {
    var new_ball = this.createBallImpl(id, pos, gun.getGunBall().getColor());
    balls.splice(id, 0, new_ball);
    currentPos.splice(id, 0, pos);
    ballNumber++;
    this.setIds(id);
  };

  this.setIds = function (id) {
    for (var i = id; i < ballNumber; ++i) {
      var new_id = balls[i].getId() + 1;
      balls[i].setId(new_id);
    }
  };
}
var Instance = null;
function createInstance () {
  Instance = new GameManager();
}

createInstance();

//var ins = createInstance();
//console.log(ins);
module.exports.Instance = Instance;

