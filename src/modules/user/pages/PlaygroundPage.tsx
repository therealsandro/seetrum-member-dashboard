import { MainLayout } from "@/ui/Layout";
import { ProtectedPage } from "@/modules/auth/components/ProtectedPage";
import { useAuthStore } from "@/modules/auth/stores/authStore";
import {
  addNewDocument,
  getAllDocuments,
  getDocumentsByQuery,
} from "@/services/firebase/helper";
import {
  Box,
  Button,
  Group,
  Image,
  List,
  Paper,
  SimpleGrid,
  Stack,
  Text,
} from "@mantine/core";
import { Timestamp, where } from "firebase/firestore";
import React, { useState } from "react";
import { Dropzone, FileWithPath } from "@mantine/dropzone";
import { Typography } from "@/ui/Typography";

const EXAMPLE_SCIENTIST = {
  firts: "ETH",
  last: "Lovelace",
  born: 1910,
};

export const PlaygroundPage: React.FC = () => {
  const [science, setScience] = React.useState<any[]>([]);
  const user = useAuthStore((state) => state.user);
  const logOut = useAuthStore((state) => state.logOut);

  const addDocument = async () => {
    try {
      const doc = await addNewDocument("scientist", EXAMPLE_SCIENTIST);
      console.log(doc);
    } catch (e) {
      alert("error adding document, see console");
      console.error(e);
    }
  };

  const getScientist = async () => {
    try {
      const scientists = await getAllDocuments("users");

      setScience(scientists);
    } catch (error) {}
  };

  const getScientistAfter19 = async () => {
    try {
      const scientists = await getDocumentsByQuery(
        "scientist",
        where("born", ">=", 1900)
      );

      setScience(scientists);
    } catch (error) {}
  };

  return (
    <ProtectedPage>
      <MainLayout>
        <Stack>
          <Text>
            <pre>Login as {user && user.email}</pre>
          </Text>
          <Paper
            withBorder
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
            }}
          >
            {user &&
              Object.entries(user).map(([key, value]) =>
                key === "organization" ||
                key === "createdAt" ||
                key === "updatedAt" ? (
                  <InfoSummary
                    key={key}
                    label={key}
                    value={JSON.stringify(value, null, 2)}
                  />
                ) : (
                  <InfoSummary key={key} label={key} value={value} />
                )
              )}
            {/* {user && user.createdAt && (
              <InfoSummary label="createdAt" value={"date"} />
            )} */}
          </Paper>
          <FileManager />
          <Stack>
            <Text>Sample Actions:</Text>
            <SimpleGrid cols={3}>
              <Button onClick={logOut}>Logout</Button>
              <Button onClick={addDocument}>add document</Button>
              <Button onClick={getScientist}>get all documents</Button>
              <Button onClick={getScientistAfter19}>
                get all documents with filter
              </Button>
            </SimpleGrid>
          </Stack>
          <List>
            {science.map((s) => (
              <List.Item key={s.id}>{JSON.stringify(s, null, 2)}</List.Item>
            ))}
          </List>
        </Stack>
      </MainLayout>
    </ProtectedPage>
  );
};

const FileManager: React.FC = () => {
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    return (
      <Image
        key={index}
        src={imageUrl}
        imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }}
      />
    );
  });

  return (
    <Dropzone onDrop={setFiles}>
      <Group position="center" spacing={"xl"}>
        <Typography textVariant="body-md">Drag your file here</Typography>
      </Group>
      <SimpleGrid>{previews}</SimpleGrid>
    </Dropzone>
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
