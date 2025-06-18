import React from 'react';
import { BlogPostCardSkeleton } from '../components/BlogPostCardSkeleton';

// This is a special Next.js file. It automatically wraps your page in a <Suspense> boundary.
// It will be shown instantly on navigation while the data for `page.tsx` is loading.
export default function BlogLoading() {
  return (
    <main className="max-w-7xl mx-auto py-16 sm:py-24 px-6 lg:px-8 mt-8">
      <div className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-transparent pb-2">
          From the Blog
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500 dark:text-gray-400">
          Loading the latest insights, tutorials, and updates...
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {/* Render 9 skeleton cards to match the page limit */}
        {Array.from({ length: 9 }).map((_, index) => (
          <BlogPostCardSkeleton key={index} />
        ))}
      </div>
    </main>
  );
}