declare module 'redux-async-loader' {
  // HOC from recompose
  declare type _UnaryFn<A, R> = (a: A) => R;
  declare export type _Component<A> = React$ComponentType<A>;

  declare export type HOC<Base, Enhanced> = _UnaryFn<
    _Component<Base>,
    _Component<Enhanced>
  >;
  declare var useAsyncLoader: any;
  declare var reduxAsyncLoader: {
    onServer: boolean,
    loaded: boolean
  };
  declare function asyncLoader<OP>(
    (OP, { dispatch: Function, getState: Function }) => any
  ): HOC<*, OP>;

  declare function deferLoader<OP, A>(
    (OP, { dispatch: Function, getState: Function }) => any
  ): HOC<*, OP>;
}
