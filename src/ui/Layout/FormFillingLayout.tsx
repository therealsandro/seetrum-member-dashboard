import { ProtectedPage } from "@/modules/auth/components/ProtectedPage";
import { TrainingCard } from "@/modules/trainings/components/TrainingCard";
import {
  AppShell,
  Box,
  Container,
  Flex,
  Skeleton,
  Stepper,
  useMantineTheme,
} from "@mantine/core";
import { useState } from "react";
import { LoaderFunctionArgs, Outlet, useLoaderData } from "react-router-dom";
import { Header } from "../Header";
import { Typography } from "../Typography";
import { Training } from "@/types/models/training";
import { getTrainingById } from "@/modules/trainings/services/trainingService";

const steps = [
  {
    title: "Personal information",
    desctiption:
      "Please provide your accurate personal information, including your full name, email address, phone number, age, gender, and current employment status.",
  },
  {
    title: "Home address",
    desctiption:
      "Kindly enter your complete home address, including the full address, province, city/region, district, and postal code.",
  },
  {
    title: "Required documents",
    desctiption:
      "Upload the required documents for your application, including your comprehensive CV, professional photo, valid diploma/degree certificate, government-issued ID card, and supporting documents (evidence of previous energy audit experience).",
  },
];

export const applicationTrainingSupportDataLoader = async ({
  params,
}: LoaderFunctionArgs) => {
  try {
    // TODO: use cached data here
    const training = params.id ? await getTrainingById(params.id) : undefined;
    return training;
  } catch (error) {
    throw error;
  }
};

export const FormFillingLayout = () => {
  const [step, setStep] = useState<number>(0);
  const theme = useMantineTheme();
  const training = useLoaderData() as Training;

  return (
    <AppShell
      header={<Header opened={false} setOpened={() => {}} withoutNavigation />}
    >
      <ProtectedPage>
        <Container>
          <Flex
            direction="column"
            gap={24}
            sx={{
              position: "relative",
            }}
          >
            <Typography textVariant="headline-lg">
              Training Application Form
            </Typography>
            <Flex gap={24} justify={"space-between"}>
              <Flex direction="column" gap={24} pb={80}>
                <Flex
                  direction="column"
                  p={20}
                  gap={8}
                  sx={{
                    flexGrow: 0,
                    backgroundColor: theme.colors.platinum[1],
                    borderRadius: theme.radius.lg,
                  }}
                >
                  <Stepper
                    active={step}
                    onStepClick={setStep}
                    allowNextStepsSelect={false}
                  >
                    <Stepper.Step />
                    <Stepper.Step />
                    <Stepper.Step />
                  </Stepper>
                  <Typography textVariant="title-lg">
                    {steps[step].title}
                  </Typography>
                  <Typography>{steps[step].desctiption}</Typography>
                </Flex>
                <Outlet context={[step, setStep]} />
              </Flex>
              <Flex w={308} sx={{ flexShrink: 0 }}>
                <Skeleton visible={!Boolean(training)}>
                  <Box sx={{ position: "sticky", top: 75 }}>
                    <TrainingCard variant="vertical" {...training} />
                  </Box>
                </Skeleton>
              </Flex>
            </Flex>
          </Flex>
        </Container>
      </ProtectedPage>
    </AppShell>
  );
};
