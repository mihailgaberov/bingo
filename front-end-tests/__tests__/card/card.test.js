import Card from '../../../src/card/card';

describe('Card object', () => {
	const objCard = {
		col1: [ 10, 14, 13, 15, 5 ],
		col2: [ 27, 23, 21, 29, 22 ],
		col3: [ 39, 37, 'x', 32, 33 ],
		col4: [ 56, 51, 60, 57, 59 ],
		col5: [ 72, 74, 63, 71, 70 ]
	};

	test('Should create new HTML card', () => {
		const card = new Card(objCard);
		expect(card).toBeTruthy();
	});

	test('Should provide method for marking numbers', () => {
		expect(Card.markNumber).toBeTruthy();
	});

	test('Should provide method for marking number cells as drawn', () => {
		expect(Card.markDrawnNumber).toBeTruthy();
	});

	test(
        'Should create new HTML card that has table cells with appropriate IDs',
        () => {
            const card = new Card(objCard);
            expect(card.children[0].firstElementChild.children[1].children[0].id).toEqual('11');
            expect(card.children[0].firstElementChild.children[1].children[1].id).toEqual('21');
            expect(card.children[0].firstElementChild.children[1].children[2].id).toEqual('31');
            expect(card.children[0].firstElementChild.children[1].children[3].id).toEqual('41');
            expect(card.children[0].firstElementChild.children[1].children[4].id).toEqual('51');

            expect(card.children[0].firstElementChild.children[2].children[0].id).toEqual('12');
            expect(card.children[0].firstElementChild.children[2].children[1].id).toEqual('22');
            expect(card.children[0].firstElementChild.children[2].children[2].id).toEqual('32');
            expect(card.children[0].firstElementChild.children[2].children[3].id).toEqual('42');
            expect(card.children[0].firstElementChild.children[2].children[4].id).toEqual('52');

            expect(card.children[0].firstElementChild.children[3].children[0].id).toEqual('13');
            expect(card.children[0].firstElementChild.children[3].children[1].id).toEqual('23');
            expect(card.children[0].firstElementChild.children[3].children[2].id).toEqual('33');
            expect(card.children[0].firstElementChild.children[3].children[3].id).toEqual('43');
            expect(card.children[0].firstElementChild.children[3].children[4].id).toEqual('53');

            expect(card.children[0].firstElementChild.children[4].children[0].id).toEqual('14');
            expect(card.children[0].firstElementChild.children[4].children[1].id).toEqual('24');
            expect(card.children[0].firstElementChild.children[4].children[2].id).toEqual('34');
            expect(card.children[0].firstElementChild.children[4].children[3].id).toEqual('44');
            expect(card.children[0].firstElementChild.children[4].children[4].id).toEqual('54');

            expect(card.children[0].firstElementChild.children[5].children[0].id).toEqual('15');
            expect(card.children[0].firstElementChild.children[5].children[1].id).toEqual('25');
            expect(card.children[0].firstElementChild.children[5].children[2].id).toEqual('35');
            expect(card.children[0].firstElementChild.children[5].children[3].id).toEqual('45');
            expect(card.children[0].firstElementChild.children[5].children[4].id).toEqual('55');
        }
    );
});
