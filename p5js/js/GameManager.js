global.screenWidth = screen.width - 25;
global.screenHeight = screen.height - 150;
var Track = require('./Track');

function GameManager() {
   this.fun = function (p) {
     var self = this;
     p.setup = function() {
       p.createCanvas(screenWidth, screenHeight);
       p.background(224, 148, 72);
       //var t = new Track.Track(p);

     };
     p.draw = function() {
       //p.
     };
   };
   this.myp5 = new p5(this.fun);
}

var Instance = null;
function createInstance () {
  Instance = new GameManager();
}
createInstance();

module.exports.Instance = Instance;
