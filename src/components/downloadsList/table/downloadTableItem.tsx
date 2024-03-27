import { formatSize } from "@/lib/file/converFileSize";
import { convertTypeToIcon } from "@/lib/file/convertTypeToIcon";
import { extractFileNameAndType } from "@/lib/file/extractFileNameAndType";
import { IAria2DownloadStatus } from "@/lib/libaria2/src/adapter";
import { shortString } from "@/lib/string";

export const DownloadTableItem = ({ file }: { file: string }) => {
  const { fileName, fileType } = extractFileNameAndType(file);
  return (
    <div className="flex items-center flex-1">
      <div className="mr-3">{convertTypeToIcon(fileType)}</div>
      <div>
        <p className="text-sm font-bold">{shortString(fileName)}</p>
        <p className="text-xs font-light">{fileType}</p>
      </div>
    </div>
  );
};

export const DownloadFileSize = ({ data }: { data: IAria2DownloadStatus }) => {
  return <p>{formatSize(Number(data.completedLength))}</p>;
};
