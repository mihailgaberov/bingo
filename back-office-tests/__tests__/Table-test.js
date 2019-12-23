import React from 'react';
import { cleanup, render, fireEvent, findByText, waitForElement } from '@testing-library/react';

import Table from '../../src/admin/components/Table';
import data from '../../src/admin/dummy-data';
import Store from '../../src/admin/flux/CRUDStore';

Store.init(data);

describe('Editing data', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  // Storage Mock
  function storageMock() {
    let storage = {};

    return {
      setItem: function (key, value) {
        storage[key] = value || '';
      },
      getItem: function (key) {
        return storage[key] || null;
      },
      removeItem: function (key) {
        delete storage[key];
      },
      get length() {
        return Object.keys(storage).length;
      },
      key: function (i) {
        let keys = Object.keys(storage);
        return keys[i] || null;
      }
    };
  }

  it('Saves new data', async () => {
    const window = document.defaultView;
    window.localStorage = storageMock();
    const { container } = render(<Table/>);
    const newName = 'Gosho';

    const cell = await waitForElement(() => findByText(container, 'Mihail Gaberov'));
    fireEvent.doubleClick(cell);

    cell.getElementsByTagName('input')[0].value = newName;
    fireEvent.submit(cell.getElementsByTagName('form')[0]);
    expect(cell.textContent).toBe(newName);
  });

  xit('Deletes data', () => {
    const table = TestUtils.renderIntoDocument(
      <Table/>
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
