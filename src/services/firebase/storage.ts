import { ref, uploadBytes } from "firebase/storage";
import { FirebaseStorage } from "./config";
import { FileWithPath } from "@mantine/dropzone";

export const uploadFile = async (file: FileWithPath) => {
  const filename = file.name;
  const tempRef = ref(FirebaseStorage, `temp/${filename}`);

  try {
    await uploadBytes(tempRef, file);
  } catch (error) {
    console.error(error);
  }
};
