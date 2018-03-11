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
