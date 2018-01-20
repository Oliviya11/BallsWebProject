function Ball (id, center, radius, color) {

  this.id = id;
  this.color = color;
  this.trackPos = 0;
  this.offset = 0;
  this.removed = false;

  var ball = new Path.Circle({
    center: center,
    radius: radius,
    fillColor: this.color
  });

  this.getId = function () {
    return this.id;
  };

  this.setId = function (id) {
    this.id = id;
  };

  this.move = function (pos) {
    ball.position = pos;
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

  this.colide = function (another) {
    if (another && another.getPath().intersects(ball)) {
      return this.id;
    } else {
      return null;
    }
  };

  this.remove = function () {
    ball.remove();
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

  this.getRemoved = function () {
    return this.removed;
  }
}

module.exports.Ball = Ball;


