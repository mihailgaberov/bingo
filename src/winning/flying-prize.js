/**
 * Created by Mihail on 11/10/2016.
 */

"use strict";

import { EventsConsts } from '../events/events-consts';
import Animator from '../utils/animator';

class FlyingPrize {
	constructor(sum) {
		this.sum = sum;

		document.addEventListener(EventsConsts.PRIZE_WON, () => {
			if (this.sum > 0) {
				console.log('>>> animate flying the prize= ', this.sum);
				FlyingPrize.animatePrizeFlying(this.sum);
				this.sum = 0;
			}
		});
	}

	static animatePrizeFlying(sum) {
		const elPrize = document.createElement('div');
		elPrize.setAttribute('id', 'flyingPrize');
		elPrize.innerHTML = sum;
		document.appendChild(elPrize);
		Animator.move(elPrize, 500, 600, Animator.quad, 1000, 'px');
	}
}

export default FlyingPrize;