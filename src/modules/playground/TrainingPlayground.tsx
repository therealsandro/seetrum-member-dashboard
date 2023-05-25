import {
  Training,
  TrainingModel,
  fileRequirementDummy,
  fileRequirementImageDummy,
  trainingModelDummy,
} from "@/types/models/training";
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
import { Timestamp } from "firebase/firestore";

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

  const postRealTrainingEvent = async () => {
    setLoading(true);
    const newTrainingModel: TrainingModel = {
      title:
        "Pelatihan Auditor Energi Bangunan Gedung dan Pelatihan Auditor Termal dan Elektrikal",
      description: descHTML,
      dueDate: Timestamp.fromDate(new Date(2023, 6, 20)),
      thumbnailFileName: "1684931718872-pexels-photo-305833.jpeg",
      attachments: [
        {
          filename:
            "1684914887474-TOR Pelatihan Auditor Energi SEETRUM.docx.pdf",
          contentType: "application/pdf",
          size: 59443,
          tag: "TOR",
        },
      ],
      trainerName: "EnerCoSS",
      fileRequirements: [
        { ...fileRequirementDummy, title: "Curriculum Vitae" },
        { ...fileRequirementImageDummy, title: "Photo" },
        { ...fileRequirementDummy, title: "Degree certificate (Ijazah)" },
        { ...fileRequirementDummy, title: "Personal ID Card (KTP)" },
        {
          ...fileRequirementDummy,
          title: "Supporting Document",
          required: false,
        },
      ],
    };
    try {
      await createTraining(newTrainingModel);
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
        <Button
          color="green.7"
          loading={loading}
          onClick={postRealTrainingEvent}
        >
          Real Training
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

const descHTML = `
<p><em>Society of Energy Efficiency Trust Movement</em> (SEETRUM) adalah organisasi yang memiliki visi membangun ekosistem di bidang energi efisiensi guna meningkatkan kepercayaan kepada para stakeholder pada bidang tersebut. Untuk itu, SEETRUM memiliki misi untuk menjembatani dan memfasilitasi semua pemangku kepentingan untuk membangun ekosistem energi efisiensi yang kohesif di Indonesia. </p>
<p>Kami akan melaksanakan Pelatihan Auditor Energi yang bertujuan untuk memberikan pembekalan terhadap para auditor energi agar tercipta tenaga ahli yang mampu melakukan audit energi secara profesional serta memberikan rekomendasi untuk meningkatkan efisiensi energi pada bidang bangunan gedung, termal, dan elektrikal.</p>
<ul>
<li>Waktu pelaksanaan: Rabu, 24 Mei – Kamis, 25 Mei 2023 </li>
<li>Tempat pelaksanaan: Hotel Ibis Tamarin, Jakarta</li>
</ul>
<p>Batas waktu pendaftaran pelatihan ini adalah pada 23 Mei 2023. Silahkan menghubungi Instagram kami, @seetrum.id jika Anda memiliki pertanyaan seputar pelatihan ini atau Anda mengalami kesulitan dalam mengisi formulir ini.</p>`;
