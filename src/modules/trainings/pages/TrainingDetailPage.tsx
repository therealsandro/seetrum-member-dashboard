import { pretyDate } from "@/lib/utils";
import { FileInfo } from "@/types/models/fileInfo";
import { Training } from "@/types/models/training";
import { trainingMemberDummy } from "@/types/models/trainingMember";
import { FileCard } from "@/ui/Card/FileCard";
import {
  IconArrowLeft,
  IconCalendarEvent,
  IconClockHistory,
  IconPeople,
} from "@/ui/Icons";
import { Typography } from "@/ui/Typography";
import { Button, Flex, Image } from "@mantine/core";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ApplicationTrackingCard } from "../components/ApplicationTrackingCard";
import { useTrainings } from "../store/useTrainings";
import { getFileURL } from "@/services/firebase/storage";

export const TrainingDetailPage: React.FC = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  // Data gether
  const loading = useTrainings((state) => state.loading);
  const getTrainingById = useTrainings((state) => state.getTrainingsById);
  // const error = useTrainings((state) => state.error);
  const [trainingData, setTraining] = useState<Training | undefined>(undefined);
  const [imageUrl, setImage] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (id) {
      getTrainingById(id).then((training) => {
        if (training) setTraining(training);
      });
    }
  }, [id, getTrainingById]);

  if (loading || !trainingData) {
    return <div>Loading...</div>;
  }
  getFileURL(trainingData.thumbnailFileName).then((fileURL) =>
    setImage(fileURL)
  );

  return (
    <Flex
      gap={24}
      direction="column"
      align={"flex-start"}
      sx={{
        "& a.mantine-Button-root:hover": {
          backgroundColor: "unset",
          textDecoration: "underline",
        },
      }}
    >
      <Button
        component="a"
        variant="subtle"
        radius="md"
        p={0}
        sx={{
          color: "black",
        }}
        leftIcon={<IconArrowLeft />}
        onClick={() =>
          navigate(
            "/" +
              (location.pathname.includes("mytraining") ? "my" : "") +
              "trainings"
          )
        }
      >
        Back to all trainings
      </Button>
      <Flex gap={24} pb={80} justify={"space-between"} w={"100%"}>
        <Flex direction="column" gap={24} sx={{ maxWidth: 640 }}>
          <Header {...trainingData} />
          <Description {...trainingData} />
          <Attachments attachments={trainingData.attachments} />
        </Flex>
        <Flex sx={{ width: 315, flexShrink: 0 }} gap={16} direction="column">
          <Image
            withPlaceholder
            height={210}
            radius={"lg"}
            src={imageUrl}
            sx={(t) => ({
              overflow: "hidden",
              borderRadius: "16px",
              border: "1px solid",
              borderColor: t.fn.rgba(t.colors.night[6], 0.08),
            })}
          />
          <ApplicationTrackingCard {...trainingMemberDummy} />
        </Flex>
      </Flex>
    </Flex>
  );
};

const Header: React.FC<Training> = (trainignData) => {
  const getData = (icon: React.ReactNode, label: string, value: string) => ({
    icon,
    label,
    value,
  });
  const data = [
    getData(<IconPeople />, "Trainer", trainignData.trainerName),
    getData(
      <IconCalendarEvent />,
      "Application deadline",
      pretyDate(trainignData.dueDate.toDate())
    ),
    getData(
      <IconClockHistory />,
      "Last modified",
      pretyDate(trainignData.updatedAt.toDate())
    ),
  ];
  return (
    <Flex direction={"column"} gap={16}>
      <Typography textVariant="headline-lg">{trainignData.title}</Typography>
      <Flex
        sx={(theme) => ({
          background: theme.colors.platinum[1],
          borderRadius: 12,
        })}
      >
        {data.map((data, index) => (
          <Flex
            key={index}
            py={12}
            px={16}
            gap={8}
            sx={{
              flex: 1,
              borderRight: "2px solid",
              borderColor: "white",
              ":last-child": {
                borderRight: "none",
              },
            }}
            direction={"column"}
          >
            <Flex gap={8} align={"center"}>
              <Flex sx={{ width: 16, flexShrink: 0 }}>{data.icon}</Flex>
              <Typography textVariant="body-sm" color="night.5">
                {data.label}
              </Typography>
            </Flex>
            <Typography ml={16 + 8} textVariant="label-lg">
              {data.value}
            </Typography>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};

const Description: React.FC<Training> = (trainignData) => {
  return (
    <Flex direction={"column"} gap={16}>
      <Typography textVariant="title-md">Description</Typography>
      {/* TODO: Update to support rich text format */}
      <Flex dangerouslySetInnerHTML={{ __html: trainignData.description }} />
    </Flex>
  );
};

const Attachments: React.FC<{ attachments: FileInfo[] }> = ({
  attachments,
}) => {
  return (
    <Flex direction="column" gap={16}>
      <Typography textVariant="title-md">Supporting Files</Typography>
      {attachments.map((attachment, index) => (
        <FileCard key={index} {...attachment} />
      ))}
    </Flex>
  );
};
