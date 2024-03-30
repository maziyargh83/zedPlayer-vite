import { IAria2DownloadStatus } from "@/lib/libaria2/src/adapter";
import { atom } from "jotai";

export const statusTabs = atom(new Map<string, IAria2DownloadStatus>());
