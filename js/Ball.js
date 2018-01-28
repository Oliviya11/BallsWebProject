function Ball (id, center, radius, color) {


  this.id = id;
  this.color = color;
  this.trackPos = 0;
  this.offset = 0;
  this.textId = '';
  this.setTextId = function(id) {
    if (id || id == 0) {
      this.textId = id;
    } else {
      this.textId = '';
    }
  };

  this.setTextId(id);

  var ball = new Path.Circle({
    center: center,
    radius: radius,
    fillColor: this.color
  });

  this.text = new PointText({
    point: center,
    content: this.textId,
    fillColor: 'black',
    fontFamily: 'Courier New',
    fontWeight: 'bold',
    fontSize: 15
  });

  this.getId = function () {
    return this.id;
  };

  this.setId = function (id) {
    this.id = id;
    this.setTextId(id);
    this.text.content = this.textId;
  };

  this.move = function (pos) {
    ball.position = pos;
    if (pos) {
      this.text.point = new Point(pos.x - 5, pos.y + 5);
    }
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

  this.collideId = function (another) {
    if (another && another.getPath().intersects(ball)) {
      return this.id;
    } else {
      return null;
    }
  };

  this.collide = function (another) {
    if (another && another.getPath().intersects(ball)) {
      return true;
    } else {
      return false;
    }
  };

  this.setStroke = function () {
    ball.strokeColor = 'black';
    ball.strokeWidth = 10;
  };

  this.setNoStroke = function () {
    ball.strokeWidth = 0;
  };

  this.remove = function () {
    ball.remove();
    this.text.remove();
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
  this.getPos = function () {
    return this.trackPos;
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

}

module.exports.Ball = Ball;


