import React, { useState } from 'react';
import { useEffectAsync } from '../utils/use-effect-async';
import { cache, getPostsWithUsersAndComments } from '../api/api-client';
import { IPostWithUserAndComments } from '../api/api-types';
import { PostView } from '../components/PostView';
import { injectMessage, InjectMessageProps } from '../utils/inject-message';
import { UserSelectInput } from '../components/UserSelectInput';

export const PostsListPage = injectMessage((props: InjectMessageProps) => {
  console.log(`${props.message} PostListPage`);

  const [userId, setUserId] = useState<number | undefined>(undefined);
  const [posts, setPosts] = useState<IPostWithUserAndComments[]>([]);
  const [loading, setLoading] = useState(true);

  console.log('cache.store.length()', cache.store.length());

  useEffectAsync(async () => {
    setLoading(true);
    setPosts(await getPostsWithUsersAndComments(userId));
    setLoading(false);
  }, [userId]);

  return (
    <div>
      <br />
      <div>
        Display only posts from user &nbsp;
        <UserSelectInput onChange={setUserId} value={userId}/>
      </div>
      <br />
      {loading ?
        <div>Loading...</div> :
        posts.map(post => <PostView post={post} key={post.id}/>)
      }
      <div className="col-md-12 gap10" />
    </div>
  );
});
