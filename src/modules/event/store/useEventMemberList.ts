import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { getEventMemberByMemberId } from "../services/eventMemberService";
import { EventMember } from "@/types/models/eventMember";

interface EventMemberListStore {
  memberId?: string;
  eventMembers?: EventMember[];
  getEventMembers: (memberId: string) => Promise<EventMember[]>;
  getByEventId: (eventId: string) => EventMember | undefined;

  loading?: boolean;
  isValid?: boolean;
}

export const useEventMemberList = create(
  devtools<EventMemberListStore>((set, get) => ({
    loading: true,
    isValid: false,
    getEventMembers: async (memberId: string) => {
      set({ loading: true });
      const id = get().memberId;
      const eventMembers = get().eventMembers;
      if (id && eventMembers && id === memberId && get().isValid)
        return eventMembers;

      const events = await getEventMemberByMemberId(memberId);
      set({ eventMembers: events, memberId, isValid: true, loading: false });
      return events;
    },
    getByEventId(eventId) {
      const memberId = get().memberId;
      const eventMembers = get().eventMembers;
      if (!memberId || !eventMembers) return;

      return eventMembers.find((em) => em.eventId === eventId);
    },
  }))
);
