import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Assuming WpPost is defined as in page.tsx
interface WpPost {
  id: number;
  slug: string;
  date: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  _embedded: {
    'wp:featuredmedia'?: { source_url: string; alt_text: string }[];
    'author'?: { name: string }[];
  };
}

interface BlogPostCardProps {
  post: WpPost;
  isPriority?: boolean;
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function BlogPostCard({ post, isPriority = false }: BlogPostCardProps) {
  const featuredMedia = post._embedded?.['wp:featuredmedia']?.[0];
  const author = post._embedded?.['author']?.[0];

  return (
    <li className="group flex flex-col bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-1">
      <Link href={`/blog/${post.slug}`} className="flex flex-col h-full">
        <div className="relative aspect-video">
          {featuredMedia ? (
            <Image
              src={featuredMedia.source_url}
              alt={featuredMedia.alt_text || post.title.rendered}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              priority={isPriority} // Prioritize loading the first image for LCP
            />
          ) : (
            <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <span className="text-gray-500">No Image</span>
            </div>
          )}
        </div>
        <div className="p-6 flex flex-col flex-grow">
          <h3
            className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors duration-200"
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />
          <div
            className="mt-3 text-base text-gray-500 dark:text-gray-400 flex-grow"
            dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
          />
          {author && (
            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center font-bold text-gray-500 dark:text-gray-300">
                    {author.name.charAt(0)}
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {author.name}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Author</p>
                </div>
              </div>

              <p className="text-sm text-gray-500 dark:text-gray-400 ml-auto">
                {formatDate(post.date)}
              </p>
            </div>
          )}
        </div>
      </Link>
    </li>
  );
}
