import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { useEffectAsync } from '../utils/use-effect-async';
import { getPost } from '../api/api-client';
import { IPostWithUserAndComments } from '../api/api-types';
import { PostView } from '../components/PostView';
import { IPrintNameProps, printNameOnRender } from '../utils/print-name-on-render';

export type IProps = RouteComponentProps<{ id: string; }> & IPrintNameProps;

export const PostDetailsPage = printNameOnRender((props: IProps) => {
  const [post, setPost] = useState<IPostWithUserAndComments | undefined>(undefined);

  const id = parseInt(props.match.params.id);

  useEffectAsync(async () => {
    const post = await getPost(id);
    setPost(post);
  }, [id]);

  if (!post) {
    return <div>Loading...</div>
  }

  return <PostView post={post} message={props.message}/>;
}, 'PostDetailsPage');
