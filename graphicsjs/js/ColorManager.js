var Colors = require('./Colors').Colors;

function ColorManager() {
  this.backColor = '#e09448';
  this.prevColor = -1;
  this.ColorNum = 4;

  this.greenColor = countColor('#008000');
  this.yellowColor = countColor('#ffa500');
  this.redColor = countColor('#ff0000');
  this.blueColor = countColor('#0000ff');

   var Color = {
     '#008000' : this.greenColor,
     '#ffa500' : this.yellowColor,
     '#ff0000' : this.redColor,
     '#0000ff' : this.blueColor
   };
   this.decrease = function (color) {
     if (Color[color] > 0) {
       Color[color] -= 1;
     }
   };
   this.increase = function (color) {
     Color[color] += 1;
   };
   this.getRandomColor = function () {
     var color = -1;
     var colorStr = '';
     if (this.checkAllZero()) {
       return this.backColor;
     }
     do {
       color = Math.floor(Math.random() * 4);
       colorStr = Object.keys(Color)[color];
     }
     while (Color[colorStr] === 0);
     return colorStr;
   };
   this.checkAllZero = function() {
     for (var i = 0; i < this.ColorNum; ++i) {
       var str = Object.keys(Color)[i];
       if (Color[str] !== 0) {
         return false;
       }
     }
     return true;
   };
}

function countColor (color) {
  var number = 0;
  for (var i = 0; i < Colors.length; ++i) {
    if (Colors[i] === color) {
      number ++;
    }
  }
  return number;
}

module.exports.ColorManager = ColorManager;
