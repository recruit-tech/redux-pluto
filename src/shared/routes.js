import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Bar from './components/atoms/Bar';
import Foo from './components/atoms/Foo';
import Home from './components/atoms/Home';
import NotFound from './components/atoms/NotFound';
import App from './components/orgs/App';
import Style from './components/orgs/Style';
import StyleList from './components/orgs/StyleList';

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />

    <Route path="style">
      <IndexRoute component={Style} />
      <Route path=":gender" component={Style}>
        <Route path=":hairLength" component={StyleList} />
      </Route>
    </Route>

    <Route path="foo" component={Foo} />
    <Route path="bar" component={Bar} />
    <Route path="*" component={NotFound} status={404} />
  </Route>
);

export default routes;
