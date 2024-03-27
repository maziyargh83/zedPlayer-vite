import { FunctionComponent } from "react";

export type PropsWithClassName<P = unknown> = P & {
  className?: string | undefined;
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
