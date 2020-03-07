import React from 'react';
import { cleanup, findAllByText, findByText, fireEvent, render, waitForElement } from '@testing-library/react';
import Dialog from '../../src/back-office/components/Dialog';

describe('renders with action buttons', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('can have Cancel', async () => {
    const { container } = render(<Dialog>Civilized dialog</Dialog>);

    const cancel = await waitForElement(() => findByText(container, 'Cancel'));
    expect(cancel.nodeName).toBe('SPAN');

    const ok = await waitForElement(() => findByText(container, 'OK'));
    expect(ok.textContent).toBe(Dialog.defaultProps.confirmLabel);
  });

  it('can have a single dismiss button', async () => {
    const { container } = render(<Dialog hasCancel={false} confirmLabel="Confirm">Civilized dialog</Dialog>);
    const ok = await waitForElement(() => findAllByText(container, 'Confirm'));
    expect(ok.length).toBe(1);
  });

  it('can be modal', () => {
    let { container } = render(<Dialog modal>Civilized dialog</Dialog>);
    expect(Array.from(document.body.classList)).toContain('dialog-modal-open');

    // removing the dialog
    container = render('');
    expect(Array.from(document.body.classList)).not.toBe('dialog-modal-open');
  });

  it('has head and body', async () => {
    const { container } = render(<Dialog header="Header Title">Civilized dialog</Dialog>);
    const head = await waitForElement(() => findAllByText(container, 'Header Title'));
    expect((await head).length).toBe(1);
    const body = await waitForElement(() => findAllByText(container, 'Civilized dialog'));
    expect((await body).length).toBe(1);
  });

  it('sends correct actions', async () => {
    const callback = jest.fn();
    let { container } = render(<Dialog onAction={callback} />);
    const cancelBtn = await waitForElement(() => findByText(container, 'Cancel'));
    fireEvent.click(cancelBtn);

    const okBtn = await waitForElement(() => findByText(container, 'OK'));
    fireEvent.click(okBtn);

    const calls = callback.mock.calls;
    expect(calls.length).toEqual(2);
    expect(calls[0][0]).toEqual('dismiss');
    expect(calls[1][0]).toEqual('confirm');
  });

});
