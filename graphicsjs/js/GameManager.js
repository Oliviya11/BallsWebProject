var Track = require('./Track');
var Glob = require('./Glob');
var ColorManager = require('./ColorManager');
var Colors = require('./Colors').Colors;
var Gun = require('./Gun');

function GameManager () {
  this.stage = null;
  this.track = null;
  this.balls = null;
  this.tracksPoints = null;
  this.globNumber = Colors.length;
  this.GLOB_RADIUS = 14;
  this.offset = 3;
  this.globs = [];
  this.lastTime = 0;
  this.gun = null;

  this.launch = function () {
    this.stage = acgraph.create('container');
    this.balls = [];
    var bounds = this.stage.getBounds();
    var centerX = Math.round(bounds.width / 2);
    var centerY = Math.round(bounds.height / 2);
    this.track = new Track.Track();
    this.track.create(centerX, centerY, bounds.height * 0.6, 2, -360, 10);
    this.trackPoints = this.track.getTrackPoints();
    this.createGlobs();
    this.gun = new Gun.Gun({x: centerX, y: centerY});
    this.gun.draw();
    window.requestAnimationFrame(this.draw.bind(this));
  };

  this.createGlobs = function () {
    for (var i = 0, k = 0; k < this.globNumber; i+=this.offset, ++k) {
      var posNum = 10 + i;
      this.globs[k] = new Glob.Glob(this.GLOB_RADIUS, this.trackPoints[posNum], Colors[k], posNum);
    }
  };

  this.moveGlobs = function() {
    var now = new Date().getTime();
    if (now - this.lastTime > 200) {
      for (var i = 0; i < this.globs.length; ++i) {
        var self = this;
        var posNum = self.globs[i].getNumPosition();
        var newPosNum = posNum + self.offset;
        if (!self.trackPoints[newPosNum]) break;
        self.globs[i].setPosition(self.trackPoints[newPosNum], newPosNum);
        this.lastTime = now;
      }
    }
  };

  this.draw = function () {
   // console.log("move");
    this.moveGlobs();
    window.requestAnimationFrame(this.draw.bind(this));
  };
}
var Instance = null;
function createInstance () {
  Instance = new GameManager();
}
createInstance();
module.exports.Instance = Instance;