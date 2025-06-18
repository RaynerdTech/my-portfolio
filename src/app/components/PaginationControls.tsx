// 'use client';

// import Link from 'next/link';

// interface PaginationControlsProps {
//   currentPage: number;
//   totalPages: number;
// }

// export default function PaginationControls({
//   currentPage,
//   totalPages,
// }: PaginationControlsProps) {
//   const hasNextPage = currentPage < totalPages;
//   const hasPrevPage = currentPage > 1;

//   if (totalPages <= 1) return null;

//   return (
//     <div className="mt-16 flex justify-center items-center gap-2 sm:gap-4 flex-wrap text-center">
//       <Link
//         href={`/blog?page=${currentPage - 1}`}
//         className={`px-3 py-1.5 sm:px-5 sm:py-2 text-xs sm:text-sm font-semibold text-white bg-blue-600 rounded-md shadow transition-all duration-300
//                     ${!hasPrevPage ? 'pointer-events-none opacity-50' : 'hover:bg-blue-700'}`}
//         aria-disabled={!hasPrevPage}
//       >
//         &larr; Prev
//       </Link>

//       <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
//         Page {currentPage} of {totalPages}
//       </span>

//       <Link
//         href={`/blog?page=${currentPage + 1}`}
//         className={`px-3 py-1.5 sm:px-5 sm:py-2 text-xs sm:text-sm font-semibold text-white bg-blue-600 rounded-md shadow transition-all duration-300
//                     ${!hasNextPage ? 'pointer-events-none opacity-50' : 'hover:bg-blue-700'}`}
//         aria-disabled={!hasNextPage}
//       >
//         Next &rarr;
//       </Link>
//     </div>
//   );
// }


'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
}

export default function PaginationControls({ currentPage, totalPages }: PaginationControlsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;

    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set('page', String(newPage));
    
    const query = current.toString();
    router.push(`/blog?${query}`);
  };
  
  if (totalPages <= 1) {
    return null; // Don't render controls if there's only one page
  }

  return (
    <div className="flex justify-center items-center space-x-4 mt-16">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Previous
      </button>
      <span className="text-sm text-gray-600 dark:text-gray-300">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Next
      </button>
    </div>
  );
}

