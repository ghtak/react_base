import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface MainState {
  count: number;
  increase: () => void;
  reset: () => void;
}

export const useMainStore = create<MainState>()(immer((set) => ({
  count: 0,
  increase: () => set((state) => {
    state.count += 1; // Immer 덕분에 직접 수정 가능
  }),
  reset: () => set((state) => {
    state.count = 0;
  }),
})));
