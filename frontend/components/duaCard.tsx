import React from 'react';
import Image from 'next/image';
import AllahLogo from '../public/category/allah.svg';
import { Dua } from '@/types';

interface Props {
  dua: Dua;
}
const DuaCard = ({ dua }: Props) => {
  return (
    <div className=' bg-white p-4 mt-4 mx-4 rounded-2xl'>
      <div className='flex gap-4 mx-4 '>
        <div>
          <Image src={AllahLogo} alt='logo'></Image>
        </div>

        <div className='text-green-600 mt-2 mb-4'>{dua.dua_name_bn}</div>
      </div>

      <div className='flex flex-col gap-4'>
        <div>{dua.top_bn}</div>
        <div className='text-2xl'>{dua.dua_arabic}</div>
        {dua.transliteration_bn && (
          <div className='italic'>
            <span className='text-semibold '>উচ্চারণঃ </span>
            {dua.transliteration_bn}
          </div>
        )}

        <div>
          <span className='text-semibold italic'>অনুবাদঃ </span>
          {dua.translation_bn}
        </div>
        <div className='mt-4 mb-4 flex flex-col'>
          <span className='text-green-600'>রেফারেন্স</span>
          <span> {dua.refference_bn}</span>
        </div>
      </div>

      {dua.audio && (
        <div>
          <audio controls>
            <source src={dua.audio} type='audio/mpeg' />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
    </div>
  );
};

export default DuaCard;
