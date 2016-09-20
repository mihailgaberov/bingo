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

		const apiCtrl = new ApiController();
		expect(apiCtrl.viewCtrl).not.to.be.undefined;
	});
});