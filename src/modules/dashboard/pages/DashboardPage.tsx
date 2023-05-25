import { Container, MediaQuery, Stack } from "@mantine/core";
import { DashboardHeader } from "../components/Header";
import { FeatureCollectionCard } from "../components/FeatureCard";
import { Typography } from "@/ui/Typography";
import { dashboardInitialUrl } from "@/lib/assets";
export const DashboardPage = () => {
  return (
    <Container p={0}>
      <Stack spacing={24}>
        <DashboardHeader />
        <MediaQuery smallerThan={"sm"} styles={{ padding: 0 }}>
          <Stack align="center" sx={{ flex: 1, padding: 40, gap: 32 }}>
            <img
              height={200}
              src={dashboardInitialUrl}
              alt="Dashboard Initial Ilustration"
            />
            <Stack align="center" spacing={8} maw={720}>
              <Typography
                textVariant="title-md"
                sx={(t) => ({
                  textAlign: "center",
                  [t.fn.smallerThan("sm")]: { textAlign: "start" },
                })}
              >
                Step into a world of energy efficiency opportunities,
                exclusively tailored for you
              </Typography>
              <Typography
                textVariant="body-md"
                c="dimmed"
                sx={(t) => ({
                  textAlign: "center",
                  [t.fn.smallerThan("sm")]: { textAlign: "start" },
                })}
              >
                Discover and join upcoming events, apply for cutting-edge
                trainings, and explore project opportunities that align with
                your expertise. Get started on your journey towards a
                sustainable future.
              </Typography>
            </Stack>
          </Stack>
        </MediaQuery>
        <FeatureCollectionCard />
      </Stack>
    </Container>
  );
};
