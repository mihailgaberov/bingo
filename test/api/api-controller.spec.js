/**
 * Created by Mihail on 9/18/2016.
 */

'use strict';

import assert from 'assert';
import LocalStorageService from '../../src/local-storage/local-storage-service';
import ApiController from '../../src/api/api-controller';
import { expect } from 'chai';
import jsdom  from 'mocha-jsdom';

describe('Api Controller', () => {

	jsdom();

	// Storage Mock
	function storageMock() {
		var storage = {};

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
				var keys = Object.keys(storage);
				return keys[i] || null;
			}
		};
	}

	it ('Should have all necessary routes and selectors', () => {
		const window = document.defaultView;
		window.localStorage = storageMock();

		let apiCtrl = new ApiController();
		expect(apiCtrl.registerUrl).not.to.be.undefined;
		expect(apiCtrl.loginUrl).not.to.be.undefined;
		expect(apiCtrl.signInLink).not.to.be.undefined;
		expect(apiCtrl.registerForm).not.to.be.undefined;
		expect(apiCtrl.loginForm).not.to.be.undefined;
		expect(apiCtrl.alertMsg).not.to.be.undefined;
	});

	it ('Should attached all necessary listeners', () => {
		const window = document.defaultView;
		window.localStorage = storageMock();
		let apiCtrl = new ApiController();

		expect(apiCtrl.registerForm).to.have.listener;
		expect(apiCtrl.loginForm).to.have.listener;
		expect(apiCtrl.signInLink).to.have.listener;
	});
});