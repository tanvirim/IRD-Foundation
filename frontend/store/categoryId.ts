// duaStore.ts
import { create } from 'zustand';

interface DuaStore {
  category_id: string;
  setCategoryId: (categoryId: string) => void;
}

export const useDuaStore = create<DuaStore>((set) => ({
  category_id: '',
  setCategoryId: (categoryId: string) => set({ category_id: categoryId }),
}));
