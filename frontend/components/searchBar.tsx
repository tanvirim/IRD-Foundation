import React from 'react';
import { IoIosSearch } from 'react-icons/io';
const SearchBar = () => {
  return (
    <div className='p-2 mt-8 ml-60 flex border border-blue-100 bg-white rounded-lg '>
      <input
        type='search'
        name=''
        id=''
        placeholder='Search by Dua name'
        className='pl-2 pr-4 rounded-md  focus:border-blue-500 outline-none'
      />
      <div className='p-2 bg-slate-100 rounded-lg'>
        <IoIosSearch size={30} />
      </div>
    </div>
  );
};

export default SearchBar;
