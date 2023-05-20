import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { FirebaseStorage } from "./config";

const folder = "temp";

export const uploadFile = async (file: File) => {
  const timestamp = new Date().getTime();
  const filename = `${timestamp}-${file.name}`;
  const tempRef = ref(FirebaseStorage, `${folder}/${filename}`);
  try {
    const res = await uploadBytes(tempRef, file);
    console.log(res);
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
