import { DEFAULT_TITLE } from "@/lib/constants";
import { ProtectedPage } from "@/modules/auth/components/ProtectedPage";
import { Typography } from "@/ui/Typography";
import { Flex } from "@mantine/core";
import { useDocumentTitle } from "@mantine/hooks";
import React from "react";
import { TrainingToolbar } from "../components/TrainingToolbar";

export const TrainingsPage: React.FC = () => {
  useDocumentTitle(`${DEFAULT_TITLE} | Trainings`);

  return (
    <ProtectedPage>
      <Flex gap={24} direction="column">
        <Typography textVariant="headline-lg">All Trainings</Typography>
        {/* Toolbar */}
        <TrainingToolbar
          // TODO: Update this function handle
          onSearchChanged={(val) => console.log("[searchChanged]", val)}
          onSortChanged={(val) => console.log("[sortChanged]", val)}
        />
      </Flex>
    </ProtectedPage>
  );
};
