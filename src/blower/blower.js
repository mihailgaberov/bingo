/**
 * Created by Mihail on 9/24/2016.
 */
'use strict';

import { Utils } from '../utils/utils';
import { paper } from '../../node_modules/paper/dist/paper-full';
import { NumbersGenerator } from '../utils/numbers-generator';
import { EventsConsts } from '../events/events-consts';

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
		Ball.bounce = -0.6;

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
			this.vector.y *= Ball.bounce / 2;
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
			if (Math.abs(this.vector.x) < .3) {
				this.vector = {
					x: Math.random() * 150,
					y: Math.random() * 320
				};
			}
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
}

class Blower {
	constructor(element) {
		document.addEventListener(EventsConsts.START_GAME, () => {
			this.startAnimation();
		});
		this.element = element;
		this.balls = [];
		this.init = {
			play: false,
			isPlaying: false
		};

		if (element) {
			element.setAttribute('width', '208px');
			element.setAttribute('height', '208px');
			paper.setup(element);
		} else {
			throw new Error('There is no canvas element to draw the blower in.');
		}

		for (let i = 0; i < 75; i++) {
			let position = {
					x: Math.random() * (paper.view.size.width - 1) + 1,
					y: Math.random() * (paper.view.size.height - 140) + 140
				},
				vector = new paper.Point((Math.random() - 0.5) * 50, Math.random() * 100),
				ball = new Ball(position, vector);

			this.balls.push(ball);
		}

		paper.view.onFrame = () => {
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
		Utils.toggleVisibility(this.element, true);
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