import { Timestamp } from "firebase/firestore";

export type BaseModel = {
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
};

export * from "./user";
