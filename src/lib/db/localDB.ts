import localforage from "localforage";
import { Config } from "tailwindcss";
import resolveConfig from "tailwindcss/resolveConfig";
import { DefaultColors } from "tailwindcss/types/generated/colors";

export const localDB = localforage.createInstance({
  name: "localDB",
  driver: localforage.LOCALSTORAGE,
});

export const ReadyLocalStorage = async () => {
  const isReady = await localDB.getItem("isReady");
  const version = await localDB.getItem("version");
  const db = await import("./db.json");
  if (isReady && version === db.version) return isReady;
  await localDB.clear();
  Object.entries(db).forEach(async ([key, value]) => {
    await localDB.setItem(key, value);
  });
  await loadTailwindConfig();
  localDB.setItem("isReady", true);
  return true;
};

const loadTailwindConfig = async () => {
  const config = await import("../../../tailwind.config");
  const parsedConfig = resolveConfig(config.default as unknown as Config);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { inherit, transparent, current, ring, ...colors } = parsedConfig.theme
    .colors as DefaultColors & { ring: string };
  const modifiedColors = Object.entries(colors).filter(
    ([, c]) => !(typeof c === "string" || Object.values(c).length == 2)
  );
  const newColors = Object.fromEntries(modifiedColors);
  await localDB.setItem("colors", newColors);
  return true;
};
