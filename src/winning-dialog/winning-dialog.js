/**
 * Created by Mihail on 11/1/2016.
 */
"use strict";

import ApiController from '../api/api-controller';
import VanillaModal from 'vanilla-modal';
import { EventsConsts } from '../events/events-consts';

class WinningDialog {
	constructor(elementID) {
		let bingos = 0;
		this.elementID = elementID;
		WinningDialog.attachListeners(bingos, elementID);
	}

	static attachListeners(bingos, elementID) {
		document.addEventListener(EventsConsts.BINGO, () => {
			bingos++;
		});

		document.addEventListener(EventsConsts.START_GAME, () => {
			bingos = 0;
		});

		document.addEventListener(EventsConsts.END_GAME, () => {
			setTimeout(() => {
				const objWinning = {
					elementID: elementID,
					bingos: bingos,
					elBingosContainer: document.querySelector('#bingos'),
					elBingo: '<span><img src="../../images/small_logo_30x30.png" class="img-responsive"> x 50</span>',
					elPrize: document.querySelector('#prize')
				};
				WinningDialog.createDialog(objWinning);
			});
		});
	}

	static createDialog(objWinning) {

		const modal = new VanillaModal();

		// Clear the bingos container each time when the dialog is shown
		objWinning.elBingosContainer.innerHTML = '';

		// Define which header image to show
		if (objWinning.bingos === 0) {
			document.querySelector(objWinning.elementID).querySelector('header').classList.add('no-bingo');
		}

		if (objWinning.bingos === 0 && ApiController.getUserInfo().balance === 0) {
			document.querySelector(objWinning.elementID).querySelector('header').classList.add('no-bingo-no-money');
		}

		if (objWinning.bingos === 1) {
			document.querySelector(objWinning.elementID).querySelector('header').classList.add('winner-one-bingo');
		}

		if (objWinning.bingos === 2) {
			document.querySelector(objWinning.elementID).querySelector('header').classList.add('winner-two-bingos');
		}

		if (objWinning.bingos > 2) {
			document.querySelector(objWinning.elementID).querySelector('header').classList.add('winner-more-than-two-bingos');
		}


		objWinning.elPrize.innerHTML = `${objWinning.bingos} x 50 = ${objWinning.bingos * 50}`;

		while(objWinning.bingos > 0) {
			objWinning.elBingosContainer.innerHTML += objWinning.elBingo;
			objWinning.bingos--;
		}
		modal.open(objWinning.elementID);
	}
}

export default WinningDialog;