jest
	.dontMock('../../src/admin/components/Dialog')
	.dontMock('../../src/admin/components/Button')
;

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';

import Dialog from '../../src/admin/components/Dialog';

describe('renders with action buttons', () => {
	it('can haz Cancel', () => {
		const dialog = TestUtils.renderIntoDocument(
			<Dialog>Civilized dialog</Dialog>
		);
		const cancel = TestUtils
			.findRenderedDOMComponentWithClass(dialog, 'dialog-dismiss');
		expect(cancel.nodeName).toBe('SPAN');
		const ok = TestUtils
			.findRenderedDOMComponentWithTag(dialog, 'button');
		expect(ok.textContent).toBe(Dialog.defaultProps.confirmLabel);
	});

	it('can haz a single dismiss button', () => {
		const dialog = TestUtils.renderIntoDocument(
			<Dialog hasCancel={false} confirmLabel="confirm">Civilized dialog</Dialog>
		);
		const cancels = TestUtils
			.scryRenderedDOMComponentsWithClass(dialog, 'dialog-dismiss');
		expect(cancels.length).toBe(0);
		let ok = TestUtils
			.findRenderedDOMComponentWithTag(dialog, 'button');
		expect(ok.textContent).toBe('confirm');
	});

	it('can be modal', () => {
		const dialog = TestUtils.renderIntoDocument(
			<Dialog modal={true}>Civilized dialog</Dialog>
		);
		expect(Array.from(document.body.classList)).toContain('dialog-modal-open');

		// removing the dialog
		ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(dialog).parentNode);
		expect(Array.from(document.body.classList)).not.toContain('dialog-modal-open');
	});

	it('has head and body', () => {
		const dialog = TestUtils.renderIntoDocument(
			<Dialog header="head">Civilized dialog</Dialog>
		);
		let node = ReactDOM.findDOMNode(dialog);
		expect(node.getElementsByClassName('dialog-header')[0].innerHTML).toBe('head');
		expect(node.querySelector('.dialog-body').textContent).toBe('Civilized dialog');
	});

	it('sends correct actions', () => {
		const callback = jest.genMockFunction();
		const yescancel = TestUtils.renderIntoDocument(
			<Dialog onAction={callback} />
		);
		TestUtils.Simulate.click(
			TestUtils.findRenderedDOMComponentWithTag(yescancel, 'button'));
		const nocancel = TestUtils.renderIntoDocument(
			<Dialog onAction={callback} hasCancel={false} />
		);
		TestUtils.Simulate.click(
			TestUtils.findRenderedDOMComponentWithTag(nocancel, 'button'));

		const calls = callback.mock.calls;
		expect(calls.length).toEqual(2);
		expect(calls[0][0]).toEqual('confirm');
		expect(calls[1][0]).toEqual('dismiss');
	});

});
