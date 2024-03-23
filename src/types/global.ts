import { FunctionComponent } from "react";

export type PropsWithClassName = {
  className?: string;
};
export type PropsWithFunctionalProps<T, E = unknown> = T | FunctionComponent<E>;
