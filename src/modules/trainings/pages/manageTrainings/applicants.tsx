import { toTitleCase } from "@/lib/utils";
import { useApplicantStore } from "@/modules/trainings/store/useApplicantsStore";
import { TrainingMember } from "@/types/models/trainingMember";
import { IconChevronRight, IconPDF } from "@/ui/Icons";
import { Typography } from "@/ui/Typography";
import { Badge, Box, Button, Drawer, Flex, Loader, Stack } from "@mantine/core";
import { MRT_ColumnDef, MantineReactTable } from "mantine-react-table";
import { useEffect, useMemo, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";

export const ManageTrainingApplicants = () => {
  const navigate = useNavigate();
  const { applicants, getApplicants } = useApplicantStore();
  const [activeIndex, setActiveIndex] = useState<number>();
  const { id: trainingId, applicantId } = useParams();

  useEffect(() => {
    if (trainingId) getApplicants(trainingId);
  }, [trainingId, getApplicants]);

  const columns = useMemo<MRT_ColumnDef<TrainingMember>[]>(
    () => [
      {
        id: "id",
        accessorKey: "id",
        header: "",
      },
      {
        header: "No",
        Cell(props) {
          return (
            <Typography textVariant="body-lg">{props.row.index + 1}</Typography>
          );
        },
        size: 40,
      },
      {
        header: "Name",
        accessorFn: (row) => (
          <Stack sx={{ gap: 0 }}>
            <Typography textVariant="body-lg">{row.name}</Typography>
            <Flex gap={4} align="center">
              <Typography textVariant="body-sm" color="dimmed">
                {toTitleCase(row.province)}
              </Typography>
              {row.institutionName !== "-" && (
                <Box
                  w={4}
                  h={4}
                  sx={(t) => ({
                    borderRadius: 4,
                    background: t.colors.night[5],
                  })}
                />
              )}
              <Typography textVariant="body-sm" color="dimmed">
                {row.institutionName !== "-" ? row.institutionName : ""}
              </Typography>
            </Flex>
          </Stack>
        ),
      },
      {
        header: "Status",
        size: 120,
        accessorFn(originalRow) {
          let status: string;
          switch (originalRow.status) {
            case "applied":
              status = "Received";
              break;
            case "rejected":
              status = "Rejected";
              break;
            case "accepted":
              status = "Accepted";
              break;
            case "issued":
              status = "Accepted";
              break;

            default:
              status = "Received";
              break;
          }
          return (
            <Badge
              size="md"
              variant="filled"
              color={
                originalRow.status === "rejected"
                  ? "red"
                  : originalRow.status === "applied"
                  ? "platinum.6"
                  : "biceblue"
              }
              sx={{
                textTransform: "none",
                color: originalRow.status === "applied" ? "black" : undefined,
              }}
            >
              {toTitleCase(status)}
            </Badge>
          );
        },
      },
      {
        header: "Certificate",
        accessorFn(originalRow) {
          if (!Boolean(originalRow.issuedCertificate))
            return (
              <Typography textVariant="body-md" color="dimmed">
                <i>No certificate uploaded</i>
              </Typography>
            );
          return (
            <Flex>
              {originalRow.issuedCertificate.map((certif) => (
                <Badge
                  key={certif.filename}
                  leftSection={<IconPDF size={18} />}
                  variant="outline"
                  size="md"
                  py={4}
                  sx={{ textTransform: "none" }}
                >
                  {certif.filename}
                </Badge>
              ))}
            </Flex>
          );
        },
      },
      {
        id: "actions",
        header: "",
        size: 40,
        Cell(props) {
          return (
            <Button
              variant="subtle"
              size="small"
              sx={{ borderRadius: 100, padding: 4 }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                navigate(props.row.getValue("id"));
                setActiveIndex(props.row.index);
              }}
            >
              <IconChevronRight />
            </Button>
          );
        },
      },
    ],
    [navigate]
  );

  if (!(trainingId && applicants && applicants[trainingId]))
    return (
      <Stack h={100} w={"100%"} align="center" justify="center">
        <Loader />
      </Stack>
    );

  return (
    <>
      <MantineReactTable
        columns={columns}
        data={applicants[trainingId]}
        mantineTableHeadRowProps={{
          sx: (t) => ({ background: t.colors.gray[0] }),
        }}
        mantinePaperProps={{
          sx: { borderRadius: 16, boxShadow: "none" },
        }}
        initialState={{
          density: "xs",
          columnVisibility: { id: false },
        }}
        enableTopToolbar={false}
      />
      <Drawer.Root
        opened={Boolean(applicantId)}
        onClose={() => navigate(".")}
        position="right"
        size={640}
        style={{
          height: "100%",
        }}
      >
        <Drawer.Overlay
          sx={(t) => ({
            background: "transparent",
          })}
        />
        <Outlet context={[activeIndex, setActiveIndex]} />
      </Drawer.Root>
    </>
  );
};
