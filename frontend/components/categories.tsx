'use client';
import React, { useState, useEffect } from 'react';
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

export interface SubCategory {
  id: number;
  cat_id: string;
  subcat_id: string;
  subcat_name_bn: string;
  subcat_name_en: string;
  no_of_dua: number;
}

interface CategoriesResponse {
  categories: Category[];
}

interface subCatArgument {
  catId: string;
}

const CategoryTable = () => {
  const [categoryData, setCategoryData] = useState<CategoriesResponse | null>(
    null
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://ird-foundation.onrender.com');
        const data = await res.json();
        setCategoryData(data as CategoriesResponse);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const [subcategoriesMap, setSubcategoriesMap] = useState<
    Map<string, SubCategory[]>
  >(new Map());

  const fetchSubcategories = ({ catId }: subCatArgument) => {
    fetch(`https://ird-foundation.onrender.com?category_id=${catId}`)
      .then((subRes) => {
        if (!subRes.ok) {
          throw new Error('Network response was not ok');
        }
        return subRes.json();
      })
      .then((subcategoriesData) => {
        const sub = subcategoriesData.subcategories;
        setSubcategoriesMap((prevMap) => new Map(prevMap.set(catId, sub)));
        console.log('cat', sub);
      })
      .catch((error) => {
        console.error('Error fetching subcategories: ', error);
        // Handle errors, e.g., display an error message
      });
  };

  return (
    <div className=' overflow-scroll w-[429px] h-[837px]'>
      {categoryData?.categories?.map((cat, index) => (
        <ul key={index}>
          <li
            className='cursor-pointer my-4'
            key={index}
            onClick={() => fetchSubcategories({ catId: cat.cat_id })}
          >
            {cat.cat_name_en}
          </li>
          <li>
            <SubcategoriesComponent
              subcategories={subcategoriesMap.get(cat.cat_id) || []}
            />
          </li>
        </ul>
      ))}
    </div>
  );
};

export default CategoryTable;
