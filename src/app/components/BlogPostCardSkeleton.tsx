import React from 'react';

export function BlogPostCardSkeleton() {
  return (
    <li className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden animate-pulse">
      <div className="aspect-video w-full h-full bg-gray-300 dark:bg-gray-700"></div>
      <div className="p-6">
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/4 mb-3"></div>
        <div className="h-6 bg-gray-400 dark:bg-gray-500 rounded w-3/4 mb-4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-5/6"></div>
        </div>
        <div className="mt-6 flex items-center">
          <div className="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
          <div className="ml-3 w-full">
            <div className="h-4 bg-gray-400 dark:bg-gray-500 rounded w-24 mb-1"></div>
            <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
          </div>
        </div>
      </div>
    </li>
  );
}