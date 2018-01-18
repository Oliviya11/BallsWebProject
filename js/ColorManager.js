function ColorManager() {
  this.prevColor = -1;
   var Color = {
     'green' : 6,
     '#FFA500' : 7,
     'red' : 7,
     'blue' : 10
   };
   this.decrese = function (color) {
     Color[color] -= 1;
  };
   this.getRandomColor = function () {
     /*
     var color = this.prevColor;
     while (color === this.prevColor || Color[color] === 0) {
       color = Math.floor(Math.random() * 4);
     }
     this.prevColor = color;
     */
     var color = -1;
     do {
       color = Math.floor(Math.random() * 4);
     }
     while (Color[color] === 0);
     return Object.keys(Color)[color];
   }
}

module.exports.ColorManager = ColorManager;
