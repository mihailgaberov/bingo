/**
 * Created by Mihail on 10/14/2016.
 */

'use strict';

import assert from 'assert';
import Card from '../../src/card/card';
import { expect } from 'chai';
import jsdom  from 'mocha-jsdom';

describe('Card object', () => {

	jsdom();

	const objCard = {
		col1: [ 10, 14, 13, 15, 5 ],
		col2: [ 27, 23, 21, 29, 22 ],
		col3: [ 39, 37, 'x', 32, 33 ],
		col4: [ 56, 51, 60, 57, 59 ],
		col5: [ 72, 74, 63, 71, 70 ]
	};

	it('Should create new HTML card', () => {
		const card = new Card(objCard);
		expect(card).not.to.be.undefined;
	});

	it('Should provide method for clicking on cells', () => {
		expect(Card.clickCell).not.to.be.undefined;
	});

	it('Should provide method for marking numbers', () => {
		expect(Card.markNumber).not.to.be.undefined;
	});
});