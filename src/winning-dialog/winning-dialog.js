/**
 * Created by Mihail on 11/1/2016.
 */
"use strict";

import VanillaModal from 'vanilla-modal';
import { EventsConsts } from '../events/events-consts';

class WinningDialog {
	constructor(elementID) {
		this.bingos = 0;
		document.addEventListener(EventsConsts.BINGO, () => {
			this.bingos++;
			console.log('>>> Bingos: ', this.bingos);
		});

		document.addEventListener(EventsConsts.START_GAME, () => {
			this.bingos = 0;
			console.log('>>> Bingos nulified: ', this.bingos);
		});

		document.addEventListener(EventsConsts.END_GAME, () => {
			setTimeout(() => {
				const modal = new VanillaModal();
				modal.open(elementID);
			});
		});
	}
}

export default WinningDialog;