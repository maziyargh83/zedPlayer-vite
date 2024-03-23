import { useCallbackRef } from "@/hooks/useCallbackRef";
import * as React from "react";

type UseControllableStateParams<T> = {
  prop: T;
  // defaultProp?: T | undefined;
  onChange?: (state: T) => void;
};

type SetStateFn<T> = (prevState?: T) => T;

function useControllableState<T>({
  prop,
  onChange = () => {},
}: UseControllableStateParams<T>) {
  const [data, setData] = React.useState<T>(prop);

  const handleChange = useCallbackRef(onChange);

  const setValue: React.Dispatch<React.SetStateAction<T | undefined>> =
    React.useCallback(
      (nextValue) => {
        const setter = nextValue as SetStateFn<T>;
        const value =
          typeof nextValue === "function" ? setter(prop) : nextValue;
        if (value !== prop) handleChange(value as T);
        if (value) setData(value as T);
      },
      [prop, setData, handleChange]
    );

  return [data, setValue] as const;
}

// function useUncontrolledState<T>({
//   defaultProp,
//   onChange,
// }: Omit<UseControllableStateParams<T>, "prop">) {
//   const uncontrolledState = React.useState<T | undefined>(defaultProp);
//   const [value] = uncontrolledState;
//   const prevValueRef = React.useRef(value);
//   const handleChange = useCallbackRef(onChange);

//   React.useEffect(() => {
//     if (prevValueRef.current !== value) {
//       handleChange(value as T);
//       prevValueRef.current = value;
//     }
//   }, [value, prevValueRef, handleChange]);

//   return uncontrolledState;
// }

export { useControllableState };
