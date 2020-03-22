import Card from './card';
import { EventsConsts } from '../events/events-consts';
import ViewManipulator from '../utils/view-manipulator';

class CardDrawer {
	constructor(objCards, element) {
		document.addEventListener(EventsConsts.START_GAME, () => {
			CardDrawer.draw(objCards, element);
			ViewManipulator.toggleVisibility(element, true);
		});

		document.addEventListener(EventsConsts.END_GAME, () => {
			setTimeout(() => {
				ViewManipulator.toggleVisibility(element, false);
			}, 5000);
		});
	}

	static draw(objCards, element) {
		let countCards = Object.keys(objCards).length;
		let arrCards = [];

		for (let i = 0; i < countCards; i++) {
			arrCards.push(CardDrawer.generateCardTable(objCards['card' + (i+1)]));
		}

		// Clean the cards container first
		element.innerHTML = '';
		arrCards.forEach((el) => {
			element.appendChild(el);
		});

		return arrCards;
	}

	static generateCardTable(objCard) {
		return new Card(objCard);
	}
}

export default CardDrawer;
