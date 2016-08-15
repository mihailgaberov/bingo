/**
 * Created by Mihail on 8/15/2016.
 */
'use strict';
import assert from 'assert';
import CardGenerator from '../../src/card/card-generator';
import { expect } from 'chai';

describe('Card Generator', () => {

	var cardGen = new CardGenerator();

	it ('Should initialize Card creation services', () => {
		expect(cardGen.genRandomNumbers).not.to.be.undefined;
	});
});