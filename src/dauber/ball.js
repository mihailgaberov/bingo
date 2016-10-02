/**
 * Created by Mihail on 10/2/2016.
 */

'use strict';

import { Utils } from '../utils/utils';

class Ball {
	constructor(num) {
		this.number = num;
		this.color = Utils.getColorByNumber(num);
	}

	draw(parentElement) {
		const elBall = document.createElement('div');
		const elNumber = document.createElement('span');
		elNumber.innerText = this.number;
		elBall.style.backgroundColor = this.color;
		elBall.appendChild(elNumber);
		parentElement.appendChild(elBall);
	}
}

export default Ball;