import { Folder } from "@/components/folder/folder";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div>
      <Folder />
    </div>
  );
}
