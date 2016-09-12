/**
 * Created by Mihail on 9/11/2016.
 */
'use strict';

import assert from 'assert';
import CardDrawer from '../../src/card/card-drawer';
import { expect } from 'chai';
import jsdom  from 'mocha-jsdom';

describe('Card Drawer', () => {

	let cardDrawer = new CardDrawer();

	jsdom();


	it('Should create a div element with id "card" with a Bingo card table inside', () => {
		const objCard = {
			col1: [ 10, 14, 13, 15, 5 ],
			col2: [ 27, 23, 21, 29, 22 ],
			col3: [ 39, 37, 'x', 32, 33 ],
			col4: [ 56, 51, 60, 57, 59 ],
			col5: [ 72, 74, 63, 71, 70 ]
		};

		const htmlCard = cardDrawer.draw(objCard);

		expect(htmlCard.id).to.be.equal('card');
		expect(htmlCard.children[0].tagName).to.be.equal('TABLE');
		expect(htmlCard.children[0].firstElementChild.children.length).to.be.equal(5);

		/* row 1 */
		expect(htmlCard.children[0].firstElementChild.children[0].children.length).to.be.equal(5);
		// col 1
		expect(parseInt(htmlCard.children[0].firstElementChild.children[0].children[0].innerHTML)).to.be.equal(10);
		// col 2
		expect(parseInt(htmlCard.children[0].firstElementChild.children[0].children[1].innerHTML)).to.be.equal(27);
		// col 3
		expect(parseInt(htmlCard.children[0].firstElementChild.children[0].children[2].innerHTML)).to.be.equal(39);
		// col 4
		expect(parseInt(htmlCard.children[0].firstElementChild.children[0].children[3].innerHTML)).to.be.equal(56);
		// col 5
		expect(parseInt(htmlCard.children[0].firstElementChild.children[0].children[4].innerHTML)).to.be.equal(72);

		/* row 2 */
		expect(htmlCard.children[0].firstElementChild.children[1].children.length).to.be.equal(5);
		// col 1
		expect(parseInt(htmlCard.children[0].firstElementChild.children[1].children[0].innerHTML)).to.be.equal(14);
		// col 2
		expect(parseInt(htmlCard.children[0].firstElementChild.children[1].children[1].innerHTML)).to.be.equal(23);
		// col 3
		expect(parseInt(htmlCard.children[0].firstElementChild.children[1].children[2].innerHTML)).to.be.equal(37);
		// col 4
		expect(parseInt(htmlCard.children[0].firstElementChild.children[1].children[3].innerHTML)).to.be.equal(51);
		// col 5
		expect(parseInt(htmlCard.children[0].firstElementChild.children[1].children[4].innerHTML)).to.be.equal(74);

		/* row 3 */
		expect(htmlCard.children[0].firstElementChild.children[2].children.length).to.be.equal(5);
		// col 1
		expect(parseInt(htmlCard.children[0].firstElementChild.children[2].children[0].innerHTML)).to.be.equal(13);
		// col 2
		expect(parseInt(htmlCard.children[0].firstElementChild.children[2].children[1].innerHTML)).to.be.equal(21);
		// col 3
		expect(htmlCard.children[0].firstElementChild.children[2].children[2].innerHTML).to.be.equal('x');
		// col 4
		expect(parseInt(htmlCard.children[0].firstElementChild.children[2].children[3].innerHTML)).to.be.equal(60);
		// col 5
		expect(parseInt(htmlCard.children[0].firstElementChild.children[2].children[4].innerHTML)).to.be.equal(63);

		/* row 4 */
		expect(htmlCard.children[0].firstElementChild.children[3].children.length).to.be.equal(5);
		// col 1
		expect(parseInt(htmlCard.children[0].firstElementChild.children[3].children[0].innerHTML)).to.be.equal(15);
		// col 2
		expect(parseInt(htmlCard.children[0].firstElementChild.children[3].children[1].innerHTML)).to.be.equal(29);
		// col 3
		expect(parseInt(htmlCard.children[0].firstElementChild.children[3].children[2].innerHTML)).to.be.equal(32);
		// col 4
		expect(parseInt(htmlCard.children[0].firstElementChild.children[3].children[3].innerHTML)).to.be.equal(57);
		// col 5
		expect(parseInt(htmlCard.children[0].firstElementChild.children[3].children[4].innerHTML)).to.be.equal(71);

		/* row 5 */
		expect(htmlCard.children[0].firstElementChild.children[4].children.length).to.be.equal(5);
		// col 1
		expect(parseInt(htmlCard.children[0].firstElementChild.children[4].children[0].innerHTML)).to.be.equal(5);
		// col 2
		expect(parseInt(htmlCard.children[0].firstElementChild.children[4].children[1].innerHTML)).to.be.equal(22);
		// col 3
		expect(parseInt(htmlCard.children[0].firstElementChild.children[4].children[2].innerHTML)).to.be.equal(33);
		// col 4
		expect(parseInt(htmlCard.children[0].firstElementChild.children[4].children[3].innerHTML)).to.be.equal(59);
		// col 5
		expect(parseInt(htmlCard.children[0].firstElementChild.children[4].children[4].innerHTML)).to.be.equal(70);
	});

});