/**
 * Created by Mihail on 9/11/2016.
 */
'use strict';

class CardDrawer {
	constructor() {

	}

	draw(objCards) {
		let countCards = Object.keys(objCards).length;
		let arrCards = [];


		for (let i = 0; i < 1; i++) {

			console.log('>>> countCards: ', countCards);
			console.log('>>> i= ', i);
			console.log('>>> card1: ', objCards['card'+i]);
			arrCards.push(this.generateCardTable(objCards['card' + i]));

			console.log('>>> ', objCards['card' + i]);
		}

		return arrCards;
	}
	
	generateCardTable(card) {
		console.log('>>> card: ', card);

		let divCard = document.createElement('div');
		divCard.setAttribute('id', 'card');
		divCard.innerHTML = '<table border="1">' +
			'<tr>' +
			'<td>' + card.col1[0] + '</td>' +
			'<td>' + card.col2[0] + '</td>' +
			'<td>' + card.col3[0] + '</td>' +
			'<td>' + card.col4[0] + '</td>' +
			'<td>' + card.col5[0] + '</td>' +
			'</tr>' +
			'<tr>' +
			'<td>' + card.col1[1] + '</td>' +
			'<td>' + card.col2[1] + '</td>' +
			'<td>' + card.col3[1] + '</td>' +
			'<td>' + card.col4[1] + '</td>' +
			'<td>' + card.col5[1] + '</td>' +
			'</tr>' +
			'<tr>' +
			'<td>' + card.col1[2] + '</td>' +
			'<td>' + card.col2[2] + '</td>' +
			'<td>' + card.col3[2] + '</td>' +
			'<td>' + card.col4[2] + '</td>' +
			'<td>' + card.col5[2] + '</td>' +
			'</tr>' +
			'<tr>' +
			'<td>' + card.col1[3] + '</td>' +
			'<td>' + card.col2[3] + '</td>' +
			'<td>' + card.col3[3] + '</td>' +
			'<td>' + card.col4[3] + '</td>' +
			'<td>' + card.col5[3] + '</td>' +
			'</tr>' +
			'<tr>' +
			'<td>' + card.col1[4] + '</td>' +
			'<td>' + card.col2[4] + '</td>' +
			'<td>' + card.col3[4] + '</td>' +
			'<td>' + card.col4[4] + '</td>' +
			'<td>' + card.col5[4] + '</td>' +
			'</tr>' +
			'</table>';
		return divCard;	
	}
}

export default CardDrawer;