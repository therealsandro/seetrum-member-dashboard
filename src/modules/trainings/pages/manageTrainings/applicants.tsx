import { toTitleCase } from "@/lib/utils";
import { useAuthStore } from "@/modules/auth/stores/authStore";
import { useTrainingMember } from "@/modules/trainings/store/useTrainingMember";
import { TrainingMember } from "@/types/models/trainingMember";
import { IconChevronRight, IconPDF } from "@/ui/Icons";
import { Typography } from "@/ui/Typography";
import { Badge, Box, Button, Drawer, Flex, Stack } from "@mantine/core";
import { MRT_ColumnDef, MantineReactTable } from "mantine-react-table";
import { useEffect, useMemo } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";

export const ManageTrainingApplicants = () => {
  const navigate = useNavigate();

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
            <Badge size="sm" sx={{ textTransform: "none" }}>
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
              {[originalRow.issuedCertificate].map((certif) => (
                <Badge
                  key={certif.toLowerCase()}
                  leftSection={<IconPDF size={18} />}
                  variant="outline"
                  size="md"
                  py={4}
                  sx={{ textTransform: "none" }}
                >
                  {originalRow.issuedCertificate}
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
                console.log();
                navigate(props.row.getValue("id"));
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

  const { trainingMember, getTrainingsByTrainingId } = useTrainingMember();
  const { id: trainingId, applicantId } = useParams();
  const { user } = useAuthStore();

  useEffect(() => {
    trainingId && user && getTrainingsByTrainingId(user.id, trainingId);
  }, [user, trainingId, getTrainingsByTrainingId]);

  if (!trainingMember) return <h1>Loading...</h1>;

  const data: TrainingMember[] = Array(13)
    .fill("-")
    .map((i) => trainingMember[0]);

  return (
    <>
      <MantineReactTable
        columns={columns}
        data={data}
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
      <Drawer
        opened={Boolean(applicantId)}
        onClose={() => navigate(-1)}
        position="right"
        size={640}
        withCloseButton={false}
        overlayProps={{
          sx: (t) => ({
            background: "transparent",
          }),
        }}
      >
        <Outlet />
      </Drawer>
    </>
  );
};
