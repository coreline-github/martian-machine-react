import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import cx from 'classnames';
import useReactRouter from 'use-react-router';

import '../style/cover.css';

import { LoginPage } from '../pages/LoginPage';
import { PostDetailsPage } from '../pages/PostDetailsPage';
import { PostsListPage } from '../pages/PostsListPage';

export const MainLayout = () => {
  const { location } = useReactRouter();

  const path = location ? location.pathname : '';

  return (
    <div className="text-center" style={{ width: '100%', height: '100%' }}>
      <div className="cover-container d-flex h-100 p-3 mx-auto flex-column">
        <header className="masthead mb-auto">
          <div className="inner">
            <h3 className="masthead-brand">Martian Machine Blogger</h3>
              <nav className="nav nav-masthead justify-content-center">
                <Link className={cx('nav-link', path == '/' && 'active')} to="/">Home</Link>
                <Link className={cx('nav-link', path.startsWith('/app') && 'active')} to="/app">App</Link>
              </nav>
          </div>
      </header>

      <main role="main" className="inner cover">
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route exact path="/app" component={PostsListPage} />
          <Route exact path="/post/:id" component={PostDetailsPage} />
        </Switch>
      </main>

      <footer className="mastfoot mt-auto">
        <div className="inner">
          <p>Cover template for <a href="https://getbootstrap.com/">Bootstrap</a>, by <a href="https://twitter.com/mdo">@mdo</a>.</p>
        </div>
      </footer>
      </div>
    </div>
  );
}
