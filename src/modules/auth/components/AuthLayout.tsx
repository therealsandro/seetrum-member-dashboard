import { routePaths } from "@/routes";
import { Grid, Paper, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import { authBgUrl } from "@/lib/assets";
import { Typography } from "@/ui/Typography";
import { SeetrumLogoAuth } from "./SeetrumLogoAuth";

interface Props {
  children: React.ReactNode;
}

// const IMAGE_URL =
//   "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1772&q=80";

export const AuthLayout: React.FC<Props> = ({ children }) => {
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  const theme = useMantineTheme();
  const isSmallScreen = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

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
      m={0}
    >
      {!isSmallScreen && (
        <Grid.Col
          span={4}
          p={0}
          sx={{
            position: "relative",
          }}
        >
          <LoginSideIlustration />
        </Grid.Col>
      )}
      <Grid.Col span={isSmallScreen ? 12 : 8} p={0} pos="relative">
        <SeetrumLogoAuth />
        {children}
      </Grid.Col>
    </Grid>
  );
};

const LoginSideIlustration: React.FC = () => {
  return (
    <Paper
      h={"100svh"}
      w={"100%"}
      px={32}
      radius={0}
      sx={{
        position: "sticky",
        top: 0,
        left: 0,
        bottom: 0,
        background: `url(${authBgUrl})`,
        backgroundSize: "cover",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Typography textVariant="display-sm" c="white" pb={48}>
        Building trust towards energy efficiency technology
      </Typography>
    </Paper>
  );
};
