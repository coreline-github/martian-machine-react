import React from 'react';
import { render } from 'react-testing-library';

import { BrowserRouter } from 'react-router-dom';
import { PostView } from './PostView';
import { IPostWithUserAndComments } from '../api/api-types';

it('renders PostView', () => {
  const post: IPostWithUserAndComments = {
    body: 'this is a body',
    comments: [],
    id: 1,
    title: 'this is a title',
    userId: 1,
    user: {
      id: 1,
      name: "name of user"
    } as any,
  };

  const { queryAllByText } = render(
    <BrowserRouter>
      <PostView post={post} />
    </BrowserRouter>
  );

  expect(queryAllByText(/this is a body/i)).toBeTruthy();
  expect(queryAllByText(/this is a title/i)).toBeTruthy();
  expect(queryAllByText(/name of user/i)).toBeTruthy();
});
