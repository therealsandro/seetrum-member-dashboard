import { pretyDate } from "@/lib/utils";
import { TrainingMember } from "@/types/models/trainingMember";
import { IconChevronDown } from "@/ui/Icons";
import { Typography } from "@/ui/Typography";
import {
  Box,
  Button,
  Flex,
  FlexProps,
  ThemeIcon,
  useMantineTheme,
} from "@mantine/core";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const ApplicationTrackingCard: React.FC<
  Partial<TrainingMember> & { flexProps?: FlexProps }
> = ({ flexProps, ...applicantData }) => {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const [openState, setOpen] = useState(false);

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
      <Flex
        w="100%"
        justify="space-between"
        align="center"
        onClick={() => {
          if (Boolean(applicantData.id)) {
            setOpen((v) => !v);
          }
        }}
      >
        <Typography textVariant="title-md">
          {!applicantData.id
            ? "Interested in applying this training?"
            : "Training Activity"}
        </Typography>
        {/* <ThemeIcon
          hidden={!Boolean(applicantData.id)}
          variant="default"
          sx={{
            border: "none",
            transition: "rotate 1500ms ease",
            transform: ("rotate(" + (openState ? 180 : 0) + "deg)") as string,
          }}
        >
          <IconChevronDown />
        </ThemeIcon> */}
      </Flex>
      {applicantData.id ? (
        <ApplicationHistory {...applicantData} isOpen={openState} />
      ) : (
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
      )}
    </Flex>
  );
};

// TODO: Implement history view with collapsible section
const ApplicationHistory: React.FC<
  Partial<TrainingMember> & { isOpen: Boolean }
> = ({ isOpen, ...applicantData }) => {
  return (
    <Flex direction="column">
      <Flex justify="space-between" align={"center"}>
        <Flex gap={16} align="center">
          <Box
            w={8}
            h={8}
            bg="biceblue.6"
            sx={{ borderRadius: "16px", overflow: "hidden" }}
          />
          <Typography>{applicantData.status}</Typography>
        </Flex>
        <Typography textVariant="body-sm">
          {pretyDate(new Date(Date.now()))}
        </Typography>
      </Flex>
      {/* <Flex
        h={isOpen ? 300 : 0}
        bg="blue"
        sx={{ transition: "all 500ms ease" }}
      >
      </Flex> */}
    </Flex>
  );
};