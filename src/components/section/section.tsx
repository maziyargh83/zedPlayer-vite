import { Button } from "@/components/ui/button";
import { PropsWithChildren } from "react";
import { FiChevronRight } from "react-icons/fi";

interface Section {
  title: string;
  showmore: boolean;
  link?: string;
}
export const Section = ({
  title,
  showmore,
  children,
}: PropsWithChildren<Section>) => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-2xl">{title}</h1>
        {showmore && (
          <Button variant={"ghost"}>
            Show More
            <FiChevronRight />
          </Button>
        )}
      </div>
      {children}
    </div>
  );
};
