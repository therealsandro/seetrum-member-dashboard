import { Typography } from "@/ui/Typography";
import { Group, MediaQuery, Menu, Button } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
import { useState } from "react";

const sortOptions = {
  "createdAt desc": { label: "Newest", sort: [0, 1] },
  "createdAt asc": { label: "Oldest", sort: [0, 0] },
  "title asc": { label: "Event title (A-Z)", sort: [1, 0] },
  "title desc": { label: "Event title (Z-A)", sort: [1, 1] },
} as const;

type sortOption = keyof typeof sortOptions;

export const SortMenu: React.FC<{
  onSortChanged: (value: [number, number]) => void;
}> = ({ onSortChanged }) => {
  const [sortBy, setSortBy] = useState<sortOption>("createdAt desc");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [sortByOps, setSortByOps] = useState<[number, number]>([0, 1]);
  return (
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
                  setSortByOps(sortOption.sort as [number, number]);
                  onSortChanged(sortOption.sort as [number, number]);
                }}
              >
                {sortOption.label}
              </Menu.Item>
            ))}
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
};
