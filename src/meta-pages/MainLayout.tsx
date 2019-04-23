import React, { CSSProperties } from 'react';
import { Link, Switch, Route, Redirect } from 'react-router-dom';
import { useLocalStorage, deleteFromStorage } from '@rehooks/local-storage';

import { LoginPage } from '../pages/LoginPage';
import { PostDetailsPage } from '../pages/PostDetailsPage';
import { PostsListPage } from '../pages/PostsListPage';
import { injectMessage, InjectMessageProps } from '../utils/inject-message';

const linkStyle: CSSProperties = {
  color: 'inherit',
  textDecoration: 'inherit',
  fontWeight: 'inherit',
};

const headerStyle: CSSProperties = {
  textAlign: 'left',
  margin: '.5rem 1rem .5rem 1rem',
  display: 'flex',
  height: 50,
  justifyContent: 'space-between'
};

const logoutButtonStyle: CSSProperties = {
  backgroundColor: '#005662',
  border: 'none',
  color: 'white',
};

export const MainLayout = injectMessage((props: InjectMessageProps) => {
  console.log(`${props.message} MainLayout`);

  const [userId] = useLocalStorage('userId');
  const logout = () => deleteFromStorage('userId');

  const isUserLoggedIn = !!userId;

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div className="cover-container d-flex h-100 mx-auto flex-column">
        <header className="masthead" style={{ backgroundColor: '#005662' }}>
          <div style={{ color: 'white' }}>
            <h3 className="masthead-brand" style={headerStyle}>
              <Link to="/app" style={linkStyle}>Martian Blogger</Link>
              {isUserLoggedIn && <button style={logoutButtonStyle} onClick={logout}>Logout</button>}
            </h3>
          </div>
      </header>
        <Switch>
          {isUserLoggedIn && <Redirect exact from="/" to="/app"/>}
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
