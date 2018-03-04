(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Track = require('./Track');

function GameManager () {
  this.stage = null;
  this.track = null;

  this.launch = function () {
    console.log("Launch graphics js");
    this.stage = acgraph.create('container');
    var bounds = this.stage.getBounds();
    var centerX = Math.round(bounds.width / 2);
    var centerY = Math.round(bounds.height / 2);
    this.track = new Track.Track();
    this.track.create(centerX, centerY, bounds.height * 0.6, 2, -360, 10);
  };
  
  this.draw = function () {
    window.requestAnimationFrame(this.draw);
  }
}
var Instance = null;
function createInstance () {
  Instance = new GameManager();
}
createInstance();

module.exports.Instance = Instance;
},{"./Track":2}],2:[function(require,module,exports){
var GameManager = require('./GameManager');

function  Track() {
  this.finishPosX = 0;
  this.finishPosY = 0;
  this.trackColor = '#F0E68C';
  this.trackWidth = 32;
  this.finish = null;

  this.create = function(centerX, centerY, radius, colis, rotation, numberToFade) {
    var layer = GameManager.Instance.stage.layer();
    var path = layer.path();

    var thetaMax = colis * 2 * Math.PI;
// How far to step away from center for each side.
    var awayStep = radius / thetaMax;
// distance between points to plot
    var chord = 10;
// For every side, step around and away from center.
// start at the angle corresponding to a distance of chord
// away from centre.
    var counter = 0;
    for (var theta = chord / awayStep; theta <= thetaMax;) {
      // How far away from center
      var away = awayStep * theta;
      // How far around the center.
      var around = theta + rotation;
      // Convert 'around' and 'away' to X and Y.
      var x = centerX + Math.cos(around) * away;
      var y = centerY + Math.sin(around) * away;
      // Now that you know it, do it.
      //DoSome ( x, y );
      if (counter === numberToFade - 1) {
        this.finishPosX = x;
        this.finishPosY = y;
        path.moveTo(x, y);
      }
      if (counter > numberToFade) {
        path.lineTo(x, y);
      }
      counter++;
      var delta = ( -2 * away + Math.sqrt ( 4 * away * away + 8 * awayStep * chord ) ) / ( 2 * awayStep );
      // to a first approximation, the points are on a circle
      // so the angle between them is chord/radius
      theta += delta;
    }
    path.stroke(this.trackColor, this.trackWidth);
    this.createFinish();
  };

  this.createFinish = function () {
    this.finish = GameManager.Instance.stage.circle(this.finishPosX, this.finishPosY, this.trackWidth+5);
    this.finish.fill(this.trackColor);
    this.finish.stroke(this.trackColor, 1);
    console.log("this.finish");
    console.log(this.finish);
    this.finish.path.x = 10;
    this.finish.path.y = 10;
  }
}

module.exports.Track = Track;

},{"./GameManager":1}],3:[function(require,module,exports){
//global.debug = false;
var GameManager = require('./GameManager');
GameManager.Instance.launch();

},{"./GameManager":1}]},{},[3]);
