import { ThemeIcon } from "@mantine/core";

import { Group, Text, UnstyledButton } from "@mantine/core";
import React from "react";
import {
  IconArrowLeft,
  IconAward,
  IconBriefcase,
  IconCalendar,
  IconHome,
  IconLightBulb,
} from "../Icons";
import { notifications } from "@mantine/notifications";

interface MainLinkProps {
  icon: React.ReactNode;
  color: string;
  label: string;
}

const MainLink: React.FC<MainLinkProps> = ({ icon, color, label }) => {
  const handleClick = () => {
    notifications.show({
      title: "Coming Soon",
      message: "Stay tuned for the next updates",
    });
  };
  return (
    <UnstyledButton
      onClick={handleClick}
      sx={(theme) => ({
        display: "block",
        width: "100%",
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color:
          theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

        "&:hover": {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[6]
              : theme.colors.gray[0],
        },
      })}
    >
      <Group>
        <ThemeIcon variant="light">{icon}</ThemeIcon>

        <Text size="sm">{label}</Text>
      </Group>
    </UnstyledButton>
  );
};

const data = [
  {
    icon: <IconHome size="1rem" />,
    color: "blue",
    label: "Home",
  },
  { icon: <IconCalendar size="1rem" />, color: "teal", label: "Events" },
  {
    icon: <IconLightBulb size="1rem" />,
    color: "violet",
    label: "Knowledge",
  },
  { icon: <IconBriefcase size="1rem" />, color: "grape", label: "Opportunity" },
  { icon: <IconAward size="1rem" />, color: "grape", label: "Certification" },
];

export const MainLinks: React.FC = () => {
  const links = data.map((link) => <MainLink {...link} key={link.label} />);
  return <div>{links}</div>;
};
