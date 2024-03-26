import Animation from "@/components/primitives/animation";
import { LoadIconBuyName } from "@/lib/loadIcons";
import { IconProps } from "@/types/global";
import { cloneElement, ReactNode, useEffect, useState } from "react";
export function IconDisplay({
  icon,
  showLoading = true,
}: {
  showLoading?: boolean;
} & IconProps) {
  const [iconComponent, setIconComponent] = useState<ReactNode>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Function to load the icon
  const loadIcon = async () => {
    if (icon.element && icon.element.type.name != "IconDisplay") {
      const element = cloneElement(icon.element, {
        ...icon.setting,
      });
      setIconComponent(element);
      setIsLoading(false);
      return;
    }
    try {
      const _iconComponent = await LoadIconBuyName(icon.name, icon.setting);
      setIconComponent(_iconComponent);
      setIsLoading(false);
    } catch (error) {
      console.error("Error loading icon:", error);
      setIsLoading(false);
    }
  };

  // Call loadIcon when iconName changes
  useEffect(() => {
    setIsLoading(true); // Set loading state to true when starting to load new icon
    loadIcon();
  }, [icon]);

  if (isLoading) {
    if (showLoading) return <Animation.Skeleton height={16} width={16} />;
    return icon.name;
  }

  return <div>{iconComponent}</div>;
}
