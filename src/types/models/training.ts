import { BaseModel } from ".";
import { FileInfo, fileInfoDummy } from "./fileInfo";

export type Training = BaseModel & TrainingModel;

export type TrainingModel = {
  title: string;
  trainerName: string;
  thumbnailFileName: string;
  description: string;
  dueDate: Date;
  attachments: FileInfo[];
  fileRequirements: FileRequirement[];
};

export type FileRequirement = {
  title: string;
  description: string;
  accepts: string;
};
export const fileRequirementDummy = {
  title: "Curriculum vitae",
  description:
    "Upload your comprehensive CV highlighting your relevant qualifications, experiences, educations, and skills. We can accept only PDF files that are less than 2 MB in size.",
  accepts: "image/png,image/jpeg",
};

export const trainingModelDummy: TrainingModel = {
  title: "Electrical Energy System Auditor",
  trainerName: "Enertec",
  thumbnailFileName: "1684417943368-file.png",
  description: `
  Society of Energy Efficiency Trust Movement (SEETRUM) sebagai organisasi yang memiliki visi untuk membangun ekosistem di bidang energi efisiensi guna meningkatkan kepercayaan kepada para seluruh stakeholder di bidang energi efisiensi. Untuk itu, SEETRUM memiliki beberapa misi, salah satunya adalah untuk menjembatani dan memfasilitasi semua pemangku kepentingan untuk membangun ekosistem energi efisiensi yang kohesif di Indonesia.

  Kami akan melaksanakan Pelatihan Auditor Energi Termal dan Elektrikal dan Pelatihan Auditor Bangunan Gedung yang akan dilaksanakan pada:
  
  Hari, tanggal: Jumat-Senin, 24-27 Maret 2023 (Training) dan Selasa, 28 Maret 2023 (Sertifikasi)
  Waktu: 09.00 - 16.00
  Lokasi: Hotel Cipta Wahid Hasyim (Jl. K.H. Wahid Hasyim No.53, RT.1/RW.4, Gondangdia, Kec. Menteng, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10350)
  
  Batas waktu pendaftaran pelatihan ini adalah 22 Maret 2023.
  
  Silahkan menghubungi Instagram kami, @seetrum.id jika Anda memiliki pertanyaan seputar pelatihan ini atau Anda mengalami kesulitan dalam mengisi formulir ini.
  
  Terima kasih.`,
  dueDate: new Date(),
  attachments: [fileInfoDummy],
  fileRequirements: [fileRequirementDummy],
};