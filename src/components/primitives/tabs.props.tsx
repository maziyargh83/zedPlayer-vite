import { PropsWithClassName } from "@/types/global";

export interface TabsProps {
  className?: string;
  editable?: boolean;
  activeTab?: string;
}
export type TabsRootProps = Pick<TabsProps, "editable" | "activeTab"> &
  PropsWithClassName & {
    onChange?: (data: Partial<TabsProps>) => void;
  };

export interface TabsItemProps {
  className?: string;
  title: string;
  icon?: React.ReactNode;
  theme?: string;
  iconName: string;
  name: string;
  id: string;
}
