import { getFileURL } from "@/services/firebase/storage";
import { Training } from "@/types/models/training";
import { TrainingMember } from "@/types/models/trainingMember";
import { IconArrowRight } from "@/ui/Icons";
import { Typography } from "@/ui/Typography";
import { Badge, Button, Flex, Image, Skeleton } from "@mantine/core";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface TrainingCardProps extends Training {
  variant: "horizontal" | "vertical";
}

interface TrainingCardAddonProps {
  applicationStatus?: TrainingMember;
  loading?: boolean;
}

export const TrainingCard: React.FC<
  TrainingCardProps & TrainingCardAddonProps
> = ({
  variant: type,
  applicationStatus,
  loading = false,
  ...trainingData
}) => {
  if (type === "horizontal")
    return (
      <HorizontalCard
        {...trainingData}
        loading={loading}
        applicationStatus={applicationStatus}
      />
    );
  return <VerticalCard {...trainingData} />;
};

const HorizontalCard: React.FC<Training & TrainingCardAddonProps> = ({
  applicationStatus,
  loading,
  ...trainingData
}) => {
  const [imageUrl, setImage] = useState<string>(trainingData.thumbnailFileName);
  getFileURL(trainingData.thumbnailFileName).then((ur) => setImage(ur));
  const navigate = useNavigate();

  return (
    <Flex
      pb={16}
      sx={(theme) => ({
        borderBottom: "1px solid",
        borderColor: theme.colors.gray[4],
      })}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        navigate(`/trainings/${trainingData.id}`);
      }}
    >
      <Image
        src={imageUrl}
        width={210}
        height={140}
        withPlaceholder
        sx={(t) => ({
          overflow: "hidden",
          borderRadius: "16px",
          border: "1px solid",
          borderColor: t.fn.rgba(t.colors.night[6], 0.08),
        })}
      />
      <Flex px={16} py={8} gap={8} direction="column">
        <Skeleton visible={loading}>
          <Typography
            textVariant="title-md"
            sx={{
              // TODO: This should be refactored to somewhere accessible
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
              // ---
            }}
          >
            {trainingData.title}
          </Typography>
        </Skeleton>
        <Skeleton visible={loading}>
          <Typography textVariant="body-md">
            {trainingData.trainerName}
          </Typography>
        </Skeleton>
        {applicationStatus && !loading && (
          <Badge
            color="primary"
            sx={{ width: "fit-content", textTransform: "unset" }}
          >
            {applicationStatus.status}
          </Badge>
        )}
      </Flex>
    </Flex>
  );
};
const VerticalCard: React.FC<Training> = ({ id, title, thumbnailFileName }) => {
  const [imageUrl, setImage] = useState<string>(thumbnailFileName);
  getFileURL(thumbnailFileName).then((ur) => setImage(ur));
  const navigate = useNavigate();

  return (
    <Flex
      p={12}
      pb={16}
      gap={16}
      direction="column"
      sx={(t) => ({
        borderRadius: "28px 16px",
        border: "1px solid",
        borderColor: t.fn.rgba(t.colors.night[6], 0.12),
        "& a.mantine-Button-root:hover": {
          backgroundColor: "unset",
          textDecoration: "underline",
        },
      })}
    >
      <Image
        src={imageUrl}
        withPlaceholder
        height={180}
        sx={(t) => ({
          overflow: "hidden",
          borderRadius: "16px",
          border: "1px solid",
          borderColor: t.fn.rgba(t.colors.night[6], 0.08),
        })}
      />
      <Typography textVariant="title-lg">{title}</Typography>
      <Button
        component="a"
        variant="subtle"
        w={"fit-content"}
        p={0}
        color="night"
        rightIcon={<IconArrowRight />}
        onClick={(e) => {
          e.stopPropagation();
          navigate(`/trainings/${id}`);
        }}
      >
        View training details
      </Button>
    </Flex>
  );
};
