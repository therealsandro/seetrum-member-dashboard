import { Typography } from "@/components/Typography";
import { routePaths } from "@/routes";
import {
  Box,
  Button,
  Group,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IoPeopleOutline, IoPersonOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

export const RegisterOptionsCard: React.FC = () => {
  const theme = useMantineTheme();
  const isSmallScreen = useMediaQuery(`(max-width: ${theme.breakpoints.xs})`);
  return (
    <Paper maw={630} p={40}>
      <Stack spacing={8}>
        <Typography variants="headline-lg">
          Ready to build sustainable future for Indonesia?
        </Typography>
        <Typography variants="body-lg" c="dimmed">
          Register now and become part of the Seetrum community, where you can
          connect with like-minded individuals and help build a more sustainable
          future through energy efficiency
        </Typography>
      </Stack>
      <SimpleGrid cols={isSmallScreen ? 1 : 2} mt={40}>
        <RegisterCard userType="individual" />
        <RegisterCard userType="organization" />
      </SimpleGrid>
    </Paper>
  );
};

interface Props {
  userType: "individual" | "organization";
}

const RegisterCard: React.FC<Props> = ({ userType }) => {
  const navigate = useNavigate();
  const registerCopy = {
    individual: {
      logo: <IoPersonOutline />,
      title: "Join as individual",
      description:
        "Join our community of diverse voices, innovative individuals, and big ideas to make a difference in energy efficiency",
      linkTo: routePaths.REGISTER,
    },
    organization: {
      logo: <IoPeopleOutline />,
      title: "Join as organization",
      description:
        "Collaborate with us to promote sustainability and drive the energy efficiency ecosystem forward in Indonesia as an organization",
      linkTo: routePaths.REGISTER,
    },
  };

  const { title, description, linkTo } = registerCopy[userType];
  const handleClick = () => {
    navigate(linkTo);
  };
  return (
    <Paper
      onClick={handleClick}
      withBorder
      p={24}
      radius="xs"
      sx={(theme) => ({
        cursor: "pointer",
        ":hover": {
          boxShadow: theme.shadows.sm,
        },
      })}
    >
      <Stack spacing={16}>
        <Typography variants="title-lg">{title}</Typography>
        <Typography variants="body-md">{description}</Typography>
      </Stack>
    </Paper>
  );
};
