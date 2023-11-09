'use client';
import React, { useState } from 'react';
import Duas from './duas';
interface SubCategory {
  id: number;
  cat_id: string;
  subcat_id: string;
  subcat_name_bn: string;
  subcat_name_en: string;
  no_of_dua: number;
}

interface Props {
  catId: string;
}
const SubcategoriesComponent = ({ catId }: Props) => {
  const [subcategories, setSubcategories] = useState<SubCategory[]>([]);

  const fetchSubcategories = () => {
    fetch(`https://ird-foundation.onrender.com?category_id=${catId}`)
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
          <li>
            <Duas subCat_id={subCat.subcat_id} />
          </li>
        </ul>
      ))}
    </div>
  );
};

export default SubcategoriesComponent;