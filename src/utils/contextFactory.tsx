/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useMemo, useState } from 'react';
import { IPropsChildren } from './types';

interface IStore<T> {
  key: string;
  store: T;
  setStore: (payload: Partial<T>) => void;
}

function getCtxProvider<T>(
  key: string,
  defaultValue: T,
  AppContext: React.Context<IStore<T>>,
) {
  return ({ children }: IPropsChildren) => {
    const [store, setStore] = useState(defaultValue);
    const value = useMemo(
      () => ({
        key,
        store,
        setStore: (payload = {}) =>
          setStore((prev) => ({ ...prev, ...payload })),
      }),
      [store],
    );
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
  };
}

const ctxCache: Record<string, Ctx> = {};

class Ctx<T = any> {
  defaultStore: IStore<T>;

  AppContext: React.Context<IStore<T>>;

  Provider: ({ children }: IPropsChildren) => JSX.Element;

  constructor(key: string, defaultValue: T) {
    this.defaultStore = {
      key,
      store: defaultValue,
      setStore: () => {},
    };

    this.AppContext = React.createContext(this.defaultStore);
    this.Provider = getCtxProvider(key, defaultValue, this.AppContext);

    ctxCache[key] = this;
  }
}

export function useAppContext<T>(key: string) {
  const ctx = ctxCache[key] as Ctx<T>;
  const app = useContext(ctx.AppContext);
  return {
    store: app.store,
    setStore: app.setStore,
  };
}

export function connectFactory<T>(key: string, defaultValue: T) {
  const ctx = ctxCache[key];
  let CurCtx: Ctx<T>;
  if (ctx) {
    CurCtx = ctx;
  } else {
    CurCtx = new Ctx<T>(key, defaultValue);
  }

  return (Child: React.FC<any>) => (props: any) =>
    (
      <CurCtx.Provider>
        <Child {...props} />
      </CurCtx.Provider>
    );
}

export default Ctx;
