import { notifications } from "@mantine/notifications";
import { IconX } from "../Icons";

interface ErrorNotifParams {
  title?: string;
  message?: string;
}

export const showErrorNotif: (params?: ErrorNotifParams) => void = (params) => {
  const { title = "Error", message = "Please try again later" } = params ?? {};
  notifications.show({
    color: "red",
    icon: <IconX />,
    title: title,
    message: message,
  });
};
