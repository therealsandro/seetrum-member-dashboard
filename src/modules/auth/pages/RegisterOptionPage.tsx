import { routePaths } from "@/routes";
import {
  Box,
  Button,
  Container,
  Group,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IoPeopleOutline, IoPersonOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

export const RegisterOptionPage: React.FC = () => {
  const theme = useMantineTheme();
  const isSmallScreen = useMediaQuery(`(max-width: ${theme.breakpoints.xs})`);
  return (
    <Container
      size={"sm"}
      sx={{
        height: "100svh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack spacing={20}>
        <Text weight={"bolder"} size={"xl"}>
          Ready to build sustainable future for Indonesia?
        </Text>
        <Text size={"md"}>
          Register now and become part of the Seetrum community, where you can
          connect with like-minded individuals and help build a more sustainable
          future through energy efficiency
        </Text>
        <SimpleGrid cols={isSmallScreen ? 1 : 2} mt={40}>
          <RegisterCard userType="individual" />
          <RegisterCard userType="organization" />
        </SimpleGrid>
      </Stack>
    </Container>
  );
};

interface Props {
  userType: "individual" | "organization";
}

const RegisterCard: React.FC<Props> = ({ userType }) => {
  const registerCopy = {
    individual: {
      logo: <IoPersonOutline />,
      title: "Join us as individual",
      description:
        "Join our community of diverse voices, innovative individuals, and big ideas to make a difference in energy efficiency",
      linkTo: routePaths.REGISTER,
    },
    organization: {
      logo: <IoPeopleOutline />,
      title: "Join us as organization",
      description:
        "Collaborate with us to promote sustainability and drive the energy efficiency ecosystem forward in Indonesia as an organization",
      linkTo: routePaths.REGISTER,
    },
  };

  const { logo, title, description, linkTo } = registerCopy[userType];
  return (
    <Paper withBorder p="lg" radius="md">
      <Stack spacing={16}>
        <Box
          sx={{
            fontSize: "40px",
          }}
        >
          {logo}
        </Box>
        <Text size={"lg"}>{title}</Text>
        <Text size={"sm"}>{description}</Text>
        <Group>
          <Link to={linkTo}>
            <Button>Join now</Button>
          </Link>
        </Group>
      </Stack>
    </Paper>
  );
};
