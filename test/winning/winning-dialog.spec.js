/**
 * Created by Mihail on 11/2/2016.
 */
'use strict';

import assert from 'assert';
import WinningDialog from '../../src/winning/winning-dialog';
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

	it('Should assign the appropriate css class depending on how many bingos are won', () => {
		let className = WinningDialog.getHeaderImgClass(1);
		expect(className).to.be.equal('winner-one-bingo');
		className = WinningDialog.getHeaderImgClass(0);
		expect(className).to.be.equal('no-bingo');
	});
});