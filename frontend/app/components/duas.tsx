import React from 'react';

const Duas = () => {
  return (
    <div className='p-4'>
      <h2 className='text-lg font-bold mb-4'>Duas</h2>
      {data ? (
        <ul>
          {data.map((dua, index) => (
            <li key={index} className='mb-2'>
              {dua.title}
            </li>
          ))}
        </ul>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default Duas;
