'use client';
Image;
import React, { useState } from 'react';
import { CategoryTable, DuaList, Navbar } from '@/components';
import { ExitSvg } from '@/public';
import Image from 'next/image';
import { useDuaStore } from '@/store';
import LeftSidebar from './leftSidebar';
import RightSidebar from './rightSidebar';

const Main = () => {
  const { isBooleanValue, setBooleanValue } = useDuaStore();

  const handleButtonClick = () => {
    setBooleanValue(!isBooleanValue);
  };

  return (
    <>
      <div className='flex  '>
        <section className='hidden lg:block'>
          <aside>
            {' '}
            <LeftSidebar />
          </aside>
        </section>
        <section className='flex overflow-hidden '>
          {isBooleanValue && (
            <div className=''>
              <div className='flex justify-between bg-green-600 text-white px-14 py-4 rounded-t-lg'>
                <p className='ml-28'>ক্যাটাগরি</p>
                <button onClick={handleButtonClick} className='md:hidden'>
                  <Image src={ExitSvg} alt='polygon' width={20} height={20} />
                </button>
              </div>

              <div>
                <CategoryTable />
              </div>
            </div>
          )}

          <div className='flex-1 md:w-1/2 overflow-hidden'>
            <DuaList />
          </div>
        </section>

        <section className='hidden lg:block'>
          <aside>
            <RightSidebar />
          </aside>
        </section>
      </div>
    </>
  );
};

export default Main;
