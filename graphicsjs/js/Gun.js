var GameManager = require('./GameManager');

function Gun (center) {
  this.path = null;
  this.draw = function () {
    var layer = GameManager.Instance.stage.layer();
    this.path = layer.path();
    this.path.moveTo(center.x, center.y - 50);
    //100 + 20
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
