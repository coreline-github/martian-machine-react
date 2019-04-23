import React from 'react';
import { IPostWithUserAndComments } from '../api/api-types';
import { Link } from 'react-router-dom';
import { injectMessage, InjectMessageProps } from '../utils/inject-message';

// import '../style/post.css'

export interface IProps extends InjectMessageProps {
  post: IPostWithUserAndComments;
}

const linkStyle = {
  textDecoration: 'none',
};

export const PostView = injectMessage((props: IProps) => {
  console.log(`${props.message} PostView`);

  const { post } = props;

  return (
      <div className="col-md-12">
        <Link to={`/post/${post.id}`} style={linkStyle}>
          <h4>{post.title}</h4>
        </Link>
        <em>by {post.user.name}</em>
        <article>
          <p>
            {post.body}
          </p>
          {post.comments.map(comment => (
            <div key={comment.id}>
              {comment.name} ~ {comment.body}
            </div>
          ))}
        </article>
      </div>
  );
});
