import { useAuthStore } from "@/modules/auth/stores/authStore";
import { Typography } from "@/ui/Typography";
import { Skeleton, Stack } from "@mantine/core";

export const DashboardHeader = () => {
  const member = useAuthStore((s) => s.user);
  const loading = useAuthStore((s) => s.loading);
  return (
    <Stack
      px={16}
      py={20}
      spacing={4}
      sx={(t) => ({
        backgroundColor: t.colors.platinum[1],
        borderRadius: 16,
      })}
    >
      <Typography textVariant="body-lg">
        Welcome to the Seetrum member’s dashboard,
      </Typography>
      {loading || !member ? (
        <Skeleton width={"50%"} height={36} />
      ) : (
        <Typography textVariant="headline-md">{member.name}</Typography>
      )}
    </Stack>
  );
};
