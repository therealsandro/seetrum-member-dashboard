import { ProtectedPage } from "@/modules/auth/components/ProtectedPage";
import { EventCard } from "@/modules/event/components/eventCard";
import { SearchBar } from "@/modules/event/components/searchbar";
import { SortMenu } from "@/modules/event/components/sortMenu";
import { useEventsList } from "@/modules/event/store/useEventList";
import { IconChevronDown, IconPlus } from "@/ui/Icons";
import { Typography } from "@/ui/Typography";
import {
  Button,
  Flex,
  SimpleGrid,
  Stack,
  useMantineTheme,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useMediaQuery } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { CreateNewEventDialog } from "./dialog/createNewEvent";

export const EventManagementList = () => {
  const t = useMantineTheme();
  const smallerThanSM = useMediaQuery(`(max-width: ${t.breakpoints.sm}`);
  const [createEvent, setCreateEvent] = useState<boolean>(false);
  const [search, setSearch] = useState<string>();
  const { events, getEvents, sortEvents, loading } = useEventsList();
  const [dateFilter, setDateFilter] = useState<Date>();
  useEffect(() => {
    getEvents();
  }, [getEvents]);

  var filteredEvents = events?.filter((event) =>
    search ? event.title.toLowerCase() === search.toLowerCase() : true
  );
  if (dateFilter && filteredEvents) {
    const startDate = new Date(dateFilter.toISOString());
    const endDate = new Date(dateFilter.toISOString());
    endDate.setHours(23, 59, 59);
    filteredEvents = filteredEvents.filter((ev) => {
      const dtMs = ev.scheduleDateTime.toDate();
      return dtMs > startDate && dtMs < endDate;
    });
  }
  const isEmpty = filteredEvents?.length === 0;

  return (
    <ProtectedPage>
      <Stack spacing={24}>
        <Flex justify="space-between">
          <Typography textVariant="headline-lg">All Events</Typography>
          <Button
            radius={8}
            leftIcon={<IconPlus />}
            onClick={() => setCreateEvent(true)}
          >
            Create a new event
          </Button>
        </Flex>
        <Flex justify="space-between">
          <SearchBar
            value={search || ""}
            onChange={(value) => setSearch(value)}
          />
        </Flex>
        <Flex justify="space-between">
          <DatePickerInput
            placeholder="Event date"
            radius={8}
            rightSection={<IconChevronDown size={14} />}
            rightSectionProps={{
              style: { cursor: "pointer" },
              onClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
                e.preventDefault();
                e.stopPropagation();
                const isOpened =
                  document.querySelectorAll(".mantine-Calendar-calendar")
                    .length > 0;
                const parent = e.currentTarget.parentElement
                  ?.firstElementChild as HTMLElement | undefined;
                if (!isOpened) {
                  parent?.click();
                } else {
                  e.currentTarget.click();
                }
              },
            }}
            allowDeselect
            onChange={(date) => {
              setDateFilter(date ? (date as Date) : undefined);
            }}
          />
          <SortMenu
            onSortChanged={(val) => {
              sortEvents(val[0], val[1] as "asc" | "desc");
            }}
          />
        </Flex>
        <SimpleGrid cols={isEmpty || smallerThanSM ? 1 : 4}>
          {!filteredEvents || loading
            ? Array(8)
                .fill("-")
                .map((e, i) => <EventCard loading key={i} />)
            : filteredEvents.map((ev) => (
                <EventCard eventData={ev} key={ev.id} />
              ))}
          {/* TODO: Add empty state */}
          {/* isEmpty && <EmptyData desc={""}>
            <Button onClick={() => {}} leftIcon={<IconPlus />}>
              Add event
            </Button>
          </EmptyData> */}
        </SimpleGrid>
        <CreateNewEventDialog
          isOpen={createEvent}
          onClose={() => setCreateEvent(false)}
          onDone={(event) => {
            console.log(1349, event);
          }}
        />
      </Stack>
    </ProtectedPage>
  );
};
