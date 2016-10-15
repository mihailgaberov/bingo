/**
 * Created by Mihail on 10/2/2016.
 */

'use strict';

import { EventsConsts } from '../events/events-consts';
import { NumbersGenerator } from '../utils/numbers-generator';
import PubSubService from '../events/pubsub-service';
import Ball from './ball';

class Dauber {
	constructor(conf = null, selector) {
		if (conf !== null) {
			document.addEventListener(EventsConsts.START_GAME, () => {
				const drawBallTime = conf.gameConf.drawTimeIntervalSeconds * 1000;
				this.startDrawing(drawBallTime);
			});

			this.conf = conf;
			this.selector = selector;
			this.arrDrawnNums = [];
			this.drawTimeout = null;
			this.visibleBallNum = 0;
			this.arrVisibleBalls = [];
			this.isSecondPhase = false;
			this.pubsub = new PubSubService();
			this.pubsub.subscribe('fifthBallDrawn', (evData) => {
				this.animateVisibleBalls();
			});
		} else {
			throw new Error('Dauber initialization error - no config');
		}
	}

	startDrawing(intervalinMs = 7000) {
		this.selector.parentElement.style.display = 'block';
		this.drawTimeout = setInterval(() => {
			const drawnNum = this.drawNewNumber();
			let ball = new Ball(drawnNum, this.pubsub, this.conf.gameConf.skin);
			ball.draw(this.selector, ++this.visibleBallNum, this.isSecondPhase);
			this.arrVisibleBalls.push(ball);

			// Dispatch new event with the drawn number
			const event = new CustomEvent(EventsConsts.NEW_BALL_DRAWN, {
					detail: {
						drawnNumber: drawnNum,
						time: new Date()
					}, bubbles: true, cancelable: true
				}
			);
			this.selector.dispatchEvent(event);

			if (this.visibleBallNum === 5) {
				this.visibleBallNum = 0;
				this.isSecondPhase = true;
			}

			// Set default value for turns count if no configured
			if (this.conf.gameConf.turnsCount === undefined)
				this.conf.gameConf.turnsCount = 23;

			if (this.arrDrawnNums.length >= this.conf.gameConf.turnsCount) {
				// End Game
				this.stopDrawing();
			}
		}, intervalinMs);
	}

	stopDrawing() {
		clearInterval(this.drawTimeout);
	}

	drawNewNumber() {
		const randomIdx = NumbersGenerator.getRandomNumber(0, this.conf.gameConf.numbers.length - 1);
		const num = this.conf.gameConf.numbers[randomIdx];
		if (num !== undefined) {
			if (this.arrDrawnNums.indexOf(num) !== -1) {
				// This number is already drawn - get another
				return this.drawNewNumber();
			} else {
				this.arrDrawnNums.push(num);
				return num;
			}
		} else {
			throw new Error('Dauber draws undefined number');
		}
	}

	animateVisibleBalls() {
		this.arrVisibleBalls[0].elBall.style.display = 'none';
		this.arrVisibleBalls.shift();   // remove the first drawn ball from the array
		this.arrVisibleBalls.forEach((ball) => {
			ball.elBall.style.left = (parseInt(ball.elBall.style.left) - 12) + '%';
		});
	}
}

export default Dauber;