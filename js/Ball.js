function Ball(id, center, radius, color ) {

    this.id = id;
    this.color = color;

    var ball = new Path.Circle({
        center: center,
        radius: radius,
        fillColor: this.color
    });

    this.getId = function() {
        return this.id;
    };

    this.move = function(pos) {
         ball.position = pos;
    };

    this.getPath = function() {
        return ball;
    };

    this.changeColor = function(new_color) {
        this.color = new_color;
        ball.fillColor = new_color;
    };

    this.getColor = function() {
        return this.color;
    };
}

module.exports.Ball = Ball;


