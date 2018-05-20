var t;

function setup () {
  createCanvas(screen.width - 25, screen.height - 150);
  background(0);
  t = 0;
}

function draw () {
  var x = width * noise(t);
  var y = height * noise(t + 5);
  var r = 255 * noise(t + 18);
  var g = 255 * noise(t + 21);
  var b = 255 * noise(t + 35);
  var w = 100 * noise(t * width);
  var h = 100 * noise(t * height);
  noStroke();
  fill(r, g, b, t);
  ellipse(x, y, w, h);
  t = t + 0.01;
}
