import { Profile } from "@/components/header/profile";
import { Search } from "@/components/header/search";
import { Link } from "@tanstack/react-router";
import { FiDownloadCloud, FiLink2 } from "react-icons/fi";
export const Header = () => {
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
        <Link to={"/download"}>
          <FiDownloadCloud />
        </Link>
        <Profile />
      </div>
    </div>
  );
};
