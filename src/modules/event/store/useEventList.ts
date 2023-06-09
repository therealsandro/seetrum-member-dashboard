import { ScheduledEvent } from "@/types/models/scheduledEvent";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { getAllScheduledEvents } from "../services/eventService";

interface EventListStore {
  events?: ScheduledEvent[];
  getEvents: () => Promise<ScheduledEvent[]>;

  sortEvents: (orderBy: keyof ScheduledEvent, sortBy: "asc" | "desc") => void;
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
    async sortEvents(orderBy, sortBy) {
      const eventsList = get().events;
      if (!eventsList || !get().isValid) {
        const evs = await get().getEvents();
        return set({ events: sortData(evs, orderBy, sortBy) });
      }

      return set({ events: sortData(eventsList, orderBy, sortBy) });
    },
  }))
);

function sortData<T>(
  data: T[],
  orderBy: keyof T,
  sort: "asc" | "desc",
  sortFn?: (datum: T) => any
): T[] {
  const sortedData = [...data];

  const compareFn = (a: T, b: T): number => {
    const valueA = sortFn ? sortFn(a) : a[orderBy];
    const valueB = sortFn ? sortFn(b) : b[orderBy];

    if (valueA < valueB) {
      return sort === "asc" ? -1 : 1;
    } else if (valueA > valueB) {
      return sort === "asc" ? 1 : -1;
    } else {
      return 0;
    }
  };

  sortedData.sort(compareFn);

  return sortedData;
}
