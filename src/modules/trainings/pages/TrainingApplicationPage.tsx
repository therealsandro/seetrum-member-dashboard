import { kProvinsi } from "@/lib/constants";
import { isIDNPhoneNumber } from "@/lib/utils";
import { useAuthStore } from "@/modules/auth/stores/authStore";
import { FileInfo } from "@/types/models/fileInfo";
import { Training } from "@/types/models/training";
import { TrainingMember } from "@/types/models/trainingMember";
import { FileUploadButton } from "@/ui/Button";
import { IconArrowLeft, IconArrowRight } from "@/ui/Icons";
import { showErrorNotif } from "@/ui/notifications";
import {
  Button,
  Center,
  Container,
  Flex,
  Footer,
  Loader,
  Select,
  TextInput,
  Textarea,
} from "@mantine/core";
import { isEmail, isNotEmpty, useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { createTrainingMember } from "../services/trainingMemberService";

const fIDummy: FileInfo = {
  tag: "dummy",
  contentType: "",
  filename: "",
  size: 0,
};

export const TrainingApplicationPage: React.FC = () => {
  const [step, setStep, training] =
    useOutletContext<
      [number, React.Dispatch<React.SetStateAction<number>>, Training]
    >();
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const loadingUser = useAuthStore((state) => state.loading);
  const [loading, setLoading] = useState(false);

  const form = useForm<Partial<TrainingMember>>({
    initialValues: {
      requiredFiles: [],
    },
    validate: (applicant) => {
      switch (step) {
        case 0:
          return {
            name: isNotEmpty("Please provide your full name")(applicant.name),
            email: isEmail("Please provide your email")(applicant.email),
            phoneNumber: isIDNPhoneNumber(
              "Please providre your mobile phone number"
            )(applicant.phoneNumber),
            age:
              applicant.age && applicant.age.valueOf() > 0
                ? null
                : "Please provide your age",
            gender: isNotEmpty("Please pick one gender")(applicant.gender),
            employmentStatus: isNotEmpty("Please pick one employment status")(
              applicant.employmentStatus
            ),
            institutionName:
              applicant.employmentStatus === "employed" &&
              isNotEmpty("Please provide your current institution")(
                applicant.institutionName
              ),
          };
        case 1:
          return {
            address: isNotEmpty("Please provide your current address")(
              applicant.address
            ),
            province: isNotEmpty("Please provide your current province")(
              applicant.province
            ),
            postalCode: isNotEmpty("Please provide your current postal code")(
              applicant.postalCode
            ),
          };
        default:
          return {
            requiredFiles:
              training.fileRequirements.some(
                (f, index) =>
                  f.required &&
                  applicant.requiredFiles![index].tag === fIDummy.tag
              ) && "Please provide required files",
          };
      }
    },
  });

  const handleSubmit = form.onSubmit(async (applicant) => {
    setLoading(true);
    try {
      applicant.status = "applied";
      applicant.trainingId = training.id;
      if (applicant.requiredFiles)
        applicant.requiredFiles = applicant.requiredFiles.filter(
          (f) => f.tag !== fIDummy.tag
        );
      form.isValid() &&
        (await createTrainingMember(applicant as TrainingMember));
      navigate("/mytrainings");
    } catch (error) {
      showErrorNotif({
        title: "Error occurred while applying you in this training.",
      });
    }
    setLoading(false);
  });

  // autofill from user
  useEffect(() => {
    if (user) {
      form.setValues({
        memberId: user.id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        address: user.address,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // initialize required files with dummies
  useEffect(() => {
    if (training) {
      form.setFieldValue(
        "requiredFiles",
        Array(training.fileRequirements.length).fill(fIDummy)
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [training]);

  if (loadingUser || !user) {
    return (
      <Center h={100}>
        <Loader />;
      </Center>
    );
  }

  const applicationForm = () => {
    switch (step) {
      case 0:
        return (
          <Flex direction={"column"} gap={24}>
            <TextInput
              placeholder="Enter your full name"
              label="Full name"
              withAsterisk
              {...form.getInputProps("name")}
              value={form.values.name ?? ""}
            />
            <TextInput
              placeholder="Enter your email"
              label="Email"
              type="email"
              withAsterisk
              {...form.getInputProps("email")}
              value={form.values.email ?? ""}
            />
            <TextInput
              placeholder="Enter your mobile phone number"
              label="Mobile phone number"
              withAsterisk
              {...form.getInputProps("phoneNumber")}
              value={form.values.phoneNumber ?? ""}
            />
            <TextInput
              placeholder="Enter your age"
              label="Age"
              type="number"
              withAsterisk
              {...form.getInputProps("age")}
              value={form.values.age?.toString() ?? ""}
            />
            <Select
              placeholder="Enter your gender"
              label="Gender"
              withAsterisk
              data={[
                { value: "male", label: "Male" },
                { value: "female", label: "Female" },
              ]}
              {...form.getInputProps("gender")}
              value={form.values.gender ?? ""}
            />
            <Select
              placeholder="Enter your employment status"
              label="Employment status"
              withAsterisk
              data={[
                { value: "unemployed", label: "Unemployed" },
                { value: "employed", label: "Employed" },
              ]}
              {...form.getInputProps("employmentStatus")}
              value={form.values.employmentStatus ?? ""}
              onChange={(val) => {
                form.setFieldValue(
                  "institutionName",
                  val === "unemployed" ? "-" : ""
                );
                form.setFieldValue(
                  "employmentStatus",
                  val as typeof form.values.employmentStatus
                );
              }}
            />
            <TextInput
              placeholder="Enter your current institution"
              label="Current institution"
              disabled={form.values.employmentStatus !== "employed"}
              withAsterisk={form.values.employmentStatus === "employed"}
              {...form.getInputProps("institutionName")}
              value={form.values.institutionName ?? ""}
            />
          </Flex>
        );

      case 1:
        return (
          <Flex direction="column" gap={24}>
            <Textarea
              placeholder="Enter your address"
              label="Address"
              withAsterisk
              {...form.getInputProps("address")}
              value={form.values.address ?? ""}
            />
            <Select
              data={kProvinsi}
              placeholder="Pick your province"
              label="Province"
              withAsterisk
              searchable
              nothingFound="Not found"
              {...form.getInputProps("province")}
              value={form.values.province ?? ""}
            />
            <TextInput
              placeholder="Enter your postal code"
              label="Postal code"
              withAsterisk
              {...form.getInputProps("postalCode")}
              value={form.values.postalCode ?? ""}
            />
          </Flex>
        );

      default:
        return (
          <Flex direction="column" gap={24}>
            {training.fileRequirements.map((fR, indexFile) => {
              const uploadedFile =
                form.values.requiredFiles &&
                form.values.requiredFiles[indexFile];
              const isDummy: boolean = Boolean(
                uploadedFile && uploadedFile.tag === fIDummy.tag
              );
              return (
                <FileUploadButton
                  key={indexFile}
                  value={isDummy ? undefined : uploadedFile}
                  error={fR.required && isDummy ? "-" : undefined}
                  onFileChange={(fI) => {
                    form.setFieldValue(
                      `requiredFiles.${indexFile}`,
                      fI ?? fIDummy
                    );
                  }}
                  {...fR}
                />
              );
            })}
          </Flex>
        );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {applicationForm()}
      <Footer height={64} p={"sm"}>
        <Container>
          <Flex w="100%" justify="space-between">
            {step > 0 ? (
              <Button
                leftIcon={<IconArrowLeft />}
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation();
                  setStep((lastStep) => (lastStep > 0 ? step - 1 : 0));
                }}
              >
                Back
              </Button>
            ) : (
              <Flex />
            )}
            <Button
              type="submit"
              loading={loading}
              rightIcon={step < 2 && <IconArrowRight />}
              disabled={!form.isValid()}
              onClick={(e) => {
                if (!form.validate().hasErrors) {
                  if (step < 2) {
                    setStep((lastStep) => (lastStep < 2 ? step + 1 : 2));
                    e.preventDefault();
                    e.stopPropagation();
                  }
                }
              }}
            >
              {step === 2 ? "Submit application" : "Next"}
            </Button>
          </Flex>
        </Container>
      </Footer>
    </form>
  );
};
