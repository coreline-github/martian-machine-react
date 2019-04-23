import React from 'react';
import { render, waitForElement } from 'react-testing-library';
import bluebird from 'bluebird';
import { UserSelectInput } from './UserSelectInput';

const apiClient = require('../api/api-client');
jest.mock('../api/api-client');

const users = [{
  name: 'Test User',
  id: 1
}, {
  name: 'Test2 User2',
  id: 2,
}];

it('renders empty UserSelectInput', async () => {
  apiClient.getUsers.mockReturnValueOnce([]);

  const { container, queryAllByText } = render(
    <UserSelectInput onChange={console.log} value={1} />
  );
  expect(container.getElementsByClassName('custom-select').item(0)).toBeTruthy();
  await bluebird.delay(1000);
  expect(queryAllByText(/test user/i)).toEqual([]);
});

it('renders non-empty UserSelectInput', async () => {
  apiClient.getUsers.mockReturnValueOnce(users);

  const { container, getByText } = render(
    <UserSelectInput onChange={console.log} value={1} />
  );
  expect(container.getElementsByClassName('custom-select').item(0)).toBeTruthy();

  await waitForElement(() => getByText(/Test User/i));
});
