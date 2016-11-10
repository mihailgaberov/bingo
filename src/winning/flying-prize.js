/**
 * Created by Mihail on 11/10/2016.
 */

"use strict";

import { EventsConsts } from '../events/events-consts';

class FlyingPrize {
	constructor(sum) {
		this.sum = sum;

		document.addEventListener(EventsConsts.PRIZE_WON, () => {
			console.log('>>> animate flying the prize= ', this.sum);
		});
	}
}

export default FlyingPrize;