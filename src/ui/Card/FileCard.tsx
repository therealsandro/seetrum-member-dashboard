import { getFileName } from "@/lib/utils";
import { FileInfo } from "@/types/models/fileInfo";
import { ActionIcon, Flex, Group } from "@mantine/core";
import { IconBoxArrowUpRight, IconPDF, IconTrash } from "../Icons";
import { Typography } from "../Typography";
import { useFileURLStore } from "@/services/firebase/storage";
import { showErrorNotif } from "../notifications";

interface FileCardProps extends FileInfo {
  onRemoveFile?: () => void;
}

export const FileCard: React.FC<FileCardProps> = ({
  onRemoveFile,
  ...file
}) => {
  const getFileURL = useFileURLStore((s) => s.getFileURL);

  const handleOpenFile = async () => {
    try {
      const url = await getFileURL(file.filename);
      window.open(url, "_blank");
    } catch (e) {
      showErrorNotif({ message: "Error in fetching file URL" });
    }
  };

  return (
    <Flex
      align={"center"}
      sx={(theme) => ({
        height: 72,
        border: "1px solid",
        borderColor: theme.fn.rgba(theme.colors.night[6], 0.12),

        borderRadius: "16px",
        overflow: "hidden",
      })}
    >
      <Flex
        w={72}
        h="100%"
        bg="red.6"
        align="center"
        justify="center"
        sx={{ flexShrink: 0 }}
      >
        {/* TODO: Ini perlu di update ga sih? */}
        {file.contentType.includes("pdf") ? (
          <IconPDF color="white" size={28} />
        ) : (
          <IconPDF color="white" size={28} />
        )}
      </Flex>
      <Typography p={12} textVariant="title-md" sx={{ flex: 1 }}>
        {getFileName(file.filename)}
      </Typography>
      <Group spacing={8} mx={8}>
        {onRemoveFile && (
          <ActionIcon w={37} h="100%" c="night" onClick={onRemoveFile}>
            <IconTrash size={18} />
          </ActionIcon>
        )}
        <ActionIcon
          w={37}
          h="100%"
          // TODO: handle onButtonClick
          c="night"
          onClick={handleOpenFile}
        >
          <IconBoxArrowUpRight size={18} />
        </ActionIcon>
      </Group>
    </Flex>
  );
};
