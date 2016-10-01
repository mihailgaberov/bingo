/**
 * Created by Mihail on 9/24/2016.
 */

/*
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
 var radius = this.radius = 15;

 var ball = new Group({
 children: [
 new Path.Circle({
 radius: radius
 })
 ],
 fillColor: new Color(gradient, 0, radius, radius / 8)
 });

 var txt = new PointText(this.center);
 txt.style = {
 justification: 'center',
 fontWeight: 'bold',
 fillColor: 'white'
 };

 // Generate random random from 1 to 75 to attach it to a ball
 txt.content = Math.floor(Math.random() * (75)) + 1;


 ball.addChild(txt);

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
 this.vector.x *= -this.dampen / 2;
 if (pre.y < this.radius || pre.y > size.height - this.radius) {
 if (Math.abs(this.vector.x) < 3)
 this.vector = Point.random() * [150, 100] + [-75, 20];
 this.vector.y *= this.bounce / 2;
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
 y: Math.random() * (330 - 300) + 300
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
 */

'use strict';

import { paper } from '../../node_modules/paper/dist/paper-full';
import { NumbersGenerator } from '../utils/numbers-generator';

class Ball {
	constructor(point, vector) {
		if (!vector || vector.isZero()) {
			this.vector = {x: Math.random() * 5, y: Math.random() * 5};
		} else {
			this.vector = {x: vector.x * 2, y: vector.y * 2};
		}

		this.point = point;
		this.dampen = 0.4;
		this.gravity = 3;
		this.bounce = -0.6;

		let color = {
			hue: Math.random() * 360,
			saturation: 1,
			brightness: 1
		};
		let gradient = new paper.Gradient([color, 'black'], true);
		let radius = this.radius = 15;
		let ball = new paper.Group({
			children: [
				new paper.Path.Circle({
					radius: radius
				})
			],
			fillColor: new paper.Color(gradient, 0, radius, radius / 8)
		});

		let txt = new paper.PointText(this.center);
		txt.style = {
			justification: 'center',
			fontWeight: 'bold',
			fillColor: 'white'
		};

		txt.content = NumbersGenerator.getRandomNumber(1, 75);
		ball.addChild(txt);

		this.item = new paper.Group({
			children: [ball],
			transformContent: false,
			position: this.point
		});
	}

	iterate() {
		let size = paper.view.size;
		this.vector.y += this.gravity;
		this.vector.x *= 0.99;
		let pre = {
			x: this.point.x + this.vector.x,
			y: this.point.y + this.vector.y
		};


		if (pre.x < this.radius || pre.x > size.width - this.radius)
			this.vector.x *= -this.dampen / 2;

		if (pre.y < this.radius || pre.y > size.height - this.radius) {
			if (Math.abs(this.vector.x) < 3) {
				this.vector = {
					x: Math.random() * 150,
					y: Math.random() * 320
				};
			}
			this.vector.y *= this.bounce / 2;
		}

		let max = paper.Point.max(this.radius, {
			x: this.point.x + this.vector.x,
			y: this.point.y + this.vector.y
		});

		this.item.position = this.point = paper.Point.min(max, {
			x: size.width - this.radius,
			y: size.height - this.radius
		});
		this.item.rotate(this.vector.x);
	}

	putBallsOnBottom() {
		let size = paper.view.size;
		this.vector.y += this.gravity;
		this.vector.x *= 0.99;
		let pre = {
			x: this.point.x + this.vector.x,
			y: this.point.y + this.vector.y
		};

		if (pre.x < this.radius || pre.x > size.width - this.radius)
			this.vector.x *= -this.dampen;

		if (pre.y < this.radius || pre.y > size.height - this.radius) {
			/*if (Math.abs(this.vector.x) < .3)
				this.vector = Point.random() * [150, 100] + [-75, 20];
			this.vector.y *= this.bounce;*/
			if (Math.abs(this.vector.x) < .3) {
				this.vector = {
					x: Math.random() * 150,
					y: Math.random() * 320
				};
			}
		}

		/*let max = Point.max(this.radius, this.point + this.vector);
		this.item.position = this.point = Point.min(max, size - this.radius);*/
		let max = paper.Point.max(this.radius, {
			x: this.point.x + this.vector.x,
			y: this.point.y + this.vector.y
		});

		this.item.position = this.point = paper.Point.min(max, {
			x: size.width - this.radius,
			y: size.height - this.radius
		});
		this.item.rotate(this.vector.x);
	}
}

class Blower {
	constructor() {
		this.balls = [];
		this.init = {
			play: false,
			isPlaying: false
		};

		let canvas = document.getElementById('blower');
		if (canvas) {
			paper.setup(canvas);
		} else {
			throw new Error('There is no canvas element to draw the blower in.');
		}

		for (let i = 0; i < 75; i++) {
			let position = {
					x: Math.random() * (paper.view.size.width - 1) + 1,
					y: Math.random() * (paper.view.size.height - 300) + 300
				},
				vector = new paper.Point((Math.random() - 0.5) * 50, Math.random() * 100),
				ball = new Ball(position, vector);

			this.balls.push(ball);
		}

		paper.view.onFrame = (event) => {
			for (let i = 0, l = this.balls.length; i < l; i++) {
				if (this.init.play) {
					this.balls[i].iterate();
				} else if (this.init.play === false && this.init.isPlaying === true) {
					this.balls[i].putBallsOnBottom();
				}
			}
		};
	}

	startAnimation() {
		for (let i = 0, l = this.balls.length; i < l; i++) {
			this.balls[i].point = {
				x: Math.random() * (paper.view.size.width - 10) + 10,
				y: Math.random() * (paper.view.size.height - 10) + 10
			};
		}
		this.init.play = true;
		this.init.isPlaying = true;
	}

	stopAnimation() {
		this.init.play = false;

		setTimeout(() => {
			this.init.isPlaying = false;
		}, 5000);
	}
}

export default Blower;