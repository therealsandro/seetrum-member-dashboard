import { ProtectedPage } from "@/modules/auth/components/ProtectedPage";
import { ScheduledEvent } from "@/types/models/scheduledEvent";
import { Typography } from "@/ui/Typography";
import { Flex, SimpleGrid, Stack } from "@mantine/core";
import { Timestamp } from "firebase/firestore";
import { useState } from "react";
import { EventCard } from "./components/eventCard";
import { SearchBar } from "./components/searchbar";
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
        <SimpleGrid cols={4}>
          <EventCard
            eventData={
              {
                title: "Test Event title",
                scheduleDateTime: Timestamp.now(),
                thumbnailFileName: "",
                venue: "Zoom meetings",
              } as ScheduledEvent
            }
          />
        </SimpleGrid>
      </Stack>
    </ProtectedPage>
  );
};
