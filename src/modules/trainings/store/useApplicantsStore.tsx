import { TrainingMember } from "@/types/models/trainingMember";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { getTrainingMemberByTrainingId } from "../services/trainingMemberService";

interface ApplicantStoreStates {
  applicants?: Record<string, TrainingMember[]>;
  activeApplicant?: TrainingMember;
  getApplicants: (trainingId: string) => Promise<TrainingMember[]>;
  getAplicantById: (
    trainingId: string,
    memberId: string
  ) => Promise<TrainingMember | undefined>;
  isValid?: Record<string, boolean>;
  updateActiveApplicant: (
    trainingId: string,
    memberId: string,
    updateData: Partial<TrainingMember>
  ) => Promise<void>;
}

export const useApplicantStore = create(
  devtools<ApplicantStoreStates>((set, get) => ({
    async getApplicants(trainingId) {
      const applicants = get().applicants;
      const isValid = get().isValid;
      if (
        applicants &&
        applicants[trainingId] &&
        isValid &&
        isValid[trainingId]
      )
        return applicants[trainingId];

      const lastesApplicants = await getTrainingMemberByTrainingId(trainingId);
      set((s) => ({
        applicants: { ...s.applicants, [trainingId]: lastesApplicants },
        isValid: { ...s.isValid, [trainingId]: true },
      }));
      setTimeout(
        () => set((s) => ({ isValid: { ...s.isValid, [trainingId]: false } })),
        60 * 1000
      );
      return lastesApplicants;
    },
    async getAplicantById(trainingId, memberId) {
      const isValid = get().isValid;
      const applicants = get().applicants;

      const applicant =
        applicants &&
        applicants[trainingId] &&
        applicants[trainingId].find((a) => a.id === memberId);
      if (applicant && isValid && isValid[trainingId]) {
        set({ activeApplicant: applicant });
        return applicant;
      }

      const latestApplicants = await get().getApplicants(trainingId);
      const updatedApplicant = latestApplicants.find(
        (applicant) => applicant.id === memberId
      );
      set({ activeApplicant: updatedApplicant });
      return updatedApplicant;
    },
    async updateActiveApplicant(trainingId, memberId, updateData) {
      const applicant = await get().getAplicantById(trainingId, memberId);
      if (applicant) {
        set((s) => ({
          activeApplicant: { ...applicant, ...updateData },
          isValid: { ...s.isValid, [trainingId]: false },
        }));
      }
    },
  }))
);
