'use client';
import React, { useState } from 'react';
import { Dua } from './subCategory';

interface Props {
  subCat_id: string;
  catId: string;
  duas: Dua[];
}
const Duas = ({ subCat_id, catId, duas }: Props) => {
  return (
    <div>
      {duas?.map((dua, index) => (
        <ul key={index}>
          <li className='mx-8'>{dua.dua_name_en}</li>
        </ul>
      ))}
    </div>
  );
};

export default Duas;
