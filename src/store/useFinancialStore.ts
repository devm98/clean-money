import { create } from "zustand";

type FinancialMood = "normal" | "celebrating";

interface FinancialState {
  mood: FinancialMood;
  setMood: (mood: FinancialMood) => void;
}

export const useFinancialStore = create<FinancialState>((set) => ({
  mood: "normal",
  setMood: (mood) => set({ mood }),
}));
