import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { useEffectAsync } from '../utils/use-effect-async';
import { getPost } from '../api/api-client';
import { IPostWithUserAndComments } from '../api/api-types';
import { PostView } from '../components/PostView';
import { injectMessage, InjectMessageProps } from '../utils/inject-message';

export type IProps = RouteComponentProps<{ id: string; }>;

export const PostDetailsPage = injectMessage((props: IProps & InjectMessageProps) => {
  console.log(`${props.message} PostDetailsPage`);

  const [post, setPost] = useState<IPostWithUserAndComments | undefined>(undefined);

  const id = parseInt(props.match.params.id);

  useEffectAsync(async () => {
    const post = await getPost(id);
    setPost(post);
  }, [id]);

  if (!post) {
    return <div>Loading...</div>
  }

  return <PostView post={post} />;
});
