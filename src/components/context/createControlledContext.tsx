import * as React from "react";

function createControlledContext<ContextValueType extends object>(
  defaultContext: ContextValueType
) {
  const Context = React.createContext<ContextValueType>(defaultContext);

  function Provider(props: ContextValueType & { children: React.ReactNode }) {
    const { children, ...context } = props;
    const value = React.useMemo(
      () => context,
      Object.values(context)
    ) as ContextValueType;

    return (
      <Context.Provider value={value as ContextValueType}>
        {children}
      </Context.Provider>
    );
  }

  function useContext() {
    const data = React.useContext(Context);
    return data as ContextValueType;
  }

  return [Provider, useContext] as const;
}

export { createControlledContext };
