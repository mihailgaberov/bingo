/**
 * Created by Mihail on 10/12/2016.
 */
'use strict';

class Card {
	constructor(objCard) {
		this.divCard = document.createElement('div');
		this.divCard.setAttribute('id', 'card');
		this.divCard.innerHTML = '<table>' +
			'<tr>' +
			'<th class="firstCol">B</th>' +
			'<th class="secondCol">I</th>' +
			'<th class="thirdCol">N</th>' +
			'<th class="fourthCol">G</th>' +
			'<th class="fifthCol">O</th>' +
			'</tr>' +
			'<tr>' +
			'<td>' + objCard.col1[0] + '</td>' +
			'<td>' + objCard.col2[0] + '</td>' +
			'<td>' + objCard.col3[0] + '</td>' +
			'<td>' + objCard.col4[0] + '</td>' +
			'<td>' + objCard.col5[0] + '</td>' +
			'</tr>' +
			'<tr>' +
			'<td>' + objCard.col1[1] + '</td>' +
			'<td>' + objCard.col2[1] + '</td>' +
			'<td>' + objCard.col3[1] + '</td>' +
			'<td>' + objCard.col4[1] + '</td>' +
			'<td>' + objCard.col5[1] + '</td>' +
			'</tr>' +
			'<tr>' +
			'<td>' + objCard.col1[2] + '</td>' +
			'<td>' + objCard.col2[2] + '</td>' +
			'<td>' + objCard.col3[2] + '</td>' +
			'<td>' + objCard.col4[2] + '</td>' +
			'<td>' + objCard.col5[2] + '</td>' +
			'</tr>' +
			'<tr>' +
			'<td>' + objCard.col1[3] + '</td>' +
			'<td>' + objCard.col2[3] + '</td>' +
			'<td>' + objCard.col3[3] + '</td>' +
			'<td>' + objCard.col4[3] + '</td>' +
			'<td>' + objCard.col5[3] + '</td>' +
			'</tr>' +
			'<tr>' +
			'<td>' + objCard.col1[4] + '</td>' +
			'<td>' + objCard.col2[4] + '</td>' +
			'<td>' + objCard.col3[4] + '</td>' +
			'<td>' + objCard.col4[4] + '</td>' +
			'<td>' + objCard.col5[4] + '</td>' +
			'</tr>' +
			'</table>';
		return this.divCard;
	}

	click() {
		this.divCard.querySelector('td').addEventListener((e) => {
			console.log('>>> ', e);
		});
	}
}

export default Card;