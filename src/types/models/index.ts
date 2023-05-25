import { Timestamp } from "firebase/firestore";

export type BaseModel = {
  id: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
};

export * from "./user";
