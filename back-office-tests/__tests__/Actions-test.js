import React from 'react';
import { cleanup, fireEvent, render, findAllByTestId, waitForElement } from '@testing-library/react';
import Actions from '../../src/admin/components/Actions';

describe('Click some actions', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('calls you back', async () => {
    const callback = jest.fn();

    const { container } = render(
      <Actions onAction={callback}/>
    );

    const data = await waitForElement(() => findAllByTestId(container, 'actions'));

    (await data).forEach(e =>  fireEvent.click(e));
    const calls = callback.mock.calls;

    expect(calls.length).toEqual(3);
    expect(calls[0][0]).toEqual('info');
    expect(calls[1][0]).toEqual('edit');
    expect(calls[2][0]).toEqual('delete');
  });
});

