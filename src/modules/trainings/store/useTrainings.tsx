import { Training } from "@/types/models/training";
import { create } from "zustand";
import { getAllTrainings, getTrainingById } from "../services/trainingService";
import { showErrorNotif } from "@/ui/notifications";

interface TrainingState {
  trainings: Training[] | null;
  loading: boolean;
  error: any | null;
  getTrainings: () => Promise<Training[] | null>;
  getTrainingsById: (id: string) => Promise<Training | null>;
  setTrainings: (trainings: Training[]) => void;
  addTraining: (training: Training) => void;
  updateTraining: (training: Training) => void;
}

export const useTrainings = create<TrainingState>((set, get) => ({
  trainings: null,
  loading: false,
  error: null,
  getTrainings: async () => {
    if (get().trainings) return get().trainings;

    try {
      set({ loading: true });
      const trainingsList = await getAllTrainings();
      set({ trainings: trainingsList, loading: false, error: null });
      return trainingsList;
    } catch (error) {
      showErrorNotif({ title: "Failed fetch trainings" });
      set({ trainings: null, loading: false, error });
      return null;
    }
  },
  setTrainings: (trainings) => set(() => ({ trainings })),
  getTrainingsById: async (id) => {
    const ts = get().trainings;
    if (ts) {
      const training = ts.find((t) => t.id === id);
      if (training) return training;
    }

    try {
      set({ loading: true });
      const training = await getTrainingById(id);
      set({ loading: false, error: null });
      return training;
    } catch (error) {
      showErrorNotif({ title: "Failed fetch trainings" });
      set({ trainings: null, loading: false, error });
      return null;
    }
  },
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
