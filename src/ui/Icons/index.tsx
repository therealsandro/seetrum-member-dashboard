import { Stack } from "@mantine/core";
import { ReactNode } from "react";
import {
  BsArrowLeft,
  BsArrowRight,
  BsAward,
  BsBriefcase,
  BsCalendarWeek,
  BsHouse,
  BsLightbulb,
  BsPeople,
  BsPerson,
  BsSearch,
  BsX,
  BsWhatsapp,
  BsChevronRight,
  BsChevronDown,
  BsCalendarEvent,
  BsClockHistory,
  BsBoxArrowUpRight,
  BsFiletypePdf,
  BsUpload,
  BsTrash,
  BsExclamationCircle,
  BsAsterisk,
  BsBoxArrowRight,
  BsGear,
} from "react-icons/bs";

export const IconArrowLeft = BsArrowLeft;
export const IconArrowRight = BsArrowRight;
export const IconChevronRight = BsChevronRight;
export const IconChevronDown = BsChevronDown;
export const IconBoxArrowUpRight = BsBoxArrowUpRight;
export const IconBoxArrowRight = BsBoxArrowRight;

export const IconPerson = BsPerson;
export const IconPeople = BsPeople;

export const IconX = BsX;
export const IconHome = BsHouse;
export const IconCalendar = BsCalendarWeek;
export const IconLightBulb = BsLightbulb;
export const IconBriefcase = BsBriefcase;
export const IconAward = BsAward;
export const IconCalendarEvent = BsCalendarEvent;
export const IconClockHistory = BsClockHistory;

export const IconSearch = BsSearch;

export const IconWhatsapp = BsWhatsapp;

export const IconPDF = BsFiletypePdf;

export const IconUpload = BsUpload;
export const IconTrash = BsTrash;
export const IconExclamation = BsExclamationCircle;
export const IconAsterisk = BsAsterisk;
export const IconGear = BsGear;

const AdminIconWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Stack
      sx={{
        position: "relative",
        height: "30px",
        width: "30px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack
        sx={{
          height: "30px",
          width: "30px",
          justifyContent: "center",
          alignItems: "center",
          maskImage:
            "radial-gradient(circle 15px at 75% 75%, transparent 50%, black 50%)",
        }}
      >
        {children}
      </Stack>
      <Stack
        sx={{
          borderRadius: "100px",
          height: "15px",
          width: "15px",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          bottom: 0,
          right: 0,
        }}
      >
        <IconGear size={"11px"} />
      </Stack>
    </Stack>
  );
};

export const IconAdminAward = ({ size }: { size?: number | string }) => (
  <AdminIconWrapper>
    <IconAward
      size={size ? (typeof size === "number" ? `${size}px` : size) : "20px"}
    />
  </AdminIconWrapper>
);
