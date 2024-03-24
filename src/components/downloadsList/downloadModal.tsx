import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { aria2Client } from "@/lib/aria2/Aria2";
import { PropsWithChildren, useState } from "react";

export const DownloadModal = ({ children }: PropsWithChildren) => {
  const [urls, setUrls] = useState<string>();
  const onAdduri = async () => {
    const links = urls?.split("\n") || [];
    const res = await aria2Client.addUri(links, {});
  };
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Paste Download Link</DialogTitle>
        </DialogHeader>
        <Textarea onChange={(e) => setUrls(e.target.value)} />
        <Button onClick={onAdduri} className="w-full text-center mt-2">
          Add
        </Button>
      </DialogContent>
    </Dialog>
  );
};
