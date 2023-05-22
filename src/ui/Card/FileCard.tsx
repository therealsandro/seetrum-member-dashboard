import { getFileName } from "@/lib/utils";
import { FileInfo } from "@/types/models/fileInfo";
import { Flex } from "@mantine/core";
import { IconBoxArrowUpRight, IconPDF } from "../Icons";
import { Typography } from "../Typography";

export const FileCard: React.FC<FileInfo> = (file) => {
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
          <IconPDF />
        )}
      </Flex>
      <Typography p={12} textVariant="title-md" sx={{ flex: 1 }}>
        {getFileName(file.filename)}
      </Typography>
      <Flex
        mx={8}
        w={37}
        h="100%"
        align={"center"}
        justify="center"
        // TODO: handle onButtonClick
        onClick={() => console.log(1349, file.filename)}
      >
        <IconBoxArrowUpRight size={18} />
      </Flex>
    </Flex>
  );
};