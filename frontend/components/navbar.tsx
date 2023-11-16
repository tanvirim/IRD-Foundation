import React from 'react';
import polygon from '../public/nav/Polygon 2.svg';
import userLogo from '../public//nav/Vector.svg';
import Image from 'next/image';
import NavLogo from '../public/nav/navLogo.png';
import SearchBar from './searchBar';

const Navbar = () => {
  return (
    <>
      <div className='flex justify-between mb-2 mx-4 md:h-[100px]'>
        <section className='flex gap-2  md:mx-5'>
          <div className='md:hidden '>
            <Image src={NavLogo} alt='polygon' width={60} height={60} />
          </div>

          <p className='mt-4 text-lg md:mt-14 md:text-2xl'>দোয়া সমূহ</p>
        </section>

        <section className='hidden md:block'>
          <SearchBar />
        </section>
        <section className='flex '>
          <Image src={userLogo} alt='polygon' width={40} height={40} />
          <Image className='mt-5' src={polygon} alt='polygon' />
        </section>
      </div>
    </>
  );
};

export default Navbar;
