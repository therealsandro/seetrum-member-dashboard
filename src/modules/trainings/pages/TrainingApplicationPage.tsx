import { Typography } from "@/ui/Typography";
import { Flex, Select, TextInput, Textarea } from "@mantine/core";
import { useOutletContext } from "react-router-dom";
import { useApplicationFrom } from "../store/useApplicaitonForm";
import { shallow } from "zustand/shallow";
import { useAuthStore } from "@/modules/auth/stores/authStore";
import { useEffect } from "react";

export const TrainingApplicationPage: React.FC = () => {
  const step = useOutletContext<number>();
  const [applicationForm, setApplicationForm] = useApplicationFrom(
    (state) => [state.trainingMember, state.setTrainingMember],
    shallow
  );
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (user) setApplicationForm({ ...user });
  }, [user, setApplicationForm]);

  switch (step) {
    case 0:
      return (
        <Flex direction={"column"} gap={24}>
          <TextInput
            placeholder="Enter your full name"
            label="Full name"
            withAsterisk
          />
          <TextInput
            placeholder="Enter your email"
            label="Email"
            withAsterisk
          />
          <TextInput
            placeholder="Enter your mobile phone number"
            label="Mobile phone number"
            withAsterisk
          />
          <TextInput
            type="number"
            placeholder="Enter your age"
            label="Age"
            withAsterisk
          />
          <Select
            placeholder="Enter your gender"
            label="Gender"
            data={[
              { value: "male", label: "Male" },
              { value: "female", label: "Female" },
            ]}
            withAsterisk
          />
          <Select
            placeholder="Enter your employment status"
            label="Employment status"
            withAsterisk
            data={[
              { value: "unemployed", label: "Unemployed" },
              { value: "employed", label: "Employed" },
              { value: "student", label: "Student" },
            ]}
          />
          <TextInput
            placeholder="Enter your current institution"
            label="Current institution"
            withAsterisk
          />
        </Flex>
      );

    case 1:
      return (
        <Flex direction="column" gap={24}>
          <Textarea
            placeholder="Enter your address"
            label="Address"
            withAsterisk
          />
          <Select
            data={[{ value: "test", label: "Test Selector" }]}
            placeholder="Pick your province"
            label="Province"
            withAsterisk
          />
          <Select
            data={[{ value: "test", label: "Test Selector" }]}
            placeholder="Pick your city/Region"
            label="City/Region"
            disabled
            withAsterisk
          />
          <Select
            data={[{ value: "test", label: "Test Selector" }]}
            placeholder="Pick your district"
            label="District"
            disabled
            withAsterisk
          />
          <TextInput
            placeholder="Enter your postal code"
            label="Postal code"
            withAsterisk
          />
        </Flex>
      );

    default:
      return (
        <Flex direction="column" gap={24}>
          <Typography>File Uploader forms</Typography>
        </Flex>
      );
  }
};
