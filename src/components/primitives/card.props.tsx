import {
  IconProps,
  PropsWithClassName,
  PropsWithFunctionalProps,
} from "@/types/global";

export interface CardProps {
  className?: string;
  title: string;
  icon?: IconProps["icon"];
  theme?: string;
  editable?: boolean;
  id: string;
}
export type CardRootProps = Pick<
  CardProps,
  "theme" | "title" | "icon" | "editable" | "id"
> &
  PropsWithClassName & {
    onChange?: (data: Partial<CardProps>) => void;
  };
export type CardHeaderTitleProps = Omit<CardProps, "icon"> &
  Pick<CardProps, "title"> & {
    isEdit: boolean;
    setIsEdit: (isEdit: boolean) => void;
  };

export type CardHeaderProps<T> = {
  children: PropsWithFunctionalProps<React.ReactNode, T>;
};
export type CardHeaderFnProps = {
  isHover: boolean;
};
