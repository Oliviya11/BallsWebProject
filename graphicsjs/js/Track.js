var GameManager = require('./GameManager');

function  Track() {
  this.finishPosX = 0;
  this.finishPosY = 0;
  this.trackColor = '#F0E68C';
  this.trackWidth = 32;
  this.finish = null;
  this.trackPoints = [];

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
        this.trackPoints[counter - numberToFade] = {x: x, y: y};
      }
      if (counter > numberToFade) {
        path.lineTo(x, y);
        this.trackPoints[counter] = {x: x, y: y};
      }
      counter++;
      var delta = ( -2 * away + Math.sqrt ( 4 * away * away + 8 * awayStep * chord ) ) / ( 2 * awayStep );
      // to a first approximation, the points are on a circle
      // so the angle between them is chord/radius
      theta += delta;
    }
    path.stroke(this.trackColor, this.trackWidth);
    this.createFinish();
    this.trackPoints = this.trackPoints.reverse();
   // this.createHideLine(this.trackPoints[this.trackPoints.length - 1], 23);
  };

  this.createFinish = function () {
    this.finish = GameManager.Instance.stage.circle(this.finishPosX, this.finishPosY, this.trackWidth+5);
    this.finish.fill(this.trackColor);
    this.finish.stroke(this.trackColor, 1);
  };

  this.createHideLine = function(point, lineLength) {
    var hideLine = [];
    var decreaseY = 5;
    for (var i = 0, k = decreaseY; i < lineLength; ++i, k+=decreaseY) {
      var newPoint = {x: point.x, y: point.y - k};
      hideLine[i] = newPoint;
    }
  };

  this.getTrackPoints = function () {
    return this.trackPoints;
  }
}

module.exports.Track = Track;
