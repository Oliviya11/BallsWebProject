global.window_width = view.size.width;
global.window_height = view.size.height;

var WINDOW_WIDTH = global.window_width;
var WINDOW_HEIGHT = global.window_height;



function createTrack() {
    track = new Path();
    track.add(new Point(WINDOW_WIDTH/8, WINDOW_HEIGHT/2));
    track.add(new Point(WINDOW_WIDTH/5, WINDOW_HEIGHT/4.5));
    track.add(new Point(WINDOW_WIDTH/2, WINDOW_HEIGHT/4));
    track.add(new Point(WINDOW_WIDTH*0.8, WINDOW_HEIGHT/2));
    track.add(new Point(WINDOW_WIDTH*0.75, WINDOW_HEIGHT*0.8));
    track.add(new Point(WINDOW_WIDTH*0.5, WINDOW_HEIGHT*0.83));
    track.add(new Point(WINDOW_WIDTH*0.3, WINDOW_HEIGHT*0.7));
    track.add(new Point(WINDOW_WIDTH*0.3, WINDOW_HEIGHT*0.45));
    track.add(new Point(WINDOW_WIDTH*0.5, WINDOW_HEIGHT*0.46));

    track.strokeColor = 'brown';
    track.strokeWidth = 25;

    track.smooth();
    var finish  = new Path.Circle({
        center: track.getPointAt(track.length),
        radius: 26,
        fillColor: 'brown'
    });

    return track;
    //offset = track.length / getNumOffset(2);

}

module.exports.createTrack = createTrack;