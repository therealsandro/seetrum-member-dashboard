import { FormMeta } from "@/types/models/inputMeta";
import { InputFromMeta } from "@/ui/Input";
import { Button, Paper, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect } from "react";

const formMetas: FormMeta[] = [
  {
    label: "Full name",
    inputType: "input",
    data: [],
    required: false,
  },
  {
    label: "Social Media",
    inputType: "input",
    data: [],
    required: true,
  },
  {
    label: "Gender",
    inputType: "select",
    data: ["Male", "Female", "Shemale"],
    required: true,
  },
  {
    label: "Desired role",
    inputType: "select",
    data: ["Developer", "Designer", "Product Manager"],
    required: true,
  },
];

type FormValues = {
  additionalData: Info[];
};

type Info = {
  label: string;
  value: string;
};

export const FormPlayground: React.FC = () => {
  const form = useForm<FormValues>({
    initialValues: {
      additionalData: [],
    },
    validate: (values) => {
      const additionalDataCheck = values.additionalData.some(
        (d, idx) => formMetas[idx].required && !d.value
      );

      return {
        additionalData: additionalDataCheck ? "Required" : null,
      };
    },
  });

  useEffect(() => {
    form.setFieldValue(
      "additionalData",
      formMetas.map((m) => ({ label: m.label, value: "" }))
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formMetas]);

  const handleChange = (idx: number) => (value: string) => {
    form.setFieldValue("additionalData." + idx + ".value", value);
  };

  const handleSubmit = form.onSubmit((values) => {
    console.log(values);
  });

  return (
    <Paper>
      <form onSubmit={handleSubmit}>
        <Stack>
          {formMetas.map((m, idx) => (
            <InputFromMeta
              key={m.label}
              meta={m}
              value={form.values.additionalData[idx]?.value}
              onChange={handleChange(idx)}
              error={form.errors.additionalData}
            />
          ))}
          <Button type="submit">Submit</Button>
        </Stack>
      </form>
      <pre>{JSON.stringify(form.values, null, 2)}</pre>
    </Paper>
  );
};
