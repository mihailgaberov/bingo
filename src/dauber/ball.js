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

	draw(parentElement, visibleBallNum) {
		const elBall = document.createElement('div');
		const elNumber = document.createElement('span');
		elNumber.innerText = this.number;
		elBall.style.backgroundImage = this.color;
		elBall.style.borderColor = this.borderColor;
		elBall.appendChild(elNumber);
		parentElement.appendChild(elBall);

		setTimeout(() => {
			this.move(elBall, Ball.bounce, Ball.quad, 1000, visibleBallNum);
		}, 200);
	}

	move(element, delta1, delta2, duration = 1000, visibleBallNum) {
		const posUp = 5;
		const startPos = 61;
		const endPosBall2 = 49;
		const endPosBall3 = 37;
		const endPosBall4 = 25;
		const endPosBall5 = 13;

		this.animate({
			delay: 10,
			duration: duration,
			delta: delta1,
			step: function (delta) {
				element.style.top = (-posUp * delta) + 5.5 + "%";
			}
		});

		setTimeout(() => {
				this.animate({
				delay: 10,
				duration: 1000,
				delta: delta2,
				step: function (delta) {
					switch (visibleBallNum) {
						case 1:
							element.style.left = (-(startPos * delta) + startPos) + "%";
							break;
						case 2:
							element.style.left = (-(endPosBall2 * delta) + startPos) + "%";
							break;
						case 3:
							element.style.left = (-(endPosBall3 * delta) + startPos) + "%";
							break;
						case 4:
							element.style.left = (-(endPosBall4 * delta) + startPos) + "%";
							break;
						case 5:
							element.style.left = (-(endPosBall5 * delta) + startPos) + "%";
							break;
					}
				}
			});
		}, 1000);
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

	static bounce(progress) {
		for (var a = 0, b = 1; 1; a += b, b /= 2) {
			if (progress >= (7 - 4 * a) / 11) {
				return -Math.pow((11 - 6 * a - 11 * progress) / 4, 2) + Math.pow(b, 2)
			}
		}
	}

	static quad(progress) {
		return Math.pow(progress, 2)
	}

}

export default Ball;