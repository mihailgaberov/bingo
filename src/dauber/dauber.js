/**
 * Created by Mihail on 10/2/2016.
 */

'use strict';

import { NumbersGenerator } from '../utils/numbers-generator';
import PubSubService from '../events/pubsub-service';
import Ball from './ball';

class Dauber {
	constructor(conf = null, selector) {
		if (conf !== null) {
			this.conf = conf;
			this.selector = selector;
			this.drawnNumbers = [];
			this.drawTimeout = null;
			this.visibleBallNum = 0;
			this.arrVisibleBalls = [];
			this.isSecondPhase = false;
			this.pubsub = new PubSubService();
			this.pubsub.subscribe('fifthBallDrawn', (evData) => {
				console.log('>>> fifthBallDrawn');
				this.animateVisibleBalls();
			});
		} else {
			throw new Error('Dauber initialization error - no config');
		}
	}

	startDrawing(intervalinMs = 7000) {
		this.drawTimeout = setInterval(() => {
			let ball = new Ball(this.drawNewNumber(), this.pubsub);
			ball.draw(this.selector, ++this.visibleBallNum, this.isSecondPhase);
			this.arrVisibleBalls.push(ball);
			if (this.visibleBallNum === 5) {
				this.visibleBallNum = 0;
				this.isSecondPhase = true;
			}
		}, intervalinMs);
	}

	stopDrawing() {
		clearInterval(this.drawTimeout);
	}

	drawNewNumber() {
		const randomIdx = NumbersGenerator.getRandomNumber(0, this.conf.gameConf.numbers.length-1);
		const num = this.conf.gameConf.numbers[randomIdx];
		if (num !== undefined) {
			if (this.drawnNumbers.indexOf(num) !== -1) {
				// This number is already drawn - get another
				return this.drawNewNumber();
			} else {
				this.drawnNumbers.push(num);
				return num;
			}
		} else {
			throw new Error('Dauber draws undefined number');
		}
	}

	animateVisibleBalls() {
		setTimeout(() => {
			this.arrVisibleBalls[0].elBall.style.display = 'none';
			this.arrVisibleBalls.shift();   // remove the first drawn ball from the array
			this.arrVisibleBalls.forEach((ball) => {
				ball.elBall.style.left = (parseInt(ball.elBall.style.left) - 12) + '%';
			});
		}, 2500);
	}
}

export default Dauber;