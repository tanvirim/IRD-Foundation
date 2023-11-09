import React from 'react';
import SubcategoriesComponent from './subCategory';

interface Category {
  id: number;
  cat_id: string;
  cat_name_bn: string;
  cat_name_en: string;
  no_of_subcat: number;
  no_of_dua: number;
  cat_icon: string;
}

interface CategoriesResponse {
  categories: Category[];
}

const CategoryTable: React.FC = async () => {
  const res = await fetch('https://ird-foundation.onrender.com');
  const category = (await res.json()) as CategoriesResponse;

  return (
    <div className='border-x-2 border-black w-full'>
      {category.categories?.map((cat, index) => (
        <ul key={index}>
          <li>{cat.cat_name_bn}</li>
          <li>
            <SubcategoriesComponent catId={cat.cat_id} />
          </li>
        </ul>
      ))}
    </div>
  );
};

export default CategoryTable;
