'use client';
import { useDuaStore } from '@/store';
import React, { useEffect, useState } from 'react';
interface Dua {
  id: number;
  cat_id: string;
  dua_name_en: string;
  top_bn: string;
  audio: string;
}

const DuaList = () => {
  const { category } = useDuaStore();
  const [duas, setDuas] = useState<Dua[]>([]);

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

  return (
    <div className='overflow-x-hidden overflow-y-auto h-screen'>
      <h2>Dua List</h2>
      <ul>
        <li className='font-bold'>{category.cat_name_bn}</li>
        {duas.map((dua) => (
          <li className='p-4' key={dua.id}>
            <div>{dua.top_bn}</div>

            <div>
              <audio controls>
                <source src={dua.audio} type='audio/mp3' />
              </audio>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DuaList;
