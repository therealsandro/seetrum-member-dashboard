import { ProtectedPage } from "@/modules/auth/components/ProtectedPage";
import { useAuthStore } from "@/modules/auth/stores/authStore";
import { Box, Button, Container, Flex, Stack, Text } from "@mantine/core";
import React, { useState } from "react";
import {
  TrainingMemberPlayground,
  TrainingPlayground,
} from "./TrainingPlayground";
import { FileUploadButton } from "../../ui/Button/FileUploadButton";
import { fileRequirementDummy } from "@/types/models/training";
import { FileInfo } from "@/types/models/fileInfo";

export const PlaygroundPage: React.FC = () => {
  const user = useAuthStore((state) => state.user);
  const logOut = useAuthStore((state) => state.logOut);
  const [fileInfo, setFileInfo] = useState<FileInfo>();

  return (
    <ProtectedPage>
      <Container>
        <Stack>
          <Flex
            sx={{ borderBottom: "1px solid gray" }}
            p={"sm"}
            justify={"space-between"}
            align={"center"}
          >
            <Text>Login as {user && user.email + " " + user.id}</Text>
            <Button onClick={logOut} variant="outline">
              Logout
            </Button>
          </Flex>
          <TrainingPlayground />
          <TrainingMemberPlayground />
          <pre>{JSON.stringify(fileInfo, null, 2)}</pre>
          <FileUploadButton
            value={fileInfo}
            error="Provide"
            onFileChange={setFileInfo}
            {...fileRequirementDummy}
          />
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
