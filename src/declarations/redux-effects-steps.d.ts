declare module "redux-effects-steps" {
  type MaybePromise<T> = T | Promise<T>;

  // 1 step
  function steps<Success, Fail, A = any>(
    entry: MaybePromise<A>,
    end: [(a: A) => MaybePromise<Success>, (err: Error) => MaybePromise<Fail>],
  ): Promise<Success | Fail>;

  // 2 step
  function steps<Success, Fail, A = any, B = any>(
    entry: MaybePromise<A>,
    s1: (a: A) => B,
    end: [(r: A) => Success, (err: Error) => Fail],
  ): Promise<Success | Fail>;

  // 3 step
  function steps<Success, Fail, A = any, B = any, C = any>(
    entry: MaybePromise<A>,
    s1: (a: A) => B,
    s2: (a: B) => C,
    end: [(r: C) => Success, (err: Error) => Fail],
  ): Promise<Success | Fail>;

  // 4 step
  function steps<Success, Fail, A = any, B = any, C = any, D = any>(
    entry: MaybePromise<A>,
    s1: (a: A) => B,
    s2: (a: B) => C,
    s3: (a: C) => D,
    end: [(r: D) => Success, (err: Error) => Fail],
  ): Promise<Success | Fail>;

  // 5 step
  function steps<Success, Fail, A = any, B = any, C = any, D = any, E = any>(
    entry: MaybePromise<A>,
    s1: (a: A) => B,
    s2: (a: B) => C,
    s3: (a: C) => D,
    s4: (a: D) => E,
    end: [(r: E) => Success, (err: Error) => Fail],
  ): Promise<Success | Fail>;

  // 6 step
  function steps<
    Success,
    Fail,
    A = any,
    B = any,
    C = any,
    D = any,
    E = any,
    F = any
  >(
    entry: MaybePromise<A>,
    s1: (a: A) => B,
    s2: (a: B) => C,
    s3: (a: C) => D,
    s4: (a: D) => E,
    s5: (a: E) => F,
    end: [(r: F) => Success, (err: Error) => Fail],
  ): Promise<Success | Fail>;
}
