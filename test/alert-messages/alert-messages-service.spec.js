/**
 * Created by Mihail on 9/18/2016.
 */

'use strict';

import assert from 'assert';
import AlertMessagesService from '../../src/alert-messages/alert-messages-service';
import { expect } from 'chai';
import jsdom  from 'mocha-jsdom';

describe('Alert Messages Service', () => {

	jsdom();

	it ('Should show given alert message element', () => {
		let el = document.createElement('div');
		el.style.display = 'none';
		AlertMessagesService.showMsg(el);
		expect(el.style.display).to.be.equal('block');
	});

	it ('Should hide given alert message element', () => {
		let el = document.createElement('div');
		el.style.display = 'block';
		AlertMessagesService.hideMsg(el);
		expect(el.style.display).to.be.equal('none');
	});
});