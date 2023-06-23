import { kRowsPerPageOptions } from "@/lib/constants";
import { toTitleCase } from "@/lib/utils";
import { useApplicantStore } from "@/modules/trainings/store/useApplicantsStore";
import { TrainingMember } from "@/types/models/trainingMember";
import { IconChevronRight, IconPDF, IconSearch } from "@/ui/Icons";
import { Typography } from "@/ui/Typography";
import {
  Badge,
  Box,
  Button,
  Drawer,
  Flex,
  Input,
  Loader,
  SelectItem,
  Stack,
  useMantineTheme,
} from "@mantine/core";
import { MRT_ColumnDef, MantineReactTable } from "mantine-react-table";
import { useEffect, useMemo, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";

export const ManageTrainingApplicants = () => {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const { applicants, getApplicants } = useApplicantStore();
  const [activeIndex, setActiveIndex] = useState<number>();
  const { id: trainingId, applicantId } = useParams();

  // Search controllers
  const [globalFilter, setGlobalFilter] = useState("");

  // Pagination Controls
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: parseInt(kRowsPerPageOptions[0]),
  });

  useEffect(() => {
    if (trainingId) getApplicants(trainingId);
  }, [trainingId, getApplicants]);

  const columns = useMemo<MRT_ColumnDef<TrainingMember>[]>(
    () => [
      {
        id: "id",
        accessorKey: "id",
        header: "",
        enableGlobalFilter: false,
      },
      {
        header: "No",
        Cell(props) {
          return (
            <Typography textVariant="body-lg">{props.row.index + 1}</Typography>
          );
        },
        size: 40,
        enableGlobalFilter: false,
      },
      {
        header: "Name",
        accessorKey: "name",
        Cell: ({ row, renderedCellValue }) => (
          <Stack sx={{ gap: 0 }}>
            <Typography textVariant="body-lg">{renderedCellValue}</Typography>
            <Flex gap={4} align="center">
              <Typography textVariant="body-sm" color="dimmed">
                {toTitleCase(row.original.province)}
              </Typography>
              {row.original.institutionName !== "-" && (
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
                {row.original.institutionName !== "-"
                  ? row.original.institutionName
                  : ""}
              </Typography>
            </Flex>
          </Stack>
        ),
      },
      {
        header: "Status",
        enableGlobalFilter: false,
        size: 100,
        accessorFn(originalRow) {
          let status: string;
          switch (originalRow.status) {
            case "rejected":
              status = "Rejected";
              break;
            case "accepted":
            case "completed":
              status = "Accepted";
              break;

            case "applied":
            default:
              status = "Received";
              break;
          }
          return status;
        },
        filterVariant: "select",
        mantineFilterSelectProps: {
          data: ["Received", "Accepted", "Rejected"] as (
            | string
            | SelectItem
          )[] &
            string,
        },
        Cell: ({ row, renderedCellValue }) => {
          return (
            <Badge
              size="md"
              variant="filled"
              color={
                row.original.status === "rejected"
                  ? "red"
                  : row.original.status === "applied"
                  ? "platinum.6"
                  : "biceblue"
              }
              sx={{
                textTransform: "none",
                color: row.original.status === "applied" ? "black" : undefined,
              }}
            >
              {renderedCellValue}
            </Badge>
          );
        },
      },
      {
        header: "Certificate",
        enableGlobalFilter: false,
        accessorKey: "issuedCertificate",
        accessorFn(originalRow) {
          return Boolean(originalRow.issuedCertificate?.length ?? 0)
            ? "true"
            : "false";
        },
        filterVariant: "checkbox",
        Cell({ row }) {
          if (
            !Boolean(row.original.issuedCertificate) ||
            row.original.issuedCertificate.length === 0
          )
            return (
              <Typography textVariant="body-md" color="dimmed">
                <i>No certificate uploaded</i>
              </Typography>
            );
          return (
            <Flex align="center" gap={4}>
              {row.original.issuedCertificate.slice(0, 2).map((certif) => (
                <Badge
                  key={certif.filename}
                  variant="outline"
                  h={26}
                  py={4}
                  sx={(t) => ({
                    textTransform: "none",
                    borderColor: t.fn.rgba(t.colors.night[6], 0.12),
                    ".file-icon": {
                      lineHeight: "1 !important",
                      color: t.colors.red[6],
                    },
                  })}
                >
                  <Flex gap={8} align="center">
                    <IconPDF className="file-icon" size={16} />
                    <Typography textVariant="label-md" c="night">
                      {certif.filename.split("-").slice(1).join("-")}
                    </Typography>
                  </Flex>
                </Badge>
              ))}
              {row.original.issuedCertificate.length > 2
                ? `and ${row.original.issuedCertificate.length - 2} more`
                : undefined}
            </Flex>
          );
        },
      },
      {
        id: "actions",
        enableGlobalFilter: false,
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

  const fisrtItem = pagination.pageIndex * pagination.pageSize + 1;
  const fisrtItemNumber = applicants[trainingId].length === 0 ? 0 : fisrtItem;
  const lastItem = (pagination.pageIndex + 1) * pagination.pageSize;
  const lastItemNumber =
    lastItem > applicants[trainingId].length
      ? applicants[trainingId].length
      : lastItem;

  return (
    <Stack spacing={24}>
      <Input
        placeholder="Search applicants"
        value={globalFilter}
        onChange={(e) => setGlobalFilter(e.target.value)}
        radius={100}
        rightSection={<IconSearch color={theme.colors.night[5]} />}
        sx={(t) => ({ maxWidth: t.fn.largerThan("sm") ? "50%" : "100%" })}
      />
      <Typography textVariant="body-md">
        Showing {fisrtItemNumber} - {lastItemNumber} applicants of total{" "}
        {applicants[trainingId].length} training applicants.
      </Typography>
      <MantineReactTable
        columns={columns}
        data={applicants[trainingId]}
        onPaginationChange={setPagination}
        onGlobalFilterChange={setGlobalFilter}
        state={{ pagination, globalFilter }}
        mantinePaginationProps={{
          rowsPerPageOptions: kRowsPerPageOptions,
        }}
        mantineTableHeadRowProps={{
          sx: (t) => ({ background: t.colors.gray[0] }),
        }}
        mantineTableBodyRowProps={({ row }) => ({
          sx: { cursor: "pointer" },
          onClick: (e) => {
            e.stopPropagation();
            e.preventDefault();

            setActiveIndex(row.index);
            navigate(row.original.id);
          },
        })}
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
    </Stack>
  );
};
