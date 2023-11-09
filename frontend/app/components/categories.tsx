import React from 'react';

interface Category {
  id: number;
  cat_icon: string;
  cat_name_bn: string;
  cat_name_en: string;
  no_of_dua: number;
  no_of_subcat: number;
}

const CategoryTable = async () => {
  const res = await fetch('http://localhost:8080/data');
  const category: Category[] = await res.json();

  console.log('category', category);
  return (
    <div>
      {category?.map((cat, index) => (
        <ul key={index}>
          <li>{cat.cat_name_bn}</li>
          <li>{cat.cat_name_en}</li>
        </ul>
      ))}
    </div>
  );
};

export default CategoryTable;
