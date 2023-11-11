import { create } from "zustand";

type MonthStore = {
  month: number;
  setMonth: (month: number) => void;
};
const useMonthStore = create<MonthStore>((set) => ({
  month: new Date().getMonth(),
  setMonth: (month) => set({ month }),
}));

export default useMonthStore;
