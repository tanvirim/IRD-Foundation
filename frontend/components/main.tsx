'use client';
Image;
import React, { useState } from 'react';
import { CategoryTable, DuaList } from '@/components';
import { ExitSvg } from '@/public';
import Image from 'next/image';
const Main = () => {
  const [showCategoryTable, setShowCategoryTable] = useState(true);

  const handleButtonClick = () => {
    setShowCategoryTable((prevState) => !prevState);
  };

  return (
    <div className='flex overflow-hidden'>
      {showCategoryTable && (
        <div className='flex-1 w-full  md:w-1/2'>
          <div className='flex justify-between bg-green-600 text-white p-2 '>
            <p>Category</p>
            <button onClick={handleButtonClick} className='md:hidden'>
              <Image src={ExitSvg} alt='polygon' width={20} height={20} />
            </button>
          </div>
          <CategoryTable />
        </div>
      )}

      <div className='flex-1 md:w-1/2 overflow-scroll'>
        <button onClick={handleButtonClick} className='md:hidden'>
          categories
        </button>
        <DuaList />
      </div>
    </div>
  );
};

export default Main;
