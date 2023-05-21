import { BaseModel } from ".";
import { FileInfo } from "./fileInfo";

export type TrainingMember = BaseModel & TrainingMemberModel;

export type TrainingMemberModel = {
  name: string;
  email: string;
  age: string;
  phoneNumber: string;
  trainingId: string;
  memberId: string;
  status: string;
  issuedCertificate: string;
  gender: string;
  employmentStatus: string;
  address: string;
  requiredFiles: FileInfo[];
};
