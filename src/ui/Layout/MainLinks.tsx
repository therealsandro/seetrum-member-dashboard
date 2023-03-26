import { ThemeIcon } from "@mantine/core";

import { Group, Text, UnstyledButton } from "@mantine/core";
import React from "react";
import { IconArrowLeft } from "../Icons";

interface MainLinkProps {
  icon: React.ReactNode;
  color: string;
  label: string;
}

const MainLink: React.FC<MainLinkProps> = ({ icon, color, label }) => {
  return (
    <UnstyledButton
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
        <ThemeIcon color={color} variant="light">
          {icon}
        </ThemeIcon>

        <Text size="sm">{label}</Text>
      </Group>
    </UnstyledButton>
  );
};

const data = [
  {
    icon: <IconArrowLeft size="1rem" />,
    color: "blue",
    label: "Home",
  },
  { icon: <IconArrowLeft size="1rem" />, color: "teal", label: "Events" },
  {
    icon: <IconArrowLeft size="1rem" />,
    color: "violet",
    label: "Knowledge",
  },
  { icon: <IconArrowLeft size="1rem" />, color: "grape", label: "Opportunity" },
];

export const MainLinks: React.FC = () => {
  const links = data.map((link) => <MainLink {...link} key={link.label} />);
  return <div>{links}</div>;
};
