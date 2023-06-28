import { FileRequirement, fileRequirementDummy } from "@/types/models/training";

export const DEFAULT_TITLE = "Dashboard";

// COLLECTION
export const COLLECTION_USERS = "users";
export const COLLECTION_TRAINING = "training";
export const COLLECTION_TRAINING_MEMBER = "trainingMember";
export const COLLECTION_EVENT = "event";

// Provinsi
export const kProvinsi = [
  "ACEH",
  "SUMATERA UTARA",
  "SUMATERA BARAT",
  "RIAU",
  "JAMBI",
  "SUMATERA SELATAN",
  "BENGKULU",
  "LAMPUNG",
  "KEPULAUAN BANGKA BELITUNG",
  "KEPULAUAN RIAU",
  "DKI JAKARTA",
  "JAWA BARAT",
  "JAWA TENGAH",
  "DAERAH ISTIMEWA YOGYAKARTA",
  "JAWA TIMUR",
  "BANTEN",
  "BALI",
  "NUSA TENGGARA BARAT",
  "NUSA TENGGARA TIMUR",
  "KALIMANTAN BARAT",
  "KALIMANTAN TENGAH",
  "KALIMANTAN SELATAN",
  "KALIMANTAN TIMUR",
  "KALIMANTAN UTARA",
  "SULAWESI UTARA",
  "SULAWESI TENGAH",
  "SULAWESI SELATAN",
  "SULAWESI TENGGARA",
  "GORONTALO",
  "SULAWESI BARAT",
  "MALUKU",
  "MALUKU UTARA",
  "PAPUA",
  "PAPUA BARAT",
];

export const kRowsPerPageOptions = ["10", "25", "50", "100", "200"];

export const kDefaultThumbnailFilename = "0000000000000-default-thumbnail.jpg";

type FrMeta = Omit<FileRequirement, "title" | "description">;
export const frPdfMeta: FrMeta = {
  accepts: "application/pdf",
  required: true,
  maxSize: 2 * 1024 ** 2,
};

export const frImageMeta: FrMeta = {
  accepts: "image/png,image/jpeg",
  required: true,
  maxSize: 2 * 1024 ** 2,
};

export const kDefaultFileRequirements: FileRequirement[] = [
  {
    title: "Curriculum Vitae",
    description:
      "Upload your comprehensive CV highlighting your relevant qualifications, experiences, educations, and skills. We can accept only PDF files that are less than 2 MB in size.",
    ...frPdfMeta,
  },
  {
    title: "Photo",
    description:
      "Upload a professional photo of yourself for identification purposes. We can accept only JPEG or PNG files that are less than 2 MB in size.",
    ...frImageMeta,
  },
  {
    title: "Degree certificate (Ijazah)",
    description:
      "Upload a clear and valid copy of your degree certificate to verify your educational background. We can accept only PDF files that are less than 2 MB in size.",
    ...frPdfMeta,
  },
  {
    ...fileRequirementDummy,
    title: "Personal ID Card (KTP)",
    description:
      "Upload a scanned copy of your government-issued ID card for identification and verification purposes. We can accept only PDF, JPEG, or PNG files that are less than 2 MB in size.",
    ...frPdfMeta,
  },
  {
    title: "Supporting Document",
    description:
      "Upload any supporting documents that demonstrate your previous experience in conducting energy audits. We can accept only PDF files that are less than 5 MB in size.",
    ...frPdfMeta,
    required: false,
    maxSize: 5 * 1024 ** 2,
  },
];
