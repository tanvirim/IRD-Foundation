import React from 'react';
import polygon from '../public/nav/Polygon 2.svg';
import userLogo from '../public//nav/Vector.svg';
import Image from 'next/image';
import NavLogo from '../public/nav/navLogo.png';
const Navbar = () => {
  return (
    <>
      <div className='flex justify-between mb-2 mx-4'>
        <div className='flex gap-2'>
          <Image src={NavLogo} alt='polygon' width={60} height={60} />

          <p className='mt-4 text-lg'>দোয়া সমূহ</p>
        </div>
        <div className='flex'>
          <Image src={userLogo} alt='polygon' width={30} height={30} />
          <Image className='mt-5' src={polygon} alt='polygon' />
        </div>
      </div>
    </>
  );
};

export default Navbar;
