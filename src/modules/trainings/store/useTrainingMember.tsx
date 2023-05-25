import { TrainingMember } from "@/types/models/trainingMember";
import { showErrorNotif } from "@/ui/notifications";
import { create } from "zustand";
import { getTrainingMemberByMemberId } from "../services/trainingMemberService";

interface TrainingMemberStore {
  trainingMember: TrainingMember[] | null;
  memberId: string | null;
  loading: boolean;
  error: any | null;
  getTrainingMemberByMemberId: (
    memberId: string
  ) => Promise<TrainingMember[] | null>;
  getTrainingsByTrainingId: (
    memberId: string,
    trainingId: string
  ) => Promise<TrainingMember | null>;
  setTrainingMember: (trainings: TrainingMember[]) => void;
  addTrainingMember: (trainingMember: TrainingMember) => void;
  updateTrainingMember: (trainingMember: TrainingMember) => void;
}

export const useTrainingMember = create<TrainingMemberStore>((set, get) => ({
  trainingMember: null,
  memberId: null,
  loading: false,
  error: null,
  getTrainingMemberByMemberId: async (memberId) => {
    if (get().trainingMember) return get().trainingMember;

    try {
      set({ loading: true });
      const trainingsList = await getTrainingMemberByMemberId(memberId);
      // trainingsList.sort((b, a) => a.createdAt.seconds - b.createdAt.seconds);
      set({
        trainingMember: Boolean(trainingsList) ? trainingsList : null,
        memberId,
        loading: false,
        error: null,
      });
      return trainingsList;
    } catch (error) {
      showErrorNotif({ title: "Failed fetch trainings" });
      set({ trainingMember: null, memberId, loading: false, error });
      return null;
    }
  },
  setTrainingMember: (trainings) => set(() => ({ trainingMember: trainings })),
  getTrainingsByTrainingId: async (memberId, trainingId) => {
    const ts = get().trainingMember;
    if (ts) {
      const training = ts.find((t) => t.trainingId === trainingId);
      if (training) return training;
    }

    try {
      set({ loading: true });
      const trainings = await getTrainingMemberByMemberId(memberId);
      set({ trainingMember: trainings, memberId, loading: false, error: null });
      const training =
        trainings.find((f) => f.trainingId === trainingId) ?? null;
      return training;
    } catch (error) {
      showErrorNotif({ title: "Failed fetch trainings" });
      set({ trainingMember: null, loading: false, error });
      return null;
    }
  },
  addTrainingMember: (trainingMember) =>
    set((state) => {
      if (state.trainingMember) {
        state.trainingMember.push(trainingMember);
        return { trainingMember: state.trainingMember };
      } else {
        return { trainingMember: [trainingMember] };
      }
    }),
  updateTrainingMember: (trainingMember) =>
    set((state) => ({
      trainingMember: state.trainingMember
        ? state.trainingMember.map((tM) =>
            tM.id === trainingMember.id ? trainingMember : tM
          )
        : [trainingMember],
    })),
}));
