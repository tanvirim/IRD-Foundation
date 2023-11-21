import React from 'react';
import { IoIosSearch } from 'react-icons/io';
const SearchBar = () => {
  return (
    <div className=' mt-16 ml-28 flex border border-blue-100 bg-white rounded-lg '>
      <input
        type='search'
        name=''
        id=''
        placeholder='Search by Dua name'
        className='pl-2 pr-3 rounded-md w-[350px] focus:border-blue-500 outline-none'
      />
      <div className='p-2 bg-slate-100 rounded-lg'>
        <IoIosSearch size={30} />
      </div>
    </div>
  );
};

export default SearchBar;
