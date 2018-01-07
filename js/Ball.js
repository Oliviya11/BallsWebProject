function Ball(id, center, radius, color ) {

    this.id = id;

    var ball = new Path.Circle({
        center: center,
        radius: radius,
        fillColor: 'yellow'
    });

    this.getId = function() {
        return this.id;
    };

    this.move = function(pos) {
         ball.position = pos;
    };
}

module.exports.Ball = Ball;


