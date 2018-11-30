declare module "redux-effects-steps" {
  type MaybePromise<T> = T | Promise<T>;
  function steps(
    o: MaybePromise<Object> | Array<MaybePromise<Object>>,
    ...rest: Array<
      | [(f: any) => MaybePromise<Object>, (e: Error) => MaybePromise<Object>]
      | [(f: any) => MaybePromise<Object>]
      | [MaybePromise<Object>]
      | MaybePromise<Object>
    >
  ): Promise<any>;
}
