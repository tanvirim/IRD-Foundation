'use client';
import React, { useState } from 'react';
import { CategoryTable, DuaList } from '@/components';

const Main = () => {
  const [showCategoryTable, setShowCategoryTable] = useState(false);

  const handleButtonClick = () => {
    setShowCategoryTable((prevState) => !prevState);
  };

  console.log(showCategoryTable);

  return (
    <div className='flex'>
      {showCategoryTable && (
        <div className='flex-1'>
          <button onClick={handleButtonClick}>exit</button>
          <CategoryTable />
        </div>
      )}

      <div className='flex-1'>
        <button onClick={handleButtonClick}>categories</button>
        <DuaList />
      </div>
    </div>
  );
};

export default Main;
