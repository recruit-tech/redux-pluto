/* @flow */
import React from "react";
import { Route, IndexRoute } from "react-router";

// non chunked components
import { App, Error, Home, Main, NotFound, DefaultLayout } from "./main";

  export default function getRoutes(store: $FIXME) {
    return (
      <Route path="/" component={App}>
        <Route component={DefaultLayout}>
          <Route components={{ main: Main }}>
            <IndexRoute component={Home} />
            <Route path="error" component={Error} status={500} />
            <Route path="*" component={NotFound} status={404} />
          </Route>
        </Route>
      </Route>
    );

}
