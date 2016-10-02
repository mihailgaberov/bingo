/**
 * Created by Mihail on 10/1/2016.
 */

'use strict';

import assert from 'assert';
import Blower from '../../src/blower/blower';
import { expect } from 'chai';
import jsdom  from 'mocha-jsdom';

describe('Blower module', () => {

	jsdom();

	it ('Should create a blower module', (done) => {
		let el = document.createElement('canvas');
		el.setAttribute('id', 'blower');
		let blower = new Blower(el);
		done();
	});

	it ('Should contain an array with 75 balls', (done) => {

	});
});