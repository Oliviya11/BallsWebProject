global.window_width = view.size.width;
global.window_height = view.size.height;

var WINDOW_WIDTH = global.window_width;
var WINDOW_HEIGHT = global.window_height;

function createTrack () {
  var trackColor = '#F0E68C';
  track = new Path();
  /*
   track.add(new Point(0, WINDOW_HEIGHT*3.2));
   track.add(new Point(WINDOW_WIDTH/8, WINDOW_HEIGHT));
   track.add(new Point(WINDOW_WIDTH/5, WINDOW_HEIGHT/4.5));
   track.add(new Point(WINDOW_WIDTH/2, WINDOW_HEIGHT/4));
   track.add(new Point(WINDOW_WIDTH*0.8, WINDOW_HEIGHT/2));
   track.add(new Point(WINDOW_WIDTH*0.75, WINDOW_HEIGHT*0.8));
   track.add(new Point(WINDOW_WIDTH*0.5, WINDOW_HEIGHT*0.83));
   track.add(new Point(WINDOW_WIDTH*0.3, WINDOW_HEIGHT*0.7));
   track.add(new Point(WINDOW_WIDTH*0.3, WINDOW_HEIGHT*0.45));
   track.add(new Point(WINDOW_WIDTH*0.5, WINDOW_HEIGHT*0.46));
   */
  track.add(new Point(WINDOW_WIDTH*0.125, WINDOW_HEIGHT*3.2));
  track.add(new Point(WINDOW_WIDTH*0.125, WINDOW_HEIGHT*0.6));
  track.add(new Point(WINDOW_WIDTH*0.9, WINDOW_HEIGHT*0.2));
  track.add(new Point(WINDOW_WIDTH*0.5, WINDOW_HEIGHT*0.8));
  track.add(new Point(WINDOW_WIDTH*0.27, WINDOW_HEIGHT*0.76));
  track.add(new Point(WINDOW_WIDTH*0.32, WINDOW_HEIGHT*0.58));
  track.add(new Point(WINDOW_WIDTH*0.48, WINDOW_HEIGHT*0.44));
  track.add(new Point(WINDOW_WIDTH*0.7, WINDOW_HEIGHT*0.35));

  // track.add(new Point(WINDOW_WIDTH*0.8, WINDOW_HEIGHT*0.22));
  // track.add(new Point(WINDOW_WIDTH*0.85, WINDOW_HEIGHT*0.3));
  // track.add(new Point(WINDOW_WIDTH*0.87, WINDOW_HEIGHT*0.4));
  // track.add(new Point(WINDOW_WIDTH*0.8, WINDOW_HEIGHT*0.65));
  // track.add(new Point(WINDOW_WIDTH*0.75, WINDOW_HEIGHT*0.85));
  // track.add(new Point(WINDOW_WIDTH*0.7, WINDOW_HEIGHT*0.9));
  //
  // track.add(new Point(WINDOW_WIDTH*0.45, WINDOW_HEIGHT*0.85));
  // track.add(new Point(WINDOW_WIDTH*0.35, WINDOW_HEIGHT*0.65));
  // track.add(new Point(WINDOW_WIDTH*0.4, WINDOW_HEIGHT*0.4));
  // track.add(new Point(WINDOW_WIDTH*0.47, WINDOW_HEIGHT*0.3));
  // track.add(new Point(WINDOW_WIDTH*0.55, WINDOW_HEIGHT*0.32));
  // track.add(new Point(WINDOW_WIDTH*0.65, WINDOW_HEIGHT*0.43));
  // track.add(new Point(WINDOW_WIDTH*0.56, WINDOW_HEIGHT*0.6));

  track.strokeColor = trackColor;
  track.strokeWidth = 25;

  track.smooth();

  var finish = new Path.Circle({
    center: track.getPointAt(track.length),
    radius: 26,
    fillColor: trackColor,
  });
  return track;
  //offset = track.length / getNumOffset(2);

}

module.exports.createTrack = createTrack;