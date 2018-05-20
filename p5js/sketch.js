(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
global.screenWidth = screen.width - 25;
global.screenHeight = screen.height - 150;
var Track = require('./Track');

function GameManager() {
   this.fun = function (p) {
     var self = this;
     p.setup = function() {
       p.createCanvas(screenWidth, screenHeight);
       p.background(224, 148, 72);
       //var t = new Track.Track(p);

     };
     p.draw = function() {
       //p.
     };
   };
   this.myp5 = new p5(this.fun);
}

var Instance = null;
function createInstance () {
  Instance = new GameManager();
}
createInstance();

module.exports.Instance = Instance;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./Track":2}],2:[function(require,module,exports){
function Track(p) {
  this.globsTrack = [];

  p.noFill();
  p.strokeWeight(25);
  p.stroke(240, 230, 140);

  var pointsTrack = [
    new Point(0, screenHeight),
    new Point(0.2*screenWidth, 0.03*screenHeight),
    new Point(0.7*screenWidth, 0.03*screenHeight),
    new Point(0.7*screenWidth, 0.45*screenHeight),
    new Point(0.5*screenWidth, -0.3*screenHeight),
    new Point(0.7*screenWidth, 0.45*screenHeight),
    new Point(0.5*screenWidth, 0.5*screenHeight),
    new Point(0.8*screenWidth, -0.3*screenHeight)
  ];

  p.bezier(
    pointsTrack[0].x, pointsTrack[0].y,
    pointsTrack[1].x, pointsTrack[1].y,
    pointsTrack[2].x, pointsTrack[2].y,
    pointsTrack[3].x, pointsTrack[3].y
  );

  p.curve(
    pointsTrack[4].x, pointsTrack[4].y,
    pointsTrack[5].x, pointsTrack[5].y,
    pointsTrack[6].x, pointsTrack[6].y,
    pointsTrack[7].x, pointsTrack[7].y
  );

  var steps = 56;
  var t = 0;
  var i = 0;
  var x = 0;
  var y = 0;
  for (i = 0; i <= steps; i++) {
    t = i / steps;
    x = p.bezierPoint(pointsTrack[0].x, pointsTrack[1].x, pointsTrack[2].x, pointsTrack[3].x, t);
    y = p.bezierPoint(pointsTrack[0].y, pointsTrack[1].y, pointsTrack[2].y, pointsTrack[3].y, t);
    this.globsTrack.push(new Point(x, y));
    p.strokeWeight(1);
    p.fill('black');
    p.ellipse(x, y, 25, 25);
  }

  steps = 50;
  for (i = 0; i <= steps; i++) {
    t = i / steps;
    x = p.curvePoint(pointsTrack[4].x, pointsTrack[5].x, pointsTrack[6].x, pointsTrack[7].x, t);
    y = p.curvePoint(pointsTrack[4].y, pointsTrack[5].y, pointsTrack[6].y, pointsTrack[7].y, t);
    this.globsTrack.push(new Point(x, y));
    p.strokeWeight(1);
    p.fill('black');
    p.ellipse(x, y, 25, 25);
  }

}

function Point(x, y) {
  this.x = x;
  this.y = y;
}
module.exports.Track = Track;

},{}],3:[function(require,module,exports){
require('./GameManager');

},{"./GameManager":1}]},{},[3]);
