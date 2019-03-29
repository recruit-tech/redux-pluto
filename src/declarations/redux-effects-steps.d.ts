declare module "redux-effects-steps" {
  type ActionOrCreator<A extends object | Function> = A;

  type ReturnAction = {
    type: string;
    payload: any;
    meta: any;
  };

  function steps<Origin = any>(
    origin: Origin | Origin[],
    ...rest: Array<
      [ActionOrCreator<any>, ActionOrCreator<any>] | ActionOrCreator<any>
    >
  ): ReturnAction;
}
