import { iconFileType, loadIconFiles } from "@/lib/loadIcons";
import {
  cloneElement,
  PropsWithChildren,
  useEffect,
  useMemo,
  useState,
} from "react";
import { IconsManifest } from "react-icons";
import { useDebounce } from "@uidotdev/usehooks";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";

export const IconPicker = ({
  children,
  onSelect,
}: PropsWithChildren<{
  onSelect?: (icon: React.ReactNode) => void;
}>) => {
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
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent side="left" align="start" className="">
        <p className="text-base font-semibold py-2">Change Icon</p>
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
                  <Button
                    key={icon}
                    onClick={() => onSelect?.(ic)}
                    variant={"ghost"}
                    title={icon}
                  >
                    {ic}
                  </Button>
                );
              })}
          </div>
        </Tabs>
      </PopoverContent>
    </Popover>
  );
};
