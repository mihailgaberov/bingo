/**
 * Created by Mihail on 8/15/2016.
 */
'use strict';

import assert from 'assert';
import GenerateCardNumbers from '../../src/card/generate-card-numbers';
import { expect } from 'chai';

describe('Card Numbers Generator', () => {

	var genNumbers = new GenerateCardNumbers();

	it ('Should initialize with an array of 75 numbers', () => {
		var arrNums = genNumbers.arrAmericanNumbers;
		expect(arrNums.length).to.be.equal(75);
	});

	it ('Should generate 24 random numbers', () => {
		const randomNums1 = genNumbers.generate();
		const randomNums2 = genNumbers.generate();
		expect(randomNums1).to.not.be.equal(randomNums2);
	});
});