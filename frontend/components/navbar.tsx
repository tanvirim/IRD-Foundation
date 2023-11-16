import React from 'react';
import polygon from '../public/nav/Polygon 2.svg';
import userLogo from '../public//nav/Vector.svg';
import Image from 'next/image';
const Navbar = () => {
  return (
    <>
      <div className='flex justify-between mb-2'>
        <p>দোয়া সমূহ</p>
        <div className='flex'>
          <Image src={userLogo} alt='polygon' width={30} height={30} />
          <Image className='mt-5' src={polygon} alt='polygon' />
        </div>
      </div>
    </>
  );
};

export default Navbar;
