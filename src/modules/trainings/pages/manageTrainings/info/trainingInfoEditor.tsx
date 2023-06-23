import { useTrainings } from "@/modules/trainings/store/useTrainings";
import { Training } from "@/types/models/training";
import { IconCalendar } from "@/ui/Icons";
import { Typography } from "@/ui/Typography";
import { Button, Flex, Stack, TextInput, useMantineTheme } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { Link, RichTextEditor } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const TrainingInfoEditor = ({
  onSubmit,
}: {
  onSubmit: (training: Partial<Training>) => void;
}) => {
  const thm = useMantineTheme();
  const { getTrainingsById } = useTrainings();
  const { id } = useParams();
  const [trainer, setTrainer] = useState<string>();
  const [dueDate, setDueDate] = useState<Timestamp>();
  const [desc, setDesc] = useState<string>();

  const editor = useEditor(
    {
      extensions: [StarterKit, Link],
      content: desc,
    },
    [desc]
  );
  useEffect(() => {
    id &&
      getTrainingsById(id).then((t) => {
        if (t) {
          setTrainer(t.trainerName);
          setDueDate(t.dueDate);
          setDesc(t.description);
        }
      });
  }, [getTrainingsById, id]);

  const handleUpdates = () => {
    onSubmit({
      trainerName: trainer,
      dueDate,
      description: editor?.getHTML() ?? desc,
    });
  };
  return (
    <Stack
      mt={8}
      mb={24}
      spacing={16}
      p={16}
      pb={20}
      sx={{
        borderRadius: 16,
        border: "1px solid",
        borderColor: thm.fn.rgba(thm.colors.night[5], 0.12),
      }}
    >
      <Flex gap={16} align="center">
        <Typography textVariant="title-lg" sx={{ flex: 1 }}>
          General Info
        </Typography>
        <Button
          variant="filled"
          radius={8}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            handleUpdates();
          }}
        >
          <Typography textVariant="label-lg">Save changes</Typography>
        </Button>
      </Flex>
      <Stack>
        <TextInput
          label={
            <Typography textVariant="title-md" mb={4}>
              Trainer
            </Typography>
          }
          placeholder="Input trainer"
          maw="min(430px, 100%)"
          radius={8}
          value={trainer ?? ""}
          onChange={(e) => setTrainer(e.target.value.trim())}
        />

        <DatePickerInput
          icon={<IconCalendar size={18} />}
          label={
            <Typography textVariant="title-md" mb={4}>
              Application Deadline
            </Typography>
          }
          placeholder="Input application deadline"
          value={dueDate?.toDate()}
          onChange={(e) =>
            setDueDate(e !== null ? Timestamp.fromDate(e) : undefined)
          }
          maw="min(430px, 100%)"
          radius={8}
        />

        <Stack spacing={0}>
          <Typography textVariant="title-md" mb={4}>
            Description
          </Typography>
          <RichTextEditor editor={editor} sx={{ borderRadius: 8 }}>
            <RichTextEditor.Toolbar
              sx={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
              sticky
              stickyOffset={60}
            >
              <RichTextEditor.ControlsGroup>
                <RichTextEditor.Bold />
                <RichTextEditor.Italic />
                <RichTextEditor.Strikethrough />
                <RichTextEditor.ClearFormatting />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.H1 />
                <RichTextEditor.H2 />
                <RichTextEditor.H3 />
                <RichTextEditor.H4 />
                <RichTextEditor.H5 />
                <RichTextEditor.H6 />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.Blockquote />
                <RichTextEditor.Hr />
                <RichTextEditor.BulletList />
                <RichTextEditor.OrderedList />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.Link />
                <RichTextEditor.Unlink />
              </RichTextEditor.ControlsGroup>
            </RichTextEditor.Toolbar>

            <RichTextEditor.Content sx={{ borderRadius: 8 }} />
          </RichTextEditor>
        </Stack>
      </Stack>
    </Stack>
  );
};
