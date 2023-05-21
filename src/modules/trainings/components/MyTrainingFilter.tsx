import { Chip, Flex } from "@mantine/core";
import { useState } from "react";

interface MyTrainingFilterProps {
  value: string;
  onChange: (value: number | string) => void;
}

export const MyTrainingFilter: React.FC<MyTrainingFilterProps> = ({
  value,
  onChange,
}) => {
  const [val, setValue] = useState(value || "0");
  return (
    <Chip.Group
      value={val}
      onChange={(v) => {
        onChange(v as string);
        setValue(v as string);
      }}
    >
      <Flex gap={8}>
        <FilterChip value={"0"} label={"All my trainings"} />
        <FilterChip value={"1"} label={"Applied"} />
        <FilterChip value={"2"} label={"Accepted"} />
        <FilterChip value={"3"} label={"Completed"} />
        <FilterChip value={"4"} label={"Rejected"} />
      </Flex>
    </Chip.Group>
  );
};

const FilterChip = ({ value, label }: { value: string; label: string }) => {
  return (
    <Chip value={value} variant="light" radius="md">
      {label}
    </Chip>
  );
};
