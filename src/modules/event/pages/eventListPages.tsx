import { ProtectedPage } from "@/modules/auth/components/ProtectedPage";
import { Typography } from "@/ui/Typography";
import { Flex, Stack } from "@mantine/core";
import { SearchBar } from "./components/searchbar";
import { useState } from "react";
import { SortMenu } from "./components/sortMenu";

export const EventListPages: React.FC = () => {
  const [search, setSearch] = useState<string>();

  return (
    <ProtectedPage>
      <Stack>
        <Typography textVariant="headline-lg">All Events</Typography>
        <Flex justify="space-between">
          <SearchBar
            value={search || ""}
            onChange={(value) => setSearch(value)}
          />
          <SortMenu onSortChanged={() => {}} />
        </Flex>
        <h1>List Events</h1>
      </Stack>
    </ProtectedPage>
  );
};
