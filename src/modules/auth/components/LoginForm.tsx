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
    <Paper w={400} mx="xs">
      <form onSubmit={handleSubmit}>
        <Stack spacing={20}>
          <Text size={"xl"} weight={"bold"}>
            Sign In
          </Text>
          <Text size="sm" c="dimmed">
            Welcome back! Sign in to your Seetrum account and stay up-to-date on
            the latest in energy efficiency.
          </Text>
          <TextInput
            radius="md"
            type="email"
            label="Email"
            placeholder="Enter your email"
            {...form.getInputProps("email")}
          />
          <PasswordInput
            radius="md"
            label="Password"
            placeholder="Enter your password"
            {...form.getInputProps("password")}
          />
          <Button radius="md" size="md" type="submit">
            Log In
          </Button>
          <Text size="sm" c="dimmed">
            Don&apos;t have an account yet?{" "}
            <Link to={routePaths.REGISTER_OPTION}>
              <Anchor component="button">register</Anchor>
            </Link>
          </Text>
        </Stack>
      </form>
    </Paper>
  );
};
