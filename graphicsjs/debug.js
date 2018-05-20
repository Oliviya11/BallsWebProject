(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Colors = require('./Colors').Colors;

function ColorManager () {
  this.backColor = '#e09448';
  this.prevColor = -1;
  this.ColorNum = 4;

  this.greenColor = countColor('#008000');
  this.yellowColor = countColor('#ffa500');
  this.redColor = countColor('#ff0000');
  this.blueColor = countColor('#0000ff');

  var Color = {
    '#008000': this.greenColor,
    '#ffa500': this.yellowColor,
    '#ff0000': this.redColor,
    '#0000ff': this.blueColor,
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
  this.checkAllZero = function () {
    for (var i = 0; i < this.ColorNum; ++i) {
      var str = Object.keys(Color)[i];
      if (Color[str] !== 0) {
        return false;
      }
    }
    return true;
  };
}

function countColor (color) {
  var number = 0;
  for (var i = 0; i < Colors.length; ++i) {
    if (Colors[i] === color) {
      number++;
    }
  }
  return number;
}

module.exports.ColorManager = ColorManager;

},{"./Colors":2}],2:[function(require,module,exports){
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
];
/*
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
 */

exports.Colors = Colors;
},{}],3:[function(require,module,exports){
var Track = require('./Track');
var Glob = require('./Glob');
var ColorManager = require('./ColorManager');
var Colors = require('./Colors').Colors;
var Gun = require('./Gun');

function GameManager () {
  this.stage = null;
  this.track = null;
  this.balls = null;
  this.tracksPoints = null;
  this.globNumber = Colors.length;
  this.GLOB_RADIUS = 14;
  this.offset = 3;
  this.globs = [];
  this.lastTime = 0;
  this.gun = null;

  this.launch = function () {
    this.stage = acgraph.create('container');
    this.balls = [];
    var bounds = this.stage.getBounds();
    var centerX = Math.round(bounds.width / 2);
    var centerY = Math.round(bounds.height / 2);
    this.track = new Track.Track();
    this.track.create(centerX, centerY, bounds.height * 0.6, 2, -360, 10);
    this.trackPoints = this.track.getTrackPoints();
    this.createGlobs();
    this.gun = new Gun.Gun({x: centerX, y: centerY});
    this.gun.draw();
    window.requestAnimationFrame(this.draw.bind(this));
  };

  this.createGlobs = function () {
    for (var i = 0, k = 0; k < this.globNumber; i += this.offset, ++k) {
      var posNum = 10 + i;
      this.globs[k] = new Glob.Glob(this.GLOB_RADIUS, this.trackPoints[posNum], Colors[k], posNum);
    }
  };

  this.moveGlobs = function () {
    var now = new Date().getTime();
    if (now - this.lastTime > 200) {
      for (var i = 0; i < this.globs.length; ++i) {
        var self = this;
        var posNum = self.globs[i].getNumPosition();
        var newPosNum = posNum + self.offset;
        if (!self.trackPoints[newPosNum]) break;
        self.globs[i].setPosition(self.trackPoints[newPosNum], newPosNum);
        this.lastTime = now;
      }
    }
  };

  this.draw = function () {
    // console.log("move");
    this.moveGlobs();
    window.requestAnimationFrame(this.draw.bind(this));
  };
}
var Instance = null;
function createInstance () {
  Instance = new GameManager();
}
createInstance();
module.exports.Instance = Instance;
},{"./ColorManager":1,"./Colors":2,"./Glob":4,"./Gun":5,"./Track":6}],4:[function(require,module,exports){
var GameManager = require('./GameManager');

function Glob (radius, position, color, posNum) {
  this.glob = GameManager.Instance.stage.circle(position.x, position.y, radius);
  this.glob.fill(color);
  this.glob.stroke(color, 1);
  this.posNum = posNum;

  this.setPosition = function (position, posNum) {
    var center = new acgraph.math.Coordinate(position.x, position.y);
    this.glob.center(center);
    this.posNum = posNum;
  };

  this.getNumPosition = function () {
    return this.posNum;
  };
}

module.exports.Glob = Glob;

},{"./GameManager":3}],5:[function(require,module,exports){
var GameManager = require('./GameManager');
var Glob = require('./Glob');
function Gun (center) {
  this.path = null;
  this.gunCenter = {};

  this.draw = function () {
    var layer = GameManager.Instance.stage.layer();
    this.path = layer.path();
    this.gunCenter.x = center.x + 50;
    this.gunCenter.y = center.y - 50;
    this.path.moveTo(this.gunCenter.x, this.gunCenter.y);
    this.path.arcTo(60, 60, 0, 140);
    this.path.arcTo(49, 49, -160, 49);
    this.path.arcTo(25, 25, -180, 55);
    this.path.arcTo(25, 25, -100, 55);
    this.path.arcTo(50, 50, -112, 50);
    this.path.close();
    this.path.fill('black');
  };
}

module.exports.Gun = Gun;

},{"./GameManager":3,"./Glob":4}],6:[function(require,module,exports){
var GameManager = require('./GameManager');

function Track () {
  this.finishPosX = 0;
  this.finishPosY = 0;
  this.trackColor = '#F0E68C';
  this.trackWidth = 32;
  this.finish = null;
  this.trackPoints = [];

  this.create = function (centerX, centerY, radius, colis, rotation, numberToFade) {
    var layer = GameManager.Instance.stage.layer();
    var path = layer.path();

    var thetaMax = colis * 2 * Math.PI;

    var awayStep = radius / thetaMax;
    var chord = 10;
    var counter = 0;
    for (var theta = chord / awayStep; theta <= thetaMax;) {
      var away = awayStep * theta;
      var around = theta + rotation;
      var x = centerX + Math.cos(around) * away;
      var y = centerY + Math.sin(around) * away;
      if (counter === numberToFade - 1) {
        this.finishPosX = x;
        this.finishPosY = y;
        path.moveTo(x, y);
        this.trackPoints[counter - numberToFade] = {x: x, y: y};
      }
      if (counter > numberToFade) {
        path.lineTo(x, y);
        this.trackPoints[counter] = {x: x, y: y};
      }
      counter++;
      var delta = ( -2 * away + Math.sqrt(4 * away * away + 8 * awayStep * chord) ) / ( 2 * awayStep );
      theta += delta;
    }
    path.stroke(this.trackColor, this.trackWidth);
    this.createFinish();
    this.trackPoints = this.trackPoints.reverse();
  };

  this.createFinish = function () {
    this.finish = GameManager.Instance.stage.circle(this.finishPosX, this.finishPosY, this.trackWidth + 5);
    this.finish.fill(this.trackColor);
    this.finish.stroke(this.trackColor, 1);
  };

  this.createHideLine = function (point, lineLength) {
    var hideLine = [];
    var decreaseY = 5;
    for (var i = 0, k = decreaseY; i < lineLength; ++i, k += decreaseY) {
      var newPoint = {x: point.x, y: point.y - k};
      hideLine[i] = newPoint;
    }
  };

  this.getTrackPoints = function () {
    return this.trackPoints;
  };
}

module.exports.Track = Track;

},{"./GameManager":3}],7:[function(require,module,exports){
//global.debug = false;
var GameManager = require('./GameManager');
GameManager.Instance.launch();

},{"./GameManager":3}]},{},[7]);
