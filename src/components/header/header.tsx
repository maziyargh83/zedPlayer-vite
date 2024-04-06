import { Profile } from "@/components/header/profile";
import { Search } from "@/components/header/search";
import { useAria2Connection } from "@/lib/aria2/Aria2";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { FiDownloadCloud, FiLink2 } from "react-icons/fi";
export const Header = () => {
  const isConnected = useAria2Connection();

  return (
    <div className="p-4 flex items-center">
      <div className="flex-1 flex space-x-1 items-center">
        <h1 className="font-black">ZED CLOUD</h1>
        <FiLink2 />
      </div>
      <div className="flex-1">
        <Search />
      </div>
      <div className="flex-1 justify-end flex items-center">
        <div className="relative">
          <div
            className={cn(
              "absolute -top-1 -left-1 w-2 h-2 rounded-full bg-green-500",
              {
                "bg-red-500": !isConnected,
              }
            )}
          />
          <Link to={"/download"}>
            <FiDownloadCloud />
          </Link>
        </div>
        <Profile />
      </div>
    </div>
  );
};
