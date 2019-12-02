/*
 * A part of these functions are:
 *   Copyright (c) 2015-present, Ryan Florence, Michael Jackson
 *   Released under the MIT license.
 *   https://github.com/reactjs/react-router/blob/master/LICENSE.md
 */

import { getParamNames } from 'react-router/lib/PatternUtils';

export default function computeChangedRoutes(prevState, nextState) {
  const prevRoutes = prevState && prevState.routes;
  const nextRoutes = nextState.routes;

  if (!prevRoutes) {
    return nextRoutes;
  }

  const leaveIndex = prevRoutes.findIndex((route) => (
    nextRoutes.indexOf(route) === -1 ||
    routeParamsChanged(route, prevState, nextState) ||
    queryParamsChanged(route, prevState, nextState) ||
    routeChanged(route, prevState, nextState)
  ));
  const leaveRoutes = leaveIndex === -1 ? [] : prevRoutes.slice(leaveIndex);

  return nextRoutes.filter((route) => {
    const isNew = prevRoutes.indexOf(route) === -1;
    const paramsChanged = leaveRoutes.indexOf(route) !== -1;

    return isNew || paramsChanged;
  });
}

function routeParamsChanged(route, prevState, nextState) {
  if (!route.path) {
    return false;
  }

  const paramNames = getParamNames(route.path);

  return paramNames.some((paramName) =>
    prevState.params[paramName] !== nextState.params[paramName]
  );
}

function queryParamsChanged(route, prevState, nextState) {
  const queryKeys = (route.asyncLoaderProps && route.asyncLoaderProps.queryKeys) || route.queryKeys;
  if (!queryKeys) {
    return false;
  }

  const prevQuery = prevState.location.query;
  const nextQuery = nextState.location.query;

  if (queryKeys === '*') {
    const prevQueryKeys = Object.keys(prevQuery);
    const nextQueryKeys = Object.keys(nextQuery);

    return prevQueryKeys.length !== nextQueryKeys.length ||
      prevQueryKeys.some((key) => prevQuery[key] !== nextQuery[key]);
  }

  const keys = queryKeys.split(/[, ]+/);
  return keys.some((key) => prevQuery[key] !== nextQuery[key]);
}

function routeChanged(route, prevState, nextState) {
  const changed = route.asyncLoaderProps && route.asyncLoaderProps.routeChanged;
  return changed && changed(route, prevState, nextState);
}
