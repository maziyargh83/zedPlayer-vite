import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { aria2Client } from "@/lib/aria2/Aria2";
import { validateUrl } from "@/lib/url";
import clsx from "clsx";
import { Fragment, PropsWithChildren, useMemo, useState } from "react";

export const DownloadModal = ({ children }: PropsWithChildren) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Paste Download Link</DialogTitle>
        </DialogHeader>
        <DownloadModalContent />
      </DialogContent>
    </Dialog>
  );
};
export const DownloadModalContent = () => {
  const [urls, setUrls] = useState<string>();
  const [advance, setAdvance] = useState<boolean>(false);
  const onAdduri = async () => {
    const links = urls?.split("\n") || [];
    const res = await aria2Client.addUri(links, {
      dir: ".aria2/image/",
    });
  };
  const isValid = useMemo(() => {
    const links = urls?.split("\n");
    if (!links) return false;
    const valid = links.every((link) => {
      const containsPattern = link.includes("{{$}}");
      return validateUrl(link.trim());
    });

    return valid;
  }, [urls, advance]);

  return (
    <Fragment>
      <Textarea
        onChange={(e) => setUrls(e.target.value)}
        placeholder="https://google.com"
      />
      <div className="flex items-center space-x-2 my-2">
        <Label htmlFor="airplane-mode">Advance</Label>
        <Switch
          id="airplane-mode"
          checked={advance}
          onCheckedChange={setAdvance}
        />
      </div>
      {advance && <DownloadModalContentAdvance />}
      <Button
        onClick={onAdduri}
        className={clsx("w-full text-center mt-2")}
        disabled={!isValid}
      >
        Add
      </Button>
    </Fragment>
  );
};

export const DownloadModalContentAdvance = () => {
  return (
    <div className="flex space-x-2">
      <div className="flex-1">
        <Label>from</Label>
        <Input type="number" defaultValue={0} max={10} min={0} />
      </div>

      <div className="flex-1">
        <Label>to</Label>
        <Input type="number" defaultValue={1} max={10} min={1} />
      </div>
    </div>
  );
};
