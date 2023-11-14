/* eslint-disable react/jsx-key */
'use client';
import React from 'react';
import { Dua } from '@/types';
import { useDuaStore } from '@/store';

interface DuaArgument {
  duaId: string;
}
interface Props {
  subCat_id: string;
  catId: string;
  duas: Dua[];
  setShowCategoryTable: React.Dispatch<React.SetStateAction<boolean>>;
}

const Duas = ({ duas, setShowCategoryTable }: Props) => {
  const { setDuaId } = useDuaStore();
  const handleCategoryClick = ({ duaId }: DuaArgument) => {
    setDuaId(duaId);

    if (window.innerWidth < 768) {
      setShowCategoryTable((prevState) => !prevState);
    }
  };

  return (
    <div>
      {duas?.map((dua, index) => (
        <ul key={index}>
          <li
            onClick={() => handleCategoryClick({ duaId: dua.id })}
            className='mx-8 cursor-pointer'
          >
            {dua.dua_name_en}
          </li>
        </ul>
      ))}
    </div>
  );
};

export default Duas;
