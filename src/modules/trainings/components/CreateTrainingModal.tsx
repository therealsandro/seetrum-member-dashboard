import { CreateTrainingModel } from "@/types/models/training";
import { Typography } from "@/ui/Typography";
import { showErrorNotif } from "@/ui/notifications";
import {
  Box,
  Button,
  Group,
  Modal,
  Stack,
  Switch,
  TextInput,
} from "@mantine/core";
import { DatePickerInput, DatePickerValue } from "@mantine/dates";
import { isNotEmpty, useForm } from "@mantine/form";
import { Timestamp } from "firebase/firestore";
import { useState } from "react";

interface CreateTrainingModalProps {
  opened: boolean;
  onClose(): void;
}

export const CreateTrainingModal: React.FC<CreateTrainingModalProps> = ({
  opened,
  onClose,
}) => {
  const form = useForm<CreateTrainingModel>({
    initialValues: {
      trainerName: "",
      title: "",
      dueDate: null,
    },
    validate: {
      title: isNotEmpty("Title can not be empty"),
      trainerName: isNotEmpty("Trainer name can not be empty"),
      dueDate: isNotEmpty("Due date can not be empty"),
    },
  });

  const [isWithTemplate, setIsWithTemplate] = useState(true);

  const handleDueDateChange = (value: Date) => {
    const timestamp = Timestamp.fromDate(value);
    form.setFieldValue("dueDate", timestamp);
  };

  const handleSubmit = form.onSubmit((value) => {});

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Modal
      title={<Typography variant="title-lg">Create a New Training</Typography>}
      opened={opened}
      onClose={handleClose}
      radius={16}
      padding={0}
      zIndex={150}
      styles={{
        header: {
          padding: 16,
          borderBottom: "1px solid rgba(0,0,0,.12)",
        },
      }}
    >
      <form onSubmit={handleSubmit}>
        <Stack
          spacing={10}
          sx={{
            padding: 16,
            paddingBottom: 40,
            borderBottom: "1px solid rgba(0,0,0,.12)",
          }}
        >
          <TextInput
            label="Training Title"
            withAsterisk
            placeholder="Enter the training title here"
            {...form.getInputProps("title")}
          />
          <TextInput
            label="Training Name"
            withAsterisk
            placeholder="Enter the trainer name here"
            {...form.getInputProps("trainerName")}
          />
          <DatePickerInput
            label="Application deadline"
            placeholder="Pick the application deadline"
            dropdownType="modal"
            withAsterisk
            onChange={handleDueDateChange}
            error={form.errors.dueDate}
          />
          <Stack spacing={8}>
            <Group position="apart">
              <Typography variant="title-md">
                Add the default application file requirement
              </Typography>
              <Switch
                checked={isWithTemplate}
                onChange={() => setIsWithTemplate((v) => !v)}
              />
            </Group>
            <Typography c="dimmed" variant="body-md">
              If this option is selected, a set of file requirements including
              CV, photo, degree certificate, and personal ID card have to be
              uploaded by the applicant while applying the training.
            </Typography>
          </Stack>
        </Stack>
        <Box p={12}>
          <Group position="right">
            <Button variant="subtle" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit">Create Training</Button>
          </Group>
        </Box>
      </form>
    </Modal>
  );
};
