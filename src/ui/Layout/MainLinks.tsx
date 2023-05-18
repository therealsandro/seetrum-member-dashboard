import { NavLink, ThemeIcon } from "@mantine/core";

import { notifications } from "@mantine/notifications";
import React from "react";
import { IconAward, IconBriefcase, IconCalendar, IconHome } from "../Icons";

type NavLinkDataProps = {
  label: string;
  icon?: React.ReactNode;
  link?: string;
};

type MainLinkProps = {
  links?: NavLinkDataProps[];
} & NavLinkDataProps;

const MainLink: React.FC<MainLinkProps> = ({ label, icon, link, links }) => {
  const handleNavigate = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    link?: string
  ) => {
    e.preventDefault();
    e.stopPropagation();
    if (link) {
      notifications.show({
        title: "Coming Soon",
        message: "Stay tuned for the next updates",
      });
    }
    // TODO: handle navigate to the `${link}`
  };
  // const isActive = // TODO: calculate active state from current url path
  const hasLinks = links && Array.isArray(links);

  return (
    <NavLink
      key={label}
      label={label}
      icon={
        <ThemeIcon color="biceblue.5" variant="outline" sx={{ border: "none" }}>
          {icon}
        </ThemeIcon>
      }
      onClick={(e) => handleNavigate(e, link)}
    >
      {hasLinks &&
        links.map((submenu, idx) => {
          return (
            <NavLink
              key={idx}
              {...submenu}
              onClick={(e) => handleNavigate(e, submenu.link)}
              sx={(theme) => ({
                borderLeft: "1px solid",
                borderColor: theme.colors.gray[4],
                marginInlineStart: 4,
                paddingInlineStart: 26,
              })}
            />
          );
        })}
    </NavLink>
  );
};

const data: MainLinkProps[] = [
  {
    icon: <IconHome size="1rem" />,
    label: "Home",
    link: "/",
  },
  {
    icon: <IconCalendar size="1rem" />,
    label: "Events",
    links: [
      { label: "All Events", link: "/events" },
      { label: "My Events", link: "/myevents" },
    ],
  },
  {
    icon: <IconAward size="1rem" />,
    label: "Trainings",
    links: [
      { label: "All trainings", link: "/trainings" },
      { label: "My trainings", link: "/mytrainings" },
    ],
  },
  {
    icon: <IconBriefcase size="1rem" />,
    label: "Opportunity",
    link: "/opportunity",
  },
];

export const MainLinks: React.FC = () => {
  const links = data.map((menu, idx) => <MainLink key={idx} {...menu} />);
  return <div>{links}</div>;
};
