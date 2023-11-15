'use client';
import { useDuaStore } from '@/store';
import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import ReactPlayer from 'react-player';
interface Dua {
  id: string;
  cat_id: string;
  dua_name_en: string;
  top_bn: string;
  audio: string;
  subcat_id: string;
}

const DuaList = () => {
  const { category, subcategories, subcategoryId, duaId } = useDuaStore();
  console.log('duaId', duaId);
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
    <div className='overflow-x-hidden overflow-y-scroll h-screen'>
      <h2>Dua List</h2>
      <div className='font-bold  text-lg'>{category.cat_name_bn}</div>

      {subcategories.map((subcat, index) => (
        <div
          key={index}
          ref={subcategoryId === subcat.subcat_id ? subcategoryRef : null}
        >
          <h3 className='font-semibold'>{subcat.subcat_name_bn}</h3>
          <ul>
            {groupedDuas[subcat.subcat_id]?.map((dua, duaIndex) => (
              <li
                className='p-4'
                key={duaIndex}
                ref={duaId === dua.id ? duaRef : null}
              >
                <div>{dua.top_bn}</div>
                <div>
                  <ReactPlayer width='300px' url={dua.audio} controls />
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default DuaList;
