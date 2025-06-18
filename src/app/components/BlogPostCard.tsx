// 'use client';

// import { motion } from 'framer-motion';
// import Image from 'next/image';
// import Link from 'next/link';

// interface WpPost {
//   id: number;
//   date: string;
//   slug: string;
//   link: string;
//   title: { rendered: string };
//   excerpt: { rendered: string };
//   _embedded: {
//     'wp:featuredmedia'?: {
//       source_url: string;
//       alt_text?: string;
//     }[];
//     'wp:term'?: {
//       [key: string]: {
//         id: number;
//         name: string;
//         link: string;
//       }[];
//     };
//   };
// }

// const cardVariants = {
//   hidden: { opacity: 0, y: 20 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.5, ease: 'easeOut' }
//   },
// };

// export default function BlogPostCard({ post, isPriority = false }: { post: WpPost; isPriority?: boolean }) {
//   const image = post._embedded?.['wp:featuredmedia']?.[0];
//   const imageUrl = image?.source_url;
//   const altText = image?.alt_text || post.title.rendered || 'Blog image';
//   const tags = post._embedded?.['wp:term'] ? Object.values(post._embedded['wp:term']).flat() : [];

//   return (
//     <motion.li
//       variants={cardVariants}
//       initial="hidden"
//       animate="visible"
//       whileHover={{ scale: 1.03 }}
//       transition={{ duration: 0.3 }}
//       className="list-none"
//     >
//       <Link
//         href={`/blog/${post.slug}`}
//         className="block group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden h-full flex flex-col"
//       >
//         <div className="relative w-full aspect-video overflow-hidden">
//           <Image
//             src={imageUrl || '/fallback.jpg'}
//             alt={altText}
//             fill
//             className="object-cover transition-transform duration-300 group-hover:scale-110"
//             sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//             priority={isPriority}
//             onError={(e) => {
//               const target = e.currentTarget as HTMLImageElement;
//               target.src = '/fallback.jpg';
//             }}
//           />
//         </div>

//         <div className="p-6 flex flex-col flex-grow">
//           <div className="flex-grow">
//             <p className="text-sm text-blue-500 dark:text-blue-400 font-semibold">
//               {new Date(post.date).toLocaleDateString('en-US', {
//                 year: 'numeric', month: 'long', day: 'numeric',
//               })}
//             </p>

//             <h2
//               className="mt-2 text-xl font-bold text-gray-900 dark:text-white leading-snug"
//               dangerouslySetInnerHTML={{ __html: post.title.rendered }}
//             />

//             <div
//               className="mt-3 text-sm text-gray-600 dark:text-gray-400 line-clamp-3"
//               dangerouslySetInnerHTML={{
//                 __html: post.excerpt.rendered
//                   .replace(/<[^>]+>/g, '')
//                   .replace(/\[&hellip;\]/, '...'),
//               }}
//             />
//           </div>

//           <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
//             <div className="flex flex-wrap gap-2">
//               {tags.slice(0, 3).map(tag => (
//                 <span
//                   key={tag.id}
//                   className="text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full"
//                 >
//                   {tag.name}
//                 </span>
//               ))}
//             </div>

//             <div className="mt-4 text-blue-500 dark:text-blue-400 font-semibold flex items-center">
//               Read More
//               <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 ml-1">
//                 &rarr;
//               </span>
//             </div>
//           </div>
//         </div>
//       </Link>
//     </motion.li>
//   );
// }


// // Skeleton component for a beautiful loading state
// export const BlogPostSkeleton = () => (
//     <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden animate-pulse">
//       <div className="bg-gray-300 dark:bg-gray-700 aspect-video w-full"></div>
//       <div className="p-6">
//         <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
//         <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-full mb-2"></div>
//         <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-5/6 mb-4"></div>
//         <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
//         <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full mt-2"></div>
//         <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mt-2"></div>
//       </div>
//     </div>
// );



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
          <p className="text-sm font-medium text-blue-600 dark:text-cyan-400">
            {formatDate(post.date)}
          </p>
          <h3
            className="mt-2 text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors duration-200"
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />
          <div
            className="mt-3 text-base text-gray-500 dark:text-gray-400 flex-grow"
            dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
          />
          {author && (
            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 flex items-center">
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
          )}
        </div>
      </Link>
    </li>
  );
}