// duaStore.ts
import { create } from 'zustand';
import { Category } from '@/components/categories';

interface DuaStore {
  category: Category;
  setCategory: (newCategory: Category) => void;
}

export const useDuaStore = create<DuaStore>((set) => ({
  category: {
    id: '1',
    cat_id: '1',
    cat_name_bn: '',
    cat_name_en: '',
    no_of_subcat: 0,
    no_of_dua: 0,
    cat_icon: '',
  },
  setCategory: (newCategory: Category) => set({ category: newCategory }),
}));
