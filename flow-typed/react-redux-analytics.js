declare module 'react-redux-analytics' {
  // HOC from recompose
  declare type _UnaryFn<A, R> = (a: A) => R;
  declare export type _Component<A> = React$ComponentType<A>;

  declare export type HOC<Base, Enhanced> = _UnaryFn<
    _Component<Base>,
    _Component<Enhanced>
  >;
  declare function sendAnalytics<T>(...any): HOC<T, T>;
  declare var analyticsReducer: any;
  declare var sendEvent: any;
  declare var createLocationSubscriber: any;
}
