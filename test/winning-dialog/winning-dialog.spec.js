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

});