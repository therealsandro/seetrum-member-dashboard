import { User, UserRegistrationData } from "@/types";
import { showErrorNotif } from "@/ui/notifications";
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
  setUser: (user: any) => void;
  register: (userRegisterData: UserRegistrationData) => void;
  logIn: (email: string, password: string) => void;
  logInWithGoogle: () => void;
  logOut: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  setUser: (newUser) => {
    set({ user: newUser, loading: false });
  },
  register: async (userRegisterData) => {
    try {
      set({ loading: true });
      const newUser = await register(userRegisterData);
      set({ user: newUser, loading: false });
    } catch (e) {
      showErrorNotif({ title: "Registration error" });
      set({ loading: false, user: null });
    }
  },
  logIn: async (email, password) => {
    try {
      set({ loading: true });
      await logIn(email, password);
    } catch (e) {
      showErrorNotif({
        title: "Login error",
        message: "Incorrect email or password",
      });
      set({ loading: false, user: null });
    }
  },
  logInWithGoogle: async () => {
    try {
      set({ loading: true });
      await logInWithGoogle();
    } catch (e) {
      showErrorNotif();
      set({ loading: false, user: null });
    }
  },
  logOut: async () => {
    try {
      set({ loading: true });
      await logout();
    } catch (e) {
      showErrorNotif();
      set({ loading: false });
    }
  },
}));
