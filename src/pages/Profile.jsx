import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Container, Col, Form, Image, Row } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { Header, Loader, Message } from '../components';
import {
  profileRequest,
  profileUpdateRequest,
  signOutRequest,
} from '../actions';

export const Profile = () => {
  const { user, message, success, loading } = useSelector(
    (state) => state.profile
  );
  const { token } = useSelector((state) => state.auth);

  const [about, setAbout] = useState('');
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [redirect, setRedirect] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(profileRequest());
  }, [dispatch]);

  useEffect(() => {
    if (!token || success === false) {
      setRedirect(true);
    }
  }, [dispatch, token, success]);

  useEffect(() => {
    if (user != null) {
      setAbout(user.about);
      setName(user.name);
      setLocation(user.location);
    }
  }, [user]);

  const handleSignOut = () => {
    dispatch(signOutRequest());
  };

  const handleProfileUpdate = (event) => {
    event.preventDefault();
    dispatch(profileUpdateRequest({ about, name, location }));
  };

  return (
    <>
      <Header handleSignOut={handleSignOut} />
      <Container fluid className="py-4">
        <h2 className="text-center">Profile</h2>
        {message ? (
          <Message text={message} type={success ? 'success' : 'danger'} />
        ) : null}
        {loading || user == null ? (
          <Loader />
        ) : (
          <>
            <Row>
              <Col className="mx-auto py-4" xs={6} md={4}>
                <Image src={user.avatar} roundedCircle width={200} />
              </Col>
            </Row>

            <Form className="mx-auto p-4" style={{ width: 600 }}>
              <Form.Group as={Row} controlId="formPlaintextEmail">
                <Form.Label column sm="2">
                  Login
                </Form.Label>
                <Col sm="10">
                  <Form.Control plaintext readOnly value={user.login} />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="formPlaintextEmail">
                <Form.Label column sm="2">
                  Name
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="formPlaintextAbout">
                <Form.Label column sm="2">
                  About
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    as="textarea"
                    rows="4"
                    value={about}
                    onChange={(event) => setAbout(event.target.value)}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="formPlaintextEmail">
                <Form.Label column sm="2">
                  Location
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    value={location}
                    onChange={(event) => setLocation(event.target.value)}
                  />
                </Col>
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                onClick={handleProfileUpdate}
              >
                Update profile
              </Button>
            </Form>
          </>
        )}
      </Container>
      {redirect ? <Redirect to="/" /> : null}
    </>
  );
};
