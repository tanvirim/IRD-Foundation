import React, { useState } from 'react';
import Duas from './duas';
import { SubCategory, Dua } from '@/types';

interface DuaArgument {
  catId: string;
  subCat_id: string;
}

interface Props {
  subcategories: SubCategory[];
  setShowCategoryTable: React.Dispatch<React.SetStateAction<boolean>>;
}

const SubcategoriesComponent = ({
  subcategories,
  setShowCategoryTable,
}: Props) => {
  const [duasMap, setDuasMap] = useState<Map<string, Dua[]>>(new Map());

  const fetchDuas = ({ catId, subCat_id }: DuaArgument) => {
    fetch(
      `https://ird-foundation.onrender.com?category_id=${catId}&subcategory_id=${subCat_id}`
    )
      .then((subRes) => {
        if (!subRes.ok) {
          throw new Error('Network response was not ok');
        }
        return subRes.json();
      })
      .then((duasData) => {
        const dua = duasData.duas;
        setDuasMap((prevMap) => new Map(prevMap.set(subCat_id, dua)));
      })
      .catch((error) => {
        console.error('Error fetching duas: ', error);
        // Handle errors, e.g., display an error message
      });
  };

  return (
    <div>
      {subcategories?.map((subCat, index) => (
        <ul key={index}>
          <li
            onClick={() =>
              fetchDuas({ catId: subCat.cat_id, subCat_id: subCat.subcat_id })
            }
            className='mx-4 my-2 cursor-pointer'
          >
            {subCat.subcat_name_bn}
          </li>
          <li>
            <Duas
              setShowCategoryTable={setShowCategoryTable}
              subCat_id={subCat.subcat_id}
              catId={subCat.cat_id}
              duas={duasMap.get(subCat.subcat_id) || []}
            />
          </li>
        </ul>
      ))}
    </div>
  );
};

export default SubcategoriesComponent;
