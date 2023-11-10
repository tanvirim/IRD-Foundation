'use client';
import React, { useEffect, useState } from 'react';

interface Dua {
  id: number;
  cat_id: string;
  dua_name_en: string;
}

const DuaList = () => {
  const [duas, setDuas] = useState<Dua[]>([]);
  useEffect(() => {
    const fetchDuas = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/duas?category_id=1`
        );
        const data = await response.json();
        console.log('dua', data);
        setDuas(data.duas);
      } catch (error) {
        console.error('Error fetching duas:', error);
      }
    };

    fetchDuas();
  }, []);

  console.log(duas);
  return (
    <div>
      <h2>Dua List</h2>
      <ul>
        {duas.map((dua) => (
          <li key={dua.id}>{dua.dua_name_en}</li>
        ))}
      </ul>
    </div>
  );
};

export default DuaList;
