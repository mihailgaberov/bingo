/**
 * Created by Mihail on 8/15/2016.
 */
'use strict';

import assert from 'assert';
import GenerateCardNumbers from '../../src/card/card-numbers-generator';
import { expect } from 'chai';

describe('Card Numbers Generator', () => {

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

	let cardGen = new GenerateCardNumbers({'gameConf': {'numbers': arrAmericanNumbers}});


	it ('Should initialize with an array of 75 numbers', () => {
		expect(cardGen.arrAmericanNumbers.length).to.be.equal(75);
	});

	it ('Should generate a random card with 24 numbers divided by columns', () => {
		const card = cardGen.generate();

		expect(card).to.be.object;
		expect(card).to.have.property('col1').that.is.an('array').with.length.of(5);
		expect(card).to.have.property('col2').that.is.an('array').with.length.of(5);
		expect(card).to.have.property('col3').that.is.an('array').with.length.of(5);
		expect(card).to.have.property('col4').that.is.an('array').with.length.of(5);
		expect(card).to.have.property('col5').that.is.an('array').with.length.of(5);

	});

});