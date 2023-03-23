import { routePaths } from "@/routes";
import { Grid, Paper, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

interface Props {
  children: React.ReactNode;
}

// const IMAGE_URL =
//   "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1772&q=80";

export const AuthLayout: React.FC<Props> = ({ children }) => {
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  const theme = useMantineTheme();
  const isSmallScreen = useMediaQuery(`(max-width: ${theme.breakpoints.xs})`);

  React.useEffect(() => {
    if (user) {
      navigate(routePaths.PROFILE);
    }
  }, [user, navigate]);

  return (
    <Grid
      h={"100svh"}
      w={"100%"}
      justify={isSmallScreen ? "center" : "initial"}
    >
      {!isSmallScreen && (
        <Grid.Col span={4} p={0}>
          <LoginSideIlustration />
        </Grid.Col>
      )}
      <Grid.Col
        span={8}
        p={0}
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
      radius={0}
      sx={{
        // background: `linear-gradient(to right top, rgba(45,183,195,1) 0%, rgba(49,24,108,1) 100%)`,
        background: `radial-gradient(circle at bottom left, rgba(45,183,195,1), rgba(49,24,108,1))`,
        backgroundSize: "cover",
        transition: "all 0.2s ease-in-out",
        ":hover": {
          backgroundPosition: "right",
        },
      }}
    ></Paper>
  );
};
