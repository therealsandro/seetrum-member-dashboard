import { Training } from "@/types/models/training";
import { create } from "zustand";
import { getAllTrainings } from "../services/trainingService";
import { showErrorNotif } from "@/ui/notifications";

interface TrainingState {
  trainings: Training[] | null;
  loading: boolean;
  getTrainings: () => Promise<Training[] | null>;
  setTrainings: (trainings: Training[]) => void;
  addTraining: (training: Training) => void;
  updateTraining: (training: Training) => void;
}

export const useTrainings = create<TrainingState>((set, get) => ({
  trainings: null,
  loading: false,
  getTrainings: async () => {
    if (get().trainings) return get().trainings;

    try {
      set({ loading: true });
      const trainingsList = await getAllTrainings();
      set({ trainings: trainingsList, loading: false });
      return trainingsList;
    } catch (error) {
      showErrorNotif({ title: "Failed fetch trainings" });
      set({ trainings: null, loading: false });
      return null;
    }
  },
  setTrainings: (trainings) => set(() => ({ trainings })),
  addTraining: (trainig) =>
    set((state) => {
      if (state.trainings) {
        state.trainings.push(trainig);
        return { trainings: state.trainings };
      } else {
        return { trainings: [trainig] };
      }
    }),
  updateTraining: (training) =>
    set((state) => ({
      trainings: state.trainings
        ? state.trainings.map((t) => (t.id === training.id ? training : t))
        : [training],
    })),
}));
