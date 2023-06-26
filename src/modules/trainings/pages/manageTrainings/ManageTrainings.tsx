import { IconPlus } from "@/ui/Icons";
import { Typography } from "@/ui/Typography";
import { Button, Group, Skeleton, Stack } from "@mantine/core";
import { useEffect, useState } from "react";
import { CreateTrainingModal } from "../../components/CreateTrainingModal";
import { TrainingCard } from "../../components/TrainingCard";
import { useTrainings } from "../../store/useTrainings";

export const ManageTrainingsPage = () => {
  const [open, setOpen] = useState(false);
  const [getTrainings, trainings] = useTrainings((s) => [
    s.getTrainings,
    s.trainings,
  ]);

  useEffect(() => {
    getTrainings();
  }, [getTrainings]);

  return (
    <Stack>
      <CreateTrainingModal opened={open} onClose={() => setOpen(false)} />
      <Group position="apart">
        <Typography textVariant="headline-lg">Manage Trainings</Typography>
        <Button onClick={() => setOpen(true)} leftIcon={<IconPlus size={18} />}>
          Create a new training
        </Button>
      </Group>
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
