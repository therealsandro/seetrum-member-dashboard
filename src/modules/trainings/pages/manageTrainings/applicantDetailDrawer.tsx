import { extractInitials, toTitleCase } from "@/lib/utils";
import { updateTrainingMember } from "@/modules/trainings/services/trainingMemberService";
import { useApplicantStore } from "@/modules/trainings/store/useApplicantsStore";
import { TrainingMemberStatus } from "@/types/models/trainingMember";
import { FileScreeningCard } from "@/ui/Card/FileScreeningCard";
import { Typography } from "@/ui/Typography";
import {
  Avatar,
  Button,
  Divider,
  Drawer,
  Flex,
  Select,
  SimpleGrid,
  Stack,
} from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import { useEffect } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";

type OutletContext = [
  number | undefined,
  React.Dispatch<React.SetStateAction<number | undefined>>
];
export const ApplicantDetails = () => {
  const { id: trainingId, applicantId } = useParams();
  const {
    activeApplicant,
    getAplicantById,
    updateActiveApplicant,
    getApplicants,
  } = useApplicantStore();

  useEffect(() => {
    if (trainingId && applicantId) getAplicantById(trainingId, applicantId);
  }, [getAplicantById, trainingId, applicantId]);

  return (
    <Drawer.Content>
      <Drawer.Header
        sx={(t) => ({
          zIndex: 1,
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
              value={activeApplicant?.status}
              data={[
                { label: "Accepted", value: "accepted" },
                { label: "Rejected", value: "rejected" },
              ]}
              placeholder="Application Status"
              onChange={async (val) => {
                console.log("Change application status", val);
                if (trainingId && activeApplicant && val) {
                  await updateTrainingMember(activeApplicant.id, {
                    status: val as TrainingMemberStatus,
                  });
                  await updateActiveApplicant(trainingId, activeApplicant.id, {
                    status: val as TrainingMemberStatus,
                  });
                  getApplicants(trainingId);
                }
              }}
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
              {extractInitials(activeApplicant?.name || "")}
            </Avatar>
            <FieldView label="Full name" value={activeApplicant?.name} />
          </Flex>
          <SimpleGrid cols={2}>
            <FieldView label="Email" value={activeApplicant?.email} />
            <FieldView
              label="Mobile phone number"
              value={activeApplicant?.phoneNumber}
            />
            <FieldView label="Age" value={activeApplicant?.age} />
            <FieldView
              label="Gender"
              value={toTitleCase(activeApplicant?.gender || "")}
            />
            <FieldView
              label="Employment status"
              value={toTitleCase(activeApplicant?.employmentStatus || "")}
            />
            <FieldView
              label="Current institution"
              value={toTitleCase(activeApplicant?.institutionName || "")}
            />
          </SimpleGrid>
          <Divider />
          <Typography textVariant="title-md">Uploaded Files</Typography>
          <Stack spacing={16}>
            {activeApplicant &&
              activeApplicant.requiredFiles.map((file) => {
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
            {activeApplicant &&
            Boolean(activeApplicant.issuedCertificate) &&
            activeApplicant.issuedCertificate.length > 0 ? (
              activeApplicant.issuedCertificate.map((file) => {
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
