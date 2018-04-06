declare module 'redux-effects-steps' {
  declare type MaybePromise<T> = T | Promise<T>;
  declare function steps(
    o: MaybePromise<Object>,
    ...rest: Array<
      [any => MaybePromise<Object>, Error => MaybePromise<Object>]
      | MaybePromise<Object>
    >
  ): Promise<*>;
}
