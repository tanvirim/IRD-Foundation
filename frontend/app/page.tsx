import { CategoryTable } from '@/components';

export default function Home() {
  // const [showCategoryTable, setShowCategoryTable] = useState(false);
  // console.log(showCategoryTable);
  return (
    <main className='overflow-hidden'>
      <CategoryTable />
    </main>
  );
}

// <div className='relative'>
//   {showCategoryTable && (
//     <div className='absolute top-0 left-0 w-full'>
//       <CategoryTable />
//     </div>
//   )}

//   <div className='absolute top-0 left-0 w-full'>
//     <div>
//       <button
//         onClick={() => setShowCategoryTable((prevState) => !prevState)}
//       >
//         categories
//       </button>
//     </div>
//     <Duas />
//   </div>
// </div>
