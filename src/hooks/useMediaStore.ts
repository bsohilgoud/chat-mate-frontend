import { set, get, del } from "idb-keyval";
import { getMediaFileAPI, getProfileImageAPI } from "../services/api";

export const useMediaStore = () => {
  const fetchAndStore = async (key: string) => {
    console.log("Didn't find blob for :" + key);
    const blob = await getMediaFileAPI(key);
    await saveMediaBlob(key, blob);
    return URL.createObjectURL(blob);
  };

  async function saveMediaBlob(key: string, blob: File) {
    await set(key, blob);
  }

  async function loadMediaBlob(key: string) {
    const blob = await get(key);
    return blob != null ? URL.createObjectURL(blob) : fetchAndStore(key);
  }

  const fetchProfileIcon = async (key: string) => {
    const userId = key.split("_")[1];
    const blob = await getProfileImageAPI(userId);
    await saveMediaBlob(key, blob);
    return URL.createObjectURL(blob);
  };

  async function loadProfileImageBlob(userId: string) {
    const key = `profile_${userId}`;
    const blob = await get(key);
    return blob != null ? URL.createObjectURL(blob) : fetchProfileIcon(key);
  }

  async function deleteMediaBlob(key: string) {
    await del(key);
    console.log("Deleted blob with key:", key);
  }

  // async function forceUpdateMediaBlob(key: string, type: "media" | "profile") {
  //   let blob;
  //   if (type === "media") {
  //     blob = await getMediaFileAPI(key);
  //   } else if (type === "profile") {
  //     const userId = key.split("_")[0];
  //     blob = await getProfileImageAPI(userId);
  //   }
  //   await saveMediaBlob(key, blob);
  //   return URL.createObjectURL(blob);
  // }

  function clearProfileImageBlobs() {
    indexedDB.databases().then((dbs) => {
      dbs.forEach((db) => {
        if (db.name === "keyval-store") {
          const request = indexedDB.open(db.name!);
          request.onsuccess = () => {
            const store = request.result
              .transaction("keyval", "readwrite")
              .objectStore("keyval");
            const cursorRequest = store.openCursor();
            cursorRequest.onsuccess = (event) => {
              const cursor = event.target?.result;
              if (cursor) {
                if (cursor.key.endsWith("_profile")) {
                  store.delete(cursor.key);
                }
                cursor.continue();
              }
            };
          };
        }
      });
    });
  }

  return {
    saveMediaBlob,
    loadMediaBlob,
    loadProfileImageBlob,
    clearProfileImageBlobs,
    deleteMediaBlob,
  };
};
