/**
 * Created by Mihail on 10/2/2016.
 */

'use strict';

import { NumbersGenerator } from '../utils/numbers-generator';
import Ball from './ball';

class Dauber {
	constructor(conf = null, selector) {
		if (conf !== null) {
			this.conf = conf;
			this.selector = selector;
			this.drawnNumbers = [];
			this.drawTimeout = null;
		} else {
			throw new Error('Dauber initialization error - no config');
		}
	}

	startDrawing(intervalinMs = 7000) {
		this.drawTimeout = setInterval(() => {
			let ball = new Ball(this.drawNewNumber());
			ball.draw(this.selector);
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
}

export default Dauber;