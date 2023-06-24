import { Typography } from "@/ui/Typography";
import {
  Box,
  Button,
  Group,
  Modal,
  Stack,
  Switch,
  TextInput,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";

interface CreateTrainingModalProps {
  opened: boolean;
  onClose(): void;
}

export const CreateTrainingModal: React.FC<CreateTrainingModalProps> = ({
  opened,
  onClose,
}) => {
  return (
    <Modal
      title={<Typography variant="title-lg">Create a New Training</Typography>}
      opened={opened}
      onClose={onClose}
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
        />
        <TextInput
          label="Training Name"
          withAsterisk
          placeholder="Enter the trainer name here"
        />
        <DatePickerInput
          label="Application deadline"
          placeholder="Pick the application deadline"
          dropdownType="modal"
          withAsterisk
        />
        <Stack spacing={8}>
          <Group position="apart">
            <Typography variant="title-md">
              Add the default application file requirement
            </Typography>
            <Switch onClick={console.log} />
          </Group>
          <Typography c="dimmed" variant="body-md">
            If this option is selected, a set of file requirements including CV,
            photo, degree certificate, and personal ID card have to be uploaded
            by the applicant while applying the training.
          </Typography>
        </Stack>
      </Stack>
      <Box p={12}>
        <Group position="right">
          <Button variant="subtle">Cancel</Button>
          <Button>Create Training</Button>
        </Group>
      </Box>
    </Modal>
  );
};
