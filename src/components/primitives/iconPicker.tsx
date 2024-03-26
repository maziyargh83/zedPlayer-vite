import { createIcon, iconFileType, loadIconFiles } from "@/lib/loadIcons";
import {
  cloneElement,
  PropsWithChildren,
  useEffect,
  useMemo,
  useState,
} from "react";
import { IconsManifest } from "react-icons";
import { useDebounce } from "@uidotdev/usehooks";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { PopoverClose } from "@radix-ui/react-popover";
import { IconDisplay } from "@/components/primitives/iconLoader";
import { IconProps } from "@/types/global";
import { ColorPicker } from "@/components/primitives/colorPicker";
type onSelect = {
  onSelect: (item: IconProps) => void;
};
export const IconPickerModal = ({
  children,
  onSelect,
  icon,
}: PropsWithChildren<onSelect & Pick<IconProps, "icon">>) => {
  const select = (item: IconProps) => {
    onSelect(item);
  };
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent side="left" align="start">
        <Tabs defaultValue="picker" className="w-full">
          <TabsList className="w-full flex">
            <TabsTrigger className="flex-1" value="picker">
              Icon Picker
            </TabsTrigger>
            <TabsTrigger className="flex-1" value="setting">
              Icon Setting
            </TabsTrigger>
          </TabsList>
          <TabsContent value="picker">
            <IconPicker onSelect={select} />
          </TabsContent>
          <TabsContent value="setting">
            <IconConfig icon={icon} />
          </TabsContent>
        </Tabs>
      </PopoverContent>
    </Popover>
  );
};

const IconPicker = ({ onSelect }: onSelect) => {
  const [selectedTab, setSelectedTab] = useState(IconsManifest[0].id);
  const [icons, setIcons] = useState<Awaited<iconFileType>>();
  const [text, setText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const debouncedSearchTerm = useDebounce(text, 300);

  useEffect(() => {
    async function loadIcon() {
      setLoading(true);
      const icon = await loadIconFiles(selectedTab);
      setIcons(icon);
      setLoading(false);
    }
    loadIcon();
  }, [selectedTab]);
  const filteredIcons = useMemo(() => {
    const pattern = `${debouncedSearchTerm}`;
    const regex = new RegExp(pattern, "i");
    if (!icons) return icons;
    return Object.keys(icons).filter((name) => {
      return regex.test(name);
    });
  }, [debouncedSearchTerm, icons]);
  return (
    <div>
      <Input
        className="w-full my-3 focus-within:ring-0 focus-within:outline-0"
        placeholder="Search Icon"
        onChange={(e) => setText(e.target.value)}
      />

      <Tabs value={selectedTab}>
        <div className="overflow-x-auto">
          <TabsList className="overflow-x-auto">
            {IconsManifest.map((item) => {
              return (
                <TabsTrigger
                  onClick={() => setSelectedTab(item.id)}
                  value={item.id}
                  key={item.id}
                >
                  {item.id}
                </TabsTrigger>
              );
            })}
          </TabsList>
        </div>
        <div className=" py-3 h-80  overflow-y-auto relative">
          {loading && (
            <div className="w-full h-full absolute bg-white/70 flex items-center justify-center">
              <p className="text-sm font-bold">loading...</p>
            </div>
          )}
          {filteredIcons &&
            filteredIcons?.map((icon) => {
              const ic = cloneElement(
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (icons as unknown as any)?.[icon]?.(),
                {}
              );
              return (
                <PopoverClose key={icon}>
                  <Button
                    onClick={() =>
                      onSelect?.({
                        icon: createIcon({
                          element: ic,
                          name: icon,
                        }),
                      })
                    }
                    variant={"ghost"}
                    title={icon}
                  >
                    {ic}
                  </Button>
                </PopoverClose>
              );
            })}
        </div>
      </Tabs>
    </div>
  );
};
const IconConfig = ({ icon }: IconProps) => {
  const [color, setColor] = useState(icon.setting?.color || "#000");

  const setting = { ...icon.setting, color };
  return (
    <div className="h-80  overflow-y-auto flex flex-col">
      <div className="w-full justify-center items-center flex border-b pb-3 mb-3">
        <IconDisplay
          icon={{
            ...icon,
            // element: undefined,
            setting,
          }}
        />
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="font-bold text-sm my-2">Color :</p>
          <ColorPicker currentColor={color} onSelectColor={setColor} />
        </div>
        <div className="flex items-center justify-between">
          <p className="font-bold text-sm my-2">Size :</p>
          <ColorPicker currentColor={icon.setting?.color} />
        </div>
      </div>
      <div className="flex-1" />
      <Button>Save</Button>
    </div>
  );
};
