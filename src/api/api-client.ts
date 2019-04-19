import axios from 'axios';
import bluebird from 'bluebird';
const { setupCache } = require('axios-cache-adapter');

import { IComment, IPost, IPostWithUserAndComments, IUser } from './api-types';

export const cache = setupCache({
  maxAge: 15 * 60 * 1000,
  exclude: { query: false },
});

const authenticatedAxios = axios.create({
  headers: {
    'X-Auth': 'bWFydGlhbmFuZG1hY2hpbmU=',
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  baseURL: 'https://demo.martian.agency/api',
  adapter: cache.adapter,
});

export async function getPosts(userId?: number) {
  return (await authenticatedAxios.get<IPost[]>('posts', { params: { userId } })).data;
}

export async function getUsers() {
  return (await authenticatedAxios.get<IUser[]>('users')).data;
}

export async function getComments(postId: number | undefined) {
  return (await authenticatedAxios.get<IComment[]>('comments', { params: { postId } })).data;
}

export async function getPostsWithUsersAndComments(userId?: number): Promise<IPostWithUserAndComments[]> {
  const posts = await getPosts(userId);
  const users = await getUsers();

  return bluebird.map(posts, post => bluebird.props(({
    ...post,
    user: users.filter(user => user.id === post.userId)[0],
    comments: getComments(post.id),
  })));
}

export function filterPosts(posts: IPostWithUserAndComments[], filterText: string) {
  return posts.filter(post =>
    post.user.name.toLowerCase().indexOf(filterText.toLowerCase()) > -1 ||
    post.user.email.toLowerCase().indexOf(filterText.toLowerCase()) > -1
  );
}

export async function getPost(postId: number) {
  return (await getPostsWithUsersAndComments()).filter(post => post.id === postId)[0];
}
