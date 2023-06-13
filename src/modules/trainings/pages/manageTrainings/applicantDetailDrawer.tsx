import { TrainingMember } from "@/types/models/trainingMember";
import { Typography } from "@/ui/Typography";
import {
  Drawer,
  Flex,
  Select,
  Stack,
  Button,
  Avatar,
  Divider,
  SimpleGrid,
} from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import { useState, useEffect } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { useApplicantStore } from "@/modules/trainings/store/useApplicantsStore";
import { extractInitials, toTitleCase } from "@/lib/utils";
import { FileScreeningCard } from "@/ui/Card/FileScreeningCard";

type OutletContext = [
  number | undefined,
  React.Dispatch<React.SetStateAction<number | undefined>>
];
export const ApplicantDetails = () => {
  const { id: trainingId, applicantId } = useParams();
  const { getAplicantById } = useApplicantStore();
  const [applicant, setApplicant] = useState<TrainingMember>();

  useEffect(() => {
    if (trainingId && applicantId)
      getAplicantById(trainingId, applicantId).then((aplcnt) =>
        setApplicant(aplcnt)
      );
  }, [getAplicantById, trainingId, applicantId]);

  return (
    <Drawer.Content>
      <Drawer.Header
        sx={(t) => ({
          gap: 16,
          padding: 16,
          borderBottom: "1px solid",
          borderColor: t.fn.rgba(t.colors.night[5], 0.12),
        })}
      >
        <Drawer.Title w={"100%"}>
          <Flex w={"100%"} justify="space-between">
            <Typography textVariant="title-lg">Applicant Details</Typography>
            <Select
              value={applicant?.status}
              data={[
                { label: "Accepted", value: "accepted" },
                { label: "Rejected", value: "rejected" },
              ]}
              placeholder="Application Status"
              // TODO: implement update trainingMember.status
              onChange={(val) => console.log("Change application status", val)}
            />
          </Flex>
        </Drawer.Title>
        <Drawer.CloseButton />
      </Drawer.Header>
      <Drawer.Body sx={{ gap: 0 }}>
        <Stack h={"100vh"} pb={80} pt={16}>
          <Typography textVariant="title-md">Applicant Information</Typography>
          <Flex gap={16} align={"center"}>
            <Avatar size={64} radius={64} color="cyan">
              {extractInitials(applicant?.name || "")}
            </Avatar>
            <FieldView
              label="Full name"
              value={extractInitials(applicant?.name || "")}
            />
          </Flex>
          <SimpleGrid cols={2}>
            <FieldView label="Email" value={applicant?.email} />
            <FieldView
              label="Mobile phone number"
              value={applicant?.phoneNumber}
            />
            <FieldView label="Age" value={applicant?.age} />
            <FieldView
              label="Gender"
              value={toTitleCase(applicant?.gender || "")}
            />
            <FieldView
              label="Employment status"
              value={toTitleCase(applicant?.employmentStatus || "")}
            />
            <FieldView
              label="Current institution"
              value={toTitleCase(applicant?.institutionName || "")}
            />
          </SimpleGrid>
          <Divider />
          <Typography textVariant="title-md">Uploaded Files</Typography>
          <Stack spacing={16}>
            {applicant &&
              applicant.requiredFiles.map((file) => {
                return (
                  <FileScreeningCard
                    key={file.filename}
                    {...file}
                    withDownload
                  />
                );
              })}
          </Stack>
          <Divider />
          <Typography textVariant="title-md">Certificate</Typography>
          <Stack spacing={16} align="center">
            {applicant &&
            Boolean(applicant.issuedCertificate) &&
            applicant.issuedCertificate.length > 0 ? (
              applicant.issuedCertificate.map((file) => {
                return (
                  <FileScreeningCard key={file.filename} {...file} withDelete />
                );
              })
            ) : (
              <>
                <Typography color="dimmed">
                  <i>No certificate uploaded</i>
                </Typography>
              </>
            )}
          </Stack>
        </Stack>
        <DrawerFooter />
      </Drawer.Body>
    </Drawer.Content>
  );
};

const FieldView = ({
  label,
  value,
}: {
  label: string;
  value?: string | Number;
}) => {
  return (
    <Stack spacing={4}>
      <Typography
        textVariant="label-lg"
        sx={(t) => ({ color: t.fn.rgba(t.colors.night[5], 0.6) })}
      >
        {label}
      </Typography>
      <Typography textVariant="body-lg">{value?.toString()}</Typography>
    </Stack>
  );
};

const DrawerFooter = () => {
  const [activeIndex, setActiveIndex] = useOutletContext<OutletContext>();
  const navigate = useNavigate();
  const { id: trainingId } = useParams();
  const { applicants } = useApplicantStore();

  return (
    <Flex
      px="1rem"
      sx={(t) => ({
        position: "absolute",
        bottom: 0,
        right: 0,
        borderTop: "1px solid",
        borderColor: t.fn.rgba(t.colors.night[5], 0.12),
        height: 60,
        width: "calc(100% - 2rem)",
        background: "white",
        justifyContent: "space-between",
        alignItems: "center",
      })}
    >
      <Button
        variant="subtle"
        disabled={activeIndex === 0}
        sx={{ borderRadius: 8 }}
        leftIcon={<IconChevronRight style={{ transform: "rotate(180deg)" }} />}
        onClick={() => {
          setActiveIndex((s) => {
            const prevIndex = s ? (s - 1 < 0 ? 0 : s - 1) : 0;
            const prevApplicat =
              applicants &&
              trainingId &&
              applicants[trainingId] &&
              applicants[trainingId][prevIndex];
            prevApplicat && navigate(`../${prevApplicat.id}`);
            return prevIndex;
          });
        }}
      >
        Previous applicant
      </Button>
      <Button
        sx={{ borderRadius: 8 }}
        variant="subtle"
        disabled={
          applicants && trainingId && applicants[trainingId]
            ? applicants[trainingId].length - 1 === activeIndex
            : false
        }
        onClick={() => {
          setActiveIndex((s) => {
            const maxIndex =
              applicants && trainingId && applicants[trainingId]
                ? applicants[trainingId].length - 1
                : 1;
            const nextIndex = s ? (s + 1 > maxIndex ? maxIndex : s + 1) : 1;
            const nextApplicat =
              applicants &&
              trainingId &&
              applicants[trainingId] &&
              applicants[trainingId][nextIndex];
            nextApplicat && navigate(`../${nextApplicat.id}`);
            return nextIndex;
          });
        }}
        rightIcon={<IconChevronRight />}
      >
        Next applicant
      </Button>
    </Flex>
  );
};
