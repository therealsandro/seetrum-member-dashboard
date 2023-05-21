import { TrainingMember } from "@/types/models/trainingMember";
import { Typography } from "@/ui/Typography";
import { Button, Flex, FlexProps, useMantineTheme } from "@mantine/core";
import { useNavigate } from "react-router-dom";

export const ApplicationTrackingCard: React.FC<
  Partial<TrainingMember> & { flexProps?: FlexProps }
> = ({ flexProps, ...trainginApplicantData }) => {
  const theme = useMantineTheme();
  const navigate = useNavigate();

  if (!trainginApplicantData.id)
    return (
      <Flex
        p={16}
        pt={20}
        direction="column"
        gap={16}
        {...flexProps}
        sx={{
          border: "1px solid",
          borderColor: theme.fn.rgba(theme.colors.night[6], 0.12),
          borderRadius: theme.radius.lg,
          ...flexProps?.sx,
        }}
      >
        <Typography textVariant="title-md">
          Interested in applying this training?
        </Typography>
        <Button
          radius={"md"}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            navigate("apply");
          }}
        >
          Apply now
        </Button>
      </Flex>
    );

  return <Flex>{trainginApplicantData.status}</Flex>;
};
