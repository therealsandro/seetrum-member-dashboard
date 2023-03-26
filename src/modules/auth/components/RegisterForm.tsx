import { BackButton } from "@/ui/Button";
import { Typography } from "@/ui/Typography";
import { routePaths } from "@/routes";
import { UserRegistrationData, UserType } from "@/types";
import {
  Box,
  Button,
  Group,
  Paper,
  PasswordInput,
  Select,
  Stack,
  Text,
  TextInput,
  Textarea,
  Timeline,
} from "@mantine/core";
import {
  isEmail,
  isNotEmpty,
  matches,
  matchesField,
  useForm,
} from "@mantine/form";
import React from "react";
import { useSearchParams } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

type RegisterFormData = UserRegistrationData & { confirmPassword: string };

const userTypeCopy = {
  individual: {
    email: "Individual email",
    name: "Full name",
    account: "account",
  },
  organization: {
    email: "Organization email",
    name: "Organization name",
    account: "organization",
  },
};

export const RegisterForm: React.FC = () => {
  const [active, setActive] = React.useState(0);
  const [loading, setLoading] = React.useState(false);

  const [searchParams] = useSearchParams();
  const userType: UserType =
    searchParams.get("userType") === "organization"
      ? "organization"
      : "individual";

  const registerInitialValue: RegisterFormData = {
    name: "",
    email: "",
    address: "",
    informationChannel: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    userType: "organization",
    motivationToJoin: "",
  };
  if (userType === "organization") {
    registerInitialValue.organization = {
      industry: "",
      picName: "",
      picEmail: "",
      picPhoneNumber: "",
    };
  }
  console.log({ ...registerInitialValue });
  const form = useForm({
    initialValues: registerInitialValue,
    validate: (values) => {
      const {
        name,
        email,
        userType,
        phoneNumber,
        password,
        confirmPassword,
        address,
      } = values;
      if (active === 0) {
        return {
          userType: isNotEmpty("Jenis anggota harus diisi")(userType),
          email: isEmail("Provide valid email address")(email),
          password:
            password.length < 6
              ? "Password needs a minimum of 6 character"
              : null,
          confirmPassword: matchesField(
            "password",
            "Password confirmation is different"
          )(confirmPassword, values),
        };
      }

      if (active === 1) {
        return {
          name: isNotEmpty("Name can't be empty")(name),
          phoneNumber: matches(
            /^(\+62|62)?[\s-]?0?8[1-9]{1}\d{1}[\s-]?\d{4}[\s-]?\d{2,5}$/,
            "provide valid phone number"
          )(phoneNumber),
          address: isNotEmpty("Address can't be empty")(address),
        };
      }

      return {};
    },
  });

  const register = useAuthStore((state) => state.register);

  const nextStep = () => {
    setActive((current) => {
      if (form.validate().hasErrors) {
        return current;
      }
      return current < 2 ? current + 1 : current;
    });
  };

  const prevStep = () => {
    setActive((current) => current - 1);
  };

  const handleSubmit = form.onSubmit(async (values) => {
    setLoading(true);
    try {
      await register(values);
    } catch (error) {}
    setLoading(true);
  });

  return (
    <Paper
      maw={456}
      mih={"100svh"}
      mt={120}
      style={{
        marginInline: "auto",
      }}
      mb={"xl"}
    >
      <Stack spacing={24} mb={24}>
        <BackButton to={routePaths.REGISTER_OPTION} />
        <Typography textVariant="headline-lg">
          Create a new {userType} account
        </Typography>
        <Typography textVariant="body-lg">
          Join our community of diverse voices, innovative individuals, and big
          ideas to make a difference in energy efficiency
        </Typography>
      </Stack>
      <form onSubmit={handleSubmit}>
        <Timeline active={active}>
          <Timeline.Item
            title="Input your email and password"
            bullet={<Text>1</Text>}
            bulletSize={32}
          >
            {active === 0 ? (
              <Stack spacing={16}>
                <TextInput
                  label={userTypeCopy[userType].email}
                  type="email"
                  withAsterisk
                  placeholder="Enter your email"
                  {...form.getInputProps("email")}
                />
                <PasswordInput
                  label="Password"
                  placeholder="Enter your password"
                  withAsterisk
                  {...form.getInputProps("password")}
                />
                <PasswordInput
                  label="Password Confirmation"
                  placeholder="Confirm your password"
                  withAsterisk
                  {...form.getInputProps("confirmPassword")}
                />
                <Group position="left">
                  {active !== 0 && <Button onClick={prevStep}>Back</Button>}
                  <Button onClick={nextStep}>Next</Button>
                </Group>
              </Stack>
            ) : (
              active > 0 && (
                <Box p="sm">
                  <Text size="sm" weight={"bold"}>
                    {userTypeCopy[userType].email}
                  </Text>
                  <Text c="dimmed" size="sm">
                    {form.values.email}
                  </Text>
                </Box>
              )
            )}
          </Timeline.Item>
          <Timeline.Item
            bullet={<Text>2</Text>}
            bulletSize={32}
            title={`Input your ${userTypeCopy[userType].account} detail`}
          >
            {active === 1 ? (
              <Stack spacing={16}>
                <TextInput
                  label={userTypeCopy[userType].name}
                  type="text"
                  placeholder="Nama"
                  withAsterisk
                  {...form.getInputProps("name")}
                />
                {form.values.userType === "organization" && (
                  <>
                    <TextInput
                      label="Organization industry"
                      type="text"
                      placeholder="Enter organization industry"
                      {...form.getInputProps("organization.industry")}
                    />
                  </>
                )}
                <Textarea
                  label={"Address"}
                  placeholder="Enter address"
                  withAsterisk
                  {...form.getInputProps("address")}
                />
                <TextInput
                  label="Nomor Telepon"
                  type="text"
                  placeholder="Nomor Telp"
                  inputMode="numeric"
                  withAsterisk
                  {...form.getInputProps("phoneNumber")}
                />
                <Select
                  data={[
                    "Social Media",
                    "Seetrum website",
                    "Friends or colleague",
                    "Adverstisement",
                    "Event",
                    "Other",
                  ]}
                  label="How did you hear about us?"
                  type="text"
                  placeholder="Pick one"
                  {...form.getInputProps("informationChannel")}
                />
                <TextInput
                  label="Why do you want to join?"
                  type="text"
                  placeholder="Enter you motivation in joining"
                  {...form.getInputProps("motivationToJoin")}
                />
                <Group position="left">
                  <Button variant="outline" onClick={prevStep}>
                    Back
                  </Button>
                  {userType === "individual" ? (
                    <Button loading={loading} type="submit">
                      Create my account
                    </Button>
                  ) : (
                    <Button onClick={nextStep}>Next</Button>
                  )}
                </Group>
              </Stack>
            ) : (
              active > 1 &&
              userType === "organization" && (
                <Stack py="sm" spacing={12}>
                  <InfoSummary
                    label={userTypeCopy[userType].email}
                    value={form.values.email}
                  />
                  <InfoSummary label={"Address"} value={form.values.address} />
                  <InfoSummary
                    label={"Industry"}
                    value={form.values.organization?.industry}
                  />
                  <InfoSummary
                    label={"How did you hear about us?"}
                    value={form.values.informationChannel}
                  />
                  <InfoSummary
                    label={"Why do you want to join?"}
                    value={form.values.motivationToJoin}
                  />
                </Stack>
              )
            )}
          </Timeline.Item>
          <Timeline.Item
            bullet={<Text>3</Text>}
            bulletSize={32}
            title="Input your organization PIC details"
          >
            {active === 2 && (
              <Stack spacing={16}>
                <TextInput
                  label={"PIC's full name"}
                  type="text"
                  placeholder="Enter your full name"
                  withAsterisk
                  {...form.getInputProps("organization.picName")}
                />
                <TextInput
                  label={"PIC's email"}
                  type="text"
                  placeholder="Enter your full email"
                  withAsterisk
                  {...form.getInputProps("organization.picEmail")}
                />
                <TextInput
                  label={"PIC's phone number"}
                  type="text"
                  inputMode="numeric"
                  placeholder="Enter your full phone number"
                  withAsterisk
                  {...form.getInputProps("organization.picPhoneNumber")}
                />
                <Group position="left">
                  <Button variant="outline" onClick={prevStep}>
                    Back
                  </Button>
                  <Button loading={loading} type="submit">
                    Create my account
                  </Button>
                </Group>
              </Stack>
            )}
          </Timeline.Item>
        </Timeline>
      </form>
    </Paper>
  );
};

interface InfoSummaryProps {
  label: string;
  value?: string;
}

const InfoSummary: React.FC<InfoSummaryProps> = ({ label, value = "-" }) => {
  return (
    <Box px="sm">
      <Text size="sm" weight={"bold"}>
        {label}
      </Text>
      <Text c="dimmed" size="sm">
        {value || "empty"}
      </Text>
    </Box>
  );
};
