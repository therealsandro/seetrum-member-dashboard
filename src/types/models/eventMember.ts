import { BaseModel, User } from ".";

export type EventMember = BaseModel & EventMemberModel;

export type EventMemberModel = {
  eventId: string;
  member: User;
};

export const getDummyEventMember = (user: User) => {
  const eventMemberModel: EventMemberModel = {
    eventId: "dummyEvent",
    member: user,
  };

  return eventMemberModel;
};
