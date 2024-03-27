import {
  DragControllerProps,
  DragHandleProps,
  DragTriggerProps,
  isHover,
} from "@/components/primitives/dragHandle.props";
import { useDragControls } from "framer-motion";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { cloneElement, useMemo, useState } from "react";
import { PropsWithClassName } from "@/types/global";
const DragHandle = ({
  controls,
  top = 0,
}: PropsWithClassName<DragHandleProps & isHover & { top?: number }>) => {
  return (
    <motion.div
      className="absolute left-[50%] -translate-x-[50%] w-16 h-16 flex items-start justify-center"
      initial={{
        top: -20,
        opacity: 0,
      }}
      animate={{
        top: top,
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        top: -20,
      }}
      onPointerDown={(e) => controls.start(e)}
    >
      <div className={cn("w-6 h-1 bg-gray-300 rounded-full")} />
    </motion.div>
  );
};
const DragController = ({ children }: DragControllerProps<DragHandleProps>) => {
  const controls = useDragControls();

  if (typeof children === "function") return children({ controls });
  return children;
};
const DragTrigger = ({
  children,
  element,
}: DragTriggerProps & DragControllerProps<isHover>) => {
  const [isHover, setIsHover] = useState(false);
  const renderChildren = useMemo(() => {
    if (typeof children === "function") return children({ isHover });
    return children;
  }, [children, isHover]);
  let timer: ReturnType<typeof setTimeout>;
  const countForHover = () => {
    timer = setTimeout(() => {
      setIsHover(true);
    }, 1000);
  };
  const timeoutClear = () => {
    clearTimeout(timer);
    setIsHover(false);
  };

  const Element = cloneElement(element, {
    children: renderChildren,
    onMouseEnter: countForHover,
    onMouseLeave: timeoutClear,
  });

  return Element;
};
export default {
  Handle: DragHandle,
  Root: DragController,
  Trigger: DragTrigger,
};
