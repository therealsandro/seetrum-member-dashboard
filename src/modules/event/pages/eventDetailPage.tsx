import { pretyDateTime } from "@/lib/utils";
import { ProtectedPage } from "@/modules/auth/components/ProtectedPage";
import { useFileURLStore } from "@/services/firebase/storage";
import { BackButton } from "@/ui/Button";
import { Typography } from "@/ui/Typography";
import {
  Badge,
  Box,
  Button,
  Flex,
  Image,
  Skeleton,
  Stack,
  TypographyStylesProvider,
} from "@mantine/core";
import { ReactNode, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useEventDetail } from "../store/useEventDetails";

export const EventDetailPage: React.FC = () => {
  const { id } = useParams();
  const { event, loading, getEvent } = useEventDetail();

  useEffect(() => {
    if (id && getEvent) getEvent(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const getFileURL = useFileURLStore((s) => s.getFileURL);
  const [imageUrl, setImage] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (event && event.thumbnailFileName && !imageUrl)
      getFileURL(event.thumbnailFileName).then((ur) => setImage(ur));
  }, [getFileURL, event, imageUrl]);

  const Thumbnail: React.FC<any> = ({
    imageProps,
    sx,
  }: {
    imageProps: any;
    sx?: any;
  }) => (
    <Image
      src={loading ? "" : imageUrl}
      withPlaceholder
      height={300}
      maw={300}
      {...imageProps}
      sx={(t) => ({
        maxHeight: "fit-content",
        height: 300,
        overflow: "hidden",
        borderRadius: "8px",
        borderColor: t.colors.platinum[2],
        ...(sx && sx(t)),
      })}
    />
  );

  console.log(1349, event);

  return (
    <ProtectedPage>
      <Stack spacing={24}>
        <BackButton to={".."} label={"Back to all events"} />
        <Flex gap={24}>
          {/* Thumnail */}
          <Thumbnail />

          {/* Content event detail */}
          <Stack sx={{ flex: 1 }}>
            <Skeleton visible={loading} maw={loading ? "60%" : "100%"}>
              <Typography textVariant="headline-lg">
                {event?.title || "-"}
              </Typography>
            </Skeleton>
            {/* Other details */}
            <Stack spacing={16}>
              <EventDataField
                label="Date & Time"
                data={event && pretyDateTime(event.scheduleDateTime.toDate())}
              />
              <EventDataField
                label="Venue"
                loading={!Boolean(event)}
                data={
                  <MamberOnlyData
                    data={event && event.venue}
                    protectedLabel="Venue location will be displayed upon your registration"
                    isProtected={event?.venue.includes("https://")}
                  />
                }
              />
              <EventDataField
                label="Organized by"
                data={event && event.organizer}
              />
            </Stack>
            {/* Description */}
            <Stack spacing={8}>
              <Typography textVariant="label-lg">Description</Typography>
              <TypographyStylesProvider>
                {event ? (
                  <Box
                    dangerouslySetInnerHTML={{
                      __html: event?.description || "",
                    }}
                  />
                ) : (
                  <Stack>
                    <Skeleton width="90%" height={18} />
                    <Skeleton width="95%" height={18} />
                    <Skeleton width="87%" height={18} />
                    <Skeleton width="40%" height={18} />
                  </Stack>
                )}
              </TypographyStylesProvider>
            </Stack>
            {/* Add to calendar section */}
            <AddToCalendar />
          </Stack>
        </Flex>
      </Stack>
    </ProtectedPage>
  );
};

const EventDataField: React.FC<{
  label: string;
  data?: string | ReactNode;
  loading?: boolean;
}> = ({ label, data, loading }) => {
  return (
    <Flex gap={16}>
      <Typography miw={120} textVariant="label-lg">
        {label}
      </Typography>
      <Skeleton
        visible={!data || loading === true}
        width={!data || loading === true ? "30%" : "100%"}
      >
        <Typography sx={{ flex: 1 }} textVariant="body-md">
          {loading ? "-" : !data ? "-" : data}
        </Typography>
      </Skeleton>
    </Flex>
  );
};

const AddToCalendar: React.FC<{ isRegistered?: boolean }> = ({
  isRegistered,
}) => {
  // TODO: Implement this handler
  const handleAddToCalendar = () => {};
  const handleRegister = () => {};
  return (
    <Flex
      justify="space-between"
      align="center"
      maw={621}
      gap={16}
      sx={(t) => ({
        border: isRegistered ? "none" : "1px solid",
        borderColor: t.fn.rgba(t.colors.night[5], 0.12),
        borderRadius: 8,
        padding: 16,
        backgroundColor: isRegistered ? t.colors.moonstone[0] : "transparent",
      })}
    >
      <Typography sx={{ flex: 1 }} textVariant="body-lg">
        {isRegistered
          ? "You have already registered for this event."
          : "Interested in joining this event?"}
      </Typography>
      <Button
        sx={{ borderRadius: 8 }}
        onClick={isRegistered ? handleAddToCalendar : handleRegister}
      >
        {isRegistered ? "Add event to Google Calendar" : "Join now for free"}
      </Button>
    </Flex>
  );
};

const MamberOnlyData: React.FC<{
  protectedLabel: string | ReactNode;
  data: string | ReactNode;
  isProtected?: boolean;
}> = ({ protectedLabel, data, isProtected }) => {
  if (isProtected)
    return (
      <Badge
        sx={(t) => ({
          backgroundColor: t.colors.platinum[2],
          color: "InfoText",
          textTransform: "initial",
        })}
      >
        {protectedLabel}
      </Badge>
    );
  return <>{data}</>;
};
