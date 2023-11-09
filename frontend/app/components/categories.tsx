import React from 'react';

interface Category {
  id: number;
  cat_id: number;
  cat_name_bn: string;
  cat_name_en: string;
  no_of_subcat: number;
  no_of_dua: number;
  cat_icon: string;
}

interface CategoriesResponse {
  categories: Category[];
}

const CategoryTable = async () => {
  const res = await fetch('https://ird-foundation.onrender.com/data');
  const category = (await res.json()) as CategoriesResponse;

  console.log('category', category);
  return (
    <div>
      {category.categories?.map((cat, index) => (
        <ul key={index}>
          <li>{cat.cat_name_bn}</li>
          <li>{cat.cat_name_en}</li>
        </ul>
      ))}
    </div>
  );
};

export default CategoryTable;
