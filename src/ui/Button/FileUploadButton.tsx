import { uploadFile } from "@/services/firebase/storage";
import { FileInfo } from "@/types/models/fileInfo";
import { FileRequirement } from "@/types/models/training";
import { FileCard } from "@/ui/Card/FileCard";
import { IconAsterisk, IconExclamation, IconUpload } from "@/ui/Icons";
import { Typography } from "@/ui/Typography";
import {
  Accordion,
  Box,
  Button,
  Center,
  FileButton,
  Flex,
  Loader,
  Stack,
} from "@mantine/core";
import { useState } from "react";
/*
  Todo:
  [x] Create Shell
  [x] Style Shell
  [x] Create accordion
  [x] Create custom file button
  [x] Props
  [x] error state
  [] error modal
  [] variant image
*/

interface FileUploadButtonProps extends FileRequirement {
  value?: FileInfo;
  onFileChange: (fileInfo?: FileInfo) => any;
  error?: string;
}

export const FileUploadButton: React.FC<FileUploadButtonProps> = ({
  title,
  accepts,
  description,
  value: fileInfo,
  onFileChange,
  required = false,
  error,
}) => {
  const [loading, setLoading] = useState(false);

  const removeFile = () => {
    onFileChange(undefined);
  };

  const submitFile = async (file: File) => {
    try {
      setLoading(true);
      const newFileInfo = await uploadFile(file, title);
      console.log(newFileInfo);
      onFileChange(newFileInfo);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  return (
    <Accordion radius={16} variant="contained">
      <Accordion.Item
        value="file"
        sx={{
          "&[data-active]": {
            backgroundColor: "transparent",
          },
        }}
      >
        <Accordion.Control p={16}>
          <Flex>
            <Typography textVariant="title-md">{title}</Typography>
            {required && (
              <Box ml={3} c="red.3">
                <IconAsterisk size={8} />
              </Box>
            )}
          </Flex>
        </Accordion.Control>
        <Accordion.Panel
          p={16}
          pt={0}
          sx={{
            ".mantine-Accordion-content": {
              padding: 0,
            },
          }}
        >
          <Stack spacing={16}>
            <Typography textVariant="body-md" c="dimmed">
              {description}
            </Typography>

            {loading ? (
              <Center>
                <Loader />
              </Center>
            ) : (
              fileInfo && <FileCard onRemoveFile={removeFile} {...fileInfo} />
            )}

            {error && (
              <Flex c="red.3" align={"center"} gap={8}>
                <IconExclamation size={16} />
                <Typography textVariant="body-md">
                  Please provide your {title}
                </Typography>
              </Flex>
            )}
            <FileButton onChange={submitFile} accept={accepts}>
              {(props) => (
                <Button
                  {...props}
                  size="md"
                  variant="outline"
                  c="night"
                  sx={(theme) => ({
                    borderColor: theme.fn.rgba(theme.colors.night[6], 0.12),
                  })}
                  leftIcon={<IconUpload size={18} />}
                >
                  <Typography textVariant="label-lg">Upload {title}</Typography>
                </Button>
              )}
            </FileButton>
          </Stack>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
};
