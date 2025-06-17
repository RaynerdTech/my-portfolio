'use client';

import { useRouter, useSearchParams } from 'next/navigation';
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

  if (totalPages <= 1) return null; // Don't show controls if there's only one page

  return (
    <div className="mt-16 flex justify-center items-center gap-6">
      <Link
        href={`/blog?page=${currentPage - 1}`}
        className={`px-6 py-3 font-semibold text-white bg-blue-600 rounded-lg shadow-md transition-all duration-300
                    ${!hasPrevPage ? 'pointer-events-none opacity-50' : 'hover:bg-blue-700'}`}
        aria-disabled={!hasPrevPage}
      >
        &larr; Previous
      </Link>

      <span className="font-medium text-gray-700 dark:text-gray-300">
        Page {currentPage} of {totalPages}
      </span>

      <Link
        href={`/blog?page=${currentPage + 1}`}
        className={`px-6 py-3 font-semibold text-white bg-blue-600 rounded-lg shadow-md transition-all duration-300
                    ${!hasNextPage ? 'pointer-events-none opacity-50' : 'hover:bg-blue-700'}`}
        aria-disabled={!hasNextPage}
      >
        Next &rarr;
      </Link>
    </div>
  );
}