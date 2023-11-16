'use client';
Image;
import React, { useState } from 'react';
import { CategoryTable, DuaList, Navbar } from '@/components';
import { ExitSvg } from '@/public';
import Image from 'next/image';
import { useDuaStore } from '@/store';

const Main = () => {
  const { isBooleanValue, setBooleanValue } = useDuaStore();

  const handleButtonClick = () => {
    setBooleanValue(!isBooleanValue);
  };

  return (
    <div>
      <div className='flex overflow-hidden'>
        {isBooleanValue && (
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
          <DuaList />
        </div>
      </div>
    </div>
  );
};

export default Main;
