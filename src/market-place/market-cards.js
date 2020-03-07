/**
 * Created by Mihail on 10/23/2016.
 */
'use strict';

import { EventsConsts } from '../events/events-consts';
import ViewManipulator from '../utils/view-manipulator';
import ApiController from '../API/api-controller';

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

	getRadioButtonsArray() {
		return this.container.querySelectorAll('input[type=radio]');
	}

	static getPurchasedCardsCount(arrRadioButtons) {
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

	static setCardPrices(price, arrElements) {
		let len = arrElements.length - 1;

		while (len >= 0) {
			const howManyCards = arrElements[len].querySelector('input[type=radio]').value;
			arrElements[len].querySelector('.price').innerHTML = `<i class="price-icon"></i>${parseInt(price * howManyCards)}`;
			len--;
		}

		return arrElements;
	}

	static buyCards(count, price) {
		const totalSpent = Number(count) * Number(price);

		const promiseBalance = ApiController.getPlayerBalancePromise();
		promiseBalance.then((val) => {
			// Calculate if the user has enough money to buy the selected cards in order to start the game
			if (Number(val) >= 0) {
				ApiController.setNewBalance(totalSpent, true);
				const event = new CustomEvent(EventsConsts.ENOUGH_BALANCE, {
						detail: {
							time: new Date()
						}, bubbles: true, cancelable: true
					}
				);
				document.dispatchEvent(event);
			} else {
				// Dispatch new event for showing the not enough money dialog
				const event = new CustomEvent(EventsConsts.NOT_ENOUGH_BALANCE, {
						detail: {
							time: new Date()
						}, bubbles: true, cancelable: true
					}
				);
				document.dispatchEvent(event);
			}
		});
	}
}

export default MarketCards;
