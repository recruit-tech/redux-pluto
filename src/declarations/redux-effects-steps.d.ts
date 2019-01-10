declare module "redux-effects-steps" {
  type ResolvedType<T> = T extends Promise<infer R> ? R : T;
  type PromisableType<T> = T | Promise<T>;

  // array 1
  function steps<A = any>(
    array: [PromisableType<A>],
  ): Promise<A> | Promise<any>;

  // array 2
  function steps<A = any, B = any>(
    array: [PromisableType<A>, PromisableType<B>],
  ): Promise<B> | Promise<any>;

  // array 2
  function steps<A = any, B = any, C = any>(
    array: [PromisableType<A>, PromisableType<B>, PromisableType<C>],
  ): Promise<C> | Promise<any>;

  // no-step
  function steps<S, F, A = any>(
    s0: PromisableType<A>,
    end: [
      (a: ResolvedType<A>) => PromisableType<S>,
      (err: any) => PromisableType<F>
    ],
  ): Promise<S> | Promise<F>;

  // s1
  function steps<S, F, A = any, B = any>(
    s0: PromisableType<A>,
    s1: (a: ResolvedType<A>) => PromisableType<B>,
    end: [
      (b: ResolvedType<B>) => PromisableType<S>,
      (err: any) => PromisableType<F>
    ],
  ): Promise<S> | Promise<F>;

  // s2
  function steps<S, F, A = any, B = any, C = any>(
    s0: PromisableType<A>,
    s1: (a: ResolvedType<A>) => PromisableType<B>,
    s2: (b: ResolvedType<B>) => PromisableType<C>,
    end: [
      (c: ResolvedType<C>) => PromisableType<S>,
      (err: any) => PromisableType<F>
    ],
  ): Promise<S> | Promise<F>;

  // s3
  function steps<S, F, A = any, B = any, C = any, D = any>(
    s0: PromisableType<A>,
    s1: (a: ResolvedType<A>) => PromisableType<B>,
    s2: (b: ResolvedType<B>) => PromisableType<C>,
    s3: (c: ResolvedType<C>) => PromisableType<D>,
    end: [
      (d: ResolvedType<D>) => PromisableType<S>,
      (err: any) => PromisableType<F>
    ],
  ): Promise<S> | Promise<F>;

  // s4
  function steps<S, F, A = any, B = any, C = any, D = any, E = any>(
    s0: PromisableType<A>,
    s1: (a: ResolvedType<A>) => PromisableType<B>,
    s2: (b: ResolvedType<B>) => PromisableType<C>,
    s3: (c: ResolvedType<C>) => PromisableType<D>,
    s4: (d: ResolvedType<D>) => PromisableType<E>,
    end: [
      (e: ResolvedType<E>) => PromisableType<S>,
      (err: Error) => PromisableType<F>
    ],
  ): Promise<S> | Promise<F>;

  // s5
  function steps<S, Fail, A = any, B = any, C = any, D = any, E = any, F = any>(
    s0: PromisableType<A>,
    s1: (a: ResolvedType<A>) => PromisableType<B>,
    s2: (b: ResolvedType<B>) => PromisableType<C>,
    s3: (c: ResolvedType<C>) => PromisableType<D>,
    s4: (d: ResolvedType<D>) => PromisableType<E>,
    s5: (e: ResolvedType<E>) => PromisableType<F>,
    end: [
      (f: ResolvedType<F>) => PromisableType<S>,
      (err: Error) => PromisableType<Fail>
    ],
  ): Promise<S> | Promise<Fail>;

  // s6
  function steps<
    S,
    Fail,
    A = any,
    B = any,
    C = any,
    D = any,
    E = any,
    F = any,
    G = any
  >(
    s0: PromisableType<A>,
    s1: (a: ResolvedType<A>) => PromisableType<B>,
    s2: (b: ResolvedType<B>) => PromisableType<C>,
    s3: (c: ResolvedType<C>) => PromisableType<D>,
    s4: (d: ResolvedType<D>) => PromisableType<E>,
    s5: (e: ResolvedType<E>) => PromisableType<F>,
    s6: (e: ResolvedType<F>) => PromisableType<G>,
    end: [
      (g: ResolvedType<G>) => PromisableType<S>,
      (err: Error) => PromisableType<Fail>
    ],
  ): Promise<S> | Promise<Fail>;

  // step over 7
  function steps<
    S,
    Fail,
    A = any,
    B = any,
    C = any,
    D = any,
    E = any,
    F = any,
    G = any,
    Rest = any
  >(
    s0: PromisableType<A>,
    s1: (a: ResolvedType<A>) => PromisableType<B>,
    s2: (b: ResolvedType<B>) => PromisableType<C>,
    s3: (c: ResolvedType<C>) => PromisableType<D>,
    s4: (d: ResolvedType<D>) => PromisableType<E>,
    s5: (e: ResolvedType<E>) => PromisableType<F>,
    s6: (e: ResolvedType<F>) => PromisableType<G>,
    ...args: any
  ): Promise<S> | Promise<Fail>;
}
