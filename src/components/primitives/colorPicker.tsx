import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { localDB } from "@/lib/db/localDB";
import { cn } from "@/lib/utils";
import { PropsWithClassName } from "@/types/global";
import { PropsWithChildren } from "react";
import { DefaultColors } from "tailwindcss/types/generated/colors";

const colors = (await localDB.getItem("colors")) as DefaultColors;
type colorKeys = keyof typeof colors;
const colorKeys = Object.keys(colors) as colorKeys[];
export const ColorPicker = ({ className }: PropsWithClassName) => {
  return (
    <ColorPalettePopOver>
      <div className={cn("w-36 h-12 bg-gray-100 p-2 rounded-lg", className)}>
        <div className="border rounded w-full h-full"></div>
      </div>
    </ColorPalettePopOver>
  );
};
export const ColorPalettePopOver = ({ children }: PropsWithChildren) => {
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent align="center">
        <ColorPaletteWrapper />
      </PopoverContent>
    </Popover>
  );
};
const ColorPaletteWrapper = () => {
  return (
    <div className="h-80 overflow-auto">
      {colorKeys.map((color) => (
        <div>
          <p className="font-bold text-xs my-2">{color}</p>
          <ColorPalette colorKey={color} />
        </div>
      ))}
    </div>
  );
};
const ColorPalette = ({ colorKey }: { colorKey: colorKeys }) => {
  const color = colors[colorKey];
  return (
    <div className="flex">
      {Object.keys(color).map((key) => (
        <ColorBlock color={color[key]} />
      ))}
    </div>
  );
};

const ColorBlock = ({ color }: { color: string }) => {
  return (
    <div
      className={cn("w-8 h-8", {})}
      style={{
        backgroundColor: color,
      }}
    />
  );
};
