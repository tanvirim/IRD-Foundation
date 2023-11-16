'use client';
import { useDuaStore } from '@/store';
import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import AllahLogo from '../public/category/allah.svg';
import { FaBars } from 'react-icons/fa';
import { Dua } from '@/types';
import Image from 'next/image';

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
    <div className='overflow-x-hidden overflow-y-scroll h-screen'>
      <div
        onClick={handleButtonClick}
        className='flex gap-2  cursor-pointer text-lg bg-white p-4 mx-4 rounded-2xl'
      >
        <div className='mt-1 text-green-600'>
          <FaBars />
        </div>
        <div className='font-semibold'>{category.cat_name_bn}</div>
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
                <div className=' bg-white p-4 mt-4 mx-4 rounded-2xl'>
                  <div className='flex gap-4 mx-4 '>
                    <div>
                      <Image src={AllahLogo} alt='logo'></Image>
                    </div>

                    <div className='text-green-600 mt-2 mb-4'>
                      {dua.dua_name_bn}
                    </div>
                  </div>

                  <div className='flex flex-col gap-4'>
                    <div>{dua.top_bn}</div>
                    <div>{dua.dua_arabic}</div>
                    <div>
                      <span className='text-semibold'>উচ্চারণঃ</span>{' '}
                      {dua.transliteration_bn}
                    </div>

                    <div>{dua.translation_bn}</div>
                    <div className='mt-4 mb-4 flex flex-col'>
                      <span className='text-green-600'>রেফারেন্স</span>
                      <span> {dua.refference_bn}</span>
                    </div>
                  </div>

                  <div>
                    <audio controls>
                      <source src={dua.audio} type='audio/mpeg' />
                      Your browser does not support the audio element.
                    </audio>
                  </div>
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
