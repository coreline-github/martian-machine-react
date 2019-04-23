import React, { useState } from 'react';
import { useEffectAsync } from '../utils/use-effect-async';
import { getPostsWithUsersAndComments } from '../api/api-client';
import { IPostWithUserAndComments } from '../api/api-types';
import { PostView } from '../components/PostView';
import { injectMessage, InjectMessageProps } from '../utils/inject-message';
import { UserSelectInput } from '../components/UserSelectInput';

import '../style/posts-list-page.css';
import { Spinner } from "../components/Spinner";

export const PostsListPage = injectMessage((props: InjectMessageProps) => {
  console.log(`${props.message} PostListPage`);

  const [userId, setUserId] = useState<number | undefined>(undefined);
  const [posts, setPosts] = useState<IPostWithUserAndComments[]>([]);
  const [loading, setLoading] = useState(true);

  useEffectAsync(async () => {
    setLoading(true);
    setPosts(await getPostsWithUsersAndComments(userId));
    setLoading(false);
  }, [userId]);

  return (
    <div>
      <div
        className="select-container"
        style={{ display: 'flex', maxWidth: 650, alignItems: 'center', margin: '30px auto 0 auto', padding: '0 15px' }}
      >
        <div>
          Display only posts from user &nbsp;
        </div>
        <div className="select-wrapper" style={{ flex: 1, margin: '0 20px' }}>
          <UserSelectInput onChange={setUserId} value={userId}/>
        </div>
      </div>
      <div>
        {loading ?
          <Spinner /> :
          posts.map(post => <PostView post={post} key={post.id}/>)
        }
      </div>
    </div>
  );
});
