import { TrainingMember } from "@/types/models/trainingMember";
import { create } from "zustand";

interface TrainingApplicationFormStore {
  trainingMember: Partial<TrainingMember> | undefined;
  setTrainingMember: (trainingMember: Partial<TrainingMember>) => void;
}
export const useApplicationFrom = create<TrainingApplicationFormStore>(
  (set, get) => ({
    trainingMember: undefined,
    setTrainingMember: (trainingMember: Partial<TrainingMember>) => {
      set((state) => ({
        trainingMember: state.trainingMember
          ? Object.assign(state.trainingMember, trainingMember)
          : trainingMember,
      }));
    },
  })
);
