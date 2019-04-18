import React, { useState } from 'react';
import { useEffectAsync } from '../utils/use-effect-async';
import { filterPosts, getPostsWithUsersAndComments } from '../api/api-client';
import { IPostWithUserAndComments } from '../api/api-types';
import { PostView } from '../components/PostView';

export const PostsListPage = () => {
  const [posts, setPosts] = useState<IPostWithUserAndComments[]>([]);
  const [filterText, setFilterText] = useState('');
  const [loading, setLoading] = useState(true);

  useEffectAsync(async () => {
    setPosts(await getPostsWithUsersAndComments());
    setLoading(false);
  }, []);

  const filteredPosts = filterPosts(posts, filterText);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <br />
      <div>
        Display only posts from user &nbsp;
        <input type="text" value={filterText} onChange={e => setFilterText(e.target.value)}/>
      </div>
      <br />
      {filteredPosts.map(post => (
        <PostView post={post} key={post.id}/>
      ))}
      <div className="col-md-12 gap10" />
    </div>
  );
};
