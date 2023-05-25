import { Chip, Flex } from "@mantine/core";
import { useState } from "react";

interface MyTrainingFilterProps {
  value: string;
  onChange: (value: number | string) => void;
}

const filterOptions = [
  { value: "", label: "All my trainings" },
  { value: "applied", label: "Applied" },
  { value: "accepted", label: "Accepted" },
  { value: "issued", label: "Completed" },
  { value: "rejected", label: "Rejected" },
];
export const MyTrainingFilter: React.FC<MyTrainingFilterProps> = ({
  value,
  onChange,
}) => {
  const [val, setValue] = useState(value || "");
  return (
    <Chip.Group
      value={val}
      onChange={(v) => {
        onChange(v as string);
        setValue(v as string);
      }}
    >
      <Flex gap={8}>
        {filterOptions.map((f) => {
          return <FilterChip key={f.value} {...f} />;
        })}
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
