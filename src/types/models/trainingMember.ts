import { BaseModel } from ".";
import { FileInfo, fileInfoDummy } from "./fileInfo";

export type TrainingMember = BaseModel & TrainingMemberModel;

export type TrainingMemberModel = {
  name: string;
  email: string;
  age: Number;
  phoneNumber: string;
  trainingId: string;
  memberId: string;
  status: "applied" | "accepted" | "rejected" | "issued";
  issuedCertificate: string;
  gender: "female" | "male";
  employmentStatus: "unemployed" | "employed";
  institutionName: string;
  address: string;
  province: string;
  postalCode: string;
  requiredFiles: FileInfo[];
};

export const trainingMemberDummy: TrainingMemberModel = {
  memberId: "79MOhVJiA5Sz3Wj5umBLSimRQFh1",
  name: "ASDF ASDF",
  email: "asdf@asdf.com",
  age: 20,
  phoneNumber: "08123123123",
  trainingId: "c8wzhSGbozS3QcW5ae5h",
  status: "applied",
  issuedCertificate: "",
  gender: "male",
  employmentStatus: "employed",
  institutionName: "Seetrum",
  address: "Jawa Tengah",
  province: "Jawa Tengah",
  postalCode: "12345",
  requiredFiles: [fileInfoDummy],
};
