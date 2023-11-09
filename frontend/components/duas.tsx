'use client';
import React, { useState } from 'react';
interface Dua {
  id: number;
  cat_id: number;
  subcat_id: number;
  subcat_name_bn: string;
  subcat_name_en: string;
  no_of_dua: number;
}

interface Props {
  subCat_id: string;
}
const Duas = ({ subCat_id }: Props) => {
  const [subcategories, setSubcategories] = useState<Dua[]>([]);

  const fetchSubcategories = () => {
    fetch(
      `https://ird-foundation.onrender.com?category_id=${catId}&subcat_id${subCat_id}`
    )
      .then((subRes) => {
        if (!subRes.ok) {
          throw new Error('Network response was not ok');
        }
        return subRes.json();
      })
      .then((subcategoriesData) => {
        const sub = subcategoriesData.subcategories;
        setSubcategories(sub);
        console.log('cat', sub);
      })
      .catch((error) => {
        console.error('Error fetching subcategories: ', error);
        // Handle errors, e.g., display an error message
      });
  };

  return (
    <div>
      <button onClick={fetchSubcategories}>Fetch Subcategories</button>
      {subcategories?.map((subCat, index) => (
        <ul key={index}>
          <li>{subCat.subcat_name_en}</li>
        </ul>
      ))}
    </div>
  );
};

export default Duas;
