import { Typography } from "@/ui/Typography";
import { Badge, Flex, Image } from "@mantine/core";

interface TrainingCardBaseProps {
  id: string;
  title: string;
  thumbnail: string;
  vendorName: string;
}

interface TrainingCardProps extends TrainingCardBaseProps {
  variant: "horizontal" | "vertical";
}

interface TrainingCardAddonProps {
  withApplicationStatus?: boolean;
}

export const TrainingCard: React.FC<
  TrainingCardProps & TrainingCardAddonProps
> = ({ variant: type, withApplicationStatus = false, ...trainingData }) => {
  if (type === "horizontal")
    return (
      <HorizontalCard
        {...trainingData}
        withApplicationStatus={withApplicationStatus}
      />
    );
  return <VerticalCard {...trainingData} />;
};

const HorizontalCard: React.FC<
  TrainingCardBaseProps & TrainingCardAddonProps
> = ({ id, title, thumbnail, vendorName, withApplicationStatus }) => {
  // TODO: this should fetch the applicationStatus
  const applicationStatus = withApplicationStatus && "Applied";

  return (
    <Flex
      pb={16}
      sx={(theme) => ({
        borderBottom: "1px solid",
        borderColor: theme.colors.gray[4],
      })}
    >
      <Image
        withPlaceholder
        width={210}
        height={140}
        radius="md"
        src={thumbnail}
      />
      <Flex px={16} py={8} gap={8} direction="column">
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
          {title}
        </Typography>
        <Typography textVariant="body-md">{vendorName}</Typography>
        {withApplicationStatus && (
          <Badge
            color="primary"
            sx={{ width: "fit-content", textTransform: "unset" }}
          >
            {applicationStatus}
          </Badge>
        )}
      </Flex>
    </Flex>
  );
};
const VerticalCard: React.FC<TrainingCardBaseProps> = ({
  id,
  title,
  thumbnail,
  vendorName,
}) => {
  return <></>;
};
