import { FunctionComponent } from "react";
import { IconBaseProps } from "react-icons";

export type PropsWithClassName = {
  className?: string;
};
export type PropsWithFunctionalProps<T, E = unknown> = T | FunctionComponent<E>;

export interface IconProps {
  icon: {
    element?: JSX.Element;
    name: string;
    setting?: IconBaseProps;
  };
}
