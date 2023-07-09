import { FormMeta } from "@/types/models/inputMeta";
import { Select, TextInput } from "@mantine/core";

export interface FormMetaProps {
  meta: FormMeta;
  value: string;
  error?: React.ReactNode;
  onChange(v: string): void;
}

export const InputFromMeta: React.FC<FormMetaProps> = ({
  meta,
  error,
  value,
  onChange,
}) => {
  const errorNode =
    error && meta.required && !value ? "This field is required" : undefined;
  if (meta.inputType === "input") {
    return (
      <TextInput
        label={meta.name}
        error={errorNode}
        onChange={(e) => onChange(e.currentTarget.value)}
        withAsterisk={meta.required}
      />
    );
  } else if (meta.inputType === "select") {
    return (
      <Select
        label={meta.name}
        data={meta.data}
        value={value}
        error={errorNode}
        onChange={onChange}
        withAsterisk={meta.required}
      />
    );
  } else {
    return null;
  }
};
