import AsyncStorage from "@react-native-async-storage/async-storage";
import create from "zustand";

const useStore = create((set, get) => ({
  token: null,
  darkMode: true,
  mob: "",
  user: null,
  setUser: (user) => set((state) => ({ user })),
  setMob: (mob) => set({ mob }),
  toggleTheme: () => set((state) => ({ darkMode: !state.darkMode })),
  setToken: (token) => set((state) => ({ token })),
  refreshData: false,
  toggleRefresh: () => set((state) => ({ refreshData: !state.refreshData })),
  socket: null,
  setSocket: (socket) => set((state) => ({ socket })),
}));

export default useStore;
