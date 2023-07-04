import { ScheduledEvent } from "@/types/models/scheduledEvent";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { getAllScheduledEvents } from "../services/eventService";

interface EventListStore {
  events?: ScheduledEvent[];
  getEvents: () => Promise<ScheduledEvent[]>;

  isValid: boolean;
  loading: boolean;
}

export const useEventsList = create(
  devtools<EventListStore>((set, get) => ({
    isValid: false,
    loading: true,
    getEvents: async () => {
      set({ loading: true });
      if (get().events && get().isValid) {
        set({ loading: false });
        return get().events!;
      }

      const events = await getAllScheduledEvents();
      set({ events, isValid: true, loading: false });
      return events;
    },
  }))
);
