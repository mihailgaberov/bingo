/**
 * Created by Mihail on 8/15/2016.
 */
'use strict';

import CardGenerator from '../../../src/card/card-generator';
import { expect } from 'chai';

describe('Card Generator', () => {

	let arrAmericanNumbers = [1, 2, 3, 4, 5,
		6, 7, 8, 9, 10,
		11, 12, 13, 14, 15,
		16, 17, 18, 19, 20,
		21, 22, 23, 24, 25,
		26, 27, 28, 29, 30,
		31, 32, 33, 34, 35,
		36, 37, 38, 39, 40,
		41, 42, 43, 44, 45,
		46, 47, 48, 49, 50,
		51, 52, 53, 54, 55,
		56, 57, 58, 59, 60,
		61, 62, 63, 64, 65,
		66, 67, 68, 69, 70,
		71, 72, 73, 74, 75
	];

	const cardGen = new CardGenerator({'gameConf': {'numbers': arrAmericanNumbers}});

	it('Should initialize Card creation services', () => {
		expect(cardGen).not.to.be.undefined;
	});

	it('Should generate a given number of cards', () => {
		let count = 4;

		const cards = cardGen.generateCards(count);

		expect(cards).to.be.object;
		while (count > 0) {
			expect(cards).to.have.property('card' + count).that.is.an('object');
			count--;
		}
	});
});