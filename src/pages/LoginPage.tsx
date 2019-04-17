import React from 'react';
import '../style/login.css';

export const LoginPage = () => {
  return (
    <div>
      <h1 className="cover-heading">Login</h1>
      <form className="form-signin">
        <label htmlFor="inputEmail" className="sr-only">Email address</label>
        <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required autoFocus />
        <label htmlFor="inputPassword" className="sr-only">Password</label>
        <input type="password" id="inputPassword" className="form-control" placeholder="Password" required />
        <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
        <p className="mt-5 mb-3 text-muted">&copy; 2017-2018</p>
      </form>
    </div>
  );
}
