import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      isLoggedIn: false,
      role: null,

      login: (data) =>
        set({
          isLoggedIn: true,
          role: data.role,
        }),

      logout: () =>
        set({
          isLoggedIn: false,
          role: null,
        }),
    }),
    {
      name: "auth-storage",
    },
  ),
);
