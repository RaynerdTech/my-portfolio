// import React from 'react';
// import BlogPostCard from '../components/BlogPostCard';
// import PaginationControls from '../components/PaginationControls';
// import { ContactSection } from '../components/ContactSection';

// // --- Types ---
// // (Your existing interfaces for WpPost, etc., remain here)
// // ...

// interface WpFeaturedMedia {
//   id: number;
//   source_url: string;
//   alt_text: string;
//   media_details: {
//     sizes: {
//       thumbnail?: { source_url: string };
//       medium?: { source_url: string };
//       large?: { source_url: string };
//       full?: { source_url: string };
//     };
//   };
// }

// interface WpAuthor {
//   id: number;
//   name: string;
//   url: string;
//   description: string;
//   link: string;
//   slug: string;
// }

// interface WpEmbedded {
//   'wp:featuredmedia'?: WpFeaturedMedia[];
//   'author'?: WpAuthor[];
// }

// interface WpPost {
//   id: number;
//   slug: string;
//   date: string;
//   link: string;
//   title: { rendered: string };
//   excerpt: { rendered: string };
//   _embedded: WpEmbedded;
// }

// interface FetchPostsResult {
//   posts: WpPost[];
//   totalPages: number;
// }

// const POSTS_PER_PAGE = 9;

// // --- Data Fetching ---
// // (Your getPosts function remains unchanged)
// const getPosts = async (page: number, perPage: number): Promise<FetchPostsResult> => {
//   const controller = new AbortController();
//   const timeout = setTimeout(() => controller.abort(), 7000);

//   const API_URL = `${process.env.NEXT_PUBLIC_WP_API_URL}/posts?_embed=1&per_page=${perPage}&page=${page}`;

//   try {
//     const res = await fetch(API_URL, {
//       signal: controller.signal,
//       next: { revalidate: 3600 },
//     });

//     clearTimeout(timeout);

//     if (!res.ok) throw new Error(`Failed to fetch posts: ${res.statusText}`);

//     const totalPages = Number(res.headers.get('X-WP-TotalPages') || '0');
//     const posts: WpPost[] = await res.json();

//     return { posts, totalPages };
//   } catch (error) {
//     console.error('Blog fetch failed:', error);
//     return { posts: [], totalPages: 0 };
//   }
// };


// // --- Page Component ---

// // ✅ STEP 1: Define a clear interface for the page's props.
// interface BlogPageProps {
//   searchParams: { [key: string]: string | string[] | undefined };
// }

// // ✅ STEP 2: Apply the interface to your component's props.
// export default async function BlogPage({ searchParams }: BlogPageProps) {
//   // Your existing logic is correct because the component is async.
//   const page = Number(searchParams?.page) || 1;
//   const { posts, totalPages } = await getPosts(page, POSTS_PER_PAGE);

//   return (
//     <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
//       <main className="max-w-7xl mx-auto py-16 sm:py-24 px-6 lg:px-8 mt-8">
//         <div className="text-center mb-16">
//           <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-transparent pb-2">
//             From the Blog
//           </h1>
//           <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500 dark:text-gray-400">
//             Insights, tutorials, and updates from our team.
//           </p>
//         </div>

//         {posts.length > 0 ? (
//           <ul className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
//             {posts.map((post, index) => (
//               <BlogPostCard key={post.id} post={post} isPriority={index === 0} />
//             ))}
//           </ul>
//         ) : (
//           <div className="text-center text-gray-500 dark:text-gray-400">
//             <h2 className="text-2xl font-semibold">No Posts Found</h2>
//             <p>Try a different page or check back later.</p>
//           </div>
//         )}

//         <PaginationControls currentPage={page} totalPages={totalPages} />
//       </main>
//       <ContactSection />
//     </div>
//   );
// }


import React from 'react';
import BlogPostCard from '../components/BlogPostCard';
import PaginationControls from '../components/PaginationControls';
import { ContactSection } from '../components/ContactSection';

// --- Types ---
interface WpFeaturedMedia { id: number; source_url: string; alt_text: string; }
interface WpAuthor { name: string; }
interface WpEmbedded { 'wp:featuredmedia'?: WpFeaturedMedia[]; 'author'?: WpAuthor[]; }
interface WpPost {
  id: number;
  slug: string;
  date: string;
  link: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  _embedded: WpEmbedded;
}
interface FetchPostsResult { posts: WpPost[]; totalPages: number; }

const POSTS_PER_PAGE = 9;

// --- Data Fetcher ---
async function getPosts(page: number, perPage: number): Promise<FetchPostsResult> {
  const API_URL = `${process.env.NEXT_PUBLIC_WP_API_URL}/posts?_embed=1&per_page=${perPage}&page=${page}`;
  try {
    const res = await fetch(API_URL, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error(`Failed to fetch posts: ${res.status} ${res.statusText}`);
    const totalPages = Number(res.headers.get('X-WP-TotalPages') || '0');
    const posts: WpPost[] = await res.json();
    return { posts, totalPages };
  } catch (error) {
    console.error('Blog fetch failed:', error);
    return { posts: [], totalPages: 0 };
  }
}

// ✅ Final working solution
type SearchParams = { page?: string | string[] } & Record<string, string | string[] | undefined>;

export default async function BlogPage({
  searchParams = { page: '1' }
}: {
  searchParams?: SearchParams | Promise<SearchParams>;
}) {
  // Handle both Promise and object cases
  const params: SearchParams = searchParams instanceof Promise 
    ? await searchParams 
    : searchParams;
  
  // Safely extract page number
  const pageParam = params?.page;
  const pageNumber = Array.isArray(pageParam) 
    ? pageParam[0] 
    : pageParam;
  const page = pageNumber ? Math.max(1, parseInt(pageNumber)) || 1 : 1;

  const { posts, totalPages } = await getPosts(page, POSTS_PER_PAGE);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <main className="max-w-7xl mx-auto py-16 sm:py-24 px-6 lg:px-8 mt-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-transparent pb-2">
            From the Blog
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500 dark:text-gray-400">
            Insights, tutorials, and updates from our team.
          </p>
        </div>

        {posts.length > 0 ? (
          <>
            <ul className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, index) => (
                <BlogPostCard key={post.id} post={post} isPriority={index === 0} />
              ))}
            </ul>
            <PaginationControls currentPage={page} totalPages={totalPages} />
          </>
        ) : (
          <div className="text-center text-gray-500 dark:text-gray-400 py-16">
            <h2 className="text-2xl font-semibold">No Posts Found</h2>
            <p>This could be due to a connection issue or there are no posts to show.</p>
          </div>
        )}
      </main>
      <ContactSection />
    </div> 
  );
}