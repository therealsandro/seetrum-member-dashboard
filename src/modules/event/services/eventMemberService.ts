import { COLLECTION_EVENT_MEMBER } from "@/lib/constants";
import {
  addNewDocument,
  getCountByQuery,
  getDocumentsByQuery,
  updateDocument,
} from "@/services/firebase/helper";
import { EventMember, EventMemberModel } from "@/types/models/eventMember";
import { where } from "firebase/firestore";

export const getEventMemberByMemberId = async (
  memberId: string
): Promise<EventMember[]> => {
  try {
    return await getDocumentsByQuery<EventMember>(
      COLLECTION_EVENT_MEMBER,
      where("member.id", "==", memberId)
    );
  } catch (e) {
    throw e;
  }
};

export const createEventMember = async (
  payload: EventMemberModel
): Promise<EventMember> => {
  try {
    const res = await addNewDocument<EventMemberModel>(
      COLLECTION_EVENT_MEMBER,
      payload
    );
    return res;
  } catch (e) {
    throw e;
  }
};

export const getEventMemberByEventId = async (
  eventId: string
): Promise<EventMember[]> => {
  try {
    return await getDocumentsByQuery<EventMember>(
      COLLECTION_EVENT_MEMBER,
      where("eventId", "==", eventId)
    );
  } catch (e) {
    throw e;
  }
};

export const getEventMemberCountByEventId = async (
  eventId: string
): Promise<Number> => {
  try {
    return await getCountByQuery(
      COLLECTION_EVENT_MEMBER,
      where("eventId", "==", eventId)
    );
  } catch (e) {
    throw e;
  }
};

export const updateEventMember = async (
  EventMemberId: string,
  payload: Partial<EventMember>
) => {
  try {
    await updateDocument(COLLECTION_EVENT_MEMBER, EventMemberId, payload);
  } catch (e) {
    console.error(e);
    throw e;
  }
};
