import { ProtectedPage } from "@/modules/auth/components/ProtectedPage";
import { useAuthStore } from "@/modules/auth/stores/authStore";
import { FileInfo } from "@/types/models/fileInfo";
import {
  fileRequirementDummy,
  fileRequirementImageDummy,
} from "@/types/models/training";
import { Button, Container, Flex, Stack, Text } from "@mantine/core";
import React, { useState } from "react";
import { FileUploadButton } from "../../ui/Button/FileUploadButton";
import {
  TrainingMemberPlayground,
  TrainingPlayground,
} from "./TrainingPlayground";

export const PlaygroundPage: React.FC = () => {
  const user = useAuthStore((state) => state.user);
  const logOut = useAuthStore((state) => state.logOut);
  const [fileInfo, setFileInfo] = useState<FileInfo>();
  const [fileInfoImg, setFileInfoImg] = useState<FileInfo>();

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
            onFileChange={setFileInfo}
            {...fileRequirementDummy}
          />
          <pre>{JSON.stringify(fileInfoImg, null, 2)}</pre>
          <FileUploadButton
            value={fileInfoImg}
            onFileChange={setFileInfoImg}
            {...fileRequirementImageDummy}
          />
        </Stack>
      </Container>
    </ProtectedPage>
  );
};
