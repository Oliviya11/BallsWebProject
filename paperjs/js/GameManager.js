var Track = require('./Track');
var Glob = require('./Glob');
var Gun = require('./Gun');
var ColorManager = require('./ColorManager');
var Colors = require('./Colors').Colors;

function GameManager () {
  var BALL_VELOCITY = 1.5;
  var BALL_RADIUS = 12;
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
      glob_pos += BALL_RADIUS * 2 + MOVE_CRASHED;
    }
  };

  this.createGlob = function (num, glob_pos, color) {
    globs[num] = this.createGlobImpl(num, glob_pos, color);
    globs[num].setOffset(offset);
    globs[num].setTrackPos(glob_pos);
  };

  this.createGlobImpl = function (num, glob_pos, color) {
    var point = track.getPointAt(glob_pos);
    return new Glob.Glob(num, point, BALL_RADIUS, color);
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
          if (num > 0 && globs[num].getPos() - globs[num - 1].getPos() > BALL_RADIUS * 2 + MOVE_CRASHED) {
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
      this.moveGlob(i, BALL_VELOCITY);
    }
  };

  this.launch = function () {
    // var f = new Foo('MyFoo');
    track = Track.createTrack();
    offset = track.length / this.getNumOffset(BALL_VELOCITY);
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
          globs[i].increaseTrackPos(BALL_RADIUS * 2);
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
        if (Math.abs(globs[beginId].getPos() - globs[endId].getPos()) <= BALL_RADIUS * 2) {
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
    while (i < idEnd && globs[i].getTrackPos() - globs[i - 1].getTrackPos() <= BALL_RADIUS * 2 + MOVE_CRASHED) {
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

