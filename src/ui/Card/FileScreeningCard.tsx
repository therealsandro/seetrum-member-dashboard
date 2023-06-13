import { Box, Button, Flex, Stack } from "@mantine/core";
import {
  IconJPG,
  IconPDF,
  IconBoxArrowUpRight,
  IconDownload,
  IconTrash,
} from "../Icons";
import { FileInfo } from "@/types/models/fileInfo";
import { Typography } from "../Typography";

export const FileScreeningCard = (
  fileInfo: FileInfo & { withDownload?: boolean; withDelete?: boolean }
) => {
  return (
    <Flex gap={12} w={"100%"} align={"center"}>
      <Flex
        w={32}
        h={32}
        align={"center"}
        justify={"center"}
        sx={(t) => ({
          alignContent: "center",
          borderRadius: 8,
          border: "1px solid",
          color: t.colors.red[6],
          borderColor: t.fn.rgba(t.colors.night[5], 0.12),
        })}
      >
        {fileInfo.contentType.includes("pdf") ? (
          <IconPDF size={22} />
        ) : (
          <IconJPG size={22} />
        )}
      </Flex>
      <Stack spacing={0} sx={{ flex: 1 }}>
        <Typography textVariant="body-lg">{fileInfo.tag}</Typography>
        <Typography textVariant="body-sm">
          {fileInfo.filename.split("-").slice(1).join("-")}
        </Typography>
      </Stack>
      <Flex gap={8}>
        <Button variant="subtle" px={12}>
          <IconBoxArrowUpRight size={18} />
        </Button>
        {fileInfo.withDownload && (
          <Button variant="subtle" px={12}>
            <IconDownload size={18} />
          </Button>
        )}
        {fileInfo.withDelete && (
          <Button variant="subtle" px={12} sx={{ color: "red" }}>
            <IconTrash size={18} />
          </Button>
        )}
      </Flex>
    </Flex>
  );
};
