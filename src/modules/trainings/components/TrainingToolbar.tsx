import { IconChevronDown, IconSearch } from "@/ui/Icons";
import { Typography } from "@/ui/Typography";
import {
  Button,
  Flex,
  Group,
  Input,
  MediaQuery,
  Menu,
  ScrollArea,
  ThemeIcon,
} from "@mantine/core";
import { useDebouncedState } from "@mantine/hooks";
import { useEffect, useState } from "react";

const sortOptions = {
  "createdAt desc": { label: "Newest" },
  "createdAt asc": { label: "Oldest" },
  "title asc": { label: "Training title (A-Z)" },
  "title desc": { label: "Training title (Z-A)" },
} as const;

interface TrainingToolbarProps {
  myTrainings?: boolean;
  onSearchChanged: (val: string) => void;
  onSortChanged: (val: keyof typeof sortOptions) => void;
  children?: React.ReactNode;
}

type sortOption = keyof typeof sortOptions;

export const TrainingToolbar: React.FC<TrainingToolbarProps> = ({
  myTrainings = false,
  onSearchChanged,
  onSortChanged,
  children,
}) => {
  const [searchValue, setSearchValue] = useDebouncedState("", 500);
  const [sortBy, setSortBy] = useState<sortOption>("createdAt desc");

  useEffect(() => {
    onSearchChanged(searchValue);
  }, [searchValue, onSearchChanged]);

  return (
    <Flex
      py={16}
      mt={8}
      mx={-20}
      px={20}
      direction="column"
      rowGap={24}
      sx={{
        position: "sticky",
        top: 59,
        zIndex: 1,
        backgroundColor: "rgba(255, 255, 255, 0.85)",
        backdropFilter: "blur(16px)",
      }}
    >
      <Flex justify={"space-between"} gap={16}>
        <Input
          placeholder="Search events name"
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
          onChange={(event) => {
            event.preventDefault();
            event.stopPropagation();
            setSearchValue(event.target.value);
          }}
        />
        {!myTrainings && (
          <Group>
            <MediaQuery styles={{ display: "none" }} smallerThan={"xs"}>
              <Typography textVariant="title-md">Sort by</Typography>
            </MediaQuery>
            <Menu position="bottom-end">
              <Menu.Target>
                <Button
                  variant="outline"
                  color="black"
                  radius={"md"}
                  sx={(theme) => ({ borderColor: theme.colors.gray[4] })}
                  rightIcon={<IconChevronDown />}
                >
                  <Typography textVariant="label-lg" color="black">
                    {sortOptions[sortBy].label}
                  </Typography>
                </Button>
              </Menu.Target>
              <Menu.Dropdown sx={{ minWidth: 200 }}>
                {Object.entries(sortOptions)
                  .map((sortOption) =>
                    Object.assign(sortOption[1], { value: sortOption[0] })
                  )
                  .map((sortOption) => (
                    <Menu.Item
                      key={sortOption.value}
                      value={sortOption.value}
                      sx={(theme) => ({
                        background:
                          sortBy === sortOption.value
                            ? theme.colors.blue[0]
                            : "unset",
                        ":hover": {
                          background:
                            sortBy === sortOption.value
                              ? theme.colors.blue[0]
                              : theme.colors.gray[0],
                        },
                      })}
                      onClick={() => {
                        setSortBy(sortOption.value as sortOption);
                        onSortChanged(sortOption.value as sortOption);
                      }}
                    >
                      {sortOption.label}
                    </Menu.Item>
                  ))}
              </Menu.Dropdown>
            </Menu>
          </Group>
        )}
      </Flex>
      {Boolean(children) && <ScrollArea>{children}</ScrollArea>}
    </Flex>
  );
};
