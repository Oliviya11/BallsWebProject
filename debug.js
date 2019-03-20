(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Colors = require('./Colors').Colors;

function ColorManager() {
  this.backColor = '#e09448';
  this.prevColor = -1;
  this.ColorNum = 4;

  this.greenColor = countColor('#008000');
  this.yellowColor = countColor('#ffa500');
  this.redColor = countColor('#ff0000');
  this.blueColor = countColor('#0000ff');

   var Color = {
     '#008000' : this.greenColor,
     '#ffa500' : this.yellowColor,
     '#ff0000' : this.redColor,
     '#0000ff' : this.blueColor
   };
   this.decrease = function (color) {
     if (Color[color] > 0) {
       Color[color] -= 1;
     }
   };
   this.increase = function (color) {
     Color[color] += 1;
   };
   this.getRandomColor = function () {
     var color = -1;
     var colorStr = '';
     if (this.checkAllZero()) {
       return this.backColor;
     }
     do {
       color = Math.floor(Math.random() * 4);
       colorStr = Object.keys(Color)[color];
     }
     while (Color[colorStr] === 0);
     return colorStr;
   };
   this.checkAllZero = function() {
     for (var i = 0; i < this.ColorNum; ++i) {
       var str = Object.keys(Color)[i];
       if (Color[str] !== 0) {
         return false;
       }
     }
     return true;
   };
}

function countColor (color) {
  var number = 0;
  for (var i = 0; i < Colors.length; ++i) {
    if (Colors[i] === color) {
      number ++;
    }
  }
  return number;
}

module.exports.ColorManager = ColorManager;

},{"./Colors":2}],2:[function(require,module,exports){
var Colors = [
  '#008000',
  '#0000ff',
  '#0000ff',
  '#ff0000',
  '#ffa500',
  '#ffa500',
  '#ffa500',
  '#ff0000',
  '#ff0000',
  '#0000ff',
  '#008000',
  '#ff0000',
  '#ff0000',
  '#ff0000',
  '#ff0000',
  '#ffa500',
  '#0000ff',
  '#008000',
  '#0000ff',
  '#0000ff',
  '#0000ff',
  '#0000ff',
  '#ffa500',
  '#ff0000',
  '#008000',
  '#ff0000',
  '#ffa500',
  '#0000ff',
  '#ffa500',
  '#0000ff',
  '#ff0000',
  '#ffa500',
  '#0000ff',
  '#0000ff',
  '#008000',
  '#008000',
  '#ffa500',
  '#0000ff',
  '#008000',
  '#ff0000',
  '#ff0000',
  '#ffa500',
  '#0000ff',
  '#0000ff',
  '#008000',
  '#ff0000',
  '#ff0000',
  '#ffa500',
  '#0000ff',
  '#008000',
  '#0000ff',
  '#0000ff',
  '#ffa500',
  '#ff0000',
  '#008000',
  '#ff0000',
  '#ffa500',
  '#0000ff',
  '#ffa500',
  '#0000ff',
  '#ff0000',
  '#ffa500',
  '#0000ff',
  '#0000ff',
  '#ff0000',
  '#ff0000',
  '#ff0000',
  '#ff0000',
  '#ffa500',
  '#ffa500',
  '#0000ff',
  '#0000ff',
  '#008000',
  '#008000',
  '#008000',
  '#008000',
  '#008000',
  '#008000',
  '#ffa500',
  '#ff0000',
  '#ff0000',
  '#0000ff',
  '#0000ff',
  '#008000',
  '#008000',
  '#ffa500',
  '#ffa500',
  '#0000ff',
  '#ff0000',
  '#008000',
  '#ff0000',
  '#0000ff',
  '#008000',
  '#0000ff',
  '#0000ff',
  '#ff0000',
  '#ffa500',
  '#ffa500',
  '#ffa500',
  '#ff0000',
  '#ff0000',
  '#0000ff',
  '#008000',
  '#008000',
  '#ffa500',
  '#ff0000',
  '#ff0000',
  '#0000ff',
  '#0000ff',
  '#008000',
  '#008000',
  '#ffa500',
  '#ffa500',
  '#0000ff',
  '#ff0000',
  '#008000',
  '#ff0000',
  '#0000ff',
  '#0000ff',
  '#008000',
  '#008000',
  '#ffa500',
  '#ff0000',
  '#ff0000',
  '#0000ff',
  '#0000ff',
  '#008000',
  '#008000',
  '#ffa500',
  '#ffa500',
  '#0000ff',
  '#ff0000',
  '#008000',
  '#ff0000',
  '#0000ff',
  '#0000ff',
  '#008000',
  '#008000',
  '#ffa500',
  '#ff0000',
  '#ff0000',
  '#0000ff',
  '#0000ff',
  '#008000',
  '#008000',
  '#ffa500',
  '#ffa500',
  '#0000ff',
  '#ff0000',
  '#008000',
  '#ff0000',
  '#0000ff'
];

exports.Colors = Colors;
},{}],3:[function(require,module,exports){
var Track = require('./Track');
var Glob = require('./Glob');
var Gun = require('./Gun');
var ColorManager = require('./ColorManager');
var Colors = require('./Colors').Colors;

function GameManager () {
  var GLOB_VELOCITY = 1.5;
  var GLOB_RADIUS = 12;
  var MOVE_CRASHED = 0.5;
  var globNumber = Colors.length;
  var globs = [];
  this.colorManager = new ColorManager.ColorManager();
  var stop = false;
  var track = null;
  var offset = null;
  var gun = null;
  var col_emit = false;
  var id = null;
  this.moveChain = false;
  this.showAnimation = false;
  this.stopGlobs = false;
  this.idToDestroy = [];
  this.increaseDestroy = false;
  this.changed = false;

  this.getNumOffset = function (velocity) {
    return track.length / velocity;
  };

  this.getGlobsPositionOnTrack = function (glob_pos) {
    return track.getPointAt(glob_pos);
  };

  this.createGlobs = function () {
    var glob_pos = 0;
    for (var i = 0; i < globNumber; ++i) {
      this.createGlob(i, glob_pos, Colors[i]);
      glob_pos += GLOB_RADIUS * 2 + MOVE_CRASHED;
    }
  };

  this.createGlob = function (num, glob_pos, color) {
    globs[num] = this.createGlobImpl(num, glob_pos, color);
    globs[num].setOffset(offset);
    globs[num].setTrackPos(glob_pos);
  };

  this.createGlobImpl = function (num, glob_pos, color) {
    var point = track.getPointAt(glob_pos);
    return new Glob.Glob(num, point, GLOB_RADIUS, color);
  };

  this.moveGlob = function (num) {
    if (track && globs[globNumber - 1].getTrackPos() < track.length - 10) {
      globs[num].increaseTrackPos(globs[num].getOffset());
      if (gun.isShoot()) {
        this.onCollide(num, globs[num]);
      }
      if (globs[num]) {
        globs[num].move(this.getGlobsPositionOnTrack(globs[num].getTrackPos()));
        if (num > 0 && globs[num].collide(globs[num - 1])) {
          if (!this.stopGlobs) {
            globs[num].increaseTrackPos(MOVE_CRASHED);
          }
        }
        if (this.idToDestroy.length === 0) {
          if (num > 0 && globs[num].getPos() - globs[num - 1].getPos() > GLOB_RADIUS * 2 + MOVE_CRASHED) {
            globs[num - 1].increaseTrackPos(MOVE_CRASHED);
          }
        }
      }
      this.collideAllGlobs();
    }
  };

  this.collideAllGlobs = function () {
    for (var i = 0; i < this.idToDestroy.length; ++i) {
      this.collideBack(this.idToDestroy[i] - 1, this.idToDestroy[i], offset, i);
    }
  };

  this.moveGlobs = function () {
    for (var i = 0; i < globNumber; ++i) {
      this.moveGlob(i, GLOB_VELOCITY);
    }
  };

  this.launch = function () {
    // var f = new Foo('MyFoo');
    track = Track.createTrack();
    offset = track.length / this.getNumOffset(GLOB_VELOCITY);
    this.createGlobs();
    var self = this;
    gun = new Gun.Gun();
    view.onFrame = function (event) {
      self.moveGlobs();
      gun.move();
      gun.shoot();
    };
  };

  this.onCollide = function (num, glob) {
    //splice
    if (!this.moveChain) {
      var gun_glob = gun.getGunGlob();
      var id = glob.collideId(gun_glob);
      if ((id != null && !isNaN(id)) || id === 0) {
        var pos = globs[id].getTrackPos();
        var offset = globs[id].getOffset();
        var k = 0;
        for (var i = id; i < globNumber; ++i) {
          globs[i].increaseTrackPos(GLOB_RADIUS * 2);
        }
        this.createNewGlob(id, pos, offset);
        this.moveChain = true;
        this.showAnimation = true;
        this.increaseIdToDestroy(id);
        var self = this;
        setTimeout(function () {
          self.initGlobsIdDestroy(id);
        }, 200);
        gun.removeCurrGlobImpl();
      }
    }
  };

  this.createNewGlob = function (id, pos, offset) {
    this.changed = true;
    var color = gun.getGunGlob().getColor();
    this.colorManager.increase(color);
    var new_glob = this.createGlobImpl(id, pos, color);
    globs.splice(id, 0, new_glob);
    globs[id].setTrackPos(pos);
    globs[id].setOffset(offset);
    globNumber++;
    this.setIds(id + 1, 1);
    var self = this;
    this.setFalseChanged();
  };

  this.increaseIdToDestroy = function (id) {
    if (this.idToDestroy.length > 0) {
      var found = false;
      var i = 1;
      if (id > 0 && id < this.idToDestroy[0]) {
        i = 0;
        found = true;
      }
      while (i > 0 && i < this.idToDestroy.length) {
        if (id > this.idToDestroy[i - 1] && id < this.idToDestroy[i]) {
          found = true;
          break;
        } else {
          ++i;
        }
      }
      if (found) {
        for (var k = i; k < this.idToDestroy.length; ++k) {
          this.idToDestroy[k]++;
        }
      }
    }
  };

  this.sortIdToDestroy = function () {
    this.idToDestroy.sort(function (a, b) {
      return a - b;
    });
  };

  this.decreaseIdToDestroy = function (num, id) {
    var found = false;
    this.sortIdToDestroy();
    var k = 0;
    while (k < this.idToDestroy.length) {
      if (this.idToDestroy[k++] > id) {
        found = true;
        break;
      }
    }
    if (found) {
      for (var i = k - 1; i < this.idToDestroy.length; ++i) {
        if (this.idToDestroy[i] > 0) {
          this.idToDestroy[i] -= num;
        }
      }
    }
    this.sortIdToDestroy();
    this.idToDestroy = this.removeDuplicateUsingSet(this.idToDestroy);
  };

  this.setFalseChanged = function () {
    var self = this;
    setTimeout(function () {
      self.changed = false;
    }, 200);
  };
  this.setIds = function (begin, delta) {
    for (var i = begin; i < globNumber; ++i) {
      var new_id = globs[i].getId() + delta;
      globs[i].setId(new_id);
    }
  };

  this.initGlobsIdDestroy = function (id) {
    var rightGlobs = this.countRight(id);
    var leftGlobs = this.countLeft(id);
    var num = leftGlobs.length + 1 + rightGlobs.length;
    if (num > 2) {
      var nextId = -1;
      var globsIdDestroy = leftGlobs.concat([id], rightGlobs);
      if (globsIdDestroy[0]) {
        var beginId = globsIdDestroy[0] - 1;
        var endId = globsIdDestroy[num - 1] + 1;
        if (globs[beginId] && globs[endId] && globs[beginId].getColor() === globs[endId].getColor()) {
          this.moveChainBack(globsIdDestroy);
          nextId = beginId + 1;
        } else {
          this.stopChain(globsIdDestroy);
        }
      }
      for (var i = 0; i < globsIdDestroy.length; ++i) {
        var id = globsIdDestroy[i];
        globs[id].remove();
      }
      if (globsIdDestroy[0]) {
        this.idToDestroy.push(globsIdDestroy[0]);
      }
      this.decreaseIdToDestroy(num, globsIdDestroy[0]);
      this.destroyGlobs(globsIdDestroy);
      var self = this;
      if (nextId > 0) {
        setTimeout(function () {
          self.initGlobsIdDestroy(nextId);
        }, 200);
      }
    }
   // alert(this.idToDestroy);
  };
  this.removeDuplicateUsingSet = function (arr) {
    var unique_array = Array.from(new Set(arr));
    return unique_array;
  };
  this.changeGlobsMove = function (idBegin, idEnd, offset) {
    for (var i = idBegin; i < idEnd; ++i) {
      if (globs[i]) {
        globs[i].setOffset(offset);
      }
    }
  };
  this.moveChainBack = function (globsIdDestroy) {
    var num = globsIdDestroy.length;
    this.changeGlobsMove(globsIdDestroy[num - 1] + 1, globNumber, -4 * offset);
  };
  this.stopChain = function (globsIdDestroy) {
    this.stopGlobs = true;
    var num = globsIdDestroy.length;
    this.changeGlobsMove(globsIdDestroy[num - 1] + 1, globNumber, 0);
  };
  this.collideBack = function (beginId, endId, offset, pos) {
    if (!this.changed) {
      if ((beginId < 0 ||
        endId >= globNumber)) {
        this.collideBackImpl(beginId, endId, pos);
      }
      if (globs[beginId] && globs[endId] && (globs[beginId].collide(globs[endId]))) {
        if (Math.abs(globs[beginId].getPos() - globs[endId].getPos()) <= GLOB_RADIUS * 2) {
           // alert('beginId: ' + beginId + 'endId: ' + endId);
          this.collideBackImpl(beginId, endId, pos);
        }
      }
    }
  };

  this.collideBackImpl = function (beginId, endId, pos) {
    var finalId = this.idToDestroy[pos+1] ? this.idToDestroy[pos+1] : globNumber;
    if (globs[beginId]) {
      this.changeGlobsMove(endId, finalId, globs[beginId].getOffset());
    }
    this.stopGlobs = false;
    this.idToDestroy.splice(pos, 1);
   // this.idToDestroy.shift();
  };

  this.changePos = function (idBegin, idEnd, offset) {
    var i = idBegin + 1;
    while (i < idEnd && globs[i].getTrackPos() - globs[i - 1].getTrackPos() <= GLOB_RADIUS * 2 + MOVE_CRASHED) {
      globs[i].setOffset(offset);
      globs[i - 1].setOffset(offset);
      i++;
    }
  };
  this.destroyGlobs = function (globsIdDestroy) {
    var num = globsIdDestroy.length;
    var splicedGlobs = globs.splice(globsIdDestroy[0], num);
    globNumber -= num;
    this.setIds(globsIdDestroy[0], -num);
    this.decreaseColors(splicedGlobs);
  };

  this.decreaseColors = function (splicedGlobs) {
    for (var i = 0; i < splicedGlobs.length; ++i) {
      this.colorManager.decrease(splicedGlobs[i].getColor());
    }
  };

  this.countRight = function (id) {
    var ids = [];
    var counter = 0;
    var i = id + 1;
    while (i < globNumber && globs[i].getColor() === globs[i - 1].getColor()) {
      ids[counter++] = globs[i].getId();
      ++i;
    }
    return ids;
  };

  this.countLeft = function (id) {
    var ids = [];
    var counter = 0;
    var i = id - 1;
    while (i > -1 && globs[i].getColor() === globs[i + 1].getColor()) {
      ids[counter++] = globs[i].getId();
      --i;
    }
    return ids.reverse();
  };

}
var Instance = null;
function createInstance () {
  Instance = new GameManager();
}
createInstance();

module.exports.Instance = Instance;


},{"./ColorManager":1,"./Colors":2,"./Glob":4,"./Gun":5,"./Track":6}],4:[function(require,module,exports){
(function (global){
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



}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],5:[function(require,module,exports){
(function (global){
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
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./GameManager":3,"./Glob":4}],6:[function(require,module,exports){
(function (global){
global.window_width = view.size.width;
global.window_height = view.size.height;

var WINDOW_WIDTH = global.window_width;
var WINDOW_HEIGHT = global.window_height;

function createTrack () {
  var trackColor = '#F0E68C';
  track = new Path();
  track.add(new Point(-WINDOW_WIDTH*0.2, WINDOW_HEIGHT*6));
  track.add(new Point(WINDOW_WIDTH*0.125, WINDOW_HEIGHT*0.8));
  track.add(new Point(WINDOW_WIDTH*0.9, WINDOW_HEIGHT*0.2));
  track.add(new Point(WINDOW_WIDTH*0.5, WINDOW_HEIGHT*0.9));
  track.add(new Point(WINDOW_WIDTH*0.27, WINDOW_HEIGHT*0.8));
  track.add(new Point(WINDOW_WIDTH*0.32, WINDOW_HEIGHT*0.58));
  track.add(new Point(WINDOW_WIDTH*0.48, WINDOW_HEIGHT*0.44));
  track.add(new Point(WINDOW_WIDTH*0.7, WINDOW_HEIGHT*0.35));

  track.strokeColor = trackColor;
  track.strokeWidth = 25;

  track.smooth();

  var finish = new Path.Circle({
    center: track.getPointAt(track.length),
    radius: 26,
    fillColor: trackColor
  });
  return track;
}

module.exports.createTrack = createTrack;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],7:[function(require,module,exports){
(function (global){
global.debug = false;
var GameManager = require('./GameManager');
GameManager.Instance.launch();

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./GameManager":3}]},{},[7]);
