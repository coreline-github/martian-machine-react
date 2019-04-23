import React from 'react';
import { Link, Switch, Route, Redirect } from 'react-router-dom';
import cx from 'classnames';
import useReactRouter from 'use-react-router';
import { useLocalStorage } from '@rehooks/local-storage';

import { LoginPage } from '../pages/LoginPage';
import { PostDetailsPage } from '../pages/PostDetailsPage';
import { PostsListPage } from '../pages/PostsListPage';

// import '../style/cover.css';
import { injectMessage, InjectMessageProps } from '../utils/inject-message';

export const MainLayout = injectMessage((props: InjectMessageProps) => {
  console.log(`${props.message} MainLayout`);
  const [userId] = useLocalStorage('userId');

  const isUserLoggedIn = !!userId;

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div className="cover-container d-flex h-100 mx-auto flex-column">
        <header className="masthead mb-auto" style={{ backgroundColor: '#005662' }}>
          <div className="inner">
            <h3
              className="masthead-brand"
              style={{ textAlign: 'left', color: 'white', margin: '.5rem 0 .5rem 1rem', display: 'flex', height: 50, alignItems: 'center' }}
            >
              Martian Machine Blogger
            </h3>
          </div>
      </header>
        <Switch>
          <Route exact path="/" component={LoginPage} />
          {!isUserLoggedIn && <Redirect to="/" />}
          <Route exact path="/app" component={PostsListPage} />
          <Route exact path="/post/:id" component={PostDetailsPage} />
          <Redirect to="/" />
        </Switch>

      <footer className="mastfoot mt-auto">
        <div className="inner">
          ivo@coreline.agency
        </div>
      </footer>
      </div>
    </div>
  );
});
