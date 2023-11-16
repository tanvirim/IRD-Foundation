'use client';
import { useDuaStore } from '@/store';
import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';

import { FaBars } from 'react-icons/fa';
import { Dua } from '@/types';

import DuaCard from './duaCard';

const DuaList = () => {
  const {
    category,
    subcategories,
    subcategoryId,
    duaId,
    setBooleanValue,
    isBooleanValue,
  } = useDuaStore();
  const handleButtonClick = () => {
    setBooleanValue(!isBooleanValue);
  };

  const [duas, setDuas] = useState<Dua[]>([]);
  // Create a ref for the subcategory div
  const subcategoryRef = useRef<HTMLDivElement>(null);
  const duaRef = useRef<HTMLLIElement>(null);

  // Use useLayoutEffect to ensure scrolling happens after rendering
  useLayoutEffect(() => {
    if (subcategoryId && subcategoryRef.current) {
      const parentContainer = subcategoryRef.current.parentElement;

      // Calculate the scroll position, considering the offset
      const scrollPosition = subcategoryRef.current.offsetTop;

      parentContainer?.scrollTo({
        top: scrollPosition,
        behavior: 'smooth',
      });
    }
  }, [subcategoryId]);

  useLayoutEffect(() => {
    if (duaId && duaRef.current) {
      const parentContainer = duaRef.current.parentElement;

      // Calculate the scroll position, considering the offset
      const scrollPosition = duaRef.current.offsetTop;

      parentContainer?.scrollTo({
        top: scrollPosition,
        behavior: 'smooth',
      });
    }
  }, [duaId]);

  useEffect(() => {
    if (category.cat_id) {
      // Fetch data based on the category_id prop
      const fetchDuas = async () => {
        try {
          const response = await fetch(
            `https://ird-foundation.onrender.com/duas/?category_id=${category.cat_id}`
          );
          const data = await response.json();
          setDuas(data.duas);
        } catch (error) {
          console.error('Error fetching duas:', error);
        }
      };

      fetchDuas();
    }
  }, [category.cat_id]);

  // Group duas by subcat_id
  const groupedDuas: Record<string, Dua[]> = {};
  duas.forEach((dua) => {
    if (!groupedDuas[dua.subcat_id]) {
      groupedDuas[dua.subcat_id] = [];
    }
    groupedDuas[dua.subcat_id].push(dua);
  });

  return (
    <div className=' overflow-y-scroll h-screen'>
      <div
        onClick={handleButtonClick}
        className='flex gap-2  cursor-pointer text-lg bg-white p-4 mx-4 rounded-2xl md:hidden'
      >
        <div className='mt-1 text-green-600 '>
          <FaBars />
        </div>
        <div className='font-semibold '>{category.cat_name_bn}</div>
      </div>

      {subcategories.map((subcat, index) => (
        <div
          key={index}
          ref={subcategoryId === subcat.subcat_id ? subcategoryRef : null}
        >
          <h3 className='font-semibold  bg-white p-4 mt-4 mx-4 rounded-2xl'>
            <span className='text-green-600'>পরিচ্ছেদঃ </span>
            {subcat.subcat_name_bn}
          </h3>

          <ul>
            {groupedDuas[subcat.subcat_id]?.map((dua, duaIndex) => (
              <li
                className=''
                key={duaIndex}
                ref={duaId === dua.id ? duaRef : null}
              >
                <DuaCard dua={dua} />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default DuaList;
