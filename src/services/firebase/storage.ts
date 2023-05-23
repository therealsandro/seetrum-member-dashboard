import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { FirebaseStorage } from "./config";
import { FileInfo } from "@/types/models/fileInfo";

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

export const getFileURL = async (filename: string) => {
  const fileRef = ref(FirebaseStorage, `${folder}/${filename}`);
  try {
    const url = await getDownloadURL(fileRef);
    return url;
  } catch (error) {
    throw error;
  }
};
