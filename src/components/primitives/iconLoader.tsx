import Animation from "@/components/primitives/animation";
import { LoadIconBuyName } from "@/lib/loadIcons";
import { ReactNode, useEffect, useState } from "react";

export function IconDisplay({
  icon,
  showLoading = true,
}: {
  icon: string | ReactNode;
  showLoading?: boolean;
}) {
  const [iconComponent, setIconComponent] = useState<ReactNode>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Function to load the icon
  const loadIcon = async () => {
    if (typeof icon !== "string") return;
    try {
      const _iconComponent = await LoadIconBuyName(icon);
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
    if (showLoading) return <Animation.Skeleton />;
    return icon;
  }

  return <div>{iconComponent}</div>;
}
