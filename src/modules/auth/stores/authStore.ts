import { User, UserRegistrationData } from "@/types";
import { create } from "zustand";
import {
  logIn,
  logInWithGoogle,
  logout,
  register,
} from "../services/authService";

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string;
  setUser: (user: any) => void;
  register: (userRegisterData: UserRegistrationData) => void;
  logIn: (email: string, password: string) => void;
  logInWithGoogle: () => void;
  logOut: () => void;
}

const ErrorMessage = "Terjadi kesalah saat menghubungi server";

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  error: "",
  setUser: (newUser) => {
    set({ user: newUser, loading: false });
  },
  register: async (userRegisterData) => {
    try {
      set({ loading: true });
      const newUser = await register(userRegisterData);
      set({ user: newUser, loading: false });
    } catch (e) {
      set({ loading: false, user: null, error: ErrorMessage });
    }
  },
  logIn: async (email, password) => {
    try {
      set({ loading: true });
      await logIn(email, password);
    } catch (e) {
      set({ loading: false, user: null, error: ErrorMessage });
    }
  },
  logInWithGoogle: async () => {
    try {
      set({ loading: true });
      await logInWithGoogle();
    } catch (e) {
      set({ loading: false, user: null, error: ErrorMessage });
    }
  },
  logOut: async () => {
    try {
      set({ loading: true });
      await logout();
    } catch (e) {
      set({ loading: false, error: ErrorMessage });
    }
  },
}));
