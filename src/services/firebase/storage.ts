import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { FirebaseStorage } from "./config";
import { FileInfo } from "@/types/models/fileInfo";
import { create } from "zustand";

const folder = "temp";

export const uploadFile = async (file: File, tag: string = "others") => {
  const timestamp = new Date().getTime();
  const filename = `${timestamp}-${file.name}`;
  const fileRef = ref(FirebaseStorage, `${folder}/${filename}`);
  try {
    const res = await uploadBytes(fileRef, file);
    const fileInfo: FileInfo = {
      filename,
      contentType: res.metadata.contentType ?? "",
      size: res.metadata.size,
      tag,
    };

    return fileInfo;
  } catch (error) {
    throw error;
  }
};

interface FileURLStoreProps {
  caches: Record<string, string>;
  getFileURL: (filename: string) => Promise<string>;
}

export const useFileURLStore = create<FileURLStoreProps>((set, get) => ({
  caches: {},
  getFileURL: async (filename: string) => {
    if (get().caches[filename]) {
      console.log("cache hit", get().caches[filename], get().caches);
      return get().caches[filename];
    }

    console.log("cache miss", filename, get().caches);
    const fileRef = ref(FirebaseStorage, `${folder}/${filename}`);
    try {
      const url = await getDownloadURL(fileRef);
      set((s) => ({ caches: { ...s.caches, [filename]: url } }));
      return url;
    } catch (error) {
      throw error;
    }
  },
}));
