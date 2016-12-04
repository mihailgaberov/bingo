/**
 * Created by Mihail on 12/1/2016.
 */
jest
	.dontMock('../../src/admin/components/FormInput')
	.dontMock('classnames')
;

import React from 'react';
import TestUtils from 'react-addons-test-utils';

const FormInput = require('../../src/admin/components/FormInput').default;

describe('FormInput module', () => {
	it('Renders correct input node', () => {
		expect(
			TestUtils.findRenderedDOMComponentWithTag(
				TestUtils.renderIntoDocument(<FormInput />), 'input',).type).toBe('text');

		expect(
			TestUtils.findRenderedDOMComponentWithTag(
				TestUtils.renderIntoDocument(<FormInput type="number"/>), 'input',).type).toBe('number');

		expect(
			TestUtils.findRenderedDOMComponentWithTag(
				TestUtils.renderIntoDocument(<FormInput type="text"/>), 'textarea',).nodeName).toBe('TEXTAREA');

		expect(
			TestUtils.findRenderedDOMComponentWithTag(
				TestUtils.renderIntoDocument(<FormInput type="email"/>), 'input',).type).toBe('email');
	});

	it('Returns default input value', () => {
		let input = TestUtils.renderIntoDocument(<FormInput type="number"/>);
		expect(input.getValue()).toBe(String(50));
	});
});