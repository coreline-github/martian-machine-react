import React, { useState } from 'react';
import { useEffectAsync } from '../utils/useEffectAsync';
import { getPostsWithUsersAndComments } from '../api/api-client';
import { IPostWithUserAndComments } from '../api/api-types';

export const PostsListPage = () => {
  const [posts, setPosts] = useState<IPostWithUserAndComments[]>([]);
  const [filterText, setFilterText] = useState('');

  useEffectAsync(async () => {
    setPosts(await getPostsWithUsersAndComments());
  }, []);

  const filteredPosts = posts.filter(post => post.user.name.toLowerCase().includes(filterText.toLowerCase()));

  return (
    <div>
      <br />
      <div>
        Display only posts from user &nbsp;
        <input type="text" value={filterText} onChange={e => setFilterText(e.target.value)}/>
      </div>
      <br />
      {filteredPosts.map(post => (
        <div className="col-md-10 blogShort" key={post.id}>
          <h4>{post.title}</h4>
          <em>by {post.user.name}</em>
          <article>
            <p>
              {post.body}
            </p>
            {post.comments.map(comment => (
              <div key={comment.id}>
                {comment.userId && console.log('comment.userId', comment.userId)}
                {comment.name} <em>~ {comment.userId ? comment.userId : 'Anonymous'}</em>
              </div>
            ))}
          </article>
          <br />
          <br />
          <br />
        </div>
      ))}
      <div className="col-md-12 gap10" />
    </div>
  );
}
