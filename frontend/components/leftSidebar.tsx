import Image from 'next/image';
import React from 'react';
import Home from '../public/left/home.svg';
import menu from '../public/left/menu.svg';
import memorize from '../public/left/memorize.svg';
import keep from '../public/left/keep.svg';
import ruqyah from '../public/left/ruqyah.svg';
import duaInfo from '../public/left/duaInfo.svg';
import books from '../public/left/books.svg';
import hand from '../public/left/hand.png';
import donateHeart from '../public/left/donateHeart.svg';

const LeftSidebar = () => {
  const imageData = [
    { src: Home, alt: 'image' },
    { src: menu, alt: 'image' },
    { src: memorize, alt: 'image' },
    { src: ruqyah, alt: 'image' },
    { src: duaInfo, alt: 'image' },
    { src: books, alt: 'image' },
  ];
  return (
    <>
      <div className='h-[800px] w-[100px] bg-white rounded-2xl ml-[40px] absolute top-[40px] left-[-160px] '>
        <div className='flex flex-col  items-center gap-24 p-3'>
          <Image src={hand} height={80} width={80} alt='image' />
          <div className='flex flex-col gap-8'>
            {imageData.map((image, index) => (
              <div key={index} className='p-3 bg-slate-100 rounded-full'>
                <Image src={image.src} alt={image.alt} />
              </div>
            ))}
          </div>
          <div className='bg-green-600 p-3 rounded-lg'>
            <Image src={donateHeart} alt='image' />
          </div>
        </div>
      </div>
    </>
  );
};

export default LeftSidebar;
