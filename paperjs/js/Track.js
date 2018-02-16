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