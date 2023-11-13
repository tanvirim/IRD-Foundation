/* eslint-disable react/jsx-key */
'use client';
import React, { useState } from 'react';
import { Dua } from './subCategory';

interface Props {
  subCat_id: string;
  catId: string;
  duas: Dua[];
  setShowCategoryTable: React.Dispatch<React.SetStateAction<boolean>>;
}

const Duas = ({ subCat_id, catId, duas, setShowCategoryTable }: Props) => {
  const handleCategoryClick = () => {
    if (window.innerWidth < 768) {
      setShowCategoryTable((prevState) => !prevState);
    }
  };

  return (
    <div>
      {duas?.map((dua, index) => (
        <ul key={index}>
          <li onClick={handleCategoryClick} className='mx-8 cursor-pointer'>
            {dua.dua_name_en}
          </li>
        </ul>
      ))}
    </div>
  );
};

export default Duas;
