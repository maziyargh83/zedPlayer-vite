import { DragControls } from "framer-motion";
import { PropsWithFunctionalProps } from "@/types/global";

export type DragControllerProps<T> = {
  children: PropsWithFunctionalProps<React.ReactNode, T>;
};

export type DragHandleProps = { controls: DragControls };
export type isHover = {
  isHover: boolean;
};

export type DragTriggerProps = {
  element: JSX.Element;
};
