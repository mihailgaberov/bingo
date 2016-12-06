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

	it('Saves new data', () => {
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