import React, { useState } from 'react';

import { toggle, menu, general, language } from '@/public';
import Image from 'next/image';
const RightSidebar = () => {
  const imageData = [
    { src: language, alt: 'image', text: 'Language Settings' },
    { src: general, alt: 'image', text: 'General Settings' },
    { src: menu, alt: 'image', text: 'Font Settings' },
    { src: menu, alt: 'image', text: 'Appearance Settings' },
  ];
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  return (
    <>
      <div className='w-[300px] bg-white rounded-2xl h-[780px] ml-4 '>
        <div className='flex flex-col items-center gap-10 p-4'>
          <div className='font-bold text-2xl'>Setting</div>

          <div className='flex flex-col gap-10'>
            {imageData.map((image, index) => (
              <div key={index}>
                <div
                  className={`flex justify-center items-center gap-8 bg-slate-50 p-2 rounded-lg cursor-pointer
            ${activeIndex === index ? 'border-l-4 border-green-600' : ''}`}
                  onClick={() => setActiveIndex(index)}
                >
                  <div className='p-3 bg-slate-100 rounded-full'>
                    <Image src={image.src} alt={image.alt} />
                  </div>
                  <h1 className={activeIndex === index ? 'text-green-600' : ''}>
                    {image.text}
                  </h1>
                </div>
              </div>
            ))}
          </div>

          <div className='flex gap-20'>
            <p>Night Mode</p>
            <Image src={toggle} alt='toggle' />
          </div>
        </div>
      </div>
    </>
  );
};

export default RightSidebar;
