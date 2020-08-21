import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { SignIn, SignUp } from './pages';

export const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={SignIn} />
        <Route path="/join" component={SignUp} />
        <Route component={() => <h1>Not found</h1>} />
      </Switch>
    </Router>
  );
};
