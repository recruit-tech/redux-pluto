export type FetchrService = {
  name: string;
  username?: string | null;
  read?: (req: any, resource: string, params: any, config: any, cb: any) => any;
  update?: (
    req: any,
    resource: string,
    params: any,
    body: any,
    config: any,
    cb: any,
  ) => void;
  create?: (
    req: any,
    resource: string,
    params: any,
    body: any,
    config: any,
    cb: any,
  ) => void;
  delete?: (
    req: any,
    resource: string,
    params: any,
    config: any,
    cb: any,
  ) => void;
};
export type FetchrStatic = {
  registerService(service: FetchrService): void;
};
