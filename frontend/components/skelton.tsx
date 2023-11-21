import React from 'react';

const SkeletonColumn = () => {
  const skeletonItems = Array.from({ length: 7 }, (_, index) => (
    <div
      key={index}
      className='mt-2 ml-2 rounded-lg mb-2 w-full h-[65px] bg-gray-300 animate-pulse'
    ></div>
  ));

  return <div className='flex flex-col'>{skeletonItems}</div>;
};

export default SkeletonColumn;
