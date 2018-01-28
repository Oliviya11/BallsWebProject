function ColorManager() {
  this.backColor = '#e09448';
  this.prevColor = -1;
  var ColorNum = 4;
   var Color = {
     '#008000' : 12,
     '#ffa500' : 17,
     '#ff0000' : 15,
     '#0000ff' : 21
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
     for (var i = 0; i < ColorNum; ++i) {
       var str = Object.keys(Color)[i];
       if (Color[str] !== 0) {
         return false;
       }
     }
     return true;
   }
}

module.exports.ColorManager = ColorManager;
