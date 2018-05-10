/**
 * Created by Mihail on 9/18/2016.
 */

'use strict';

import MarketCards from '../../../src/market-place/market-cards';
import { expect } from 'chai';

describe('Market Cards module', () => {
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
		let cards = document.createElement('div');
		cards.innerHTML = '1 <input type="radio" id="one" name="marketCards" value="1" checked="checked">' +
			'<img src="/images/market/one_card.png" class="img-responsive">' +
			'<div class="price"></div>';

		MarketCards.setCardPrices(5, [cards]);
		expect(cards.querySelector('.price').innerHTML).to.be.equal('<i class="price-icon"></i>5');
	});
});