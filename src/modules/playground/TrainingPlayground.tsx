import { Training, trainingModelDummy } from "@/types/models/training";
import { Typography } from "@/ui/Typography";
import { Badge, Box, Button, Flex, Group, Paper, Stack } from "@mantine/core";
import { useState } from "react";
import {
  createTraining,
  getAllTrainings,
  getTrainingById,
} from "../trainings/services/trainingService";
import {
  TrainingMember,
  trainingMemberDummy,
} from "@/types/models/trainingMember";
import {
  createTrainingMember,
  getTrainingMemberByMemberId,
} from "../trainings/services/trainingMemberService";
import { useAuthStore } from "../auth/stores/authStore";

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
    alert(JSON.stringify(res, null, 2));
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

export const TrainingMemberPlayground: React.FC = () => {
  const user = useAuthStore((state) => state.user);
  const [trainingMembers, setTrainingMembers] = useState<TrainingMember[]>();
  const [loading, setLoading] = useState(false);

  const fetchMyTraining = async () => {
    setLoading(true);
    const memberId = (user && user.id) || "";
    try {
      const res = await getTrainingMemberByMemberId(memberId);
      console.log(res);
      setTrainingMembers(res);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const postTraining = async () => {
    setLoading(true);
    try {
      await createTrainingMember(trainingMemberDummy);
      await fetchMyTraining();
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const fetchTrainingById = async () => {
    setLoading(true);
    const res = await getTrainingById("c8wzhSGbozS3QcW5ae5h");
    alert(JSON.stringify(res, null, 2));
    setLoading(false);
  };

  return (
    <>
      <Group>
        <Button loading={loading} onClick={fetchMyTraining}>
          Get My Training Member
        </Button>
        <Button loading={loading} onClick={postTraining}>
          Create Training Member
        </Button>
        <Button loading={loading} onClick={fetchTrainingById}>
          Get Training By Id
        </Button>
      </Group>
      <Stack>
        {trainingMembers &&
          trainingMembers.map((t, index) => (
            <Paper p={"sm"} withBorder key={t.id}>
              <Flex align={"center"} justify={"space-between"}>
                <Box>
                  <Typography textVariant="title-md">{t.id}</Typography>
                  <Typography textVariant="title-md">{t.trainingId}</Typography>
                  <Typography textVariant="title-md">{t.memberId}</Typography>
                  <Typography textVariant="body-md">{t.address}</Typography>
                </Box>
                <Badge>{t.status}</Badge>
              </Flex>
            </Paper>
          ))}
      </Stack>
    </>
  );
};
