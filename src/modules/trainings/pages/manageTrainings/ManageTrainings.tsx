import { Typography } from "@/ui/Typography";
import { Skeleton, Stack } from "@mantine/core";
import { useTrainings } from "../../store/useTrainings";
import { useEffect } from "react";
import { TrainingCard } from "../../components/TrainingCard";

export const ManageTrainingsPage = () => {
  const [getTrainings, trainings] = useTrainings((s) => [
    s.getTrainings,
    s.trainings,
  ]);

  useEffect(() => {
    getTrainings();
  }, [getTrainings]);

  return (
    <Stack>
      <Typography textVariant="headline-lg">Manage Trainings</Typography>
      {trainings ? (
        trainings.map((training) => {
          return (
            <TrainingCard
              key={training.id}
              variant="horizontal"
              {...training}
            />
          );
        })
      ) : (
        <Skeleton h={80} w={"full"} />
      )}
    </Stack>
  );
};
