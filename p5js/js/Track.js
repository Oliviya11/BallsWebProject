function Track(p) {
  this.globsTrack = [];

  p.noFill();
  p.strokeWeight(25);
  p.stroke(240, 230, 140);

  var pointsTrack = [
    new Point(0, screenHeight),
    new Point(0.2*screenWidth, 0.03*screenHeight),
    new Point(0.7*screenWidth, 0.03*screenHeight),
    new Point(0.7*screenWidth, 0.45*screenHeight),
    new Point(0.5*screenWidth, -0.3*screenHeight),
    new Point(0.7*screenWidth, 0.45*screenHeight),
    new Point(0.5*screenWidth, 0.5*screenHeight),
    new Point(0.8*screenWidth, -0.3*screenHeight)
  ];

  p.bezier(
    pointsTrack[0].x, pointsTrack[0].y,
    pointsTrack[1].x, pointsTrack[1].y,
    pointsTrack[2].x, pointsTrack[2].y,
    pointsTrack[3].x, pointsTrack[3].y
  );

  p.curve(
    pointsTrack[4].x, pointsTrack[4].y,
    pointsTrack[5].x, pointsTrack[5].y,
    pointsTrack[6].x, pointsTrack[6].y,
    pointsTrack[7].x, pointsTrack[7].y
  );

  var steps = 56;
  var t = 0;
  var i = 0;
  var x = 0;
  var y = 0;
  for (i = 0; i <= steps; i++) {
    t = i / steps;
    x = p.bezierPoint(pointsTrack[0].x, pointsTrack[1].x, pointsTrack[2].x, pointsTrack[3].x, t);
    y = p.bezierPoint(pointsTrack[0].y, pointsTrack[1].y, pointsTrack[2].y, pointsTrack[3].y, t);
    this.globsTrack.push(new Point(x, y));
    p.strokeWeight(1);
    p.fill('black');
    p.ellipse(x, y, 25, 25);
  }

  steps = 50;
  for (i = 0; i <= steps; i++) {
    t = i / steps;
    x = p.curvePoint(pointsTrack[4].x, pointsTrack[5].x, pointsTrack[6].x, pointsTrack[7].x, t);
    y = p.curvePoint(pointsTrack[4].y, pointsTrack[5].y, pointsTrack[6].y, pointsTrack[7].y, t);
    this.globsTrack.push(new Point(x, y));
    p.strokeWeight(1);
    p.fill('black');
    p.ellipse(x, y, 25, 25);
  }

}

function Point(x, y) {
  this.x = x;
  this.y = y;
}
module.exports.Track = Track;
