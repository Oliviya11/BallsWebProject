var Glob = require('./Glob');
var GameManager = require('./GameManager');

var WINDOW_WIDTH = global.window_width;
var WINDOW_HEIGHT = global.window_height;

function Gun () {
  var BALL_RADIUS = 12;
  var rotate_angle = -90;
  var step = 10;
  var gun_glob1 = null, gun_glob2 = null, line = null, gun_body = null;
  var pivot_point = null;
  var shoot = false;
  var offset = null;
  var BALL_VELOCITY = 20;
  var glob_pos = 0;
  var curr_line = null;
  var curr_glob = null;

  this.createGun = function () {
    this.createLine();
    gun_glob2 = new Path.Circle(new Point(WINDOW_WIDTH * 0.45, WINDOW_HEIGHT * 0.68), BALL_RADIUS);
    gun_glob2.fillColor =  GameManager.Instance.colorManager.getRandomColor();
    gun_body = new Path.Circle(new Point(WINDOW_WIDTH * 0.4, WINDOW_HEIGHT * 0.68), WINDOW_WIDTH * 0.05);
    gun_body.fillColor = 'black';
    var hole = this.createHole(gun_body, 0.55, gun_body.bounds.center);
    gun_glob1 = this.createOneGlob(gun_body);
    gun_body.removeSegment(0);
    gun_body.removeSegment(5);

    this.createGunGroup(gun_body, gun_glob1, gun_glob2, line, hole);
  };

  this.createHole = function (gun_body, size, abs_pos, color, opacity) {
    var hole = gun_body.clone();
    hole.scale(size, abs_pos);
    if (color) {
      hole.fillColor = color;
    }
    if (opacity) {
      hole.opacity = 0.5;
    }
    return hole;
  };

  this.createOneGlob = function (gun_body) {
    var gun_glob1 = gun_body.clone({insert: true, deep: true});
    gun_glob1.fillColor = GameManager.Instance.colorManager.getRandomColor();
    gun_glob1.scale(0.2);
    return gun_glob1;
  };

  this.createGunGroup = function (gun_body, gun_glob1, gun_glob2, line, hole) {
    gun = new Group([line, gun_body, gun_glob2, hole, gun_glob1]);
    pivot_point = gun.bounds.center + new Point(-353, 0);
    gun.rotate(rotate_angle, pivot_point);
  };

  this.createLine = function () {
    line = new Path();
    if (global.debug) {
      line.strokeColor = 'black';
    }
    line.add(new Point(WINDOW_WIDTH * 0.45, WINDOW_HEIGHT * 0.68));
    line.add(new Point(WINDOW_WIDTH, WINDOW_HEIGHT * 0.68));
    offset = line.length / this.getNumOffset(BALL_VELOCITY);
  };

  this.flipColors = function () {
    var curr_color = gun_glob1.fillColor;
    gun_glob1.fillColor = gun_glob2.fillColor;
    gun_glob2.fillColor = curr_color;
  };
  this.move = function () {
    var self = this;
    view.onKeyDown = function (event) {
      if (event.key === 'right') {
        gun.rotate(step, pivot_point);
      }
      else if (event.key === 'left') {
        gun.rotate(-step, pivot_point);
      }
      else if ((event.key === 'up' || event.key === 'down') && !shoot) {
        self.flipColors();
      }
      else if (event.key === 'space') {
        self.startShooting();
      }
    };

    view.onMouseMove = function (event) {

    };
    view.onClick = function (event) {
      self.startShooting();
    };
  };

  this.startShooting = function () {
    //!GameManager.Instance.showAnimation
    if (!curr_glob) {
      this.createCurrLine();
      this.createCurrGlob();
      shoot = true;
    }
  };

  this.createCurrLine = function () {
    curr_line = new Path();
    //   curr_line.strokeColor = 'black';
    curr_line.add(gun.children[0].getPointAt(0));
    curr_line.add(gun.children[0].getPointAt(gun.children[0].length));
  };

  this.createCurrGlob = function () {
    curr_glob = new Glob.Glob(null, gun.children[2].position, BALL_RADIUS, gun.children[2].fillColor.toCSS(true));
    gun_glob2.fillColor = GameManager.Instance.colorManager.backColor;
    GameManager.Instance.moveChain = false;
  };

  this.getNumOffset = function (velocity) {
    return line.length / velocity;
  };

  this.getGlobsPositionOnLine = function (glob_pos) {
    return curr_line.getPointAt(glob_pos);
  };

  this.removeCurrGlob = function () {
    if (curr_glob) {
      var path = curr_glob.getPath();
      if (path.position.x <= 0 || path.position.x > WINDOW_WIDTH
        || path.position.y <= 0 || path.position.y > WINDOW_HEIGHT) {
        gun_glob2.fillColor = GameManager.Instance.colorManager.getRandomColor();
        path.remove();
        curr_line.remove();
        curr_glob = null;
        shoot = false;
        glob_pos = 0;
      }
    }
  };

  this.removeCurrGlobImpl = function() {
    var path = curr_glob.getPath();
    gun_glob2.fillColor = GameManager.Instance.colorManager.getRandomColor();
    path.remove();
    curr_line.remove();
    curr_glob = null;
    shoot = false;
    glob_pos = 0;
  };

  this.shoot = function () {
    if (shoot) {
      glob_pos += offset;
      curr_glob.move(this.getGlobsPositionOnLine(glob_pos));
      this.removeCurrGlob();
    }
  };

  this.getGunGlob = function () {
    return curr_glob;
  };

  this.isShoot = function () {
    return shoot;
  };
  var gun = null;
  this.createGun();

}

module.exports.Gun = Gun;