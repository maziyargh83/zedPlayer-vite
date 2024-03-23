import { FunctionComponent, ReactNode } from "react";
import { IconsManifest } from "react-icons";
export async function loadIconFiles(selectedTab: string) {
  switch (selectedTab) {
    case "ci":
      return await import("react-icons/ci");
    case "fa":
      return await import("react-icons/fa");
    case "fa6":
      return await import("react-icons/fa6");
    case "io":
      return await import("react-icons/io");
    case "io5":
      return await import("react-icons/io5");
    case "md":
      return await import("react-icons/md");
    case "ti":
      return await import("react-icons/ti");
    case "go":
      return await import("react-icons/go");
    case "fi":
      return await import("react-icons/fi");
    case "lu":
      return await import("react-icons/lu");
    case "gi":
      return await import("react-icons/gi");
    case "wi":
      return await import("react-icons/wi");
    case "di":
      return await import("react-icons/di");
    case "ai":
      return await import("react-icons/ai");
    case "bs":
      return await import("react-icons/bs");
    case "ri":
      return await import("react-icons/ri");
    case "fc":
      return await import("react-icons/fc");
    case "gr":
      return await import("react-icons/gr");
    case "hi":
      return await import("react-icons/hi");
    case "hi2":
      return await import("react-icons/hi2");
    case "si":
      return await import("react-icons/si");
    case "sl":
      return await import("react-icons/sl");
    case "im":
      return await import("react-icons/im");
    case "bi":
      return await import("react-icons/bi");
    case "cg":
      return await import("react-icons/cg");
    case "vsc":
      return await import("react-icons/vsc");
    case "tb":
      return await import("react-icons/tb");
    case "tfi":
      return await import("react-icons/tfi");
    case "rx":
      return await import("react-icons/rx");
    case "pi":
      return await import("react-icons/pi");
    case "lia":
      return await import("react-icons/lia");
  }
}
export type iconFileType = ReturnType<Awaited<typeof loadIconFiles>>;

const ids = IconsManifest.map((icon) => icon.id);
type iconLoader = Record<string, FunctionComponent>;
export const LoadIconBuyName = async (
  name: string,
  long = 2
): Promise<JSX.Element> => {
  const prefix = name.slice(0, long)?.toLocaleLowerCase();
  const matches = ids.filter((id) => id.startsWith(prefix));
  if (matches.length > 1) {
    return LoadIconBuyName(name, 3);
  }
  const icons = (await loadIconFiles(matches[0])) as unknown as iconLoader;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (icons as unknown as any)?.[name]?.() as JSX.Element;
};
