function Glob (id, center, radius, color) {
  this.id = id;
  this.color = color;
  this.trackPos = 0;
  this.offset = 0;
  this.textId = '';
  this.setTextId = function(id) {
    if (global.debug) {
      if (id || id === 0) {
        this.textId = id;
      } else {
        this.textId = '';
      }
    }
  };

  this.setTextId(id);

  var glob = new Path.Circle({
    center: center,
    radius: radius,
    fillColor: this.color
  });

  if (global.debug) {
    this.text = new PointText({
      point: center,
      content: this.textId,
      fillColor: 'black',
      fontFamily: 'Courier New',
      fontWeight: 'bold',
      fontSize: 15
    });
  }

  this.getId = function () {
    return this.id;
  };

  this.setId = function (id) {
    this.id = id;
    this.setTextId(id);
    if (global.debug) {
      this.text.content = this.textId;
    }
  };

  this.move = function (pos) {
    glob.position = pos;
    if (pos && global.debug) {
      this.text.point = new Point(pos.x - 5, pos.y + 5);
    }
  };

  this.getPath = function () {
    return glob;
  };

  this.changeColor = function (new_color) {
    this.color = new_color;
    glob.fillColor = new_color;
  };

  this.getColor = function () {
    return this.color;
  };

  this.collideId = function (another) {
    if (another && another.getPath().intersects(glob)) {
      return this.id;
    } else {
      return null;
    }
  };

  this.collide = function (another) {
   return (another && another.getPath().intersects(glob));
  };

  this.setStroke = function () {
    glob.strokeColor = 'black';
    glob.strokeWidth = 10;
  };

  this.setNoStroke = function () {
    glob.strokeWidth = 0;
  };

  this.remove = function () {
    glob.remove();
    if (global.debug)  {
      this.text.remove();
    }
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

module.exports.Glob = Glob;


