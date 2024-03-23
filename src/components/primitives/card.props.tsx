import { PropsWithClassName, PropsWithFunctionalProps } from "@/types/global";

export interface CardProps {
  className?: string;
  title: string;
  icon: React.ReactNode | string;
  theme?: string;
  editable?: boolean;
}
export type CardRootProps = Pick<
  CardProps,
  "theme" | "title" | "icon" | "editable"
> &
  PropsWithClassName;
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
