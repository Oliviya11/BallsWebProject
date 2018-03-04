var GameManager = require('./GameManager');

function Ball(radius, position, color) {
  this.ball = GameManager.Instance.stage.circle(position.x, position.y, radius);
  this.ball.fill(color);
  this.finish.stroke(color, 1);
  this.setPosition = function(position) {
    this.ball.setPosition(position.x, position.y);
  };
}

module.exports.Ball = Ball;
