/**
 * Created by Mihail on 10/12/2016.
 */
'use strict';

import { EventsConsts } from '../events/events-consts';

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
			'<td id="x1y1">' + objCard.col1[0] + '</td>' +
			'<td id="x2y1">' + objCard.col2[0] + '</td>' +
			'<td id="x3y1">' + objCard.col3[0] + '</td>' +
			'<td id="x4y1">' + objCard.col4[0] + '</td>' +
			'<td id="x5y1">' + objCard.col5[0] + '</td>' +
			'</tr>' +
			'<tr>' +
			'<td id="x1y2">' + objCard.col1[1] + '</td>' +
			'<td id="x2y2">' + objCard.col2[1] + '</td>' +
			'<td id="x3y2">' + objCard.col3[1] + '</td>' +
			'<td id="x4y2">' + objCard.col4[1] + '</td>' +
			'<td id="x5y2">' + objCard.col5[1] + '</td>' +
			'</tr>' +
			'<tr>' +
			'<td id="x1y3">' + objCard.col1[2] + '</td>' +
			'<td id="x2y3">' + objCard.col2[2] + '</td>' +
			'<td id="x3y3">' + objCard.col3[2] + '</td>' +
			'<td id="x4y3">' + objCard.col4[2] + '</td>' +
			'<td id="x5y3">' + objCard.col5[2] + '</td>' +
			'</tr>' +
			'<tr>' +
			'<td id="x1y4">' + objCard.col1[3] + '</td>' +
			'<td id="x2y4">' + objCard.col2[3] + '</td>' +
			'<td id="x3y4">' + objCard.col3[3] + '</td>' +
			'<td id="x4y4">' + objCard.col4[3] + '</td>' +
			'<td id="x5y4">' + objCard.col5[3] + '</td>' +
			'</tr>' +
			'<tr>' +
			'<td id="x1y5">' + objCard.col1[4] + '</td>' +
			'<td id="x2y5">' + objCard.col2[4] + '</td>' +
			'<td id="x3y5">' + objCard.col3[4] + '</td>' +
			'<td id="x4y5">' + objCard.col4[4] + '</td>' +
			'<td id="x5y5">' + objCard.col5[4] + '</td>' +
			'</tr>' +
			'</table>';

		this.divCard.addEventListener('click', (e) => {
			Card.clickCell(e.target);
		});

		document.addEventListener(EventsConsts.NEW_BALL_DRAWN, (e) => {
			console.log('>>> num: ', e.detail.drawnNumber);
		});

		return this.divCard;
	}

	static clickCell(element) {
		const clickedElementValue = element.innerText;
		if (clickedElementValue && !isNaN(parseInt(clickedElementValue))) {
			Card.markNumber(element);
			//console.log('clicked el: ', clickedElementValue);
		}
	}

	static markNumber(el) {
		el.classList.toggle('marked');
	}
}

export default Card;