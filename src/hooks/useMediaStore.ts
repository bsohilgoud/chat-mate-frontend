import { set, get } from "idb-keyval";
import { getMediaFileAPI } from "../services/api";

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

  return {
    saveMediaBlob,
    loadMediaBlob,
  };
};
