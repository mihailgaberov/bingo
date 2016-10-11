/**
 * Created by Mihail on 9/11/2016.
 */
'use strict';

import Card from './card';

class CardDrawer {
	static draw(objCards) {
		let countCards = Object.keys(objCards).length;
		let arrCards = [];

		for (let i = 0; i < countCards; i++) {
			arrCards.push(CardDrawer.generateCardTable(objCards['card' + (i+1)]));
		}

		return arrCards;
	}
	
	static generateCardTable(objCard) {
		return new Card(objCard);
	}
}

export default CardDrawer;