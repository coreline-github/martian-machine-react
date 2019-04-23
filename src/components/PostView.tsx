import React from 'react';
import { IPostWithUserAndComments } from '../api/api-types';
import { Link } from 'react-router-dom';
import { injectMessage, InjectMessageProps } from '../utils/inject-message';

// import '../style/post.css'

export interface IProps extends InjectMessageProps {
  post: IPostWithUserAndComments;
  displayDetails?: Boolean;
}

const linkStyle = {
  textDecoration: 'none',
};

export const PostView = injectMessage((props: IProps) => {
  console.log(`${props.message} PostView`);

  const { post, displayDetails } = props;

  return (
      <div className="col-md-12" style={{ maxWidth: 650, margin: '40px auto 0 auto', marginBottom: 40 }}>
        <Link to={`/post/${post.id}`} style={linkStyle}>
          <h4 style={{ color: '#00838f' }}>{post.title}</h4>
        </Link>
        <em>by {post.user.name}</em>
        <article style={{ marginTop: 12 }}>
          <p>
            {post.body}
          </p>
          {displayDetails && post.comments.map(comment => (
            <div key={comment.id}>
              {comment.name} ~ {comment.body}
            </div>
          ))}
        </article>
      </div>
  );
});
