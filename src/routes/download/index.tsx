import { DownloadStatus } from "@/components/downloadsList/downloadStatus";
import { DownloadTabs } from "@/components/downloadsList/downloadTabs";
import { CardRootProps } from "@/components/primitives/card.props";
import { TabsItemProps } from "@/components/primitives/tabs.props";
import { localDB } from "@/lib/db/localDB";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/download/")({
  component: Download,
  loader: async () => {
    const status =
      ((await localDB.getItem("statuses")) as CardRootProps[]) || [];
    const tabs =
      ((await localDB.getItem("downloadTabs")) as TabsItemProps[]) || [];
    return {
      status,
      tabs,
    };
  },
});

function Download() {
  const { status, tabs } = Route.useLoaderData();
  const updateStorage = (_status: CardRootProps[]) => {
    const res = _status.map((item) => {
      return {
        ...item,
        icon: {
          ...item.icon,
          element: undefined,
        },
      };
    });

    localDB.setItem("statuses", res);
  };
  return (
    <div>
      <DownloadStatus onUpdateStatus={updateStorage} status={status} />
      <div className="my-4" />

      <DownloadTabs tabs={tabs} />
      <div className="my-4" />
    </div>
  );
}
