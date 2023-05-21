import { getFileURL, uploadFile } from "@/services/firebase/storage";
import { FileInfo } from "@/types/models/fileInfo";
import { Typography } from "@/ui/Typography";
import {
  Button,
  CloseButton,
  FileButton,
  Flex,
  Image,
  SimpleGrid,
  Stack,
} from "@mantine/core";
import { useState } from "react";

export const FileManagerPlayground: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [fileInfo, setFileInfo] = useState<FileInfo>();
  const [loading, setLoading] = useState(false);

  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);

    const sizeInKb = file.size / 1024;

    const formattedSize =
      sizeInKb >= 1024
        ? `${(sizeInKb / 1024).toFixed(2)} MB`
        : `${sizeInKb.toFixed(2)} KB`;

    const fileInfo: FileInfo = {
      filename: file.name,
      size: file.size,
      tag: "CV",
      contentType: file.type,
    };

    return (
      <Flex key={file.name}>
        <Image
          key={index}
          src={imageUrl}
          maw={300}
          imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }}
        />
        <Stack>
          <pre>{JSON.stringify(fileInfo, null, 2)}</pre>
          <Typography textVariant="body-lg">{formattedSize}</Typography>
        </Stack>
      </Flex>
    );
  });

  const removeFiles = () => {
    setFiles([]);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const promises = files.map((f) => uploadFile(f));
      const [newFileInfo] = await Promise.all(promises);
      setFileInfo(newFileInfo);
      console.log("uploaded all file");
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const handleGetURL = async () => {
    const url = await getFileURL("1684426914678-CV_Olga_Destiana_S.pdf");
    window.open(url);
    console.log(url);
  };

  return (
    <>
      <FileButton multiple onChange={setFiles}>
        {(props) => <Button {...props}>Upload File</Button>}
      </FileButton>
      {previews && previews.length > 0 && (
        <>
          <CloseButton onClick={removeFiles} />
          <SimpleGrid>{previews}</SimpleGrid>
          <Button loading={loading} onClick={handleSubmit}>
            Submit
          </Button>
          <Typography textVariant="body-md">
            From Server:
            <pre>{JSON.stringify(fileInfo, null, 2)}</pre>
          </Typography>
        </>
      )}
      <Button onClick={handleGetURL}>GET URL</Button>
    </>
  );
};
