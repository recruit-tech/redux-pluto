/* eslint-disable react/no-set-state */
import React, { Component, PropTypes, cloneElement } from 'react';
import computeChangedRoutes from 'react-router/lib/computeChangedRoutes';
import { beginAsyncLoad, endAsyncLoad } from './actions';
import flattenComponents from './flattenComponents';
import loadAsync from './loadAsync';
import { reducerName } from './names';

export default class ReduxAsyncLoaderContext extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired,
  };

  static propTypes = {
    children: PropTypes.node.isRequired,
    components: PropTypes.array.isRequired,
    params: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    getAsyncLoaderState: PropTypes.func,
    onError: PropTypes.func,
  };

  static defaultProps = {
    getAsyncLoaderState(state) {
      return state[reducerName];
    },
    onError(error) {
      // ignore
    },
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      children: null,
    };
  }

  componentDidMount() {
    const { loading, loaded, onServer } = this.getAsyncLoaderState();
    if (loading) {
      return;
    }

    if (loaded && onServer) {
      const { dispatch } = this.context.store;
      dispatch(endAsyncLoad(false));
      return;
    }

    this.loadAsync(this.props);
  }

  componentWillReceiveProps(nextProps) {
    // based on async-props@0.3.2
    // https://github.com/ryanflorence/async-props
    if (nextProps.location === this.props.location) {
      return;
    }

    const { enterRoutes } = computeChangedRoutes(
      { routes: this.props.routes, params: this.props.params },
      { routes: nextProps.routes, params: nextProps.params },
    );

    const indexDiff = nextProps.components.length - enterRoutes.length;
    const components = [];
    for (let i = 0, l = enterRoutes.length; i < l; i++) {
      components.push(nextProps.components[indexDiff + i]);
    }

    this.loadAsync({ ...nextProps, components });
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { loading } = this.getAsyncLoaderState();
    return !loading;
  }

  getAsyncLoaderState() {
    const { getAsyncLoaderState } = this.props;
    const { dispatch, getState } = this.context.store;
    return getAsyncLoaderState(getState());
  }

  loadAsync(props) {
    const { children, components, params } = props;
    const { store } = this.context;
    const { dispatch } = store;

    const flattened = flattenComponents(components);
    if (!flattened.length) {
      return;
    }

    dispatch(beginAsyncLoad());
    this.setState({
      children,
    }, () => {
      const onEnd = (error) => {
        dispatch(endAsyncLoad());
        if (error) {
          this.props.onError(error);
        }

        this.setState({ children: null });
      };

      loadAsync(flattened, params, store).then(
        () => onEnd(),
        (error) => onEnd(error),
      );
    });
  }

  render() {
    const { loading } = this.getAsyncLoaderState();
    return loading ? this.state.children : this.props.children;
  }
}
