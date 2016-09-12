/**
 * Created by Mihail on 9/11/2016.
 */
'use strict';

class CardDrawer {
	constructor() {

	}

	draw(card) {
		let divCard = document.createElement('div');
		divCard.setAttribute('id', 'card');
		divCard.innerHTML = '<table border="1">' +
								'<tr>' +
									'<td>' + card.card1.col1[0] + '</td>' +
									'<td>' + card.card1.col2[0] + '</td>' +
									'<td>' + card.card1.col3[0] + '</td>' +
									'<td>' + card.card1.col4[0] + '</td>' +
									'<td>' + card.card1.col5[0] + '</td>' +
								'</tr>' +
								'<tr>' +
									'<td>' + card.card1.col1[1] + '</td>' +
									'<td>' + card.card1.col2[1] + '</td>' +
									'<td>' + card.card1.col3[1] + '</td>' +
									'<td>' + card.card1.col4[1] + '</td>' +
									'<td>' + card.card1.col5[1] + '</td>' +
								'</tr>' +
								'<tr>' +
									'<td>' + card.card1.col1[2] + '</td>' +
									'<td>' + card.card1.col2[2] + '</td>' +
									'<td>' + card.card1.col3[2] + '</td>' +
									'<td>' + card.card1.col4[2] + '</td>' +
									'<td>' + card.card1.col5[2] + '</td>' +
								'</tr>' +
								'<tr>' +
									'<td>' + card.card1.col1[3] + '</td>' +
									'<td>' + card.card1.col2[3] + '</td>' +
									'<td>' + card.card1.col3[3] + '</td>' +
									'<td>' + card.card1.col4[3] + '</td>' +
									'<td>' + card.card1.col5[3] + '</td>' +
								'</tr>' +
								'<tr>' +
									'<td>' + card.card1.col1[4] + '</td>' +
									'<td>' + card.card1.col2[4] + '</td>' +
									'<td>' + card.card1.col3[4] + '</td>' +
									'<td>' + card.card1.col4[4] + '</td>' +
									'<td>' + card.card1.col5[4] + '</td>' +
								'</tr>' +
							'</table>';
		return divCard;
	}
}

export default CardDrawer;