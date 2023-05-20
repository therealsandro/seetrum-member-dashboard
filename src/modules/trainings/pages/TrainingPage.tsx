import { ProtectedPage } from "@/modules/auth/components/ProtectedPage";
import { IconSearch } from "@/ui/Icons";
import { Typography } from "@/ui/Typography";
import { Flex, Group, Input, Select, ThemeIcon } from "@mantine/core";
import React from "react";

export const TrainingsPage: React.FC = () => {
  return (
    <ProtectedPage>
      <Flex gap={24} direction="column">
        <Typography textVariant="headline-lg">All Trainings</Typography>
        {/* Toolbar */}
        <Flex justify={"space-between"}>
          <Input
            placeholder="Search events name"
            radius="lg"
            sx={(theme) => ({
              width: 480,
              [theme.fn.smallerThan("lg")]: {
                width: 200,
              },
              ".mantine-Input-rightSection": { paddingInline: "4px" },
            })}
            rightSection={
              <ThemeIcon variant="default" size="sm" sx={{ border: "none" }}>
                <IconSearch />
              </ThemeIcon>
            }
          />
          <Group>
            <Typography textVariant="title-md">Sort by</Typography>
            <Select
              value={"newest"}
              data={[
                { value: "newest", label: "Newest" },
                { value: "oldest", label: "Oldest" },
                { value: "titleAZ", label: "Training title (A-Z)" },
                { value: "titleZA", label: "Training title (Z-A)" },
              ]}
            />
          </Group>
        </Flex>
      </Flex>
    </ProtectedPage>
  );
};
