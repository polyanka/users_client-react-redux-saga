import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signInRequest, signOutRequest } from '../actions';

export const SignIn = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const { error, data } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const handleSignIn = (e) => {
    e.preventDefault();
    dispatch(signInRequest({ login, password }));
  };

  const handleSignOut = () => {
    setLogin('');
    setPassword('');
    dispatch(signOutRequest());
  };

  return (
    <>
      {error || null}
      {!data?.login ? (
        <form>
          <input
            type="text"
            value={login}
            onChange={(event) => setLogin(event.target.value)}
          />
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <button type="submit" onClick={handleSignIn}>
            Sign In
          </button>
        </form>
      ) : (
        <>
          <p>Login successful!</p>
          <button type="button" onClick={handleSignOut}>
            Sign Out
          </button>
        </>
      )}
    </>
  );
};
