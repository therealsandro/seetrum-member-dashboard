import { comingSoonUrl } from "@/lib/assets";
import { Typography } from "@/ui/Typography";
import { Stack } from "@mantine/core";
import { ReactNode } from "react";

export const EmptyData: React.FC<{ children?: ReactNode }> = ({ children }) => {
  return (
    <Stack spacing={32} w="100%" justify="center" align="center" py={40}>
      <img height={220} src={comingSoonUrl} alt={"coming soon"} />
      <Stack spacing={8} maw={"min(100%, 640px)"}>
        <Typography textVariant="title-md" align="center">
          No Joined Events Yet
        </Typography>
        <Typography textVariant="body-md" color="dimmed" align="center">
          Track and access your joined events in one place. Start your energy
          efficiency journey by browsing available events in the All Events
          page.
        </Typography>
      </Stack>
      {children}
    </Stack>
  );
};
