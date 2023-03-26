import { Typography } from "@/ui/Typography";
import { routePaths } from "@/routes";
import {
  Anchor,
  Button,
  Flex,
  Paper,
  PasswordInput,
  Stack,
  TextInput,
} from "@mantine/core";
import { hasLength, isEmail, useForm } from "@mantine/form";
import React from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import { BackButton } from "@/ui/Button";

export const LoginForm: React.FC = () => {
  const [loading, setLoading] = React.useState(false);
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: isEmail("Provide a valid email address"),
      password: hasLength(
        { min: 6 },
        "Provide a valid password (minimum of 6 character)"
      ),
    },
  });

  const logIn = useAuthStore((state) => state.logIn);

  const handleSubmit = form.onSubmit(async (values) => {
    const { email, password } = values;
    setLoading(true);
    try {
      await logIn(email, password);
    } catch (error) {}
    setLoading(false);
  });

  return (
    <Flex h="100%" justify="center" align="center">
      <Paper w={400} mx="xs">
        <form onSubmit={handleSubmit}>
          <Stack spacing={24}>
            <BackButton to={"https://seetrum.id"} />
            <Typography textVariant="headline-lg">Sign In</Typography>
            <Typography textVariant="body-lg">
              Welcome back! Sign in to your Seetrum account and stay up-to-date
              on the latest in energy efficiency.
            </Typography>
            <TextInput
              radius="md"
              type="email"
              label="Email"
              autoFocus
              placeholder="Enter your email"
              {...form.getInputProps("email")}
            />
            <PasswordInput
              radius="md"
              label="Password"
              placeholder="Enter your password"
              {...form.getInputProps("password")}
            />
            <Button loading={loading} radius="md" size="md" type="submit">
              Sign In
            </Button>
            <Typography textVariant="body-md">
              Don&apos;t have an account yet?{" "}
              <Link to={routePaths.REGISTER_OPTION}>
                <Anchor component="button">Register Now</Anchor>
              </Link>
            </Typography>
          </Stack>
        </form>
      </Paper>
    </Flex>
  );
};
