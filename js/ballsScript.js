var WINDOW_WIDTH = view.size.width;
var WINDOW_HEIGHT = view.size.height;

var BALL_NUMBER = 4;
var track, currentPoint = 0, offset = 0, radius = 12, currentPos = [], balls = [];
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

    offset = track.length / getNumOffset(2);

}

function getNumOffset(velocity) {
    return track.length/velocity;
}

function createBalls() {
    var ball_pos = 0;
    for (var i=0; i<BALL_NUMBER; ++i) {
        createBall(i, ball_pos);
        currentPos[i] = ball_pos;
        ball_pos+=radius*2;
    }
}


function createBall(num, ball_pos) {
    var point = track.getPointAt(ball_pos);
    var ball = new Path.Circle({
        center: point,
        radius: radius,
        fillColor: 'yellow'
    });
    balls[num] = ball;
}




function moveBall(num) {
   if (track && currentPos[BALL_NUMBER -1] < track.length - 10) {
       currentPos[num] +=offset;
       balls[num].position = track.getPointAt(currentPos[num]);
       console.log(" track.getPointAt(currentPos[num]): ",  track.getPointAt(currentPos[num]));
   }
}

function moveBalls() {
    for (var i=0; i<BALL_NUMBER; ++i) {
        moveBall(i);
    }
}

createTrack();

createBalls();


function onFrame(event) {
    moveBalls();
}

