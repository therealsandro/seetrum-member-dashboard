import { Grid } from "@mantine/core";
import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { SupportingFileField } from "./supportingFileField";
import { TrainingInfoEditor } from "./trainingInfoEditor";
import { TrainingInfoViewer } from "./trainingInfoViewer";
import { updateTraining } from "@/modules/trainings/services/trainingService";
import { showErrorNotif } from "@/ui/notifications";

export const TrainingInfoManagement = () => {
  const [searchParams] = useSearchParams();
  const { id: trainingId } = useParams();
  const [mode, setMode] = useState<"edit" | "view">(
    searchParams.getAll("edit")[0] ? "edit" : "view"
  );
  return (
    <Grid>
      <Grid.Col md={8} mb={80}>
        {mode === "view" && (
          <TrainingInfoViewer onChangeMode={() => setMode("edit")} />
        )}
        {mode === "edit" && (
          <TrainingInfoEditor
            onSubmit={async (trainingData) => {
              try {
                if (trainingId) {
                  await updateTraining(trainingId, trainingData);
                }
              } catch (e) {
                showErrorNotif({ title: "Update training error" });
              } finally {
                setMode("view");
              }
            }}
          />
        )}
        <SupportingFileField />
      </Grid.Col>
    </Grid>
  );
};
