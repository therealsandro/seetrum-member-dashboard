import { MainLayout } from "@/components/Layout";
import { ProtectedPage } from "@/modules/auth/components/ProtectedPage";
import { useAuthStore } from "@/modules/auth/stores/authStore";
import {
  addNewDocument,
  getAllDocuments,
  getDocumentsByQuery,
} from "@/services/firebase/helper";
import { Button, List, SimpleGrid, Stack, Text } from "@mantine/core";
import { where } from "firebase/firestore";
import React from "react";

const EXAMPLE_SCIENTIST = {
  firts: "ETH",
  last: "Lovelace",
  born: 1910,
};

export const ProfilePage: React.FC = () => {
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
            <pre>{user && JSON.stringify(user, null, 2)}</pre>
          </Text>
          <Text align="center" size="xl" weight={"bolder"}>
            COMING SOON
          </Text>
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
