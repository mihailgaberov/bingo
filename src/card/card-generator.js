/**
 * Created by Mihail on 8/15/2016.
 */
'use strict';

import GenerateCardNumbers from './card-numbers-generator'

class CardGenerator {
	constructor(conf) {
		this.cardsGenerator = new GenerateCardNumbers(conf);
		//return this.cardsGenerator;
	}

	generateCards(count) {
		let objCards = {};
		while(count > 0) {
			objCards['card' + count] = this.cardsGenerator.generate();
			count--;
		}

		return objCards;
	}
}

export default CardGenerator;
