import { IAria2DownloadStatus } from "@/lib/libaria2/src/adapter";
import { statusTabs } from "@/store/statusTabs";
import { useAtom } from "jotai";

export const useStatusTabs = () => {
  const [tabs, setTabs] = useAtom(statusTabs);
  const addTab = (gid: string, data: IAria2DownloadStatus) => {
    const newMap = new Map(tabs);
    newMap.set(gid, data);
    setTabs(newMap);
  };
  return { tabs, addTab };
};
