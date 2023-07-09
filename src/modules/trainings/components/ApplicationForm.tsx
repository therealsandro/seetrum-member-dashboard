import { kProvinsi } from "@/lib/constants";
import { FileInfo } from "@/types/models/fileInfo";
import { Training } from "@/types/models/training";
import { TrainingMemberModel } from "@/types/models/trainingMember";
import { FileUploadButton } from "@/ui/Button";
import { InputFromMeta } from "@/ui/Input";
import { Flex, Select, TextInput, Textarea } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";

const fIDummy: FileInfo = {
  tag: "dummy",
  contentType: "",
  filename: "",
  size: 0,
};

export interface ApplicationFormProps {
  step: number;
  training: Training;
  form: UseFormReturnType<TrainingMemberModel>;
}

export const ApplicationForm: React.FC<ApplicationFormProps> = ({
  step,
  training,
  form,
}) => {
  const handleChange = (idx: number) => (value: string) => {
    form.setFieldValue("additionalData." + idx + ".value", value);
  };

  if (step === 0) {
    return (
      <Flex direction={"column"} gap={24}>
        <TextInput
          placeholder="Enter your full name"
          label="Full name"
          withAsterisk
          {...form.getInputProps("name")}
        />
        <TextInput
          placeholder="Enter your email"
          label="Email"
          type="email"
          withAsterisk
          {...form.getInputProps("email")}
        />
        <TextInput
          placeholder="Enter your mobile phone number"
          label="Mobile phone number"
          withAsterisk
          {...form.getInputProps("phoneNumber")}
        />
        <TextInput
          placeholder="Enter your age"
          label="Age"
          type="number"
          withAsterisk
          {...form.getInputProps("age")}
          value={form.values.age ? form.values.age.valueOf() : undefined}
        />
        <Select
          placeholder="Enter your gender"
          label="Gender"
          withAsterisk
          data={[
            { value: "male", label: "Male" },
            { value: "female", label: "Female" },
          ]}
          {...form.getInputProps("gender")}
        />
        <Select
          placeholder="Enter your employment status"
          label="Employment status"
          withAsterisk
          data={[
            { value: "unemployed", label: "Unemployed" },
            { value: "employed", label: "Employed" },
          ]}
          {...form.getInputProps("employmentStatus")}
          onChange={(val) => {
            form.setFieldValue(
              "institutionName",
              val === "unemployed" ? "-" : ""
            );
            form.setFieldValue(
              "employmentStatus",
              val as typeof form.values.employmentStatus
            );
          }}
        />
        <TextInput
          placeholder="Enter your current institution"
          label="Current institution"
          disabled={form.values.employmentStatus !== "employed"}
          withAsterisk={form.values.employmentStatus === "employed"}
          {...form.getInputProps("institutionName")}
        />
        <Textarea
          placeholder="Enter your address"
          label="Address"
          withAsterisk
          {...form.getInputProps("address")}
        />
        <Select
          data={kProvinsi}
          placeholder="Pick your province"
          label="Province"
          withAsterisk
          searchable
          nothingFound="Not found"
          {...form.getInputProps("province")}
        />
        <TextInput
          placeholder="Enter your postal code"
          label="Postal code"
          withAsterisk
          {...form.getInputProps("postalCode")}
        />
      </Flex>
    );
  }

  if (step === 1 && training.formMetas && training.formMetas.length > 0) {
    return (
      <Flex direction="column" gap={24}>
        {training.formMetas.map((m, idx) => (
          <InputFromMeta
            key={m.label}
            meta={m}
            value={form.values.additionalData![idx].value}
            onChange={handleChange(idx)}
            error={form.errors.additionalData}
          />
        ))}
      </Flex>
    );
  }

  return (
    <Flex direction="column" gap={24}>
      {training.fileRequirements.map((fR, indexFile) => {
        const uploadedFile =
          form.values.requiredFiles && form.values.requiredFiles[indexFile];
        const isDummy: boolean = Boolean(
          uploadedFile && uploadedFile.tag === fIDummy.tag
        );
        return (
          <FileUploadButton
            key={indexFile}
            value={isDummy ? undefined : uploadedFile}
            error={fR.required && isDummy ? "-" : undefined}
            onFileChange={(fI) => {
              form.setFieldValue(`requiredFiles.${indexFile}`, fI ?? fIDummy);
            }}
            {...fR}
          />
        );
      })}
    </Flex>
  );
};
