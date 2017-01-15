/**
 * Created by Mihail on 10/14/2016.
 */

'use strict';

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

	it('Should provide method for marking numbers', () => {
		expect(Card.markNumber).not.to.be.undefined;
	});

	it('Should provide method for marking number cells as drawn', () => {
		expect(Card.markDrawnNumber).not.to.be.undefined;
	});

	it('Should create new HTML card that has table cells with appropriate IDs', () => {
		const card = new Card(objCard);
		expect(card.children[0].firstElementChild.children[1].children[0].id).to.be.equal('11');
		expect(card.children[0].firstElementChild.children[1].children[1].id).to.be.equal('21');
		expect(card.children[0].firstElementChild.children[1].children[2].id).to.be.equal('31');
		expect(card.children[0].firstElementChild.children[1].children[3].id).to.be.equal('41');
		expect(card.children[0].firstElementChild.children[1].children[4].id).to.be.equal('51');

		expect(card.children[0].firstElementChild.children[2].children[0].id).to.be.equal('12');
		expect(card.children[0].firstElementChild.children[2].children[1].id).to.be.equal('22');
		expect(card.children[0].firstElementChild.children[2].children[2].id).to.be.equal('32');
		expect(card.children[0].firstElementChild.children[2].children[3].id).to.be.equal('42');
		expect(card.children[0].firstElementChild.children[2].children[4].id).to.be.equal('52');

		expect(card.children[0].firstElementChild.children[3].children[0].id).to.be.equal('13');
		expect(card.children[0].firstElementChild.children[3].children[1].id).to.be.equal('23');
		expect(card.children[0].firstElementChild.children[3].children[2].id).to.be.equal('33');
		expect(card.children[0].firstElementChild.children[3].children[3].id).to.be.equal('43');
		expect(card.children[0].firstElementChild.children[3].children[4].id).to.be.equal('53');

		expect(card.children[0].firstElementChild.children[4].children[0].id).to.be.equal('14');
		expect(card.children[0].firstElementChild.children[4].children[1].id).to.be.equal('24');
		expect(card.children[0].firstElementChild.children[4].children[2].id).to.be.equal('34');
		expect(card.children[0].firstElementChild.children[4].children[3].id).to.be.equal('44');
		expect(card.children[0].firstElementChild.children[4].children[4].id).to.be.equal('54');

		expect(card.children[0].firstElementChild.children[5].children[0].id).to.be.equal('15');
		expect(card.children[0].firstElementChild.children[5].children[1].id).to.be.equal('25');
		expect(card.children[0].firstElementChild.children[5].children[2].id).to.be.equal('35');
		expect(card.children[0].firstElementChild.children[5].children[3].id).to.be.equal('45');
		expect(card.children[0].firstElementChild.children[5].children[4].id).to.be.equal('55');
	});
});