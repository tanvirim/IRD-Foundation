'use client';
// Import necessary libraries and components
import React, { useState, useEffect } from 'react';
import SubcategoriesComponent from './subCategory';

import { CategoryCard, SkeletonColumn } from '@/components';
import { useDuaStore } from '@/store';

// Define interfaces
export interface Category {
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

interface Props {
  setShowCategoryTable: React.Dispatch<React.SetStateAction<boolean>>;
}

const CategoryTable = ({ setShowCategoryTable }: Props) => {
  const { category_id, setCategoryId } = useDuaStore();

  // State variables
  const [categoryData, setCategoryData] = useState<CategoriesResponse | null>(
    null
  );

  const [subcategoriesMap, setSubcategoriesMap] = useState<
    Map<string, SubCategory[]>
  >(new Map());

  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );

  // Fetch category data on component mount
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

  // Fetch subcategories and handle toggle effect
  const fetchSubcategories = ({ catId }: subCatArgument) => {
    setCategoryId(catId);
    setShowCategoryTable((prevState) => !prevState);

    if (selectedCategoryId === catId) {
      // If the clicked category is already selected, hide subcategories
      setSubcategoriesMap((prevMap) => new Map(prevMap.set(catId, [])));
      setSelectedCategoryId(null);
    } else {
      // Otherwise, fetch and display subcategories
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
          setSelectedCategoryId(catId);
          console.log('Subcategories:', sub);
        })
        .catch((error) => {
          console.error('Error fetching subcategories: ', error);
        });
    }
  };

  return (
    <div className='overflow-scroll w-[429px] h-[837px]'>
      {categoryData ? (
        categoryData.categories.map((cat, index) => (
          <ul key={index}>
            <li
              className='cursor-pointer my-4'
              key={index}
              onClick={() => fetchSubcategories({ catId: cat.cat_id })}
            >
              <CategoryCard Category={cat} />
            </li>
            <li>
              <SubcategoriesComponent
                subcategories={
                  selectedCategoryId === cat.cat_id
                    ? subcategoriesMap.get(cat.cat_id) || []
                    : []
                }
              />
            </li>
          </ul>
        ))
      ) : (
        <SkeletonColumn />
      )}
    </div>
  );
};

export default CategoryTable;
