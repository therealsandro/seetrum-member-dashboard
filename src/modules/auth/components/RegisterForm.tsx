import { UserRegistrationData } from "@/types";
import {
  Box,
  Button,
  Group,
  MantineTheme,
  Paper,
  PasswordInput,
  SimpleGrid,
  Stack,
  Stepper,
  Text,
  TextInput,
} from "@mantine/core";
import {
  isEmail,
  isNotEmpty,
  matches,
  matchesField,
  useForm,
} from "@mantine/form";
import React from "react";
import { FaUser, FaUsers } from "react-icons/fa";
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
    await register(values);
  });

  return (
    <Paper p="lg">
      <Text mb={"md"} size={"xl"} weight={"bold"}>
        Create an account
      </Text>
      <form onSubmit={handleSubmit}>
        <Stepper active={active} breakpoint="sm">
          <Stepper.Step label="Informasi Akun">
            <Stack spacing="sm">
              <Box>
                <Text size="sm" weight="bold" mb="sm">
                  Daftar sebagai:
                </Text>
                <SimpleGrid cols={2}>
                  <CardButton
                    label="individual"
                    onClick={setUserType("individual")}
                    selected={form.values.userType === "individual"}
                    icon={<FaUser />}
                  />
                  <CardButton
                    label="organisasi"
                    onClick={setUserType("organization")}
                    selected={form.values.userType === "organization"}
                    icon={<FaUsers />}
                  />
                </SimpleGrid>
              </Box>
              <TextInput
                label={"Email " + userTypeCopy[form.values.userType]}
                type="email"
                placeholder="Email"
                {...form.getInputProps("email")}
              />
              <PasswordInput
                label="Password"
                placeholder="Password"
                {...form.getInputProps("password")}
              />
              <PasswordInput
                label="Konfirmasi Password"
                placeholder="Confirm Password"
                {...form.getInputProps("confirmPassword")}
              />
            </Stack>
          </Stepper.Step>
          <Stepper.Step label="Informasi Tambahan">
            <Stack spacing="sm">
              <TextInput
                label={"Nama " + userTypeCopy[form.values.userType]}
                type="text"
                placeholder="Nama"
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
                {...form.getInputProps("address")}
              />
              <TextInput
                label="Nomor Telepon"
                type="text"
                placeholder="Nomor Telp"
                {...form.getInputProps("phoneNumber")}
              />
              <TextInput
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
            </Stack>
          </Stepper.Step>
        </Stepper>
        <Group mt="xl" position="right">
          {active !== 0 && <Button onClick={prevStep}>Back</Button>}
          <Button onClick={nextStep}>Next</Button>
          {active === 2 && (
            <Button variant="outline" type="submit">
              Sign up
            </Button>
          )}
        </Group>
      </form>
      {/* <Stack>
        <Button type="submit">Sign up</Button>
      </Stack> */}
    </Paper>
  );
};

interface Props {
  icon: React.ReactNode;
  selected?: boolean;
  label: string;
  onClick?: React.MouseEventHandler;
}

const CardButton: React.FC<Props> = ({
  icon,
  label,
  selected = false,
  onClick,
}) => {
  const accentColor = "rgba(231, 245, 255, 0.35)";

  const colorVariant = (theme: MantineTheme) => ({
    active: theme.colors.blue[6],
    inactive: theme.colors.gray[5],
  });
  const state = selected ? "active" : "inactive";
  return (
    <Button
      onClick={onClick}
      variant="outline"
      p="lg"
      sx={(theme) => ({
        height: "auto",
        borderColor: colorVariant(theme)[state],
        backgroundColor: selected ? accentColor : "transparent",
        color: colorVariant(theme)[state],
        transition: "all 0.15s ease-in-out",
        ":not([data-disabled]):hover": {
          backgroundColor: selected ? accentColor : theme.colors.gray[0],
          borderColor: selected
            ? colorVariant(theme)[state]
            : theme.colors.gray[4],
          transform: "translateY(-2px)",
          boxShadow: theme.shadows.sm,
        },
      })}
    >
      <Stack align="center">
        {icon}
        <Text>{label}</Text>
      </Stack>
    </Button>
  );
};
