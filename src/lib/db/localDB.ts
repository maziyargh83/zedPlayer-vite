import localforage from "localforage";

export const localDB = localforage.createInstance({
  name: "localDB",
  driver: localforage.LOCALSTORAGE,
});

localDB.ready(async () => {
  const isReady = await localDB.getItem("isReady");
  const version = await localDB.getItem("version");
  const db = await import("./db.json");
  if (isReady && version === db.version) return;
  await localDB.clear();
  Object.entries(db).forEach(async ([key, value]) => {
    await localDB.setItem(key, value);
  });

  localDB.setItem("isReady", true);
});
