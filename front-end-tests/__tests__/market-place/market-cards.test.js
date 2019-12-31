import MarketCards from '../../../src/market-place/market-cards';

describe('Market Cards module', () => {
	test('Should have container - html element', () => {
		const container = document.createElement('div');
		const marketCards = new MarketCards(container);
		expect(marketCards.container).toBeDefined();
		expect(marketCards.container.tagName).toEqual('DIV');
	});

	test('Should define the count of the purchased cards', () => {
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
		expect(countCards).toEqual(4);
	});

	test(
        'Should set the correct price depending on how many cards are offered',
        () => {
            let cards = document.createElement('div');
            cards.innerHTML = '1 <input type="radio" id="one" name="marketCards" value="1" checked="checked">' +
                '<img src="/images/market/one_card.png" class="img-responsive" alt="One Card">' +
                '<div class="price"></div>';

            MarketCards.setCardPrices(5, [cards]);
            expect(cards.querySelector('.price').innerHTML).toEqual('<i class="price-icon"></i>5');
        }
    );
});
