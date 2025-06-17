'use client'; // Required for Framer Motion components

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link'; // At the top if not already

// Re-using the interface from the page, or define it in a shared types file
interface WpPost {
  id: number;
  date: string;
    link: string;
    slug: string; // Added for linking
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  _embedded: {
    'wp:featuredmedia'?: {
      source_url: string;
    }[];
    'wp:term'?: {
      [key: string]: {
        id: number;
        name: string;
        link: string;
      }[];
    };
  };
}

// Utility to clean up excerpts
// const cleanExcerpt = (htmlString: string) => {
//   return htmlString.replace(/<[^>]+>/g, '').replace(/\[&hellip;\]/, '...');
// };

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  },
};

export default function BlogPostCard({ post, isPriority = false }: { post: WpPost, isPriority?: boolean }) {
  const imageUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
  const tags = post._embedded?.['wp:term'] ? Object.values(post._embedded['wp:term']).flat() : [];


  return (
    <motion.li 
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
      className="list-none"
    >
     <Link href={`/blog/${post.slug}`} className="block group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden h-full flex flex-col">
      {imageUrl && (
        <div className="relative w-full aspect-video overflow-hidden">
          <Image
            src={imageUrl}
            alt={post.title.rendered}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            // Add the priority prop conditionally
            priority={isPriority}
          />
          </div>
        )}
        
        {/* The main card content area */}
        <div className="p-6 flex flex-col flex-grow">
          {/* This wrapper div takes up the available space, pushing the footer down */}
          <div className="flex-grow">
            <p className="text-sm text-blue-500 dark:text-blue-400 font-semibold">
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric', month: 'long', day: 'numeric',
              })}
            </p>
            <h2
              className="mt-2 text-xl font-bold text-gray-900 dark:text-white leading-snug"
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            />
            <div
              className="mt-3 text-sm text-gray-600 dark:text-gray-400 line-clamp-3"
              dangerouslySetInnerHTML={{ __html: post.excerpt.rendered.replace(/<[^>]+>/g, '').replace(/\[&hellip;\]/, '...') }}
            />
          </div>
          
          {/* Card footer for tags and the new "Read More" link */}
          <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-wrap gap-2">
              {tags.slice(0, 3).map(tag => (
                <span key={tag.id} className="text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full">
                  {tag.name}
                </span>
              ))}
            </div>
            
            {/* DESIGN IMPROVEMENT: "Read More" link with animated arrow */}
            <div className="mt-4 text-blue-500 dark:text-blue-400 font-semibold flex items-center">
              Read More
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none ml-1">
                &rarr;
              </span>
            </div>
          </div>
        </div>
        </Link>
    </motion.li>
  );
}

// Skeleton component for a beautiful loading state
export const BlogPostSkeleton = () => (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden animate-pulse">
      <div className="bg-gray-300 dark:bg-gray-700 aspect-video w-full"></div>
      <div className="p-6">
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-full mb-2"></div>
        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-5/6 mb-4"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full mt-2"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mt-2"></div>
      </div>
    </div>
);