import { pretyDate } from "@/lib/utils";
import { FileInfo } from "@/types/models/fileInfo";
import { Training } from "@/types/models/training";
import { FileCard } from "@/ui/Card/FileCard";
import {
  IconArrowLeft,
  IconCalendarEvent,
  IconClockHistory,
  IconPeople,
} from "@/ui/Icons";
import { Typography } from "@/ui/Typography";
import { Button, Flex, Image } from "@mantine/core";
import { ApplicationTrackingCard } from "../components/ApplicationTrackingCard";
import { trainingMemberDummy } from "@/types/models/trainingMember";

export const TrainingDetailPage: React.FC<Training> = (trainignData) => {
  return (
    <Flex gap={24} direction="column" align={"flex-start"}>
      <Button
        variant="subtle"
        radius="md"
        sx={{ color: "black" }}
        leftIcon={<IconArrowLeft />}
      >
        Back to all trainings
      </Button>
      <Flex gap={24} pb={80} justify={"space-between"} w={"100%"}>
        <Flex direction="column" gap={24} sx={{ maxWidth: 640 }}>
          <Header {...trainignData} />
          <Description {...trainignData} />
          <Attachments attachments={trainignData.attachments} />
        </Flex>
        <Flex sx={{ width: 315, flexShrink: 0 }} gap={16} direction="column">
          <Image
            withPlaceholder
            height={210}
            radius={"lg"}
            src={trainignData.thumbnailFileName}
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
      pretyDate(trainignData.dueDate)
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
      {trainignData.description}
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
