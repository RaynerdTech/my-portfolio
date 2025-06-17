// app/blog/loading.tsx
import { BlogPostSkeleton } from '../components/BlogPostCard';

export default function Loading() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <main className="max-w-7xl mx-auto py-16 sm:py-24 px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-transparent pb-2">
            From the Blog
          </h1>
          <div className="mt-4 max-w-2xl mx-auto h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        </div>

        {/* Blog post skeletons */}
        <ul className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(9)].map((_, i) => (
            <BlogPostSkeleton key={i} />
          ))}
        </ul>

        {/* Pagination skeleton */}
        <div className="flex justify-center mt-8 gap-2">
          {[...Array(5)].map((_, i) => (
            <div 
              key={i}
              className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"
            />
          ))}
        </div>
      </main>
    </div>
  );
}