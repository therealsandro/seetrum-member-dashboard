import { ScheduledEvent, getDummyEvent } from "@/types/models/scheduledEvent";
import { showErrorNotif } from "@/ui/notifications";
import { Button, Group, Paper, Stack, TextInput } from "@mantine/core";
import { useState } from "react";
import {
  createEventMaster,
  getAllScheduledEvents,
  getScheduledEventById,
} from "../event/services/eventService";
import { Typography } from "@/ui/Typography";
import {
  createEventMember,
  getEventMemberByEventId,
  getEventMemberByMemberId,
} from "../event/services/eventMemberService";
import {
  EventMember,
  EventMemberModel,
  getDummyEventMember,
} from "@/types/models/eventMember";
import { useAuthStore } from "../auth/stores/authStore";

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
      const res = await getScheduledEventById(value);
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
      const res = await getAllScheduledEvents();
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
    <Paper withBorder p="xs">
      <Typography textVariant="title-lg">Event</Typography>
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
          <Button ml="auto" color="red" onClick={() => setEvents([])}>
            Clear
          </Button>
        </Group>
        <pre>{JSON.stringify(events, null, 2)}</pre>
      </Stack>
    </Paper>
  );
};

export const EventMemberPlayground: React.FC = () => {
  const user = useAuthStore((s) => s.user);
  const [eventMembers, setEventMembers] = useState<EventMember[]>([]);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
  };

  const handleGetEventById = async () => {
    setLoading(true);
    try {
      if (!value) throw Error("INPUT CANNOT BE NULL");
      const res = await getEventMemberByMemberId(value);
      if (!res) throw Error("no events");
      setEventMembers(res);
    } catch (e) {
      showErrorNotif({ message: "Cannot fetch events" });
    }
    setLoading(false);
  };

  const handleGetEventMemberByEventId = async () => {
    setLoading(true);
    try {
      if (!value) throw Error("INPUT CANNOT BE NULL");
      const res = await getEventMemberByEventId(value);
      if (!res) throw Error("no events");
      setEventMembers(res);
    } catch (e) {
      showErrorNotif({ message: "Cannot fetch events" });
    }
    setLoading(false);
  };

  const handleCreateEvent = async () => {
    setLoading(true);
    try {
      if (!value) throw Error("EVENT ID CANNOT BE NULL");
      if (!user) throw Error("user CANNOT BE NULL");

      const newEM: EventMemberModel = getDummyEventMember(user);
      await createEventMember({ ...newEM, eventId: value });
    } catch (e) {
      showErrorNotif({ message: (e as Error).message });
    }
    setLoading(false);
  };

  return (
    <Paper withBorder p="xs">
      <Typography textVariant="title-lg">EventMember</Typography>
      <Stack>
        <TextInput label="input" value={value} onChange={handleChange} />
        <Group>
          <Button onClick={handleGetEventMemberByEventId} loading={loading}>
            Get Event Member by Event Id
          </Button>
          <Button onClick={handleGetEventById} loading={loading}>
            Get Event Member by Member id
          </Button>
          <Button color="green" onClick={handleCreateEvent} loading={loading}>
            Create Event Member
          </Button>
          <Button ml="auto" color="red" onClick={() => setEventMembers([])}>
            Clear
          </Button>
        </Group>
        <pre>{JSON.stringify(eventMembers, null, 2)}</pre>
      </Stack>
    </Paper>
  );
};
