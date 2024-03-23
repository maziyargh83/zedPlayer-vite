import * as React from "react";
function reducer<T extends object>(state: T, payload: Partial<T>) {
  return {
    ...state,
    ...payload,
  } as T;
}
function createContext<ContextValueType extends object>(
  defaultContext: ContextValueType
) {
  const Context = React.createContext<
    [ContextValueType, React.Dispatch<ContextValueType> | undefined]
  >([defaultContext, undefined]);

  function Provider(props: ContextValueType & { children: React.ReactNode }) {
    const { children, ...context } = props;
    const [value, setValue] = React.useReducer(
      reducer<ContextValueType>,
      context as ContextValueType
    );

    return (
      <Context.Provider value={[value, setValue]}>{children}</Context.Provider>
    );
  }

  function useContext() {
    const [data, setData] = React.useContext(Context);
    return [data, setData!] as [
      ContextValueType,
      React.Dispatch<Partial<ContextValueType>>,
    ];
    // if (defaultContext !== undefined) return defaultContext;
  }

  return [Provider, useContext] as const;
}

export { createContext };
