/**
 * Created by Mihail on 1/15/2017.
 */
/**
 * Created by Mihail on 9/18/2016.
 */

'use strict';

import MarketCards from '../../src/market-place/market-cards';
import { expect } from 'chai';
import jsdom  from 'mocha-jsdom';

describe('Market Cards module', () => {

	jsdom();

	it('Should have container - html element', () => {
		const container = document.createElement('div');
		const marketCards = new MarketCards(container);
		expect(marketCards.container).not.to.be.undefined;
		expect(marketCards.container.tagName).to.be.equal('DIV');
	});

	it('Should define the count of the purchased cards', () => {
		const arrRadioButtons = [
			{
				type: 'radio',
				checked: true,
				value: 4
			},
			{
				type: 'radio',
				checked: false,
				value: 5
			}
		];

		const countCards = MarketCards.getPurchasedCardsCount(arrRadioButtons);
		expect(countCards).to.be.equal(4);
	});

	it('Should set the correct price depending on how many cards are offered', () => {

	});
});