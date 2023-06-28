import { ScheduledEvent, getDummyEvent } from "@/types/models/scheduledEvent";
import { showErrorNotif } from "@/ui/notifications";
import { Button, Group, Stack, TextInput } from "@mantine/core";
import { useState } from "react";
import {
  createEventMaster,
  getAllEvents,
  getEventById,
} from "../event/services/eventService";

export const EventPlayground: React.FC = () => {
  const [events, setEvents] = useState<ScheduledEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
  };

  const handleGetEventById = async () => {
    setLoading(true);
    try {
      const res = await getEventById(value);
      if (!res) throw Error("no events");
      setEvents([res]);
    } catch (e) {
      showErrorNotif({ message: "Cannot fetch events" });
    }
    setLoading(false);
  };

  const handleGetAllEvents = async () => {
    setLoading(true);
    try {
      const res = await getAllEvents();
      if (!res) throw Error("no events");
      setEvents(res);
    } catch (e) {
      showErrorNotif({ message: "Cannot fetch events" });
    }
    setLoading(false);
  };

  const handleCreateEvent = async () => {
    setLoading(true);
    try {
      await createEventMaster(getDummyEvent());
      await handleGetAllEvents();
    } catch (e) {
      showErrorNotif({ message: "Cannot fetch events" });
    }
    setLoading(false);
  };

  return (
    <Stack>
      <TextInput label="input" value={value} onChange={handleChange} />
      <Group>
        <Button onClick={handleGetAllEvents} loading={loading}>
          Get All Events
        </Button>
        <Button onClick={handleGetEventById} loading={loading}>
          Get event by id
        </Button>
        <Button color="green" onClick={handleCreateEvent} loading={loading}>
          create event
        </Button>
      </Group>
      <pre>{JSON.stringify(events, null, 2)}</pre>
    </Stack>
  );
};
