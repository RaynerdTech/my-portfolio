'use client';

import Link from 'next/link';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
}

export default function PaginationControls({
  currentPage,
  totalPages,
}: PaginationControlsProps) {
  const hasNextPage = currentPage < totalPages;
  const hasPrevPage = currentPage > 1;

  if (totalPages <= 1) return null;

  return (
    <div className="mt-16 flex justify-center items-center gap-2 sm:gap-4 flex-wrap text-center">
      <Link
        href={`/blog?page=${currentPage - 1}`}
        className={`px-3 py-1.5 sm:px-5 sm:py-2 text-xs sm:text-sm font-semibold text-white bg-blue-600 rounded-md shadow transition-all duration-300
                    ${!hasPrevPage ? 'pointer-events-none opacity-50' : 'hover:bg-blue-700'}`}
        aria-disabled={!hasPrevPage}
      >
        &larr; Prev
      </Link>

      <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
        Page {currentPage} of {totalPages}
      </span>

      <Link
        href={`/blog?page=${currentPage + 1}`}
        className={`px-3 py-1.5 sm:px-5 sm:py-2 text-xs sm:text-sm font-semibold text-white bg-blue-600 rounded-md shadow transition-all duration-300
                    ${!hasNextPage ? 'pointer-events-none opacity-50' : 'hover:bg-blue-700'}`}
        aria-disabled={!hasNextPage}
      >
        Next &rarr;
      </Link>
    </div>
  );
}
