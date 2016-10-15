/**
 * Created by Mihail on 9/11/2016.
 */
'use strict';

import Card from './card';
import { EventsConsts } from '../events/events-consts';

class CardDrawer {
	constructor(objCards) {
		document.addEventListener(EventsConsts.START_GAME, () => {
			CardDrawer.draw(objCards);
		});
	}

	static draw(objCards) {
		let countCards = Object.keys(objCards).length;
		let arrCards = [];

		for (let i = 0; i < countCards; i++) {
			arrCards.push(CardDrawer.generateCardTable(objCards['card' + (i+1)]));
		}

		arrCards.forEach((el) => {
			document.getElementById('cardsContainer').appendChild(el);
		});
	}
	
	static generateCardTable(objCard) {
		return new Card(objCard);
	}
}

export default CardDrawer;