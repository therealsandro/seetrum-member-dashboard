import { ProtectedPage } from "@/modules/auth/components/ProtectedPage";
import { useAuthStore } from "@/modules/auth/stores/authStore";
import { Box, Container, Stack, Text } from "@mantine/core";
import React from "react";
import { TrainingPlayground } from "./TrainingPlayground";

export const PlaygroundPage: React.FC = () => {
  const user = useAuthStore((state) => state.user);
  const logOut = useAuthStore((state) => state.logOut);

  return (
    <ProtectedPage>
      <Container>
        <Stack>
          <Text>
            <pre>Login as {user && user.email}</pre>
          </Text>
          <TrainingPlayground />
        </Stack>
      </Container>
    </ProtectedPage>
  );
};

interface InfoSummaryProps {
  label: string;
  value?: any;
}

const InfoSummary: React.FC<InfoSummaryProps> = ({ label, value = "-" }) => {
  return (
    <Box px="sm">
      <Text size="md" weight={"bold"}>
        {label}
      </Text>
      <Text c="dimmed" size="md">
        {value || "empty"}
      </Text>
    </Box>
  );
};
