import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type { SampleData, SampleSearchParams } from './types';
// ... (skip down to line 134) actually I can't skip with replace_file_content unless I do two calls or multi.
// Let's do multi for store.ts as it has two issues farther apart


interface SampleState {
  items: SampleData[];
  filteredItems: SampleData[];
  searchParams: SampleSearchParams;

  // Actions
  initialize: () => void;
  setSearchParams: (params: Partial<SampleSearchParams>) => void;
  search: () => void;

  // CRUD
  add: (item: Omit<SampleData, 'id' | 'created_at' | 'updated_at'>) => void;
  update: (id: number, item: Partial<SampleData>) => void;
  remove: (ids: number[]) => void;
  copy: (ids: number[]) => void; // Copies to internal clipboard state (not implemented in MVP but placeholder)
  paste: () => void; // Pastes from internal clipboard

  // Clipboard
  clipboard: SampleData[];
  copyHelpers: {
    copyToClipboard: (item: SampleData) => void;
    pasteFromClipboard: () => void;
  }
}

// Mock Data Generator
const generateMockData = (count: number): SampleData[] => {
  const data: SampleData[] = [];
  const now = new Date();

  for (let i = 1; i <= count; i++) {
    const dateOffset = Math.floor(Math.random() * 30);
    const startDate = new Date(now);
    startDate.setDate(now.getDate() - dateOffset);

    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + Math.floor(Math.random() * 10) + 1);

    data.push({
      id: i,
      name: `Sample Item ${i}`,
      start_date: startDate.toISOString().split('T')[0],
      end_date: endDate.toISOString().split('T')[0],
      created_at: now.toISOString(),
      updated_at: now.toISOString(),
    });
  }
  return data;
};

const INITIAL_ITEMS = generateMockData(99);

export const useSampleStore = create<SampleState>()(
  immer((set, get) => ({
    items: [],
    filteredItems: [],
    searchParams: {
      name: '',
      startDate: new Date(new Date().setDate(new Date().getDate() - 7)).toISOString().split('T')[0], // 1 week ago
      endDate: new Date().toISOString().split('T')[0],
    },
    clipboard: [],

    initialize: () => {
      set((state) => {
        if (state.items.length === 0) {
          state.items = INITIAL_ITEMS;
          state.filteredItems = INITIAL_ITEMS; // Initial load shows all? Or apply initial filter?
          // Requirements say: "start_date >= 검색시작일 AND end_date <= 검색종료일"
          // Let's just load all initially for better UX, then search does filtering.
        }
      });
      get().search(); // Apply initial filter
    },

    setSearchParams: (params) => {
      set((state) => {
        state.searchParams = { ...state.searchParams, ...params };
      });
    },

    search: () => {
      set((state) => {
        const { name, startDate, endDate } = state.searchParams;
        state.filteredItems = state.items.filter((item) => {
          const matchName = item.name.toLowerCase().includes(name.toLowerCase());
          const matchDate = item.start_date >= startDate && item.end_date <= endDate;
          return matchName && matchDate;
        });
      });
    },

    add: (newItem) => {
      set((state) => {
        const id = Math.max(0, ...state.items.map(i => i.id)) + 1;
        const now = new Date().toISOString();
        const item: SampleData = {
          ...newItem,
          id,
          created_at: now,
          updated_at: now,
        };
        state.items.unshift(item); // Add to top
        state.filteredItems.unshift(item); // Add to view as well (simplification)
      });
    },

    update: (id, updates) => {
      set((state) => {
        const index = state.items.findIndex(i => i.id === id);
        if (index !== -1) {
          state.items[index] = { ...state.items[index], ...updates, updated_at: new Date().toISOString() };

          // Also update filtered list if present
          const filteredIndex = state.filteredItems.findIndex(i => i.id === id);
          if (filteredIndex !== -1) {
            state.filteredItems[filteredIndex] = state.items[index];
          }
        }
      });
    },

    remove: (ids) => {
      set((state) => {
        state.items = state.items.filter(i => !ids.includes(i.id));
        state.filteredItems = state.filteredItems.filter(i => !ids.includes(i.id));
      });
    },

    copy: (_ids) => {
        // Not used directly, using helper
    },
    paste: () => {
        // Not used directly, using helper
    },

    copyHelpers: {
      copyToClipboard: (item) => {
        set((state) => {
          state.clipboard = [item]; // Single item copy for now
        });
      },
      pasteFromClipboard: () => {
        set((state) => {
          if (state.clipboard.length > 0) {
            const source = state.clipboard[0];
            const id = Math.max(0, ...state.items.map(i => i.id)) + 1;
            const now = new Date().toISOString();
            const newItem: SampleData = {
              ...source,
              id,
              name: `${source.name} (Copy)`,
              created_at: now,
              updated_at: now
            };
            state.items.push(newItem); // Add to bottom as per requirement
            state.filteredItems.push(newItem);
          }
        });
      }
    }
  }))
);
