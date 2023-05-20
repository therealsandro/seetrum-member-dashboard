import { getFileURL, uploadFile } from "@/services/firebase/storage";
import { Typography } from "@/ui/Typography";
import {
  Image,
  Button,
  CloseButton,
  Flex,
  Group,
  SimpleGrid,
  Stack,
  FileButton,
} from "@mantine/core";
import { useState } from "react";

export const FileManagerPlayground: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);

    const sizeInKb = file.size / 1024;

    const formattedSize =
      sizeInKb >= 1024
        ? `${(sizeInKb / 1024).toFixed(2)} MB`
        : `${sizeInKb.toFixed(2)} KB`;

    return (
      <Flex>
        <Image
          key={index}
          src={imageUrl}
          maw={300}
          imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }}
        />
        <Stack>
          <Typography textVariant="body-lg">{file.name}</Typography>
          <Typography textVariant="body-lg">{file.type}</Typography>
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
      await Promise.all(promises);
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
        </>
      )}
      <Button onClick={handleGetURL}>GET URL</Button>
    </>
  );
};
