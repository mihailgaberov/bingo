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
					elBingosContainer: null,
					elPrize: null
				};
				WinningDialog.createDialog(objWinning);
			});
		});
	}

	static createDialog(objWinning) {
		const elDialog = document.querySelector(objWinning.elementID);
		const elDialogContent = elDialog.querySelector('#content');
		const elHeader = document.querySelector('header');


		// Clear header classes
		elHeader.classList = '';

		if (!document.body.contains(document.querySelector('#bingos'))) {
			objWinning.elBingosContainer = document.createElement('div');
			objWinning.elBingosContainer.setAttribute('id', 'bingos');
			objWinning.elBingosContainer.setAttribute('class', 'col-sm-3');
			elDialogContent.appendChild(objWinning.elBingosContainer);
		} else {
			objWinning.elBingosContainer = document.querySelector('#bingos');
			objWinning.elBingosContainer.innerHTML = '';
		}

		if (!document.body.contains(document.querySelector('#prize'))) {
			objWinning.elPrize = document.createElement('div');
			objWinning.elPrize.setAttribute('id', 'prize');
			objWinning.elPrize.setAttribute('class', 'col-sm-5');
			elDialogContent.appendChild(objWinning.elPrize);
		} else {
			objWinning.elPrize = document.querySelector('#prize');
		}

		// Define which header image to show
		if (objWinning.bingos === 0) {
			elHeader.classList.add('no-bingo');
		}

		if (objWinning.bingos === 0 && ApiController.getUserInfo().balance === 0) {
			elHeader.classList.add('no-bingo-no-money');
		}

		if (objWinning.bingos === 1) {
			elHeader.classList.add('winner-one-bingo');
		}

		if (objWinning.bingos === 2) {
			elHeader.classList.add('winner-two-bingos');
		}

		if (objWinning.bingos > 2) {
			elHeader.classList.add('winner-more-than-two-bingos');
		}

		objWinning.elPrize.innerHTML = `${objWinning.bingos} x 50 = ${objWinning.bingos * 50}`;


		while(objWinning.bingos > 0) {
			objWinning.elBingosContainer.innerHTML += '<span><img src="../../images/small_logo_30x30.png" class="img-responsive"> x 50</span>';
			objWinning.bingos--;
		}

		let modal = new VanillaModal();
		modal.open(objWinning.elementID);
	}
}

export default WinningDialog;