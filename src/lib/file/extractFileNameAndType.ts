import {
  archive,
  document,
  execute,
  file,
  image,
  music,
  video,
} from "./fileTypes";
export function extractFileNameAndType(url: string) {
  const segments: string[] = url.replace(/https?:\/\//, "").split("/");

  const lastSegment: string = segments[segments.length - 1];

  const fileNameParts: string[] = lastSegment.split(".");

  const fileName: string = fileNameParts[0];

  const fileType = segments.length == 1 ? null : fileNameParts.pop();

  return { fileName, fileType: convertTypeToIcon(fileType || "unknown") };
}

export type fileType =
  | "video"
  | "image"
  | "document"
  | "music"
  | "file"
  | "execute"
  | "archive"
  | "unknown";

export const convertTypeToIcon = (type: string): fileType => {
  switch (true) {
    case video.includes(type.toUpperCase()):
      return "video";
    case image.includes(type.toUpperCase()):
      return "image";
    case document.includes(type.toUpperCase()):
      return "document";
    case music.includes(type.toUpperCase()):
      return "music";
    case file.includes(type.toUpperCase()):
      return "file";
    case execute.includes(type.toUpperCase()):
      return "execute";
    case archive.includes(type.toUpperCase()):
      return "archive";

    default:
      return "unknown";
  }
};
