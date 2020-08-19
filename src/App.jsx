import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { SignIn } from './pages';

export const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={SignIn} />
      </Switch>
    </Router>
  );
};
