import { pretyDateTime } from "@/lib/utils";
import { useFileURLStore } from "@/services/firebase/storage";
import { ScheduledEvent } from "@/types/models/scheduledEvent";
import { Typography } from "@/ui/Typography";
import { Flex, Image, Stack } from "@mantine/core";
import { useEffect, useState } from "react";

export const EventCard: React.FC<{ eventData: ScheduledEvent }> = ({
  eventData,
}) => {
  const getFileURL = useFileURLStore((s) => s.getFileURL);
  const [imageUrl, setImage] = useState<string | undefined>(undefined);
  useEffect(() => {
    if (eventData.thumbnailFileName && !imageUrl)
      getFileURL(eventData.thumbnailFileName).then((ur) => setImage(ur));
  }, [getFileURL, eventData.thumbnailFileName, imageUrl]);

  const Thumbnail: React.FC<any> = ({
    imageProps,
    sx,
  }: {
    imageProps: any;
    sx?: any;
  }) => (
    <Image
      src={imageUrl}
      withPlaceholder
      height={220}
      {...imageProps}
      sx={(t) => ({
        overflow: "hidden",
        borderRadius: "8px",
        borderColor: "platinum.2",
        ...(sx && sx(t)),
      })}
    />
  );

  return (
    <Stack spacing={0}>
      <Flex h={220}>
        <Thumbnail />
      </Flex>
      <Stack spacing={8} py={16} px={4}>
        <Typography textVariant="body-md" color="dimmed">
          {pretyDateTime(eventData.scheduleDateTime.toDate())}
        </Typography>
        <Typography textVariant="title-md">{eventData.title}</Typography>
        <Typography textVariant="body-md">{eventData.venue}</Typography>
      </Stack>
    </Stack>
  );
};
