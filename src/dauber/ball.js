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

	draw() {
		console.log('>>> draw ball');
	}
}

export default Ball;