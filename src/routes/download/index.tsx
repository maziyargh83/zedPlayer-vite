import { DownloadStatus } from "@/components/downloadsList/downloadStatus";
import { CardRootProps } from "@/components/primitives/card.props";
import { localDB } from "@/lib/db/localDB";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/download/")({
  component: Download,
  loader: async () => {
    return (await localDB.getItem("statuses")) as CardRootProps[];
  },
});

function Download() {
  const data = Route.useLoaderData();
  const updateStorage = (status: CardRootProps[]) => {
    localDB.setItem("statuses", status);
  };
  return (
    <div>
      <DownloadStatus onUpdateStatus={updateStorage} status={data} />
    </div>
  );
}
