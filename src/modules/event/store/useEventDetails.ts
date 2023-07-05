import { ScheduledEvent } from "@/types/models/scheduledEvent";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { getScheduledEventById } from "../services/eventService";

interface EventDetailStore {
  event?: ScheduledEvent;
  getEvent: (id: string) => Promise<ScheduledEvent | undefined>;
  isValid: boolean;
  loading: boolean;
}

export const useEventDetail = create(
  devtools<EventDetailStore>((set, get) => ({
    loading: true,
    isValid: false,
    async getEvent(id) {
      set({ loading: true });
      const event = get().event;
      if (event && get().isValid) {
        set({ loading: false });
        return event;
      }
      const updatedEvent = await getScheduledEventById(id);
      set({ event: updatedEvent, loading: false, isValid: true });
      return updatedEvent;
    },
  }))
);
