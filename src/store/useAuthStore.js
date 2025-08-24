import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      isLoggedIn: false,
      role: null,
      characterId: null,

      login: (data) =>
        set({
          isLoggedIn: true,
          role: data.role,
        }),

      setCharacterId: (id) => set({ characterId: id }),

      logout: () =>
        set({
          isLoggedIn: false,
          role: null,
          characterId: null,
        }),
    }),
    {
      name: "auth-storage",
    },
  ),
);
