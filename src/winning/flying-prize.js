/**
 * Created by Mihail on 11/10/2016.
 */

"use strict";

import { EventsConsts } from '../events/events-consts';

class FlyingPrize {
	constructor(sum) {
		this.sum = sum;

		document.addEventListener(EventsConsts.PRIZE_WON, () => {
			if (this.sum > 0) {
				console.log('>>> animate flying the prize= ', this.sum);
				this.sum = 0;
			}
		});
	}
}

export default FlyingPrize;