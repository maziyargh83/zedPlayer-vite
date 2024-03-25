import { createControlledContext } from "@/components/context/createControlledContext";
import { IconPickerModal } from "@/components/primitives/iconPicker";
import {
  TabsItemProps,
  TabsRootProps,
} from "@/components/primitives/tabs.props";
import { Button } from "@/components/ui/button";
import { useControllableState } from "@/hooks/useControllableState";
import { cn } from "@/lib/utils";
import { PropsWithChildren, useEffect } from "react";

interface TabsContextType {
  editable?: boolean;
  activeTab?: string;
  theme?: string;
}
type onUpdate = { onUpdate?: (d: Partial<TabsContextType>) => void };
const cardDefaultContext: TabsContextType & onUpdate = {
  editable: true,
  activeTab: undefined,
};

const [TabsContext, useTabsContext] = createControlledContext<
  TabsContextType & onUpdate
>(cardDefaultContext);

const TabsRoot = ({
  className,
  children,
  editable = true,
  onChange,
  activeTab,
}: PropsWithChildren<TabsRootProps>) => {
  const [props, setProps] = useControllableState<TabsContextType>({
    prop: {
      editable,
      activeTab,
      theme: "bg-gray-100",
    },
    onChange: (data) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { ...rest } = data;
      onChange?.({ ...rest });
    },
  });

  return (
    <TabsContext
      {...props!}
      onUpdate={(d) => {
        const data: TabsContextType = { ...props, ...d };
        setProps(data);
      }}
    >
      <div className={cn("w-full rounded-xl p-[3px]", className, props.theme)}>
        {children}
      </div>
    </TabsContext>
  );
};
const TabsContent = ({
  children,
  name,
}: PropsWithChildren & {
  name: string;
}) => {
  const { activeTab } = useTabsContext();
  const isSelected = activeTab === name;
  if (!isSelected) return null;
  return (
    <div className="w-full rounded-xl rounded-tr-none bg-white h-[200px]">
      {children}
    </div>
  );
};
const TabList = ({
  children,
  lastItem,
}: PropsWithChildren & {
  lastItem?: JSX.Element;
}) => {
  const { theme } = useTabsContext();

  return (
    <div
      className={cn(
        "w-full flex items-center h-16 relative overflow-hidden select-none  rounded-t-xl bg-white"
      )}
    >
      <div
        className={cn(
          "flex h-full flex-[2] items-center rounded-br-xl space-x-2  pr-2",
          theme
        )}
      >
        {children}
      </div>
      <div
        className={cn(
          "h-full flex transition-all self-stretch items-center duration-300 ",
          theme
        )}
      >
        <div className="flex-1 h-full flex  pt-2 bg-white rounded-t-xl">
          {lastItem}
        </div>
      </div>
    </div>
  );
};
const TabItem = ({
  className,
  icon,
  title,
  theme,
  name,
  children,
  ...props
}: PropsWithChildren<TabsItemProps>) => {
  const { activeTab, onUpdate } = useTabsContext();
  const isSelected = activeTab === name;
  const changeTap = () => {
    onUpdate?.({ activeTab: name, theme });
  };
  useEffect(() => {
    if (isSelected) {
      onUpdate?.({ theme });
    }
  }, []);
  // if (isSelected) return null;
  return (
    <div onClick={changeTap} {...props}>
      <div
        className={cn(
          "py-2 px-2 rounded-xl flex items-center select-none relative",
          className,
          {
            "rounded-sm bg-opacity-70": !isSelected,
            "bg-white": isSelected,
          }
        )}
      >
        <IconPickerModal
          icon={icon!}
          onSelect={({ icon }) => console.log(icon)}
        >
          <Button variant={"ghost"} className="p-4 h-4">
            {icon?.element}
          </Button>
        </IconPickerModal>
        <p className={cn("text-base mx-3 font-bold")}>{title}</p>
        {children}
      </div>
    </div>
  );
};
export default {
  Root: TabsRoot,
  Content: TabsContent,
  List: TabList,
  Item: TabItem,
};
