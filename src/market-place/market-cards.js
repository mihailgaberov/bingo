/**
 * Created by Mihail on 10/23/2016.
 */
'use strict';

import { EventsConsts } from '../events/events-consts';
import ViewManipulator from '../utils/view-manipulator';

class MarketCards {
	constructor(container) {
		this.container = container;

		document.addEventListener(EventsConsts.END_GAME, () => {
			setTimeout(() => {
				ViewManipulator.toggleVisibility(container, true);
				ViewManipulator.toggleVisibility(document.querySelector('#footer'), true);
			}, 5000);
		});
	}

	getPurchasedCardsCount() {
		const arrRadioButtons = this.container.querySelectorAll('input[type=radio]');
		let numberOfCards = 0;
		let len = arrRadioButtons.length - 1;

		while (len >= 0) {
			if (arrRadioButtons[len].checked) {
				numberOfCards = Number(arrRadioButtons[len].value);
			}
			len--;
		}

		return numberOfCards;
	}

	buyCards(count, price) {
		console.log('>>> count: ', count);
		console.log('>>> [price: ', price);
	}
}

export default MarketCards;