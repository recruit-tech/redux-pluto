declare module "redux-async-loader" {
  export var END_ASYNC_LOAD: string;
  export var BEGIN_ASYNC_LOAD: string;

  // HOC from recompose
  type _UnaryFn<A, R> = (a: A) => R;
  export type _Component<A> = React.ComponentType<A>;
  export type HOC<Base, Enhanced> = _UnaryFn<
    _Component<Base>,
    _Component<Enhanced>
  >;
  var useAsyncLoader: any;
  var reduxAsyncLoader: any;

  export var loadOnServer: any;

  function asyncLoader<OP>(
    fn: (op: OP, middleware: { dispatch: any; getState: any }) => any,
  ): HOC<any, OP>;

  function deferLoader<OP, A>(
    fn: (op: OP, middleware: { dispatch: any; getState: any }) => any,
  ): HOC<any, OP>;
}
