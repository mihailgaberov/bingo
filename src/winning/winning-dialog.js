/**
 * Created by Mihail on 11/1/2016.
 */
"use strict";

import ApiController from '../api/api-controller';
import VanillaModal from 'vanilla-modal';
import { EventsConsts } from '../events/events-consts';
import FlyingPrize from './flying-prize';

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

	static getHeaderImgClass(bingos) {
		// Define which header image to show
		if (bingos === 0) {
			return 'no-bingo';
		}

		const promiseBalance = ApiController.getPlayerBalancePromise();
		promiseBalance.then((val) => {
			if (bingos === 0 && val === 0) {
				return 'no-bingo-no-money';
			}
		});


		if (bingos === 1) {
			return 'winner-one-bingo';
		}

		if (bingos === 2) {
			return 'winner-two-bingos';
		}

		if (bingos > 2) {
			return 'winner-more-than-two-bingos';
		}
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
			objWinning.elBingosContainer.setAttribute('class', 'col-sm-3 col-xs-4');
			elDialogContent.appendChild(objWinning.elBingosContainer);
		} else {
			objWinning.elBingosContainer = document.querySelector('#bingos');
			objWinning.elBingosContainer.innerHTML = '';
		}

		if (!document.body.contains(document.querySelector('#prize'))) {
			objWinning.elPrize = document.createElement('div');
			objWinning.elPrize.setAttribute('id', 'prize');
			objWinning.elPrize.setAttribute('class', 'col-sm-5 col-xs-6');
			elDialogContent.appendChild(objWinning.elPrize);
		} else {
			objWinning.elPrize = document.querySelector('#prize');
		}

		elHeader.classList.add(WinningDialog.getHeaderImgClass(objWinning.bingos));

		const prizeSum = objWinning.bingos * 50;
		objWinning.elPrize.innerHTML = `${objWinning.bingos} x 50 = ${prizeSum}`;

		while(objWinning.bingos > 0) {
			objWinning.elBingosContainer.innerHTML += '<span>' +
				'<img src="../../images/sun_50x50.png" class="img-responsive background-rotating-img">' +
				'<img src="../../images/small_logo_30x30.png" class="img-responsive bingo-img"> x 50' +
				'</span>';
			objWinning.bingos--;
		}

		const flyingPrize = new FlyingPrize(prizeSum);

		WinningDialog.openDialog(objWinning.elementID);
	}

	static openDialog(elementId) {
		const modal = new VanillaModal({onClose: WinningDialog.onCloseWinningModal});
		modal.open(elementId);
	}

	static onCloseWinningModal() {
		// Dispatch new event when the dialog is closed
		const event = new CustomEvent(EventsConsts.PRIZE_WON, {
				detail: {
					time: new Date()
				}, bubbles: true, cancelable: true
			}
		);
		document.dispatchEvent(event);
	}
}

export default WinningDialog;