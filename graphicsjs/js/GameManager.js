var Track = require('./Track');

function GameManager () {
  this.stage = null;
  this.track = null;
  this.balls = null;

  this.launch = function () {
    console.log("Launch graphics js");
    this.stage = acgraph.create('container');
    this.balls = [];
    var bounds = this.stage.getBounds();
    var centerX = Math.round(bounds.width / 2);
    var centerY = Math.round(bounds.height / 2);
    this.track = new Track.Track();
    this.track.create(centerX, centerY, bounds.height * 0.6, 2, -360, 10);
  };

  this.createBalls = function () {

  };

  this.draw = function () {
    window.requestAnimationFrame(this.draw);
  }
}
var Instance = null;
function createInstance () {
  Instance = new GameManager();
}
createInstance();

module.exports.Instance = Instance;