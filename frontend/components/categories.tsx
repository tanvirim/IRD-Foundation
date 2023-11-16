'use client';
import React, { useState, useEffect, useMemo } from 'react';
import SubcategoriesComponent from './subCategory';

import { CategoryCard, SkeletonColumn } from '@/components';
import { useDuaStore } from '@/store';
import { Category, SubCategory } from '@/types';

interface CategoriesResponse {
  categories: Category[];
}

interface subCatArgument {
  category: Category;
}

const CategoryTable = () => {
  const { setCategory, setSubcategories } = useDuaStore();

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

  // Memoize the categoryData
  const memoizedCategoryData = useMemo(() => categoryData, [categoryData]);

  // Fetch subcategories and handle toggle effect
  const fetchSubcategories = ({ category }: subCatArgument) => {
    setCategory(category);

    if (selectedCategoryId === category.cat_id) {
      // If the clicked category is already selected, hide subcategories
      setSubcategoriesMap(
        (prevMap) => new Map(prevMap.set(category.cat_id, []))
      );
      setSelectedCategoryId(null);
    } else {
      // Otherwise, fetch and display subcategories
      fetch(
        `https://ird-foundation.onrender.com?category_id=${category.cat_id}`
      )
        .then((subRes) => {
          if (!subRes.ok) {
            throw new Error('Network response was not ok');
          }
          return subRes.json();
        })
        .then((subcategoriesData) => {
          const sub = subcategoriesData.subcategories;
          setSubcategories(sub);
          setSubcategoriesMap(
            (prevMap) => new Map(prevMap.set(category.cat_id, sub))
          );
          setSelectedCategoryId(category.cat_id);
        })
        .catch((error) => {
          console.error('Error fetching subcategories: ', error);
        });
    }
  };

  return (
    <div className='w-[429px]  h-[670px] overflow-auto bg-white md:w-[350px]'>
      {memoizedCategoryData ? (
        memoizedCategoryData.categories.map((cat, index) => (
          <ul key={index}>
            <li
              className='cursor-pointer my-4'
              key={index}
              onClick={() => fetchSubcategories({ category: cat })}
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
