export type User = {
  id: string;
} & Omit<UserRegistrationData, "password">;

export type UserRegistrationData = {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  userType: "individual" | "organization";
  address: string;
  informationChannel: string;
  motivationToJoin: string;
  organization?: Organization;
};

type Organization = {
  industry: string;
  picName: string;
  picEmail: string;
  picPhoneNumber: string;
};
