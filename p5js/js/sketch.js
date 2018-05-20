// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/KkyIDI6rQJI

// Purple Rain
// (138, 43, 226)
// (230, 230, 250) // background


function setup() {
  createCanvas(640, 360);
  background("RED");
  var img = createImage(66, 66);
  img.loadPixels();
  for (var i = 0; i < img.width; i++) {
    for (var j = 0; j < img.height; j++) {
      img.set(i, j, color(0, 90, 102));
    }
  }
  img.updatePixels();
  image(img, 17, 17);
}
