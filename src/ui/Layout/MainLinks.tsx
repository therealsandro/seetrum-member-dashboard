import { NavLink, ThemeIcon } from "@mantine/core";

import { notifications } from "@mantine/notifications";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IconAward, IconBriefcase, IconCalendar, IconHome } from "../Icons";

type NavLinkDataProps = {
  label: string;
  icon?: React.ReactNode;
  link?: string;
};

type MainLinkProps = {
  links?: NavLinkDataProps[];
  onNavigate?: (path: string) => void;
} & NavLinkDataProps;

const MainLink: React.FC<MainLinkProps> = ({
  label,
  icon,
  link,
  links,
  onNavigate = (p) => {},
}) => {
  const navigate = useNavigate();

  const handleNavigate = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    link?: string
  ) => {
    e.preventDefault();
    e.stopPropagation();
    if (link) {
      navigate(link);
      onNavigate(link);
    } else {
      notifications.show({
        title: "Coming Soon",
        message: "Stay tuned for the next updates",
      });
    }
  };
  const location = useLocation();
  const isActive = Boolean(link && location.pathname === link);
  const isChildActive = Boolean(
    links &&
      links
        .map((l) =>
          Boolean(
            l.link &&
              location.pathname.split("/")[1] === l.link.replace("/", "")
          )
        )
        .filter((i) => i).length > 0
  );
  const hasLinks = links && Array.isArray(links);

  return (
    <NavLink
      key={label}
      label={label}
      defaultOpened={isChildActive && hasLinks}
      active={isActive}
      icon={
        <ThemeIcon color="biceblue.5" variant="outline" sx={{ border: "none" }}>
          {icon}
        </ThemeIcon>
      }
      onClick={(e) => !links && handleNavigate(e, link)}
    >
      {hasLinks &&
        links.map((submenu, idx) => {
          const active = Boolean(
            submenu.link &&
              location.pathname.split("/")[1] === submenu.link.replace("/", "")
          );
          return (
            <NavLink
              key={idx}
              {...submenu}
              active={active}
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
      { label: "All Events" /* link: "/events" */ },
      { label: "My Events" /* link: "/myevents" */ },
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
    // link: "/opportunity",
  },
];

export const MainLinks: React.FC<{ onNavigate: (path: string) => void }> = ({
  onNavigate,
}) => {
  const links = data.map((menu, idx) => (
    <MainLink key={idx} {...menu} onNavigate={onNavigate} />
  ));
  return <div>{links}</div>;
};
