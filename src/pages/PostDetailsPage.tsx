import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { useEffectAsync } from '../utils/useEffectAsync';
import { getPost } from '../api/api-client';
import { IPostWithUserAndComments } from '../api/api-types';
import { PostView } from '../components/PostView';

export const PostDetailsPage = (props: RouteComponentProps<{ id: string; }>) => {
  const [post, setPost] = useState<IPostWithUserAndComments | undefined>(undefined);

  const id = parseInt(props.match.params.id);

  useEffectAsync(async () => {
    const post = await getPost(id);
    setPost(post);
  }, [id]);

  if (!post) {
    return <div>Loading...</div>
  }

  return <PostView post={post}/>;
}
