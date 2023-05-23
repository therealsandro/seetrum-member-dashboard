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
    if (user) setApplicationForm({ ...user, employmentStatus: user.userType });
  }, [user, setApplicationForm]);

  switch (step) {
    case 0:
      return (
        <Flex direction={"column"} gap={24}>
          <TextInput
            placeholder="Enter your full name"
            label="Full name"
            withAsterisk
            value={applicationForm?.name ?? ""}
            onChange={(e) => setApplicationForm({ name: e.target.value })}
          />
          <TextInput
            placeholder="Enter your email"
            label="Email"
            withAsterisk
            value={applicationForm?.email ?? ""}
            onChange={(e) => setApplicationForm({ email: e.target.value })}
          />
          <TextInput
            placeholder="Enter your mobile phone number"
            label="Mobile phone number"
            withAsterisk
            value={applicationForm?.phoneNumber ?? ""}
            onChange={(e) =>
              setApplicationForm({ phoneNumber: e.target.value })
            }
          />
          <TextInput
            type="number"
            placeholder="Enter your age"
            label="Age"
            withAsterisk
            value={applicationForm?.age?.toString() ?? ""}
            onChange={(e) =>
              setApplicationForm({ age: parseInt(e.target.value) })
            }
          />
          <Select
            placeholder="Enter your gender"
            label="Gender"
            data={[
              { value: "male", label: "Male" },
              { value: "female", label: "Female" },
            ]}
            withAsterisk
            value={applicationForm?.gender ?? ""}
            onChange={(e) => e && setApplicationForm({ gender: e })}
          />
          <Select
            placeholder="Enter your employment status"
            label="Employment status"
            withAsterisk
            value={applicationForm?.employmentStatus ?? ""}
            onChange={(e) => e && setApplicationForm({ employmentStatus: e })}
            data={[
              { value: "individual", label: "Unemployed" },
              { value: "organization", label: "Employed" },
            ]}
          />
          <TextInput
            placeholder="Enter your current institution"
            label="Current institution"
            withAsterisk
            // value={applicationForm?.employmentStatus ?? ''}
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
            value={applicationForm?.address ?? ""}
            onChange={(e) => setApplicationForm({ address: e.target.value })}
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
