import React from 'react';
import { IPostWithUserAndComments } from '../api/api-types';
import { Link } from 'react-router-dom';
import { IPrintNameProps, printNameOnRender } from '../utils/print-name-on-render';

export interface IProps extends IPrintNameProps {
  post: IPostWithUserAndComments;
}

const linkStyle = {
  textDecoration: 'none',
};

export const PostView = printNameOnRender((props: IProps) => {
  const { post } = props;

  return (
    <Link to={`/post/${post.id}`} style={linkStyle}>
      <div className="col-md-10 blogShort">
        <h4>{post.title}</h4>
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
        <br />
        <br />
        <br />
      </div>
    </Link>
  );
}, 'PostView');
