import {
  Anchor,
  Button,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { hasLength, isEmail, useForm } from "@mantine/form";
import { useAuthStore } from "../stores/authStore";
import { Link } from "react-router-dom";
import { routePaths } from "@/routes";

export const LoginForm: React.FC = () => {
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: isEmail("Masukkan email yang valid"),
      password: hasLength(
        { min: 6 },
        "Masukkan password yang valid (minimum 6 karakter)"
      ),
    },
  });

  const logIn = useAuthStore((state) => state.logIn);

  const handleSubmit = form.onSubmit((values) => {
    const { email, password } = values;
    logIn(email, password);
  });

  return (
    <Paper p={"xl"} w={430}>
      <Stack mb="xl" spacing={"xs"}>
        <Text size={"xl"} weight={"bold"}>
          Welcome Back!
        </Text>
        <Text size="sm" c="dimmed">
          Society of Energy Efficiency Trust Movement
        </Text>
      </Stack>
      <form onSubmit={handleSubmit}>
        <Stack>
          <TextInput
            radius="md"
            type="email"
            label="Email"
            {...form.getInputProps("email")}
          />
          <PasswordInput
            radius="md"
            label="Password"
            {...form.getInputProps("password")}
          />
          <Button radius="md" size="md" type="submit">
            Log In
          </Button>
          <Text mt={"xl"} align="center" size="sm" c="dimmed">
            Don&apos;t have an account?{" "}
            <Link to={routePaths.REGISTER}>
              <Anchor component="button">register</Anchor>
            </Link>
          </Text>
        </Stack>
      </form>
    </Paper>
  );
};
