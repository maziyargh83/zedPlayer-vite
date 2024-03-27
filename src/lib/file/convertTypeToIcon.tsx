import { fileType } from "@/lib/file/extractFileNameAndType";
import { IconBaseProps } from "react-icons";
import { BsFiletypeExe } from "react-icons/bs";
import { FiVideo, FiImage, FiMusic, FiFile } from "react-icons/fi";
import { GoFileZip } from "react-icons/go";
import { IoDocumentAttachOutline } from "react-icons/io5";
import { TbFileUnknown } from "react-icons/tb";
const iconProps: IconBaseProps = {
  size: 24,
};
export const convertTypeToIcon = (type: fileType) => {
  switch (type) {
    case "video":
      return <FiVideo {...iconProps} />;
    case "image":
      return <FiImage {...iconProps} />;
    case "document":
      return <IoDocumentAttachOutline {...iconProps} />;
    case "music":
      return <FiMusic {...iconProps} />;
    case "file":
      return <FiFile {...iconProps} />;
    case "execute":
      return <BsFiletypeExe {...iconProps} />;
    case "archive":
      return <GoFileZip {...iconProps} />;
    default:
      return <TbFileUnknown {...iconProps} />;
  }
};
