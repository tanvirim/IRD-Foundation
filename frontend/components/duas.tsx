'use client';
import React, { useState } from 'react';
interface Dua {
  id: number;
  cat_id: string;
  dua_name_en: string;
}

interface Props {
  subCat_id: string;
  catId: string;
}
const Duas = ({ subCat_id, catId }: Props) => {
  const [duas, setDuas] = useState<Dua[]>([]);

  const fetchDuas = () => {
    fetch(
      `https://ird-foundation.onrender.com?category_id=${catId}&subcategory_id=${subCat_id}`
    )
      .then((subRes) => {
        if (!subRes.ok) {
          throw new Error('Network response was not ok');
        }
        return subRes.json();
      })
      .then((duasData) => {
        const dua = duasData.duas;
        setDuas(dua);
        console.log('cat', dua);
      })
      .catch((error) => {
        console.error('Error fetching duas: ', error);
        // Handle errors, e.g., display an error message
      });
  };

  return (
    <div>
      <button
        className='mx-8 p-2 bg-green-400 text-white outline-slate-800'
        onClick={fetchDuas}
      >
        Fetch duas
      </button>
      {duas?.map((dua, index) => (
        <ul key={index}>
          <li className='mx-8'>{dua.dua_name_bn}</li>
        </ul>
      ))}
    </div>
  );
};

export default Duas;
