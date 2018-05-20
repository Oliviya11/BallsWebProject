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
