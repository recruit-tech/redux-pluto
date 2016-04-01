import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { App } from './containers';
import { Home, Foo, Bar, NotFound } from './components';

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="foo" component={Foo} />
    <Route path="bar" component={Bar} />
    <Route path="*" component={NotFound} status={404} />
  </Route>
);

export default routes;
