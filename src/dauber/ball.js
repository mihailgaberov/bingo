/**
 * Created by Mihail on 10/2/2016.
 */

'use strict';

import { Utils } from '../utils/utils';

class Ball {
	constructor(num) {
		this.number = num;
		this.color = Utils.getColorByNumber(num);
		this.borderColor = Utils.getBorderColorByNumber(num);
	}

	draw(parentElement) {
		const elBall = document.createElement('div');
		const elNumber = document.createElement('span');
		elNumber.innerText = this.number;
		elBall.style.backgroundImage = this.color;
		elBall.style.borderColor = this.borderColor;
		elBall.appendChild(elNumber);
		parentElement.appendChild(elBall);

		setTimeout(() => {
			this.move(elBall, Ball.bounce);
		}, 200);
	}

	animate(opts) {
		const start = new Date;

		let id = setInterval(function () {
			let timePassed = new Date - start;
			let progress = timePassed / opts.duration;

			if (progress > 1)
				progress = 1;

			let delta = opts.delta(progress);

			opts.step(delta);

			if (progress == 1) {
				clearInterval(id)
			}
		}, opts.delay || 10);
	}

	move(element, delta, duration) {
		let posUp = 5;
		let posLeft = 3;

		this.animate({
			delay: 10,
			duration: duration || 1000,
			delta: delta,
			step: function(delta) {
				element.style.marginTop = (-posUp * delta) + 5.5 + "%";
			}
		});

		setTimeout(() => {
			this.animate({
				delay: 12,
				duration: duration || 1200,
				delta: Ball.linear,
				step: function(delta) {
					element.style.marginLeft = -posLeft * 2 * delta + 6 + "%";
				}
			});
		}, 1000);
	}

	static bounce(progress) {
		for(var a = 0, b = 1, result; 1; a += b, b /= 2) {
			if (progress >= (7 - 4 * a) / 11) {
				return -Math.pow((11 - 6 * a - 11 * progress) / 4, 2) + Math.pow(b, 2)
			}
		}
	}

	static linear(progress) {
		return progress
	}
}

export default Ball;