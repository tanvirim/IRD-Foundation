// Define interfaces
export interface Category {
  id: string;
  cat_id: string;
  cat_name_bn: string;
  cat_name_en: string;
  no_of_subcat: number;
  no_of_dua: number;
  cat_icon: string;
}

export interface SubCategory {
  id: string;
  cat_id: string;
  subcat_id: string;
  subcat_name_bn: string;
  subcat_name_en: string;
  no_of_dua: number;
}

export interface Dua {
  id: string;
  cat_id: string;
  dua_name_en: string;
}
