/* eslint-disable react/no-set-state */

/*
 * A part of these functions are:
 *   Copyright (c) 2015 Ryan Florence
 *   Released under the MIT license.
 *   https://github.com/ryanflorence/async-props/blob/master/LICENSE.md
 */

import { Component } from 'react';
import PropTypes from 'prop-types';
import computeChangedRoutes from './computeChangedRoutes';
import { beginAsyncLoad, endAsyncLoad, skipAsyncLoad } from './actions';
import flattenComponents from './flattenComponents';
import loadAsync from './loadAsync';
import { reducerName } from './names';

class ReduxAsyncLoaderContext extends Component {
  constructor(props) {
    super(props);

    this.state = {
      children: null,
    };
    this.loadCount = 0;
  }

  componentDidMount() {
    const { loading, loaded, onServer } = this.getAsyncLoaderState();
    if (loading) {
      return;
    }

    if (loaded && onServer) {
      const { dispatch } = this.props.ctx.store;
      dispatch(skipAsyncLoad(false));
      return;
    }

    this.loadAsync(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location === this.props.location) {
      return;
    }

    const enterRoutes = computeChangedRoutes(
      {
        routes: this.props.routes,
        params: this.props.params,
        location: this.props.location,
      },
      {
        routes: nextProps.routes,
        params: nextProps.params,
        location: nextProps.location,
      }
    );

    const indexDiff = nextProps.components.length - enterRoutes.length;
    const components = enterRoutes.map(
      (_route, index) => nextProps.components[indexDiff + index]
    );

    this.loadAsync(Object.assign({}, nextProps, { components }));
  }

  shouldComponentUpdate() {
    const { loading } = this.getAsyncLoaderState();
    return !loading;
  }

  getAsyncLoaderState() {
    const { getAsyncLoaderState } = this.props;
    const { getState } = this.props.ctx.store;
    return getAsyncLoaderState(getState());
  }

  loadAsync(props) {
    const { children, components } = props;

    const flattened = flattenComponents(components);
    if (!flattened.length) {
      return;
    }

    const { store } = this.props.ctx;
    const { dispatch } = store;
    this.beginLoad(dispatch, children)
      .then(() => loadAsync(flattened, props, store))
      .then(
        () => this.endLoad(dispatch),
        (error) => this.endLoad(dispatch, error)
      );
  }

  beginLoad(dispatch, children) {
    if (this.loadCount === 0) {
      dispatch(beginAsyncLoad());
    }

    ++this.loadCount;
    return new Promise((resolve) => {
      this.setState({ children }, () => resolve());
    });
  }

  endLoad(dispatch, error) {
    if (error) {
      this.props.onError(error);
    }

    --this.loadCount;
    if (this.loadCount === 0) {
      dispatch(endAsyncLoad());
      this.setState({ children: null });
    }
  }

  render() {
    const { loading } = this.getAsyncLoaderState();

    return loading ? this.state.children : this.props.children;
  }
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

export default ReduxAsyncLoaderContext;
