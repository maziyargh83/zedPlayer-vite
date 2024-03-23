import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu } from "./menu";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { FiChevronDown } from "react-icons/fi";
export const Profile = () => {
  return (
    <Menu>
      <div
        className={cn(
          "flex items-center space-x-3",
          buttonVariants({
            variant: "ghost",
          })
        )}
      >
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <p className="font-bold text-sm">Maziyar gholami</p>
        <FiChevronDown />
      </div>
    </Menu>
  );
};
