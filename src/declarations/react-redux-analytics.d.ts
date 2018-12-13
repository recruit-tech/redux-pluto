declare module "react-redux-analytics" {
  // HOC from recompose
  type _UnaryFn<A, R> = (a: A) => R;
  export type _Component<A> = React.ComponentType<A>;

  type HOC<Base, Enhanced> = _UnaryFn<_Component<Base>, _Component<Enhanced>>;
  function sendAnalytics<T>(...args: any): HOC<T, T>;
  var analyticsReducer: any;
  export var analyticsMiddleware: any;
  var sendEvent: any;
  var createLocationSubscriber: any;
}
