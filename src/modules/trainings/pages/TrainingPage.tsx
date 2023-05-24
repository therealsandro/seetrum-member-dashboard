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
import { useLocation } from "react-router-dom";
import { useAuthStore } from "@/modules/auth/stores/authStore";
import { useTrainingMember } from "../store/useTrainingMember";

export const TrainingsPage: React.FC = () => {
  const location = useLocation();
  const myTrainings = Boolean(location.pathname.includes("mytrainings"));
  useDocumentTitle(`${DEFAULT_TITLE} | ${myTrainings ? "My" : ""} Trainings`);
  const loading = useTrainings((state) => state.loading);
  const trainings = useTrainings((state) => state.trainings);
  const getTrainings = useTrainings((state) => state.getTrainings);
  const member = useAuthStore((s) => s.user);
  const trainingMembers = useTrainingMember((s) => s.trainingMember);
  const getTMByTID = useTrainingMember((s) => s.getTrainingMemberByMemberId);

  React.useEffect(() => {
    getTrainings();
    if (member) getTMByTID(member.id);
  }, [getTrainings, getTMByTID, member]);

  const trainingList = !myTrainings
    ? trainings?.map((trainingData, idx) => {
        return (
          <TrainingCard
            key={idx}
            variant="horizontal"
            {...trainingData}
            // applicationStatus={myTrainings}
          />
        );
      })
    : trainingMembers?.map((tm) => {
        const t = trainings?.find((t) => t.id === tm.trainingId);
        if (t) {
          return (
            <TrainingCard
              key={tm.id}
              variant="horizontal"
              {...t}
              applicationStatus={tm}
            />
          );
        }
        return <></>;
      });
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
            : trainingList}
        </Flex>
      </Flex>
    </ProtectedPage>
  );
};
