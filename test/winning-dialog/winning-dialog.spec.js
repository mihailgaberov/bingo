/**
 * Created by Mihail on 11/2/2016.
 */
'use strict';

import assert from 'assert';
import WinningDialog from '../../src/winning-dialog/winning-dialog';
import { expect } from 'chai';
import sinon from 'sinon';
import jsdom  from 'mocha-jsdom';


describe('WinningDialog module', () => {

	jsdom.skipWindowCheck = true;
	jsdom();

	it('Should get the ID of a DOM element to contain the modal', () => {
		const wd = new WinningDialog('#id');
		expect(wd.elementID).to.be.equal('#id');
	});

	it('Should attach the necessary listeners', () => {
		const spy = sinon.spy(WinningDialog, 'attachListeners');
		const wd = new WinningDialog('#id');
		assert(spy.calledOnce);
	});

	xit('Should create the winning modal', () => {
		const elModal = document.createElement('div');
		elModal.setAttribute('class', 'modal');

		const elModalInner = document.createElement('div');
		elModalInner.setAttribute('class', 'modal-inner');

		const elModalContent = document.createElement('div');
		elModalContent.setAttribute('class', 'modal-content');

		elModalInner.appendChild(elModalContent);
		elModal.appendChild(elModalInner);
		document.appendChild(elModal);

		const objWinning = {
			elementID: '#dialog',
			bingos: 1,
			elBingosContainer: elBingos,
			elBingo: '<span><img src="../../images/small_logo_30x30.png" class="img-responsive"> x 50</span>',
			elPrize: elPrize
		};

		WinningDialog.createDialog(objWinning);

	});
});