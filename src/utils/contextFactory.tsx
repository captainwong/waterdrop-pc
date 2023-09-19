/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useMemo, useState } from 'react';
import { IPropsChildren } from './types';

interface IStore {
  key: string;
  store: Record<string, unknown>;
  setStore: (payload: Record<string, unknown>) => void;
}

const getCtxProvider =
  (
    key: string,
    defaultValue: Record<string, unknown>,
    appContext: React.Context<IStore>,
  ) =>
  ({ children }: IPropsChildren) => {
    const [store, setStore] = useState(defaultValue);
    const value = useMemo(
      () => ({
        key,
        store,
        setStore,
      }),
      [store],
    );

    return <appContext.Provider value={value}>{children}</appContext.Provider>;
  };

const ctxCache: Record<string, Ctx> = {};

class Ctx {
  defaultStore: IStore;

  appContext: React.Context<IStore>;

  provider: ({ children }: IPropsChildren) => JSX.Element;

  constructor(key: string, defaultValue: Record<string, unknown>) {
    this.defaultStore = {
      key,
      store: defaultValue,
      setStore: (payload: Record<string, unknown>) => {
        this.defaultStore.store = { ...this.defaultStore.store, ...payload };
      },
    };

    this.appContext = React.createContext(this.defaultStore);
    this.provider = getCtxProvider(key, defaultValue, this.appContext);

    ctxCache[key] = this;
  }
}

export function useAppContext(key: string) {
  const ctx = ctxCache[key];
  const app = useContext(ctx.appContext);
  return {
    store: app.store,
    setStore: app.setStore,
  };
}

export function connectFactory(
  key: string,
  defaultValue: Record<string, unknown>,
) {
  const ctx = ctxCache[key];
  let curCtx: Ctx;
  if (ctx) {
    curCtx = ctx;
  } else {
    curCtx = new Ctx(key, defaultValue);
  }

  return (Child: React.FC<any>) => (props: any) =>
    (
      <curCtx.provider>
        <Child {...props} />
      </curCtx.provider>
    );
}

export default Ctx;
