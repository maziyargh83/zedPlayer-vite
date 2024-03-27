import { DownloadTable } from "@/components/downloadsList/table/downloadTable";
import Animation from "@/components/primitives/animation";
import { useStoppedStatus } from "@/hooks/api/useListStatus";

export const StoppedStatusList = () => {
  const { data, isLoading } = useStoppedStatus();
  if (!data || isLoading) return <Animation.Spinner />;
  return <DownloadTable data={data} />;
};
