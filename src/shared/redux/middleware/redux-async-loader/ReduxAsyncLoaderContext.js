/* eslint-disable react/no-set-state */

/*
 * A part of these functions are:
 *   Copyright (c) 2015 Ryan Florence
 *   Released under the MIT license.
 *   https://github.com/ryanflorence/async-props/blob/master/LICENSE.md
 */

import {
  Component,
  memo,
  useState,
  useRef,
  useLayoutEffect,
  useCallback,
  useContext,
  useEffect,
} from "react";
import PropTypes from "prop-types";
import computeChangedRoutes from "./computeChangedRoutes";
import { beginAsyncLoad, endAsyncLoad, skipAsyncLoad } from "./actions";
import flattenComponents from "./flattenComponents";
import loadAsyncGlobal from "./loadAsync";
import { reducerName } from "./names";
import { ReactReduxContext } from "react-redux";

function ReduxAsyncLoaderContext(props) {
  const { store } = props.ctx;
  const [state, setState] = useState({ children: null });
  const [resolve, setResolve] = useState(null);
  const loadCount = useRef(0);
  const prev = useRef(props);

  const getAsyncLoaderState = useCallback(() => {
    const { getAsyncLoaderState } = props;
    const { getState } = store;
    return getAsyncLoaderState(getState());
  }, [props.getAsyncLoaderState]);

  const { loading, loaded, onServer } = getAsyncLoaderState();

  const beginLoad = () => {
    const { children } = props;
    const { dispatch } = store;
    if (loadCount.current === 0) dispatch(beginAsyncLoad());

    loadCount.current += 1;
    return new Promise(resolve => {
      setState({ children });
      setTimeout(resolve);
    });
  };

  const endLoad = error => {
    const { dispatch } = store;
    if (error) {
      props.onError(error);
    }

    loadCount.current -= 1;
    if (loadCount.current === 0) {
      dispatch(endAsyncLoad());
      setState({ children: null });
    }
  };

  const loadAsync = () => {
    const { children, components } = props;

    const flattened = flattenComponents(components);
    if (flattened.length === 0) return;

    const { dispatch } = store;
    beginLoad()
      .then(() => loadAsyncGlobal(flattened, props, store))
      .then(endLoad, error => endLoad(error));
  };

  useLayoutEffect(() => {
    if (prev.current.location === props.location) return;

    const enterRoutes = computeChangedRoutes(
      {
        routes: prev.current.routes,
        params: prev.current.params,
        location: prev.current.location,
      },
      {
        routes: props.routes,
        params: props.params,
        location: props.location,
      },
    );

    const indexDiff = props.components.length - enterRoutes.length;
    const components = enterRoutes.map(
      (_route, index) => props.components[indexDiff + index],
    );

    return loadAsync({ ...props, ...{ components } });
  }, [props.location, prev.current]);

  useLayoutEffect(() => {
    const { loading, loaded, onServer } = getAsyncLoaderState();
    if (loading) return;
    if (loaded && onServer) {
      const { dispatch } = store;
      dispatch(skipAsyncLoad(false));
      return;
    }
    return loadAsync(props);
  }, []);

  useLayoutEffect(() => {
    prev.current = props;
  });

  return loading ? state.children : props.children;
}

ReduxAsyncLoaderContext.propTypes = {
  children: PropTypes.node.isRequired,
  components: PropTypes.array.isRequired,
  params: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  getAsyncLoaderState: PropTypes.func,
  onError: PropTypes.func,
};

ReduxAsyncLoaderContext.defaultProps = {
  getAsyncLoaderState(state) {
    return state[reducerName];
  },
  onError(_error) {
    // ignore
  },
};

export default memo(ReduxAsyncLoaderContext, prev => {
  const { loading } = prev.getAsyncLoaderState(prev.ctx.store.getState());
  return loading;
});
