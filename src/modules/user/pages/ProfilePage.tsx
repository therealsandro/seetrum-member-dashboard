import { comingSoonUrl } from "@/lib/assets";
import { ProtectedPage } from "@/modules/auth/components/ProtectedPage";
import { useAuthStore } from "@/modules/auth/stores/authStore";
import { MainLayout } from "@/ui/Layout";
import { Typography } from "@/ui/Typography";
import { Box, Loader, Paper, Stack, Text } from "@mantine/core";
import React from "react";

export const ProfilePage: React.FC = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <ProtectedPage>
      <MainLayout>
        <Box>
          <Typography textVariant="display-sm">
            Hello, {user && user.name}!
          </Typography>
          <Stack
            maw={720}
            mt={120}
            mx={"auto"}
            align="center"
            spacing={59}
            sx={{
              img: {
                width: "300px",
              },
            }}
          >
            <img src={comingSoonUrl} alt={"coming soon"} />
            <Typography c="dimmed" textVariant="body-lg" align="center">
              Stay tuned for updates on the latest in energy efficiency,
              exclusive resources, and opportunities to connect with industry
              leaders and fellow members of the Seetrum community.
            </Typography>
          </Stack>
        </Box>
      </MainLayout>
    </ProtectedPage>
  );
};
