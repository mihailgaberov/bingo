/**
 * Created by Mihail on 9/18/2016.
 */

'use strict';

import ApiController from '../../../src/api/api-controller';
import { expect } from 'chai';
import jsdom  from 'mocha-jsdom';

describe('Api Controller', () => {

	jsdom();

	// Storage Mock
	function storageMock() {
		const storage = {};

		return {
			setItem: function(key, value) {
				storage[key] = value || '';
			},
			getItem: function(key) {
				return storage[key] || null;
			},
			removeItem: function(key) {
				delete storage[key];
			},
			get length() {
				return Object.keys(storage).length;
			},
			key: function(i) {
				const keys = Object.keys(storage);
				return keys[i] || null;
			}
		};
	}

	it('Should initialize View Ctrl to interact with the views', () => {
		const window = document.defaultView;
		window.localStorage = storageMock();

		const apiCtrl = new ApiController();
		expect(apiCtrl.viewCtrl).not.to.be.undefined;
	});
});