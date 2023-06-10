import { useEffect, useMemo } from "react";
import { MantineReactTable } from "mantine-react-table";
import { MRT_ColumnDef } from "mantine-react-table"; // If using TypeScript (optional, but recommended)
import { TrainingMember } from "@/types/models/trainingMember";
import { useTrainingMember } from "../../store/useTrainingMember";
import { useParams } from "react-router-dom";
import { useAuthStore } from "@/modules/auth/stores/authStore";
import { Stack } from "@mantine/core";
import { Typography } from "@/ui/Typography";

export const ManageTrainingApplicants = () => {
  //column definitions - strongly typed if you are using TypeScript (optional, but recommended)
  const columns = useMemo<MRT_ColumnDef<TrainingMember>[]>(
    () => [
      {
        header: "Name",
        accessorFn: (row) => (
          <Stack>
            <Typography textVariant="body-lg">{row.name}</Typography>
            <Typography textVariant="body-sm" color="dimmed">
              {row.province} - {row.institutionName}
            </Typography>
          </Stack>
        ),
      },
      {
        id: "age", //id required if you use accessorFn instead of accessorKey
        header: "Age",
        size: 100,
      },
    ],
    []
  );

  const { trainingMember, getTrainingsByTrainingId } = useTrainingMember();
  const { id: trainingId } = useParams();
  const { user } = useAuthStore();

  useEffect(() => {
    trainingId && user && getTrainingsByTrainingId(user.id, trainingId);
  }, [user, trainingId, getTrainingsByTrainingId]);

  if (!trainingMember) return <h1>Loading...</h1>;

  console.log(trainingMember);
  return (
    <MantineReactTable
      columns={columns}
      data={trainingMember}
      enableRowSelection //enable some features
      enableColumnOrdering
      enableGlobalFilter={false} //turn off a feature
      enableFullScreenToggle={false}
    />
  );
};
