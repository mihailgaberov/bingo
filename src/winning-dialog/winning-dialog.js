/**
 * Created by Mihail on 11/1/2016.
 */
"use strict";

import VanillaModal from 'vanilla-modal';
import { EventsConsts } from '../events/events-consts';

class WinningDialog {
	constructor(elementID) {
		document.addEventListener(EventsConsts.END_GAME, () => {
			setTimeout(() => {
				const modal = new VanillaModal();
				modal.open(elementID);
			}, 5000);
		});
	}
}

export default WinningDialog;