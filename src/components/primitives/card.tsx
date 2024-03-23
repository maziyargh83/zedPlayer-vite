import { Menu } from "@/components/header/menu";
import {
  CardHeaderFnProps,
  CardHeaderProps,
  CardRootProps,
} from "@/components/primitives/card.props";
import { IconPicker } from "@/components/primitives/iconPicker";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PropsWithClassName } from "@/types/global";
import { Fragment, PropsWithChildren, useMemo, useState } from "react";
import { FaCircleQuestion } from "react-icons/fa6";
import { FiCheck, FiMoreVertical, FiX } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { createContext } from "@/components/context/context";
interface CardContextType {
  isEdit: boolean;
  title: string;
  theme: string;
  icon: React.ReactNode;
  editable?: boolean;
}
const [CardContext, useCardContext] = createContext<CardContextType>({
  isEdit: false,
  title: "",
  theme: "bg-gray-100",
  icon: <Fragment />,
  editable: true,
});
const CardRoot = ({
  className,
  children,
  theme = "bg-gray-100",
  title,
  icon,
  editable = true,
}: PropsWithChildren<CardRootProps>) => {
  return (
    <CardContext
      editable={editable}
      isEdit={false}
      theme={theme}
      title={title}
      icon={icon}
    >
      <div className={cn(" w-64 rounded-xl p-[3px]", className, theme)}>
        {children}
      </div>
    </CardContext>
  );
};

const CardBody = ({
  className,
  children,
}: PropsWithChildren<PropsWithClassName>) => {
  return (
    <div
      className={cn(
        "bg-white min-h-[32px] rounded-xl rounded-tr-none p-2",
        className
      )}
    >
      {children}
    </div>
  );
};

const CardFooter = () => {
  return (
    <div className="flex items-center">
      <p className="text-xs font-normal mr-2">Last edited</p>
      <span className="text-xs font-thin">2 days ago</span>
      <div className="flex-1" />
      <FaCircleQuestion />
    </div>
  );
};

const CardHeder = ({ children }: CardHeaderProps<CardHeaderFnProps>) => {
  const [{ theme, icon, editable }] = useCardContext();
  const [data, setData] = useCardContext();
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
  return (
    <div
      className="flex bg-white relative overflow-hidden select-none"
      onMouseEnter={countForHover}
      onMouseLeave={timeoutClear}
    >
      <div
        className={cn(
          "flex-[2] py-1 flex items-center rounded-br-xl space-x-2  pr-2",
          theme
        )}
      >
        <div className="shrink-0" onClick={(e) => e.stopPropagation()}>
          {editable ? (
            <IconPicker onSelect={(ic) => setData({ icon: ic })}>
              <Button variant={"ghost"} className="p-2 h-4">
                {icon}
              </Button>
            </IconPicker>
          ) : (
            <Button variant={"ghost"} className="p-2 h-4">
              {icon}
            </Button>
          )}
        </div>
        {renderChildren}
      </div>

      <div
        className={cn(
          "h-full flex items-center transition-all duration-300",
          theme,
          {
            "flex-1": !data.isEdit,
          }
        )}
      >
        <Menu>
          <div className="flex-1 h-full flex items-center justify-end px-1 pt-2 bg-white rounded-t-xl">
            <FiMoreVertical />
          </div>
        </Menu>
      </div>
    </div>
  );
};

const CardTitle = () => {
  const [{ isEdit, title, theme, editable }, update] = useCardContext();
  const [newTitle, setNewTitle] = useState(title);
  const setIsEdit = (edit: boolean) => {
    update({ isEdit: edit });
  };
  const showEdit = () => {
    setIsEdit(true);
  };
  const onSubmit = () => {
    setIsEdit(false);

    update({
      title: newTitle,
    });
  };
  const close = () => {
    setIsEdit(false);
    setNewTitle(title);
  };
  return (
    <Fragment>
      <AnimatePresence mode="sync">
        {isEdit ? (
          <div className="flex flex-1 items-center space-x-2 duration-300 transition-all">
            <Input
              className={cn(
                "p-0 bg-transparent border-0 outline-none focus-visible:ring-0  rounded-none focus-visible:ring-offset-0 font-bold text-base h-auto m-0",
                theme
              )}
              value={newTitle}
              onChange={(d) => setNewTitle(d.target.value)}
            />
            <motion.div
              exit={{
                scale: 0,
              }}
              initial={{
                scale: 0,
              }}
              animate={{
                scale: 1,
              }}
            >
              <FiCheck className="text-green-900" onClick={onSubmit} />
            </motion.div>
            <motion.div
              exit={{
                scale: 0,
              }}
              initial={{
                scale: 0,
              }}
              animate={{
                scale: 1,
              }}
            >
              <FiX className="text-red-900" onClick={close} />
            </motion.div>
          </div>
        ) : (
          <motion.p
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="font-bold text-base"
            onDoubleClick={() => editable && showEdit()}
          >
            {title}
          </motion.p>
        )}
      </AnimatePresence>
    </Fragment>
  );
};
export default {
  Root: CardRoot,
  Header: CardHeder,
  Footer: CardFooter,
  Body: CardBody,
  Title: CardTitle,
};
