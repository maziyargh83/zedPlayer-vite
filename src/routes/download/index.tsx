import { DownloadList } from "@/components/downloadsList/downloadList";
import { DownloadStatus } from "@/components/downloadsList/downloadStatus";
import { CardRootProps } from "@/components/primitives/card.props";
import { localDB } from "@/lib/db/localDB";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/download/")({
  component: Download,
  loader: async () => {
    return ((await localDB.getItem("statuses")) as CardRootProps[]) || [];
  },
});

function Download() {
  const data = Route.useLoaderData();
  const updateStorage = (status: CardRootProps[]) => {
    const res = status.map((item) => {
      return {
        ...item,
        icon: item.iconName,
      };
    });
    Route.updateLoader({
      loader: async () => {
        return ((await localDB.getItem("statuses")) as CardRootProps[]) || [];
      },
    });
    localDB.setItem("statuses", res);
  };
  return (
    <div>
      <DownloadStatus onUpdateStatus={updateStorage} status={data} />
      <DownloadList />
    </div>
  );
}
