/**
 * Created by Mihail on 11/10/2016.
 */

"use strict";

import { EventsConsts } from '../events/events-consts';
import Animator from '../utils/animator';
import ApiController from '../api/api-controller';

class FlyingPrize {
	constructor(sum) {
		this.sum = sum;

		document.addEventListener(EventsConsts.PRIZE_WON, () => {
			if (this.sum > 0) {
				FlyingPrize.animatePrizeFlying(this.sum);
				this.sum = 0;
			}
		});
	}

	static animatePrizeFlying(sum) {
		const elFlyingPrize = document.createElement('div');
		elFlyingPrize.setAttribute('id', 'flyingPrize');
		elFlyingPrize.innerHTML = sum;
		document.body.appendChild(elFlyingPrize);

		// Animate moving the element to given top and left positions
		Animator.moveDiagonally(elFlyingPrize, 45, 45, -45, 42, Animator.quad, 3000, '%');

		document.addEventListener(EventsConsts.FLYING_PRIZE_ANIMATION_ENDS, () => {
			if (document.body.contains(elFlyingPrize)) {
				document.body.removeChild(elFlyingPrize);

				// Add the new prize sum to the player balance
				ApiController.setNewBalance(sum, false);
			}
		});
	}
}

export default FlyingPrize;