/**
 * Created by Mihail on 10/2/2016.
 */

'use strict';

import ViewManipulator from '../utils/view-manipulator';
import { EventsConsts } from '../events/events-consts';
import { NumbersGenerator } from '../utils/numbers-generator';
import PubSubService from '../events/pubsub-service';
import Ball from './ball';
import Animator from '../utils/animator';

class Dauber {
	constructor(conf = null, element) {
		if (conf !== null) {
			document.addEventListener(EventsConsts.START_GAME, () => {
				const drawBallTime = conf.gameConf.drawIntervalSeconds * 1000;
				this.startDrawing(drawBallTime);
			});

			document.addEventListener(EventsConsts.END_GAME, () => {
				setTimeout(() => {
					ViewManipulator.toggleVisibility(this.element.parentElement, false);

					// Clear all game elements values
					this.drawTimeout = null;
					this.arrDrawnNums = [];
					this.arrDrawnNums.length = 0;
					this.arrVisibleBalls = [];
					this.arrVisibleBalls.length = 0;
					this.visibleBallNum = 0;
					this.element.innerHTML = '';
					this.isSecondPhase = false;
				}, 5000);
			});


			this.conf = conf;
			this.element = element;
			this.arrDrawnNums = [];
			this.drawTimeout = null;
			this.visibleBallNum = 0;
			this.arrVisibleBalls = [];
			this.isSecondPhase = false;
			this.pubsub = new PubSubService();
			this.pubsub.subscribe(EventsConsts.FIFTH_BALL_DRAWN, () => {
				this.animateVisibleBalls();
			});

			this.elVisibleBallsContainer = document.createElement('div');
			this.elVisibleBallsContainer.setAttribute('id', 'elVisibleBallsContainer');
			this.element.appendChild(this.elVisibleBallsContainer);
		} else {
			throw new Error('Dauber initialization error - no config');
		}
	}

	startDrawing(intervalinMs = 7000) {
		ViewManipulator.toggleVisibility(this.element.parentElement, true);
		this.drawTimeout = setInterval(() => {
			const drawnNum = this.drawNewNumber();
			let ball = new Ball(drawnNum, this.pubsub, this.conf.gameConf.skin);
			ball.draw(this.element, ++this.visibleBallNum, this.isSecondPhase);
			this.arrVisibleBalls.push(ball);

			// Dispatch new event with the drawn number
			const event = new CustomEvent(EventsConsts.NEW_BALL_DRAWN, {
					detail: {
						drawnNumber: drawnNum,
						time: new Date()
					}, bubbles: true, cancelable: true
				}
			);
			this.element.dispatchEvent(event);

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
		// Dispatch new event when the game ends
		const event = new CustomEvent(EventsConsts.END_GAME, {
				detail: {
					time: new Date()
				}, bubbles: true, cancelable: true
			}
		);
		this.element.dispatchEvent(event);
		clearInterval(this.drawTimeout);

		console.log('>>> dispatchEvent END_GAME from dauber');
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
		ViewManipulator.toggleVisibility(this.arrVisibleBalls[0].elBall, false);
		this.arrVisibleBalls.shift();   // remove the first drawn ball from the array
		this.elVisibleBallsContainer.style.left = '0';
		if (this.elVisibleBallsContainer.lastChild) {
			this.elVisibleBallsContainer.removeChild(this.elVisibleBallsContainer.lastChild);
		}

		this.arrVisibleBalls.forEach((ball) => {
			ball.elBall.style.left = (parseInt(ball.elBall.style.left) - 15) + '%';
			Animator.rotateElement(ball.elBall, 360, Animator.linear, 500);
		});

		for (let i = 0, len = this.arrVisibleBalls.length; i < len; i++) {
			this.elVisibleBallsContainer.appendChild(this.arrVisibleBalls[i].elBall);
		}

		Animator.moveVerticalHorizontal(this.elVisibleBallsContainer, 0, -15, Animator.quad, 500, '%');
	}
}

export default Dauber;