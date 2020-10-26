import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// import Route from './Route';
import SignIn from '../pages/SignIn';
import Home from '../pages/Home';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={SignIn} />
        <Route path="/home" component={Home} />
      </Switch>
    </BrowserRouter>
  );
}
