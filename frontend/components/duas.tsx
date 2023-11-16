/* eslint-disable react/jsx-key */
'use client';
import { IoIosArrowForward } from 'react-icons/io';
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
}

const Duas = ({ duas }: Props) => {
  const { setDuaId, setBooleanValue, isBooleanValue } = useDuaStore();
  const handlesubcategoryClick = ({ duaId }: DuaArgument) => {
    setDuaId(duaId);

    if (window.innerWidth < 768) {
      setBooleanValue(!isBooleanValue);
    }
  };

  return (
    <div>
      {duas?.map((dua, index) => (
        <ul className='' key={index}>
          <li
            onClick={() => handlesubcategoryClick({ duaId: dua.id })}
            className='ml-10 cursor-pointer border-l p-2 border-dotted border-black '
          >
            <div className='flex'>
              <span>
                {' '}
                <IoIosArrowForward />
                {'  '}
              </span>{' '}
              <div> {dua.dua_name_bn}</div>
            </div>
          </li>
        </ul>
      ))}
    </div>
  );
};

export default Duas;
