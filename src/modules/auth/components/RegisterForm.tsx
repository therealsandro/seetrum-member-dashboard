import { UserRegistrationData } from "@/types";
import {
  Box,
  Button,
  Group,
  MantineTheme,
  Paper,
  PasswordInput,
  Select,
  Stack,
  Text,
  TextInput,
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
import { useAuthStore } from "../stores/authStore";

type RegisterFormData = UserRegistrationData & { confirmPassword: string };

const registerInitialValue: RegisterFormData = {
  name: "",
  email: "",
  address: "",
  informationChannel: "",
  password: "",
  confirmPassword: "",
  phoneNumber: "",
  userType: "individual",
  motivationToJoin: "",
};

const userTypeCopy = {
  individual: "Individu",
  organization: "Organisasi",
};

export const RegisterForm: React.FC = () => {
  const [active, setActive] = React.useState(0);
  const [loading, setLoading] = React.useState(false);

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
          email: isEmail("Masukkan email yang valid")(email),
          password:
            password.length < 6
              ? "Password harus memiliki minimal 6 karakter"
              : null,
          confirmPassword: matchesField(
            "password",
            "Konfrimasi password berbeda dengan password"
          )(confirmPassword, values),
        };
      }

      if (active === 1) {
        return {
          name: isNotEmpty("Nama harus diisi")(name),
          phoneNumber: matches(
            /^(\+62|62)?[\s-]?0?8[1-9]{1}\d{1}[\s-]?\d{4}[\s-]?\d{2,5}$/,
            "Masukan nomor telepon yang valid"
          )(phoneNumber),
          address: isNotEmpty("Alamat harus diisi")(address),
        };
      }

      return {};
    },
  });

  const register = useAuthStore((state) => state.register);

  const setUserType = (value: "individual" | "organization") => () => {
    form.setFieldValue("userType", value);
    if (value === "organization") {
      const organizationDefault = {
        industry: "",
        picName: "",
        picEmail: "",
        picPhoneNumber: "",
      };

      form.setFieldValue("organization", organizationDefault);
    } else {
      form.setFieldValue("organization", undefined);
    }
  };

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
      p="xs"
      maw={720}
      sx={{
        marginInline: "auto",
      }}
    >
      <Stack spacing={16} mt={120} mb={40}>
        <Text size={"xl"}>Register</Text>
        <Text>
          Join our community of diverse voices, innovative individuals, and big
          ideas to make a difference in energy efficiency
        </Text>
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
                  label={"Email"}
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
                <Group mt="xl" position="right">
                  {active !== 0 && <Button onClick={prevStep}>Back</Button>}
                  <Button onClick={nextStep}>Next</Button>
                </Group>
              </Stack>
            ) : (
              active > 0 && (
                <Box p="sm">
                  <Text c="dimmed" size="sm" weight={"bold"}>
                    Email
                  </Text>
                  <Text size="sm">{form.values.email}</Text>
                </Box>
              )
            )}
          </Timeline.Item>
          <Timeline.Item
            bullet={<Text>2</Text>}
            bulletSize={32}
            title="Input your account detail"
          >
            {active === 1 && (
              <Stack spacing={16}>
                <TextInput
                  label={"Nama " + userTypeCopy[form.values.userType]}
                  type="text"
                  placeholder="Nama"
                  withAsterisk
                  {...form.getInputProps("name")}
                />
                {form.values.userType === "organization" && (
                  <>
                    <TextInput
                      label="Bidang Organisasi"
                      type="text"
                      placeholder="Bidang Organisasi"
                      {...form.getInputProps("organization.industry")}
                    />
                  </>
                )}
                <TextInput
                  label={"Alamat " + userTypeCopy[form.values.userType]}
                  type="text"
                  placeholder="Alamat"
                  withAsterisk
                  {...form.getInputProps("address")}
                />
                <TextInput
                  label="Nomor Telepon"
                  type="text"
                  placeholder="Nomor Telp"
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
                  label="Darimana anda tahu tentang Seetrum"
                  type="text"
                  placeholder="Dari mana tahu tentang seetrum"
                  {...form.getInputProps("informationChannel")}
                />
                <TextInput
                  label="Motivasi bergabung"
                  type="text"
                  placeholder="Motivasi bergabung"
                  {...form.getInputProps("motivationToJoin")}
                />
                <Group mt="xl" position="right">
                  <Button onClick={prevStep}>Back</Button>
                  {/* <Button onClick={nextStep}>Next</Button> */}
                  <Button loading={loading} type="submit">
                    Sign up
                  </Button>
                </Group>
              </Stack>
            )}
          </Timeline.Item>
        </Timeline>
      </form>
      {/* <Stack>
        <Button type="submit">Sign up</Button>
      </Stack> */}
    </Paper>
  );
};

interface RegisterItemProps {
  step: number;
  active: number;
  title: string;
  children: React.ReactNode;
}

const RegisterItem: React.FC<RegisterItemProps> = ({
  step,
  active,
  title,
  children,
}) => {
  return (
    <Timeline.Item bullet={<Text>2</Text>} bulletSize={32} title={title}>
      {active === step - 1 && children}
    </Timeline.Item>
  );
};
