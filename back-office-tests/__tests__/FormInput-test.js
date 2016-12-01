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

describe('factory works', () => {
	it('renders correct input node', () => {
		expect(
			TestUtils.findRenderedDOMComponentWithTag(
				TestUtils.renderIntoDocument(<FormInput />),
				'input',
			).type
		).toBe('text');

		expect(
			TestUtils.findRenderedDOMComponentWithTag(
				TestUtils.renderIntoDocument(<FormInput type="year" />),
				'input',
			).type
		).toBe('number');

		expect(
			TestUtils.findRenderedDOMComponentWithTag(
				TestUtils.renderIntoDocument(<FormInput type="text" />),
				'textarea',
			).nodeName
		).toBe('TEXTAREA');
	});

	it('returns input value', () => {
		let input = TestUtils.renderIntoDocument(<FormInput type="year" />);
		expect(input.getValue()).toBe(String(new Date().getFullYear()));
	});
});