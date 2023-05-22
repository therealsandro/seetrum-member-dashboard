import { DEFAULT_TITLE } from "@/lib/constants";
import { ProtectedPage } from "@/modules/auth/components/ProtectedPage";
import { Typography } from "@/ui/Typography";
import { Flex } from "@mantine/core";
import { useDocumentTitle } from "@mantine/hooks";
import React from "react";
import { MyTrainingFilter } from "../components/MyTrainingFilter";
import { TrainingCard } from "../components/TrainingCard";
import { TrainingToolbar } from "../components/TrainingToolbar";
import { useTrainings } from "../store/useTrainings";
import { trainingModelDummy } from "@/types/models/training";
import { Timestamp } from "firebase/firestore";

export const TrainingsPage: React.FC<{ myTrainings?: boolean }> = ({
  myTrainings = false,
}) => {
  useDocumentTitle(`${DEFAULT_TITLE} | ${myTrainings ? "My" : ""} Trainings`);
  const loading = useTrainings((state) => state.loading);
  const trainingList = useTrainings((state) => state.trainings);
  const getTrainings = useTrainings((state) => state.getTrainings);

  React.useEffect(() => {
    getTrainings();
  }, [getTrainings]);

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
        <Flex gap={24} direction="column" pt={16} pb={80}>
          {loading || !trainingList
            ? Array(4)
                .fill("-")
                .map((e, i) => {
                  return (
                    <TrainingCard
                      createdAt={Timestamp.now()}
                      updatedAt={Timestamp.now()}
                      loading={loading}
                      key={i}
                      id="-"
                      variant="horizontal"
                      {...trainingModelDummy}
                    />
                  );
                })
            : trainingList.map((trainingData, idx) => {
                return (
                  <TrainingCard
                    key={idx}
                    variant="horizontal"
                    {...trainingData}
                    // applicationStatus={myTrainings}
                  />
                );
              })}
        </Flex>
      </Flex>
    </ProtectedPage>
  );
};
