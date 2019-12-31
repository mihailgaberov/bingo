import CardDrawer from '../../../src/card/card-drawer';

describe('Card Drawer', () => {
	const objCard = {
		col1: [ 10, 14, 13, 15, 5 ],
		col2: [ 27, 23, 21, 29, 22 ],
		col3: [ 39, 37, 'x', 32, 33 ],
		col4: [ 56, 51, 60, 57, 59 ],
		col5: [ 72, 74, 63, 71, 70 ]
	};

	test('Should get the number of the cards to be generated', () => {
		const el = document.createElement('div');
		let toBeGenerated = CardDrawer.draw({'card1': objCard}, el);
		expect(toBeGenerated.length).toEqual(1);
	});


	test(
        'Should create a div element with id "card" with a Bingo card table inside',
        () => {
            const htmlCard = CardDrawer.generateCardTable(objCard);

            expect(htmlCard.id).toEqual('card');
            expect(htmlCard.children[0].tagName).toEqual('TABLE');
            expect(htmlCard.children[0].firstElementChild.children.length).toEqual(6);

            /* row 1 */
            expect(htmlCard.children[0].firstElementChild.children[1].children.length).toEqual(5);
            // col 1
            expect(parseInt(htmlCard.children[0].firstElementChild.children[1].children[0].innerHTML)).toEqual(10);
            // col 2
            expect(parseInt(htmlCard.children[0].firstElementChild.children[1].children[1].innerHTML)).toEqual(27);
            // col 3
            expect(parseInt(htmlCard.children[0].firstElementChild.children[1].children[2].innerHTML)).toEqual(39);
            // col 4
            expect(parseInt(htmlCard.children[0].firstElementChild.children[1].children[3].innerHTML)).toEqual(56);
            // col 5
            expect(parseInt(htmlCard.children[0].firstElementChild.children[1].children[4].innerHTML)).toEqual(72);

            /* row 2 */
            expect(htmlCard.children[0].firstElementChild.children[2].children.length).toEqual(5);
            // col 1
            expect(parseInt(htmlCard.children[0].firstElementChild.children[2].children[0].innerHTML)).toEqual(14);
            // col 2
            expect(parseInt(htmlCard.children[0].firstElementChild.children[2].children[1].innerHTML)).toEqual(23);
            // col 3
            expect(parseInt(htmlCard.children[0].firstElementChild.children[2].children[2].innerHTML)).toEqual(37);
            // col 4
            expect(parseInt(htmlCard.children[0].firstElementChild.children[2].children[3].innerHTML)).toEqual(51);
            // col 5
            expect(parseInt(htmlCard.children[0].firstElementChild.children[2].children[4].innerHTML)).toEqual(74);

            /* row 3 */
            expect(htmlCard.children[0].firstElementChild.children[3].children.length).toEqual(5);
            // col 1
            expect(parseInt(htmlCard.children[0].firstElementChild.children[3].children[0].innerHTML)).toEqual(13);
            // col 2
            expect(parseInt(htmlCard.children[0].firstElementChild.children[3].children[1].innerHTML)).toEqual(21);
            // col 3
            expect(htmlCard.children[0].firstElementChild.children[3].children[2].innerHTML).toEqual('x');
            // col 4
            expect(parseInt(htmlCard.children[0].firstElementChild.children[3].children[3].innerHTML)).toEqual(60);
            // col 5
            expect(parseInt(htmlCard.children[0].firstElementChild.children[3].children[4].innerHTML)).toEqual(63);

            /* row 4 */
            expect(htmlCard.children[0].firstElementChild.children[4].children.length).toEqual(5);
            // col 1
            expect(parseInt(htmlCard.children[0].firstElementChild.children[4].children[0].innerHTML)).toEqual(15);
            // col 2
            expect(parseInt(htmlCard.children[0].firstElementChild.children[4].children[1].innerHTML)).toEqual(29);
            // col 3
            expect(parseInt(htmlCard.children[0].firstElementChild.children[4].children[2].innerHTML)).toEqual(32);
            // col 4
            expect(parseInt(htmlCard.children[0].firstElementChild.children[4].children[3].innerHTML)).toEqual(57);
            // col 5
            expect(parseInt(htmlCard.children[0].firstElementChild.children[4].children[4].innerHTML)).toEqual(71);

            /* row 5 */
            expect(htmlCard.children[0].firstElementChild.children[5].children.length).toEqual(5);
            // col 1
            expect(parseInt(htmlCard.children[0].firstElementChild.children[5].children[0].innerHTML)).toEqual(5);
            // col 2
            expect(parseInt(htmlCard.children[0].firstElementChild.children[5].children[1].innerHTML)).toEqual(22);
            // col 3
            expect(parseInt(htmlCard.children[0].firstElementChild.children[5].children[2].innerHTML)).toEqual(33);
            // col 4
            expect(parseInt(htmlCard.children[0].firstElementChild.children[5].children[3].innerHTML)).toEqual(59);
            // col 5
            expect(parseInt(htmlCard.children[0].firstElementChild.children[5].children[4].innerHTML)).toEqual(70);
        }
    );

});
