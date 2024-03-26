import { FunctionComponent } from "react";

export type PropsWithClassName = {
  className?: string;
};
export type PropsWithFunctionalProps<T, E = unknown> = T | FunctionComponent<E>;

export interface IconProps {
  icon: {
    element?: JSX.Element;
    name: string;
    setting?: {
      size?: number;
      color?: string;
    };
  };
}
