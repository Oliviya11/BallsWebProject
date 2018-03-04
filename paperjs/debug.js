(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
function Ball (id, center, radius, color) {
  this.id = id;
  this.color = color;
  this.trackPos = 0;
  this.offset = 0;
  this.textId = '';
  this.setTextId = function(id) {
    if (global.debug) {
      if (id || id === 0) {
        this.textId = id;
      } else {
        this.textId = '';
      }
    }
  };

  this.setTextId(id);

  var ball = new Path.Circle({
    center: center,
    radius: radius,
    fillColor: this.color
  });

  if (global.debug) {
    this.text = new PointText({
      point: center,
      content: this.textId,
      fillColor: 'black',
      fontFamily: 'Courier New',
      fontWeight: 'bold',
      fontSize: 15
    });
  }

  this.getId = function () {
    return this.id;
  };

  this.setId = function (id) {
    this.id = id;
    this.setTextId(id);
    if (global.debug) {
      this.text.content = this.textId;
    }
  };

  this.move = function (pos) {
    ball.position = pos;
    if (pos && global.debug) {
      this.text.point = new Point(pos.x - 5, pos.y + 5);
    }
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

  this.collideId = function (another) {
    if (another && another.getPath().intersects(ball)) {
      return this.id;
    } else {
      return null;
    }
  };

  this.collide = function (another) {
   return (another && another.getPath().intersects(ball));
  };

  this.setStroke = function () {
    ball.strokeColor = 'black';
    ball.strokeWidth = 10;
  };

  this.setNoStroke = function () {
    ball.strokeWidth = 0;
  };

  this.remove = function () {
    ball.remove();
    if (global.debug)  {
      this.text.remove();
    }
  };

  this.setTrackPos = function(trackP) {
    this.trackPos = trackP;
  };

  this.getTrackPos = function () {
    return this.trackPos;
  };

  this.increaseTrackPos = function (delta) {
    this.trackPos += delta;
  };
  this.getPos = function () {
    return this.trackPos;
  };
  this.setOffset = function (offset) {
    this.offset = offset;
  };

  this.getOffset = function () {
    return this.offset;
  };

  this.setRemoved = function() {
    this.removed = true;
    this.id = null;
  };

}

module.exports.Ball = Ball;



}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],2:[function(require,module,exports){
function ColorManager() {
  this.backColor = '#e09448';
  this.prevColor = -1;
  var ColorNum = 4;
   var Color = {
     '#008000' : 12,
     '#ffa500' : 17,
     '#ff0000' : 15,
     '#0000ff' : 21
   };
   this.decrease = function (color) {
     if (Color[color] > 0) {
       Color[color] -= 1;
     }
   };
   this.increase = function (color) {
     Color[color] += 1;
   };
   this.getRandomColor = function () {
     var color = -1;
     var colorStr = '';
     if (this.checkAllZero()) {
       return this.backColor;
     }
     do {
       color = Math.floor(Math.random() * 4);
       colorStr = Object.keys(Color)[color];
     }
     while (Color[colorStr] === 0);
     return colorStr;
   };
   this.checkAllZero = function() {
     for (var i = 0; i < ColorNum; ++i) {
       var str = Object.keys(Color)[i];
       if (Color[str] !== 0) {
         return false;
       }
     }
     return true;
   }
}

module.exports.ColorManager = ColorManager;

},{}],3:[function(require,module,exports){
var Colors = [
  '#008000',
  '#0000ff',
  '#0000ff',
  '#ff0000',
  '#ffa500',
  '#ffa500',
  '#ffa500',
  '#ff0000',
  '#ff0000',
  '#0000ff',
  '#008000',
  '#ff0000',
  '#ff0000',
  '#ff0000',
  '#ff0000',
  '#ffa500',
  '#0000ff',
  '#008000',
  '#0000ff',
  '#0000ff',
  '#0000ff',
  '#0000ff',
  '#ffa500',
  '#ff0000',
  '#008000',
  '#ff0000',
  '#ffa500',
  '#0000ff',
  '#ffa500',
  '#0000ff',
  '#ff0000',
  '#ffa500',
  '#0000ff',
  '#0000ff',
  '#008000',
  '#008000',
  '#ffa500',
  '#0000ff',
  '#008000',
  '#ff0000',
  '#ff0000',
  '#ffa500',
  '#0000ff',
  '#0000ff',
  '#008000',
  '#ff0000',
  '#ff0000',
  '#ffa500',
  '#0000ff',
  '#008000',
  '#0000ff',
  '#0000ff',
  '#ffa500',
  '#ff0000',
  '#008000',
  '#ff0000',
  '#ffa500',
  '#0000ff',
  '#ffa500',
  '#0000ff',
  '#ff0000',
  '#ffa500',
  '#0000ff',
  '#0000ff',
  '#ff0000',
  '#ff0000',
  '#ff0000',
  '#ff0000',
  '#ffa500',
  '#ffa500',
  '#0000ff',
  '#0000ff',
  '#008000',
  '#008000',
  '#008000',
  '#008000',
  '#008000',
  '#008000',
  '#ffa500',
  '#ff0000',
  '#ff0000',
  '#0000ff',
  '#0000ff',
  '#008000',
  '#008000',
  '#ffa500',
  '#ffa500',
  '#0000ff',
  '#ff0000',
  '#008000',
  '#ff0000',
  '#0000ff',
  '#008000',
  '#0000ff',
  '#0000ff',
  '#ff0000',
  '#ffa500',
  '#ffa500',
  '#ffa500',
  '#ff0000',
  '#ff0000',
  '#0000ff',
  '#008000',
  '#008000',
  '#ffa500',
  '#ff0000',
  '#ff0000',
  '#0000ff',
  '#0000ff',
  '#008000',
  '#008000',
  '#ffa500',
  '#ffa500',
  '#0000ff',
  '#ff0000',
  '#008000',
  '#ff0000',
  '#0000ff',
  '#0000ff',
  '#008000',
  '#008000',
  '#ffa500',
  '#ff0000',
  '#ff0000',
  '#0000ff',
  '#0000ff',
  '#008000',
  '#008000',
  '#ffa500',
  '#ffa500',
  '#0000ff',
  '#ff0000',
  '#008000',
  '#ff0000',
  '#0000ff',
  '#0000ff',
  '#008000',
  '#008000',
  '#ffa500',
  '#ff0000',
  '#ff0000',
  '#0000ff',
  '#0000ff',
  '#008000',
  '#008000',
  '#ffa500',
  '#ffa500',
  '#0000ff',
  '#ff0000',
  '#008000',
  '#ff0000',
  '#0000ff'
];

exports.Colors = Colors;
},{}],4:[function(require,module,exports){
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
  };

  this.sortIdToDestroy = function () {
    this.idToDestroy.sort(function (a, b) {
      return a - b;
    });
  };

  this.decreaseIdToDestroy = function (num, id) {
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


},{"./Ball":1,"./ColorManager":2,"./Colors":3,"./Gun":5,"./Track":6}],5:[function(require,module,exports){
(function (global){
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
  var BALL_VELOCITY = 20;
  var ball_pos = 0;
  var curr_line = null;
  var curr_ball = null;

  this.createGun = function () {
    this.createLine();
    gun_ball2 = new Path.Circle(new Point(WINDOW_WIDTH * 0.45, WINDOW_HEIGHT * 0.68), BALL_RADIUS);
    gun_ball2.fillColor =  GameManager.Instance.colorManager.getRandomColor();
    gun_body = new Path.Circle(new Point(WINDOW_WIDTH * 0.4, WINDOW_HEIGHT * 0.68), WINDOW_WIDTH * 0.05);
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
    gun_ball1.fillColor = GameManager.Instance.colorManager.getRandomColor();
    gun_ball1.scale(0.2);
    return gun_ball1;
  };

  this.createGunGroup = function (gun_body, gun_ball1, gun_ball2, line, hole) {
    gun = new Group([line, gun_body, gun_ball2, hole, gun_ball1]);
    pivot_point = gun.bounds.center + new Point(-353, 0);
    gun.rotate(rotate_angle, pivot_point);
  };

  this.createLine = function () {
    line = new Path();
    if (global.debug) {
      line.strokeColor = 'black';
    }
    line.add(new Point(WINDOW_WIDTH * 0.45, WINDOW_HEIGHT * 0.68));
    line.add(new Point(WINDOW_WIDTH, WINDOW_HEIGHT * 0.68));
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
      if (event.key === 'right') {
        gun.rotate(step, pivot_point);
      }
      else if (event.key === 'left') {
        gun.rotate(-step, pivot_point);
      }
      else if ((event.key === 'up' || event.key === 'down') && !shoot) {
        self.flipColors();
      }
      else if (event.key === 'space') {
        self.startShooting();
      }
    };

    view.onMouseMove = function (event) {

    };
    view.onClick = function (event) {
      self.startShooting();
    };
  };

  this.startShooting = function () {
    //!GameManager.Instance.showAnimation
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
    curr_ball = new Ball.Ball(null, gun.children[2].position, BALL_RADIUS, gun.children[2].fillColor.toCSS(true));
    gun_ball2.fillColor = GameManager.Instance.colorManager.backColor;
    GameManager.Instance.moveChain = false;
  };

  this.getNumOffset = function (velocity) {
    return line.length / velocity;
  };

  this.getBallsPositionOnLine = function (ball_pos) {
    return curr_line.getPointAt(ball_pos);
  };

  this.removeCurrBall = function () {
    if (curr_ball) {
      var path = curr_ball.getPath();
      if (path.position.x <= 0 || path.position.x > WINDOW_WIDTH
        || path.position.y <= 0 || path.position.y > WINDOW_HEIGHT) {
        gun_ball2.fillColor = GameManager.Instance.colorManager.getRandomColor();
        path.remove();
        curr_line.remove();
        curr_ball = null;
        shoot = false;
        ball_pos = 0;
      }
    }
  };

  this.removeCurrBallImpl = function() {
    var path = curr_ball.getPath();
    gun_ball2.fillColor = GameManager.Instance.colorManager.getRandomColor();
    path.remove();
    curr_line.remove();
    curr_ball = null;
    shoot = false;
    ball_pos = 0;
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
},{"./Ball":1,"./GameManager":4}],6:[function(require,module,exports){
(function (global){
global.window_width = view.size.width;
global.window_height = view.size.height;

var WINDOW_WIDTH = global.window_width;
var WINDOW_HEIGHT = global.window_height;

function createTrack () {
  var trackColor = '#F0E68C';
  track = new Path();
  track.add(new Point(-WINDOW_WIDTH*0.2, WINDOW_HEIGHT*6));
  track.add(new Point(WINDOW_WIDTH*0.125, WINDOW_HEIGHT*0.8));
  track.add(new Point(WINDOW_WIDTH*0.9, WINDOW_HEIGHT*0.2));
  track.add(new Point(WINDOW_WIDTH*0.5, WINDOW_HEIGHT*0.9));
  track.add(new Point(WINDOW_WIDTH*0.27, WINDOW_HEIGHT*0.8));
  track.add(new Point(WINDOW_WIDTH*0.32, WINDOW_HEIGHT*0.58));
  track.add(new Point(WINDOW_WIDTH*0.48, WINDOW_HEIGHT*0.44));
  track.add(new Point(WINDOW_WIDTH*0.7, WINDOW_HEIGHT*0.35));

  track.strokeColor = trackColor;
  track.strokeWidth = 25;

  track.smooth();

  var finish = new Path.Circle({
    center: track.getPointAt(track.length),
    radius: 26,
    fillColor: trackColor
  });
  return track;

}

module.exports.createTrack = createTrack;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],7:[function(require,module,exports){
(function (global){
global.debug = false;
var GameManager = require('./GameManager');
GameManager.Instance.launch();
var rect = new Rectangle();
rect.point = {width: 100, height: 20};
console.log(rect.point);

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./GameManager":4}]},{},[7]);
