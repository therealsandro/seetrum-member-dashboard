interface Props {
  children: React.ReactNode;
}

import { Grid, Paper, Text } from "@mantine/core";
import React from "react";
import { useAuthStore } from "../stores/authStore";
import { redirect, useNavigate } from "react-router-dom";
import { ROUTE_PROFILE } from "@/routes";

const IMAGE_URL =
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1772&q=80";

export const AuthLayout: React.FC<Props> = ({ children }) => {
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (user) {
      navigate(ROUTE_PROFILE.path);
    }
  }, [user]);

  return (
    <Grid h="100svh" px={"sm"}>
      <Grid.Col span={4}>
        <LoginSideIlustration />
      </Grid.Col>
      <Grid.Col
        span={8}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {children}
      </Grid.Col>
    </Grid>
  );
};

const LoginSideIlustration: React.FC = () => {
  return (
    <Paper
      h={"100%"}
      sx={(theme) => ({
        background: `url(${IMAGE_URL})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        borderRadius: theme.radius.lg,
        transition: "all 0.2s ease-in-out",
        ":hover": {
          backgroundPosition: "right",
          borderRadius: theme.radius.sm,
        },
      })}
      p="xl"
    >
      <Text color="white" weight={"bold"} size="xl">
        SEETRUM
      </Text>
    </Paper>
  );
};
