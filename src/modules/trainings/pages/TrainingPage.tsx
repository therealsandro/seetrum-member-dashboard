import { DEFAULT_TITLE } from "@/lib/constants";
import { ProtectedPage } from "@/modules/auth/components/ProtectedPage";
import { Typography } from "@/ui/Typography";
import { Flex } from "@mantine/core";
import { useDocumentTitle } from "@mantine/hooks";
import React from "react";
import { MyTrainingFilter } from "../components/MyTrainingFilter";
import { TrainingCard } from "../components/TrainingCard";
import { TrainingToolbar } from "../components/TrainingToolbar";

const trainingDummyData = {
  id: "trainingDummy",
  thumbnail: "testing.png",
  title: "Auditor Energi Termal dan Kelistrikan",
  vendorName: "LSP HAKE",
};

export const TrainingsPage: React.FC<{ myTrainings?: boolean }> = ({
  myTrainings = false,
}) => {
  useDocumentTitle(`${DEFAULT_TITLE} | ${myTrainings ? "My" : ""} Trainings`);

  return (
    <ProtectedPage>
      <Flex direction="column">
        <Typography textVariant="headline-lg">
          {(myTrainings ? "My" : "All") + " Trainings"}
        </Typography>
        {/* Toolbar */}
        <TrainingToolbar
          myTrainings={myTrainings}
          // TODO: Update this function handle
          onSearchChanged={(val) => console.log("[searchChanged]", val)}
          onSortChanged={(val) => console.log("[sortChanged]", val)}
        >
          {myTrainings && (
            <MyTrainingFilter value="0" onChange={(val) => console.log(val)} />
          )}
        </TrainingToolbar>
        <Flex gap={24} direction="column">
          {Array(5)
            .fill("-")
            .map((i, idx) => {
              return (
                <TrainingCard
                  key={idx}
                  variant="horizontal"
                  {...trainingDummyData}
                  withApplicationStatus={myTrainings}
                />
              );
            })}
        </Flex>
      </Flex>
    </ProtectedPage>
  );
};
