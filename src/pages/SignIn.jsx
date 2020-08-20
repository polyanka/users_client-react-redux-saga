import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Button, Form, Container } from 'react-bootstrap';
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
    <Container fluid className="py-4">
      {error ? <Alert variant="danger">{error}</Alert> : null}
      {!data?.login ? (
        <Form style={{ width: 240 }} className="mx-auto">
          <Form.Group controlId="formBasicLogin">
            <Form.Label>Login</Form.Label>
            <Form.Control
              placeholder="Login"
              value={login}
              onChange={(event) => setLogin(event.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            onClick={handleSignIn}
            disabled={!login.length || !password.length}
          >
            Submit
          </Button>
        </Form>
      ) : (
        <>
          <Alert variant="success">Login successful!</Alert>
          <Button variant="primary" type="submit" onClick={handleSignOut}>
            Sign Out
          </Button>
        </>
      )}
    </Container>
  );
};
