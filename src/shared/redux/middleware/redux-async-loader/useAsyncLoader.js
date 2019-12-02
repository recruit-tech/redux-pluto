import React, { useContext } from "react";
import ReduxAsyncLoaderContext from "./ReduxAsyncLoaderContext";
import reducer from "./reducer";
import * as names from "./names";
import { Context } from "./context";

class Provider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      [names.reducerName]: {
        loaded: false,
        loading: false,
        onServer: typeof window === "undefined",
      },
    };
    const self = this;
    this.store = {
      getState() {
        return self.state;
      },
      dispatch(action) {
        const newState = reducer(self.state, action);
        if (newState !== self.state) {
          typeof window === "undefined"
            ? (self.state = {
                [names.reducerName]: {
                  ...newState,
                },
              })
            : self.setState({
                [names.reducerName]: {
                  ...newState,
                },
              });
        }
      },
    };
  }

  render() {
    return (
      <Context.Provider value={{ store: this.store }}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

const WrapedReduxAsyncLoaderContext = ({ child, renderProps }) => (
  <Context.Consumer>
    {({ store }) => (
      <ReduxAsyncLoaderContext {...renderProps} ctx={{ store }}>
        {child}
      </ReduxAsyncLoaderContext>
    )}
  </Context.Consumer>
);

export default function useAsyncLoader() {
  return {
    renderRouterContext: (child, renderProps) => {
      return (
        <Provider>
          <WrapedReduxAsyncLoaderContext
            child={child}
            renderProps={renderProps}
          />
        </Provider>
      );
    },
  };
}
