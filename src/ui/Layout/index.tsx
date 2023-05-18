import { DEFAULT_TITLE } from "@/lib/constants";
import { Header } from "../Header";

import { extractInitials } from "@/lib/utils";
import { useAuthStore } from "@/modules/auth/stores/authStore";
import {
  AppShell,
  Avatar,
  Box,
  Group,
  Loader,
  Navbar,
  UnstyledButton,
  rem,
  useMantineTheme,
} from "@mantine/core";
import React from "react";
import { IconArrowRight } from "../Icons";
import { Typography } from "../Typography";
import { MainLinks } from "./MainLinks";

interface Props {
  title?: string;
  children: React.ReactNode;
}

export const MainLayout: React.FC<Props> = ({
  title = DEFAULT_TITLE,
  children,
}) => {
  const [opened, setOpened] = React.useState(false);

  return (
    <AppShell
      padding="md"
      navbarOffsetBreakpoint={"md"}
      navbar={
        <Navbar
          hiddenBreakpoint={"md"}
          hidden={!opened}
          width={{ sm: 256, lg: 300 }}
          p="xs"
        >
          <Navbar.Section grow mt="xs">
            <MainLinks />
          </Navbar.Section>
          <Navbar.Section>
            <User />
          </Navbar.Section>
        </Navbar>
      }
      header={<Header opened={opened} setOpened={setOpened} />}
    >
      {children}
    </AppShell>
  );
};

export const User: React.FC<any> = (props) => {
  const theme = useMantineTheme();
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return <Loader />;
  }

  const { name, email } = user;

  return (
    <Box
      sx={{
        paddingTop: theme.spacing.sm,
        borderTop: `${rem(1)} solid ${theme.colors.gray[2]}`,
      }}
    >
      <UnstyledButton
        sx={{
          display: "block",
          width: "100%",
          padding: theme.spacing.xs,
          borderRadius: theme.radius.sm,
          color: theme.black,

          "&:hover": {
            backgroundColor: theme.colors.gray[0],
          },
        }}
      >
        <Group>
          <Avatar
            // src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"
            radius="xl"
            color="cyan"
          >
            {extractInitials(name)}
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Typography textVariant="label-lg">{name}</Typography>
            <Typography textVariant="body-sm" color="dimmed">
              {email}
            </Typography>
          </Box>

          <IconArrowRight size={rem(18)} />
        </Group>
      </UnstyledButton>
    </Box>
  );
};
