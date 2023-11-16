import { create } from 'zustand';
import { Category, SubCategory } from '@/types';

interface DuaStore {
  isBooleanValue: boolean;
  setBooleanValue: (value: boolean) => void;

  subcategoryId: string;
  setSubcategoryId: (newsubcategoryId: string) => void;

  duaId: string;
  setDuaId: (newDuaId: string) => void;

  category: Category;
  setCategory: (newCategory: Category) => void;

  subcategories: SubCategory[];
  setSubcategories: (newSubcategories: SubCategory[]) => void;
}

export const useDuaStore = create<DuaStore>((set) => ({
  isBooleanValue: true,
  setBooleanValue: (value) => set({ isBooleanValue: value }),

  subcategoryId: '1',
  setSubcategoryId: (newsubcategoryId: string) =>
    set({ subcategoryId: newsubcategoryId }),

  duaId: '1',
  setDuaId: (newDuaId: string) => set({ duaId: newDuaId }),

  category: {
    id: '1',
    cat_id: '1',
    cat_name_bn: 'দোয়ার গুরুত্ব',
    cat_name_en: `Dua's Importance`,
    no_of_subcat: 0,
    no_of_dua: 0,
    cat_icon: '',
  },
  subcategories: [
    {
      id: '1',
      cat_id: '1',
      subcat_id: '1',
      subcat_name_bn: 'বান্দা তার রবের মুখাপেক্ষী',
      subcat_name_en: 'The servant is dependent on his Lord',
      no_of_dua: 3,
    },
    {
      id: '2',
      cat_id: '1',
      subcat_id: '2',
      subcat_name_bn:
        'আল্লাহ্‌র কাছে যে জিনিসটি চাওয়া সবচাইতে বেশি গুরুত্বপূর্ণ',
      subcat_name_en: 'The most important thing to ask Allah for',
      no_of_dua: 9,
    },
    {
      id: '3',
      cat_id: '1',
      subcat_id: '3',
      subcat_name_bn: 'জান্নাত লাভ ও জাহান্নাম থেকে রেহাই',
      subcat_name_en: 'Ask for paradise & protection from fire',
      no_of_dua: 2,
    },
    {
      id: '4',
      cat_id: '1',
      subcat_id: '4',
      subcat_name_bn: 'দ্বীনের উপর অটল থাকার দোয়া',
      subcat_name_en: 'Dua to remain steadfast on the religion',
      no_of_dua: 3,
    },
    {
      id: '5',
      cat_id: '1',
      subcat_id: '5',
      subcat_name_bn: 'সকল কাজে উত্তম পরিণতির দোয়া',
      subcat_name_en: 'Dua of good outcome in all deeds',
      no_of_dua: 1,
    },
    {
      id: '6',
      cat_id: '1',
      subcat_id: '6',
      subcat_name_bn: 'নিয়ামাত বা অনুগ্রহের প্রার্থনা',
      subcat_name_en: 'Seeking whatever good Allah can bestow',
      no_of_dua: 2,
    },
    {
      id: '7',
      cat_id: '1',
      subcat_id: '7',
      subcat_name_bn:
        'বিভীষিকা, দুর্দশা, মন্দ পরিণতি ও শত্রুর উল্লাস থেকে আশ্রয়',
      subcat_name_en:
        'Shelter from horror, misery, evil consequences and rejoicing of the enemy',
      no_of_dua: 1,
    },
  ],

  setCategory: (newCategory: Category) => set({ category: newCategory }),

  setSubcategories: (newSubcategories: SubCategory[]) =>
    set({ subcategories: newSubcategories }),
}));
