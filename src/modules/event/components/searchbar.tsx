import { IconSearch } from "@/ui/Icons";
import { Input, ThemeIcon } from "@mantine/core";
import { useState } from "react";

interface SearchBarProps {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
}
export const SearchBar: React.FC<SearchBarProps> = ({
  value: initialValue,
  placeholder,
  onChange,
}) => {
  const [timeout, setTO] = useState<NodeJS.Timeout>();
  const [value, setValue] = useState<string>(initialValue);

  const handleChange = (val: string) => {
    setValue(val);
    if (timeout) clearTimeout(timeout);
    setTO(
      setTimeout(() => {
        onChange(val);
      }, 1000)
    );
  };

  return (
    <Input
      placeholder={placeholder || "Search events name"}
      radius="lg"
      sx={(theme) => ({
        width: 480,
        [theme.fn.smallerThan("lg")]: {
          width: 256,
        },
        [theme.fn.smallerThan("xs")]: {
          flex: 1,
          width: "unset",
        },
        ".mantine-Input-rightSection": { paddingInline: "4px" },
      })}
      rightSection={
        <ThemeIcon variant="default" size="sm" sx={{ border: "none" }}>
          <IconSearch />
        </ThemeIcon>
      }
      value={value}
      onChange={(e) => {
        const val = e.target.value;
        handleChange(val);
      }}
    ></Input>
  );
};
