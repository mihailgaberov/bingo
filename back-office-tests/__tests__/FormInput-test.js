jest
	.dontMock('../../src/admin/components/FormInput')
	.dontMock('classnames')
;

import React from 'react';
import TestUtils from 'react-dom/test-utils';

import FormInput from '../../src/admin/components/FormInput';

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
		expect(input.getValue()).toBe(String(0));
	});
});
