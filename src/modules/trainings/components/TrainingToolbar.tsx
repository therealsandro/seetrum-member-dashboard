import { IconSearch } from "@/ui/Icons";
import { Typography } from "@/ui/Typography";
import {
  Flex,
  Group,
  Input,
  MediaQuery,
  ScrollArea,
  Select,
  ThemeIcon,
} from "@mantine/core";
import { useDebouncedState } from "@mantine/hooks";
import { useEffect, useState } from "react";

interface TrainingToolbarProps {
  myTrainings?: boolean;
  onSearchChanged: (val: string) => void;
  onSortChanged: (val: string) => void;
  children?: React.ReactNode;
}

export const TrainingToolbar: React.FC<TrainingToolbarProps> = ({
  myTrainings = false,
  onSearchChanged,
  onSortChanged,
  children,
}) => {
  const sotrOptions = {
    "createdAt desc": { label: "Newest" },
    "createdAt asc": { label: "Oldest" },
    "title asc": { label: "Training title (A-Z)" },
    "title desc": { label: "Training title (Z-A)" },
  } as const;
  const [searchValue, setSearchValue] = useDebouncedState("", 500);
  const [sortBy, setSortBy] =
    useState<keyof typeof sotrOptions>("createdAt desc");

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
      <Flex
        justify={"space-between"}
        gap={16}
        sx={(theme) => ({
          [theme.fn.smallerThan("xs")]: {
            flexDirection: "column",
          },
        })}
      >
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
            <Select
              sx={(theme) => ({
                flexShrink: 0,
                input: {
                  borderRadius: "8px !important",
                },
                [theme.fn.smallerThan("xs")]: {
                  flex: 1,
                  width: "100%",
                },
              })}
              value={sortBy}
              data={Object.entries(sotrOptions).map((sortOption) =>
                Object.assign(sortOption[1], { value: sortOption[0] })
              )}
              onChange={(val) => {
                if (val) {
                  setSortBy(val as keyof typeof sotrOptions);
                  onSortChanged(val);
                }
              }}
            />
          </Group>
        )}
      </Flex>
      {Boolean(children) && <ScrollArea>{children}</ScrollArea>}
    </Flex>
  );
};
