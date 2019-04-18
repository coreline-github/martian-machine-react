import axios from 'axios';
import { IComment, IPost, IPostWithUserAndComments, IUser } from './api-types';

const authenticatedAxios = axios.create({
  headers: {
    'X-Auth': 'bWFydGlhbmFuZG1hY2hpbmU=',
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  baseURL: 'https://demo.martian.agency/api'
});

export async function getPosts() {
  return (await authenticatedAxios.get<IPost[]>('posts')).data;
}

export async function getUsers() {
  return (await authenticatedAxios.get<IUser[]>('users')).data;
}

export async function getComments() {
  return (await authenticatedAxios.get<IComment[]>('comments')).data;
}

export async function getPostsWithUsersAndComments(): Promise<IPostWithUserAndComments[]> {
  const posts = await getPosts();
  const users = await getUsers();
  const comments = await getComments();

  return posts.map(post => ({
    ...post,
    user: users.filter(user => user.id === post.userId)[0],
    comments: comments.filter(comment => comment.postId === post.id),
  }))
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
