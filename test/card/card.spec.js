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

	it('Should create new HTML card that has table cells with appropriate IDs', () => {
		const card = new Card(objCard);
		expect(card.children[0].firstElementChild.children[1].children[0].id).to.be.equal('x1y1');
		expect(card.children[0].firstElementChild.children[1].children[1].id).to.be.equal('x2y1');
		expect(card.children[0].firstElementChild.children[1].children[2].id).to.be.equal('x3y1');
		expect(card.children[0].firstElementChild.children[1].children[3].id).to.be.equal('x4y1');
		expect(card.children[0].firstElementChild.children[1].children[4].id).to.be.equal('x5y1');

		expect(card.children[0].firstElementChild.children[2].children[0].id).to.be.equal('x1y2');
		expect(card.children[0].firstElementChild.children[2].children[1].id).to.be.equal('x2y2');
		expect(card.children[0].firstElementChild.children[2].children[2].id).to.be.equal('x3y2');
		expect(card.children[0].firstElementChild.children[2].children[3].id).to.be.equal('x4y2');
		expect(card.children[0].firstElementChild.children[2].children[4].id).to.be.equal('x5y2');

		expect(card.children[0].firstElementChild.children[3].children[0].id).to.be.equal('x1y3');
		expect(card.children[0].firstElementChild.children[3].children[1].id).to.be.equal('x2y3');
		expect(card.children[0].firstElementChild.children[3].children[2].id).to.be.equal('x3y3');
		expect(card.children[0].firstElementChild.children[3].children[3].id).to.be.equal('x4y3');
		expect(card.children[0].firstElementChild.children[3].children[4].id).to.be.equal('x5y3');

		expect(card.children[0].firstElementChild.children[4].children[0].id).to.be.equal('x1y4');
		expect(card.children[0].firstElementChild.children[4].children[1].id).to.be.equal('x2y4');
		expect(card.children[0].firstElementChild.children[4].children[2].id).to.be.equal('x3y4');
		expect(card.children[0].firstElementChild.children[4].children[3].id).to.be.equal('x4y4');
		expect(card.children[0].firstElementChild.children[4].children[4].id).to.be.equal('x5y4');

		expect(card.children[0].firstElementChild.children[5].children[0].id).to.be.equal('x1y5');
		expect(card.children[0].firstElementChild.children[5].children[1].id).to.be.equal('x2y5');
		expect(card.children[0].firstElementChild.children[5].children[2].id).to.be.equal('x3y5');
		expect(card.children[0].firstElementChild.children[5].children[3].id).to.be.equal('x4y5');
		expect(card.children[0].firstElementChild.children[5].children[4].id).to.be.equal('x5y5');
	});
});