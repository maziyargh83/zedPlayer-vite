import { createContext } from "@/components/context/context";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { localDB } from "@/lib/db/localDB";
import { cn } from "@/lib/utils";
import { PropsWithClassName } from "@/types/global";
import { PopoverClose } from "@radix-ui/react-popover";
import { PropsWithChildren } from "react";
import { DefaultColors } from "tailwindcss/types/generated/colors";

const colors = ((await localDB.getItem("colors")) as DefaultColors) || {};
type colorKeys = keyof typeof colors;
const colorKeys = Object.keys(colors) as colorKeys[];
type onSelectColor = { onSelectColor?: (color: string) => void };

const [ColorProvider, useColorContext] = createContext<onSelectColor>({
  onSelectColor() {},
});

export const ColorPicker = ({
  className,
  currentColor = "#000",
  onSelectColor = () => {},
}: PropsWithClassName<
  onSelectColor & {
    currentColor?: string;
  }
>) => {
  return (
    <ColorProvider onSelectColor={onSelectColor}>
      <ColorPalettePopOver>
        <div className={cn("w-24 h-8 bg-gray-100 p-2 rounded-lg", className)}>
          <div
            className="border rounded w-full h-full"
            style={{
              background: currentColor,
            }}
          />
        </div>
      </ColorPalettePopOver>
    </ColorProvider>
  );
};
export const ColorPalettePopOver = ({ children }: PropsWithChildren) => {
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-[300px]" align="center">
        <ColorPaletteWrapper />
      </PopoverContent>
    </Popover>
  );
};
const ColorPaletteWrapper = () => {
  return (
    <div className="h-96 overflow-y-auto">
      <p className="font-bold text-sm pb-3 border-b">Select Color</p>
      <TooltipProvider>
        {colorKeys.map((color) => (
          <div>
            <p className="font-bold text-xs my-2">{color}</p>
            <div className="flex items-center">
              <ColorPalette colorKey={color} />
            </div>
          </div>
        ))}
      </TooltipProvider>
    </div>
  );
};
const ColorPalette = ({ colorKey }: { colorKey: colorKeys }) => {
  const color = colors[colorKey] as { [key: string]: string };
  return (
    <div className="flex">
      {Object.keys(color).map((key) => (
        <ColorBlock color={color[key]} />
      ))}
    </div>
  );
};

const ColorBlock = ({ color }: { color: string }) => {
  const [{ onSelectColor }] = useColorContext();
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <PopoverClose>
          <div
            onClick={() => onSelectColor?.(color)}
            className={cn("w-6 h-6", {})}
            style={{
              backgroundColor: color,
            }}
          />
        </PopoverClose>
      </TooltipTrigger>
      <TooltipContent>
        <p>{color}</p>
      </TooltipContent>
    </Tooltip>
  );
};
