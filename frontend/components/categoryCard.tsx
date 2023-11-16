import Image from 'next/image';
import React from 'react';
import { CatLogo } from '@/public';
import { Category } from '@/types';

interface Props {
  Category: Category;
}
const CategoryCard = ({ Category }: Props) => {
  return (
    <div className='flex justify-between bg-slate-200 p-4 ml-2 mr-2 rounded-lg'>
      <div className='flex '>
        <div className='mr-4 bg-white pt-2 pb-0 pl-3 pr-3 rounded-md'>
          <Image src={CatLogo} alt='CatLogo' height={20} width={20} />
        </div>

        <div>
          <p className='text-sm font-semibold'>{Category.cat_name_bn}</p>
          <p className='text-xs'>
            <span className='mr-2 '>Subcategory:</span>
            {Category.no_of_subcat}
          </p>
        </div>
      </div>
      <div className='flex flex-col align-middle text-xs '>
        <span className='pl-2'>{Category.no_of_dua}</span> <span>Duas</span>
      </div>
    </div>
  );
};

export default CategoryCard;
