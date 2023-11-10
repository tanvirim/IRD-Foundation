'use client';
import React, { useEffect, useState } from 'react';

interface Dua {
  id: number;
  cat_id: string;
  dua_name_en: string;
  top_bn: string;
}

const DuaList = () => {
  const [duas, setDuas] = useState<Dua[]>([]);
  useEffect(() => {
    const fetchDuas = async () => {
      try {
        const response = await fetch(
          `https://ird-foundation.onrender.com/duas/?category_id=1`
        );
        const data = await response.json();

        setDuas(data.duas);
      } catch (error) {
        console.error('Error fetching duas:', error);
      }
    };

    fetchDuas();
  }, []);

  return (
    <div className='overflow-scroll'>
      <h2>Dua List</h2>
      <ul>
        {duas.map((dua) => (
          <li className='p-4' key={dua.id}>
            {dua.top_bn}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DuaList;
