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
