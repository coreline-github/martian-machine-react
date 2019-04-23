import React, { useState } from 'react';
import { useEffectAsync } from '../utils/use-effect-async';
import { getPostsWithUsersAndComments } from '../api/api-client';
import { IPostWithUserAndComments } from '../api/api-types';
import { PostView } from '../components/PostView';
import { injectMessage, InjectMessageProps } from '../utils/inject-message';
import { UserSelectInput } from '../components/UserSelectInput';

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
      <div>
        <div>
          Display only posts from user &nbsp;
        </div>
        <div>
          <UserSelectInput onChange={setUserId} value={userId}/>
        </div>
      </div>
      <div>
        {loading ?
          <div>Loading...</div> :
          posts.map(post => <PostView post={post} key={post.id}/>)
        }
      </div>
    </div>
  );
});
