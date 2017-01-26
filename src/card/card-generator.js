/**
 * Created by Mihail on 8/15/2016.
 */
'use strict';

import CardNumbersGenerator from './card-numbers-generator'

class CardGenerator {
	constructor(conf) {
		this.cardsGenerator = new CardNumbersGenerator(conf);
	}

	/**
	 * Generates given number of cards with random numbers. One card by default.
	 * @param count
	 * @returns {{}}
	 */
	generateCards(count = 1) {
		let objCards = {};
		while(count > 0) {
			objCards['card' + count] = this.cardsGenerator.generate();
			count--;
		}

		return objCards;
	}
}

export default CardGenerator;
