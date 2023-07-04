import { ProtectedPage } from "@/modules/auth/components/ProtectedPage";
import { Typography } from "@/ui/Typography";
import { Flex, SimpleGrid, Stack } from "@mantine/core";
import { useEffect, useState } from "react";
import { EventCard } from "../components/eventCard";
import { SearchBar } from "../components/searchbar";
import { SortMenu } from "../components/sortMenu";
import { useEventsList } from "../store/useEventList";

export const EventListPages: React.FC = () => {
  const [search, setSearch] = useState<string>();
  const { events, getEvents, loading } = useEventsList();

  useEffect(() => {
    getEvents();
  }, [getEvents]);

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
        <SimpleGrid cols={4}>
          {loading
            ? Array(8)
                .fill("-")
                .map((i) => {
                  return <EventCard loading />;
                })
            : events &&
              events.map((ev) => {
                return <EventCard eventData={ev} />;
              })}
        </SimpleGrid>
      </Stack>
    </ProtectedPage>
  );
};
