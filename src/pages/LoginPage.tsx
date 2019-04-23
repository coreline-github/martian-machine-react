import React, { useState } from 'react';
import { useLocalStorage, writeStorage, deleteFromStorage } from '@rehooks/local-storage';
import useReactRouter from 'use-react-router';

import { injectMessage, InjectMessageProps } from '../utils/inject-message';

const loginStyle = {
  display: 'flex',
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
} as any;

const inputStyle = {
  marginBottom: '20px',
  padding: '22px',
};

const buttonStyle = {
  marginBottom: '20px',
} as any;

export const LoginPage = injectMessage((props: InjectMessageProps) => {
  console.log(`${props.message} LoginPage`);

  const [userId] = useLocalStorage('userId');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const { history } = useReactRouter();

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
    <div style={loginStyle}>
      <div style={{ width: '70%', maxWidth: '800px'}}>
        <h1 className="cover-heading">Login</h1>
        <form className="form-signin" onSubmit={handleSubmit}>
          <input
            style={inputStyle}
            type="email"
            id="inputEmail"
            className="form-control"
            placeholder="Email address"
            required
            autoFocus
            onChange={e => setEmail(e.target.value)}
          />
          <input
            style={inputStyle}
            type="password"
            id="inputPassword"
            className="form-control"
            placeholder="Password"
            required
            onChange={e => setPassword(e.target.value)}
          />
          <button
            className="btn btn-lg btn-primary btn-block"
            type="submit"
            style={buttonStyle}
          >
            Sign in
          </button>
          {error &&
            <div className="alert alert-danger">
              {error}
            </div>
          }
        </form>
      </div>
    </div>
  );
});
