import { Utils } from '../utils/utils';
import { EventsConsts } from '../events/events-consts';
import Animator from '../utils/animator';

class Ball {
	constructor(num, pubsub, skin = { "name": "original" }) {
		this.elBall = document.createElement('div');
		this.elBall.setAttribute('id', 'ball');
		this.elNumber = document.createElement('span');
		this.elNumber.innerText = num;
		this.elInnerCircle = document.createElement('div');
		this.elInnerCircle.setAttribute('id', 'innerCircle');
		this.elBall.className = `${skin.name}_${Utils.getCssClassByNumber(num)}`;
		this.pubsub = pubsub;
	}

	draw(parentElement, visibleBallNum, isSecondPhase = false) {

		this.elInnerCircle.appendChild(this.elNumber);
		this.elBall.appendChild(this.elInnerCircle);
		parentElement.appendChild(this.elBall);

		setTimeout(() => {
			if (isSecondPhase) {
				this.move(this.elBall, Animator.bounce, Animator.quad, 1000, 5);
			} else {
				this.move(this.elBall, Animator.bounce, Animator.quad, 1000, visibleBallNum);
			}
		}, 200);
	}

	move(element, delta1, delta2, duration = 1000, visibleBallNum) {
		const posUp = 2;
		const startPos = 62;
		const endPosBall2 = 47;
		const endPosBall3 = 32;
		const endPosBall4 = 17;
		const endPosBall5 = 2;

		// If there is the first animation - run it
		if (delta1 !== null) {
			this.animate({
				delay: 10,
				duration: duration,
				delta: delta1,
				step: (delta) => {
					element.style.top = (-posUp * delta) + 7 + "%";
				}
			});
		}

		// If there is the second animation - run it
		if (delta2 !== null) {
			setTimeout(() => {
				this.animate({
					delay: 10,
					duration: 1000,
					delta: delta2,
					isFifth: visibleBallNum,
					step: (delta) => {
						switch (visibleBallNum) {
							case 1:
								element.style.left = (-(startPos * delta) + startPos) + "%";
								Animator.rotateElement(element, -1440, Animator.linear, 400);
								break;
							case 2:
								element.style.left = (-(endPosBall2 * delta) + startPos) + "%";
								Animator.rotateElement(element, -1080, Animator.linear, 400);
								break;
							case 3:
								element.style.left = (-(endPosBall3 * delta) + startPos) + "%";
								Animator.rotateElement(element, -720, Animator.linear, 400);
								break;
							case 4:
								element.style.left = (-(endPosBall4 * delta) + startPos) + "%";
								Animator.rotateElement(element, -360, Animator.linear, 400);
								break;
							case 5:
								element.style.left = (-(endPosBall5 * delta) + startPos) + "%";
								Animator.rotateElement(element, -360, Animator.linear, 400);
								break;
						}
					}
				});
			}, 1000);
		}
	}

	animate(opts) {
		const start = new Date;

		const id = setInterval(() => {
			let timePassed = new Date - start;
			let progress = timePassed / opts.duration;

			if (progress > 1)
				progress = 1;

			let delta = opts.delta(progress);
			opts.step(delta);

			if (progress === 1) {
				if (opts.isFifth === 5)
					this.pubsub.publish(EventsConsts.FIFTH_BALL_DRAWN, {});
				clearInterval(id);
			}
		}, opts.delay || 10);
	}
}

export default Ball;
