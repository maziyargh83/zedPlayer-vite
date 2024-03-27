import { aria2Client } from "@/lib/aria2/Aria2";
import { useQuery } from "react-query";

export const useStoppedStatus = () => {
  return useQuery(
    "stopped",
    async () => await aria2Client.tellStopped(0, 1000),
    {
      refetchInterval: 10000,
      refetchOnWindowFocus: false,
    }
  );
};
export const useStatusGid = (gid: string) => {
  return useQuery(
    ["status", gid],
    async () => await aria2Client.tellStatus(gid)
  );
};
