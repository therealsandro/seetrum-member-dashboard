import { IconEdit } from "@/ui/Icons";
import { Typography } from "@/ui/Typography";
import { Button, Flex, Grid, Stack, useMantineTheme } from "@mantine/core";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SupportingFileField } from "./supportingFileField";
import { TrainingInfoViewer } from "./trainingInfoViewer";

export const TrainingInfoManagement = () => {
  const thm = useMantineTheme();
  const [searchParams] = useSearchParams();
  const [mode, setMode] = useState<"edit" | "view">(
    searchParams.getAll("edit")[0] ? "edit" : "view"
  );

  return (
    <Grid>
      <Grid.Col span={8} mb={80}>
        <Stack
          mt={8}
          mb={24}
          spacing={16}
          p={16}
          pb={20}
          sx={{
            borderRadius: 16,
            border: "1px solid",
            borderColor: thm.fn.rgba(thm.colors.night[5], 0.12),
          }}
        >
          <Flex gap={16} align="center">
            <Typography textVariant="title-lg" sx={{ flex: 1 }}>
              General Info
            </Typography>
            {mode === "view" && (
              <Button
                variant="subtle"
                radius={8}
                leftIcon={<IconEdit />}
                onClick={() => setMode("edit")}
              >
                <Typography textVariant="label-lg">Edit</Typography>
              </Button>
            )}
            {mode === "edit" && (
              <Button
                variant="filled"
                radius={8}
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  setMode("view");
                }}
              >
                <Typography textVariant="label-lg">Save changes</Typography>
              </Button>
            )}
          </Flex>
          <TrainingInfoViewer />
        </Stack>
        <SupportingFileField />
      </Grid.Col>
    </Grid>
  );
};
