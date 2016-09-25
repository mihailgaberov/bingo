/**
 * Created by Mihail on 9/24/2016.
 */

var Ball = function (point, vector) {
	if (!vector || vector.isZero()) {
		this.vector = Point.random() * 5;
	} else {
		this.vector = vector * 2;
	}

	this.point = point;
	this.dampen = 0.4;
	this.gravity = 3;
	this.bounce = -0.6;

	var color = {
		hue: Math.random() * 360,
		saturation: 1,
		brightness: 1
	};
	var gradient = new Gradient([color, 'black'], true);

	//var radius = this.radius = 50 * Math.random() + 30;
	var radius = this.radius = 15;
	// Wrap CompoundPath in a Group, since CompoundPaths directly
	// applies the transformations to the content, just like Path.
	var ball = new CompoundPath({
		children: [
			new Path.Circle({
				radius: radius
			})/*,
			 new Path.Circle({
			 center: radius / 8,
			 radius: radius / 3
			 })*/
		],
		fillColor: new Color(gradient, 0, radius, radius / 8)
	});

	this.item = new Group({
		children: [ball],
		transformContent: false,
		position: this.point
	});
};

Ball.prototype.iterate = function () {
	var size = view.size;
	this.vector.y += this.gravity;
	this.vector.x *= 0.99;
	var pre = this.point + this.vector;
	if (pre.x < this.radius || pre.x > size.width - this.radius)
		this.vector.x *= -this.dampen;
	if (pre.y < this.radius || pre.y > size.height - this.radius) {
		if (Math.abs(this.vector.x) < 3)
			this.vector = Point.random() * [150, 100] + [-75, 20];
		this.vector.y *= this.bounce;
	}

	var max = Point.max(this.radius, this.point + this.vector);
	this.item.position = this.point = Point.min(max, size - this.radius);
	this.item.rotate(this.vector.x);
};

Ball.prototype.putBallsOnBottom = function () {
	var size = view.size;
	this.vector.y += this.gravity;
	this.vector.x *= 0.99;
	var pre = this.point + this.vector;
	if (pre.x < this.radius || pre.x > size.width - this.radius)
		this.vector.x *= -this.dampen;
	if (pre.y < this.radius || pre.y > size.height - this.radius) {
		if (Math.abs(this.vector.x) < .3)
			this.vector = Point.random() * [150, 100] + [-75, 20];
		this.vector.y *= this.bounce;
	}

	var max = Point.max(this.radius, this.point + this.vector);
	this.item.position = this.point = Point.min(max, size - this.radius);
	this.item.rotate(this.vector.x);
};


var balls = [];
for (var i = 0; i < 75; i++) {
	var position = {
			x: Math.random() * (view.size.width - 1) + 1,
			y: Math.random() * (250 - 220) + 220
		},
		vector = (Point.random() - [0.5, 0]) * [50, 100],
		ball = new Ball(position, vector);

	balls.push(ball);
}

var init = {
	play: false,
	isPlaying: false
};

function startAnimation() {
	for (var i = 0, l= balls.length; i < l; i++) {
		balls[i].point = Point.random() * view.size;
	}
	init.play = true;
	init.isPlaying = true;
}

function stopAnimation() {
	init.play = false;

	setTimeout(function () {
		init.isPlaying = false;
	}, 2000);
}

function onMouseUp(event) {
	if (!init.play) {
		startAnimation();
	} else {
		stopAnimation();
	}
}

function onFrame() {
	for (var i = 0, l = balls.length; i < l; i++) {
		if (init.play) {
			balls[i].iterate();
		} else if (init.play === false && init.isPlaying === true) {
			balls[i].putBallsOnBottom();
		}
	}
}
