import { Timestamp } from "firebase/firestore";
import { BaseModel } from ".";

export type Event = BaseModel & EventModel;

export type EventModel = {
  title: string;
  datetime: Timestamp;
  venue: string;
  organizer: string;
  description: string;
  thumbnailFileName: string;
};
