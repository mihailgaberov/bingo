/**
 * Created by Mihail on 12/1/2016.
 */
jest.autoMockOff();

import React from 'react';
import TestUtils from 'react-addons-test-utils';

const Table = require('../../src/admin/components/Table').default;
const data = require('../../src/admin/dummy-data').default;
const Store = require('../../src/admin/flux/CRUDStore').default;
const fetch = require('isomorphic-fetch').default;
Store.init(data);

describe('Editing data', () => {

	// Storage Mock
	function storageMock() {
		let storage = {};

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
				let keys = Object.keys(storage);
				return keys[i] || null;
			}
		};
	}

	it('Saves new data', () => {
		const window = document.defaultView;
		window.localStorage = storageMock();
		const table = TestUtils.renderIntoDocument(
			<Table />
		);
		const newname = 'Mihail Gaberov';

		const cell = TestUtils.scryRenderedDOMComponentsWithTag(table, 'td')[1];
		cell.dataset = { // hack around the DOM support in Jest
			row: cell.getAttribute('data-row'),
			key: cell.getAttribute('data-key'),
		};
		TestUtils.Simulate.doubleClick(cell);
		cell.getElementsByTagName('input')[0].value = newname;
		TestUtils.Simulate.submit(cell.getElementsByTagName('form')[0]);
		expect(cell.textContent).toBe(newname);
	});

	it('Deletes data', () => {
		const table = TestUtils.renderIntoDocument(
			<Table />
		);

		TestUtils.Simulate.click( // x icon
			TestUtils.findRenderedDOMComponentWithClass(table, 'actions-delete')
		);
		TestUtils.Simulate.click( // confirmation dialog
			TestUtils.findRenderedDOMComponentWithClass(table, 'button')
		);

		expect(TestUtils.scryRenderedDOMComponentsWithTag(table, 'td').length).toBe(4);

	});

});