import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Form, Container, Card } from 'react-bootstrap';
import { signInRequest, signOutRequest } from '../actions';
import { Message } from '../components';

export const SignIn = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const { user, message, token, success } = useSelector((state) => state.auth);

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
      {message ? (
        <Message text={message} type={success ? 'success' : 'danger'} />
      ) : null}

      {!token ? (
        <>
          <Card style={{ width: 300 }} className="mx-auto">
            <Card.Title className="mx-auto pt-4">Sign In</Card.Title>
            <Card.Body>
              <Form>
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
                  Sing In
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <Card style={{ width: 300 }} className="mx-auto mt-4">
            <Card.Body className="mx-auto">
              <Link to="/join">Create an account</Link>
            </Card.Body>
          </Card>
        </>
      ) : (
        <>
          <h3>{user.login}</h3>
          <Button variant="primary" type="submit" onClick={handleSignOut}>
            Sign Out
          </Button>
        </>
      )}
    </Container>
  );
};
