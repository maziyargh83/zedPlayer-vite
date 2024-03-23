import {
  DragControllerProps,
  DragHandleProps,
  isHover,
} from "@/components/primitives/dragHandle.props";
import { useDragControls } from "framer-motion";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
const DragHandle = ({ controls }: DragHandleProps & isHover) => {
  return (
    <motion.div
      className="absolute left-[50%] -translate-x-[50%] w-16 h-16 flex items-start justify-center"
      initial={{
        top: -20,
        opacity: 0,
      }}
      animate={{
        top: 0,
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
export default {
  Handle: DragHandle,
  Root: DragController,
};
