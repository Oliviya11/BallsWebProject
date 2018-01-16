(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
function Ball (id, center, radius, color) {

  this.id = id;
  this.color = color;

  var ball = new Path.Circle({
    center: center,
    radius: radius,
    fillColor: this.color
  });

  this.getId = function () {
    return this.id;
  };

  this.setId = function (id) {
    this.id = id;
  };

  this.move = function (pos) {
    ball.position = pos;
  };

  this.getPath = function () {
    return ball;
  };

  this.changeColor = function (new_color) {
    this.color = new_color;
    ball.fillColor = new_color;
  };

  this.getColor = function () {
    return this.color;
  };

  this.colide = function (another) {
    if (another && another.getPath().intersects(ball)) {
      return this.id;
    } else {
      return null;
    }
  };
}

module.exports.Ball = Ball;



},{}],2:[function(require,module,exports){
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


},{"./Ball":1,"./Gun":3,"./Track":4}],3:[function(require,module,exports){
(function (global){
global.back_color = '#e09448';
var back_color = global.back_color;
var Ball = require('./Ball');
var GameManager = require('./GameManager');

var WINDOW_WIDTH = global.window_width;
var WINDOW_HEIGHT = global.window_height;

function Gun () {
  var BALL_RADIUS = 12;
  var rotate_angle = -90;
  var step = 10;
  var gun_ball1 = null, gun_ball2 = null, line = null, gun_body = null;
  var pivot_point = null;
  var shoot = false;
  var offset = null;
  var BALL_VELOCITY = 10;
  var ball_pos = 0;
  var curr_line = null;
  var curr_ball = null;

  this.createGun = function () {
    this.createLine();
    gun_ball2 = new Path.Circle(new Point(WINDOW_WIDTH * 0.45, WINDOW_HEIGHT * 0.6), BALL_RADIUS);
    gun_ball2.fillColor = 'red';
    gun_body = new Path.Circle(new Point(WINDOW_WIDTH * 0.4, WINDOW_HEIGHT * 0.6), WINDOW_WIDTH * 0.05);
    gun_body.fillColor = 'black';
    var hole = this.createHole(gun_body, 0.55, gun_body.bounds.center);
    gun_ball1 = this.createOneBall(gun_body);
    gun_body.removeSegment(0);
    gun_body.removeSegment(5);

    this.createGunGroup(gun_body, gun_ball1, gun_ball2, line, hole);
  };

  this.createHole = function (gun_body, size, abs_pos, color, opacity) {
    var hole = gun_body.clone();
    hole.scale(size, abs_pos);
    if (color) {
      hole.fillColor = color;
    }
    if (opacity) {
      hole.opacity = 0.5;
    }
    return hole;
  };

  this.createOneBall = function (gun_body) {
    var gun_ball1 = gun_body.clone({insert: true, deep: true});
    gun_ball1.fillColor = 'yellow';
    gun_ball1.scale(0.2);
    return gun_ball1;
  };

  this.createGunGroup = function (gun_body, gun_ball1, gun_ball2, line, hole) {
    gun = new Group([line, gun_body, gun_ball2, hole, gun_ball1]);
    pivot_point = gun.bounds.center + new Point(-350, 0);
    gun.rotate(rotate_angle, pivot_point);
  };

  this.createLine = function () {
    line = new Path();
     line.strokeColor = 'black';
    line.add(new Point(WINDOW_WIDTH * 0.45, WINDOW_HEIGHT * 0.6));
    line.add(new Point(WINDOW_WIDTH, WINDOW_HEIGHT * 0.6));
    offset = line.length / this.getNumOffset(BALL_VELOCITY);
  };

  this.flipColors = function () {
    var curr_color = gun_ball1.fillColor;
    gun_ball1.fillColor = gun_ball2.fillColor;
    gun_ball2.fillColor = curr_color;
  };
  this.move = function () {
    var self = this;
    view.onKeyDown = function (event) {
      if (event.key == 'right') {
        gun.rotate(step, pivot_point);
      }
      else if (event.key == 'left') {
        gun.rotate(-step, pivot_point);
      }
      else if ((event.key == 'up' || event.key == 'down') && !shoot) {
        self.flipColors();
      }
      else if (event.key == 'space') {
        self.startShooting();
      }
    };

    view.onMouseMove = function (event) {

      /*
       var rotate = event.point.angle / 10;
       if (event.point.x < WINDOW_WIDTH/2) {
       gun.rotate(-rotate, pivot_point);
       }
       else {
       gun.rotate(rotate, pivot_point);
       }
       */

    };
    view.onClick = function (event) {
      self.startShooting();
    };
  };

  this.startShooting = function () {
    if (!curr_ball) {
      this.createCurrLine();
      this.createCurrBall();
      shoot = true;
    }
  };

  this.createCurrLine = function () {
    curr_line = new Path();
    //   curr_line.strokeColor = 'black';
    curr_line.add(gun.children[0].getPointAt(0));
    curr_line.add(gun.children[0].getPointAt(gun.children[0].length));
  };

  this.createCurrBall = function () {
    curr_ball = new Ball.Ball(null, gun.children[2].position, BALL_RADIUS, gun.children[2].fillColor);
    gun_ball2.fillColor = back_color;
    GameManager.Instance.moveChain = false;
  };

  this.getNumOffset = function (velocity) {
    return line.length / velocity;
  };

  this.getBallsPositionOnLine = function (ball_pos) {

    return curr_line.getPointAt(ball_pos);

  };

  this.removeCurrBall = function () {
    /*
     if (curr_ball) {

     console.log("path.position.x: ", path.position.x);
     console.log("WINDOW_WIDTH: ", WINDOW_WIDTH);
     console.log("res", path.position.x > WINDOW_WIDTH);
     }
     */
    if (curr_ball) {
      var path = curr_ball.getPath();
      if (path.position.x <= 0 || path.position.x > WINDOW_WIDTH
        || path.position.y <= 0 || path.position.y > WINDOW_HEIGHT) {
        gun_ball2.fillColor = 'red';
        path.remove();
        curr_line.remove();
        curr_ball = null;
        shoot = false;
        ball_pos = 0;
      }
    }
  };

  this.shoot = function () {
    if (shoot) {
      ball_pos += offset;
      curr_ball.move(this.getBallsPositionOnLine(ball_pos));
      this.removeCurrBall();
    }

  };

  this.getGunBall = function () {
    return curr_ball;
  };

  this.isShoot = function () {
    return shoot;
  };
  var gun = null;
  this.createGun();

}

module.exports.Gun = Gun;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./Ball":1,"./GameManager":2}],4:[function(require,module,exports){
(function (global){
global.window_width = view.size.width;
global.window_height = view.size.height;

var WINDOW_WIDTH = global.window_width;
var WINDOW_HEIGHT = global.window_height;



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
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],5:[function(require,module,exports){
var GameManager = require('./GameManager');

//var game_manager = GameManagerInstance;
  //new GameManager.GameManager();
//console.log()
//game_manager.launch();
//console.log(GameManager.Instance);
GameManager.Instance.launch();

},{"./GameManager":2}]},{},[5]);
