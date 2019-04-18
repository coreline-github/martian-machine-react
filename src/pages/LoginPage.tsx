import React, { useState } from 'react';
import { useLocalStorage, writeStorage, deleteFromStorage } from '@rehooks/local-storage';
import useReactRouter from 'use-react-router';

import '../style/login.css';
import { injectMessage, InjectMessageProps } from '../utils/inject-message';

export const LoginPage = injectMessage((props: InjectMessageProps) => {
  console.log(`${props.message} LoginPage`);

  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const { history } = useReactRouter();
  const [userId] = useLocalStorage('userId');

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (email === 'ivo@coreline.agency' && password === 'password') {
      setError('');
      writeStorage('userId', '1');
      history.push('/app');
    } else {
      setError('Invalid username or password');
    }
  }

  const handleLogout = () => {
    deleteFromStorage('userId');
  }

  if (userId) {
    return <button className="btn btn-lg btn-primary btn-block" type="button" onClick={handleLogout}>Logout</button>;
  }

  return (
    <div>
      <h1 className="cover-heading">Login</h1>
      <form className="form-signin" onSubmit={handleSubmit}>
        <label htmlFor="inputEmail" className="sr-only">Email address</label>
        <input
          type="email"
          id="inputEmail"
          className="form-control"
          placeholder="Email address"
          required
          autoFocus
          onChange={e => setEmail(e.target.value)}
        />
        <label htmlFor="inputPassword" className="sr-only">Password</label>
        <input
          type="password"
          id="inputPassword"
          className="form-control"
          placeholder="Password"
          required
          onChange={e => setPassword(e.target.value)}
        />
        <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
        {error &&
          <div className="alert alert-danger">
            {error}
          </div>
        }
      </form>
    </div>
  );
});
