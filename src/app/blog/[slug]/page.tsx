import React from 'react';
import { notFound } from 'next/navigation';
import { Twitter, Linkedin, Facebook } from 'lucide-react';
import { ContactSection } from '../../components/ContactSection';
import Image from 'next/image';

interface Author {
  name: string;
  avatar_urls: {
    '96': string;
  };
}

interface WpPost {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  date: string;
  excerpt: { rendered: string };
  _embedded: {
    author: Author[];
    'wp:featuredmedia': { source_url: string; alt_text: string }[];
  };
}

const getPostBySlug = async (slug: string): Promise<WpPost | null> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_WP_API_URL}/posts?slug=${slug}&_embed=1`,
      { next: { revalidate: 3600 } }
    );

    if (!res.ok) {
      console.error(`Error fetching post: ${res.statusText}`);
      return null;
    }

    const posts: WpPost[] = await res.json();
    return posts[0] || null;
  } catch (error) {
    console.error('An error occurred while fetching the post:', error);
    return null;
  }
};

const getAdjacentPosts = async (currentPostId: number) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_WP_API_URL}/posts?order=desc&orderby=date&per_page=100&_fields=id,slug,title`,
      { next: { revalidate: 3600 } }
    );
    
    if (!res.ok) throw new Error('Failed to fetch posts');
    
    const posts: {id: number, slug: string, title: {rendered: string}}[] = await res.json();
    const currentIndex = posts.findIndex(post => post.id === currentPostId);
    
    return {
      previous: currentIndex > 0 ? posts[currentIndex - 1] : null,
      next: currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null
    };
  } catch (error) {
    console.error('Error fetching adjacent posts:', error);
    return { previous: null, next: null };
  }
};

const calculateReadingTime = (content: string): number => {
  const wordsPerMinute = 200;
  const noScriptContent = content.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  const textLength = noScriptContent.split(/\s+/).length;
  return Math.ceil(textLength / wordsPerMinute);
};

const PostHeader = ({ title, date, author, readingTime }: { title: string; date: string; author: Author | undefined; readingTime: number }) => (
  <header className="mb-12">
    <h1
      className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight tracking-tight"
      dangerouslySetInnerHTML={{ __html: title }}
    />
    <div className="flex flex-wrap items-center gap-4 text-gray-600 dark:text-gray-400 text-sm md:text-base">
      {author && (
        <div className="flex items-center bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-full">
          <Image
            src={author.avatar_urls['96']}
            alt={author.name}
            width={32}
            height={32}
            className="w-8 h-8 rounded-full mr-3 object-cover"
          />
          <span className="font-medium">{author.name}</span>
        </div>
      )}
      <div className="flex items-center gap-2">
        <time
          dateTime={date}
          className="bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-full"
        >
          {new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </time>
        <span className="bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-full">
          {readingTime} min read
        </span>
      </div>
    </div>
  </header>
);

const FeaturedImage = ({ src, alt }: { src: string; alt: string }) => (
  <figure className="my-12 rounded-xl overflow-hidden shadow-xl">
    <Image
      src={src}
      alt={alt}
      width={1200}
      height={630}
      className="w-full h-auto max-h-[560px] object-cover transition-all duration-500 hover:scale-105"
      priority
    />
  </figure>
);

const SocialShare = ({ postUrl, title }: { postUrl: string; title: string }) => (
  <div className="my-12 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
      <span className="font-semibold text-gray-700 dark:text-gray-300 text-lg">Share this post:</span>
      <div className="flex gap-4">
        <a
          href={`https://twitter.com/intent/tweet?url=${postUrl}&text=${title}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 bg-white dark:bg-gray-700 rounded-lg shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 text-gray-700 dark:text-gray-300 hover:text-blue-500"
          aria-label="Share on Twitter"
        >
          <Twitter size={24} />
        </a>
        <a
          href={`https://www.linkedin.com/shareArticle?mini=true&url=${postUrl}&title=${title}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 bg-white dark:bg-gray-700 rounded-lg shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 text-gray-700 dark:text-gray-300 hover:text-blue-700"
          aria-label="Share on LinkedIn"
        >
          <Linkedin size={24} />
        </a>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${postUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 bg-white dark:bg-gray-700 rounded-lg shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 text-gray-700 dark:text-gray-300 hover:text-blue-600"
          aria-label="Share on Facebook"
        >
          <Facebook size={24} />
        </a>
      </div>
    </div>
  </div>
);

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  // First await the params object
  const { slug } =  await params;
  
  // Then use the slug in your functions
  const post = await getPostBySlug(slug);

  if (!post) { 
    return notFound();
  }

  const readingTime = calculateReadingTime(post.content.rendered);
  const author = post._embedded?.author?.[0];
  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0];
  const postUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${slug}`;
  const adjacentPosts = await getAdjacentPosts(post.id);

  return (
    <>
      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12 lg:py-16 mt-12">
        <PostHeader
          title={post.title.rendered}
          date={post.date}
          author={author}
          readingTime={readingTime}
        />

        {featuredImage && <FeaturedImage src={featuredImage.source_url} alt={featuredImage.alt_text} />}

        <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-serif prose-headings:tracking-normal prose-h1:text-4xl sm:prose-h1:text-5xl prose-h1:font-bold prose-h1:leading-tight prose-h1:mb-8 prose-h1:mt-16 prose-h1:text-gray-900 dark:prose-h1:text-white prose-h1:border-b prose-h1:pb-4 prose-h1:border-gray-200 dark:prose-h1:border-gray-700 prose-h2:text-3xl sm:prose-h2:text-4xl prose-h2:font-semibold prose-h2:mt-12 prose-h2:mb-6 prose-h2:text-gray-800 dark:prose-h2:text-gray-200 prose-h3:text-2xl sm:prose-h3:text-3xl prose-h3:font-medium prose-h3:mt-10 prose-h3:mb-5 prose-h4:text-xl sm:prose-h4:text-2xl prose-h4:font-medium prose-h4:mt-8 prose-h4:mb-4 prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed prose-p:text-lg prose-p:my-6 prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:font-medium prose-a:underline-offset-4 prose-a:transition-all prose-a:hover:text-blue-800 dark:prose-a:hover:text-blue-300 prose-a:hover:underline prose-a:decoration-2 prose-strong:text-gray-900 dark:prose-strong:text-white prose-strong:font-semibold prose-em:text-gray-600 dark:prose-em:text-gray-400 prose-em:italic prose-blockquote:border-l-4 prose-blockquote:border-blue-500 dark:prose-blockquote:border-blue-400 prose-blockquote:bg-blue-50/50 dark:prose-blockquote:bg-blue-900/20 prose-blockquote:px-8 prose-blockquote:py-6 prose-blockquote:rounded-r-xl prose-blockquote:not-italic prose-blockquote:text-gray-700 dark:prose-blockquote:text-gray-300 prose-blockquote:font-serif prose-blockquote:text-xl prose-ul:list-disc prose-ol:list-decimal prose-li:my-3 prose-li:pl-2 prose-li:marker:text-blue-500 dark:prose-li:marker:text-blue-400 prose-img:rounded-2xl prose-img:shadow-xl prose-img:mx-auto prose-img:border prose-img:border-gray-200 dark:prose-img:border-gray-700 prose-figure:my-10 prose-figcaption:text-center prose-figcaption:italic prose-figcaption:text-gray-500 dark:prose-figcaption:text-gray-400 prose-figcaption:mt-3 prose-figcaption:text-sm prose-pre:bg-gray-900 prose-pre:rounded-xl prose-pre:p-4 prose-pre:overflow-x-auto prose-pre:border prose-pre:border-gray-700 prose-pre:shadow-lg prose-code:before:content-none prose-code:after:content-none prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-2 prose-code:py-1 prose-code:rounded-md prose-code:text-sm prose-code:font-mono prose-table:border-collapse prose-table:w-full prose-table:my-8 prose-table:shadow-sm prose-table:rounded-lg prose-table:overflow-hidden prose-th:bg-gray-100 dark:prose-th:bg-gray-800 prose-th:px-6 prose-th:py-3 prose-th:text-left prose-th:font-semibold prose-th:text-gray-900 dark:prose-th:text-gray-200 prose-td:border-t prose-td:px-6 prose-td:py-4 prose-td:border-gray-200 dark:prose-td:border-gray-700 prose-hr:border-gray-200 dark:prose-hr:border-gray-700 prose-hr:my-12 prose-hr:border-t-2">
          <div className="[&>p]:mb-7 [&>p:last-child]:mb-0 [&>ul]:my-7 [&>ol]:my-7 [&>h1]:first:mt-0 [&>h2]:mt-14 [&>h2]:mb-7 [&>h3]:mt-12 [&>h3]:mb-6 [&>h4]:mt-10 [&>h4]:mb-5 [&>blockquote]:my-10 [&>figure]:my-10 [&>table]:my-10 [&>hr]:my-14 [&>ul>li]:pl-3 [&>ol>li]:pl-3 [&>ul>li>p]:my-2 [&>ol>li>p]:my-2"
            dangerouslySetInnerHTML={{ __html: post.content.rendered }}
          />
        </div>

        <SocialShare postUrl={postUrl} title={post.title.rendered} />

        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 flex justify-between gap-4">
          {adjacentPosts.previous ? (
            <a
              href={`/blog/${adjacentPosts.previous.slug}`}
              className="px-6 py-3 rounded-lg font-medium bg-blue-600 hover:bg-blue-700 text-white transition-colors flex-1 text-center"
            >
              ← {adjacentPosts.previous.title.rendered}
            </a>
          ) : (
            <button
              className="px-6 py-3 rounded-lg font-medium bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed flex-1"
              disabled
            >
              ← No Older Posts
            </button>
          )}
          
          {adjacentPosts.next ? (
            <a
              href={`/blog/${adjacentPosts.next.slug}`}
              className="px-6 py-3 rounded-lg font-medium bg-blue-600 hover:bg-blue-700 text-white transition-colors flex-1 text-center"
            >
              {adjacentPosts.next.title.rendered} →
            </a>
          ) : (
            <button
              className="px-6 py-3 rounded-lg font-medium bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed flex-1"
              disabled
            >
              No Newer Posts →
            </button>
          )}
        </div>
      </article>
      <div>
        <ContactSection />
      </div>
    </>
  );
}  