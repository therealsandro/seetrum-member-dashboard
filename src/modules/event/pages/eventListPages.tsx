import { ProtectedPage } from "@/modules/auth/components/ProtectedPage";
import { Typography } from "@/ui/Typography";
import { Flex, SimpleGrid, Stack } from "@mantine/core";
import { useEffect, useState } from "react";
import { EventCard } from "../components/eventCard";
import { SearchBar } from "../components/searchbar";
import { SortMenu } from "../components/sortMenu";
import { useEventsList } from "../store/useEventList";
import { EmptyData } from "../components/emptyData";

export const EventListPages: React.FC = () => {
  const [search, setSearch] = useState<string>();
  const { events, getEvents, loading, sortEvents } = useEventsList();

  useEffect(() => {
    getEvents();
  }, [getEvents]);

  const filteredEvents = events?.filter((evnt) =>
    search ? evnt.title.toLowerCase().includes(search.toLowerCase()) : true
  );

  return (
    <ProtectedPage>
      <Stack spacing={24}>
        <Typography textVariant="headline-lg">All Events</Typography>
        <Flex justify="space-between">
          <SearchBar
            value={search || ""}
            onChange={(value) => setSearch(value)}
          />
          <SortMenu
            onSortChanged={(val) => {
              sortEvents(val[0], val[1] as "asc" | "desc");
            }}
          />
        </Flex>
        <SimpleGrid
          cols={
            (filteredEvents && filteredEvents.length > 0) || loading ? 4 : 1
          }
        >
          {loading ? (
            Array(8)
              .fill("-")
              .map((i, id) => {
                return <EventCard key={id} loading />;
              })
          ) : filteredEvents && filteredEvents.length > 0 ? (
            filteredEvents.map((ev) => {
              return <EventCard key={ev.id} eventData={ev} />;
            })
          ) : (
            <EmptyData />
          )}
        </SimpleGrid>
      </Stack>
    </ProtectedPage>
  );
};
