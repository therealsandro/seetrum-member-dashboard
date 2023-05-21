import { Training, trainingModelDummy } from "@/types/models/training";
import { Typography } from "@/ui/Typography";
import { Button, Group, Paper, Stack } from "@mantine/core";
import { useState } from "react";
import {
  createTraining,
  getAllTrainings,
  getTrainingById,
} from "../trainings/services/trainingService";

export const TrainingPlayground: React.FC = () => {
  const [trainings, setTrainings] = useState<Training[]>();
  const [loading, setLoading] = useState(false);

  const fetchAllTraining = async () => {
    setLoading(true);
    try {
      const newTrainings = await getAllTrainings();
      console.log(newTrainings);
      setTrainings(newTrainings);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const postTraining = async () => {
    setLoading(true);
    try {
      await createTraining(trainingModelDummy);
      await fetchAllTraining();
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const fetchTrainingById = async () => {
    setLoading(true);
    const res = await getTrainingById("c8wzhSGbozS3QcW5ae5h");
    console.log(res);
    setLoading(false);
  };

  return (
    <>
      <Group>
        <Button loading={loading} onClick={fetchAllTraining}>
          Get All Training
        </Button>
        <Button loading={loading} onClick={postTraining}>
          Create Training
        </Button>
        <Button loading={loading} onClick={fetchTrainingById}>
          Get Training By Id
        </Button>
      </Group>
      <Stack>
        {trainings &&
          trainings.map((t, index) => (
            <Paper p={"sm"} withBorder key={t.id}>
              <Typography textVariant="title-md">{t.title}</Typography>
              <Typography textVariant="body-md">{t.description}</Typography>
            </Paper>
          ))}
      </Stack>
    </>
  );
};
