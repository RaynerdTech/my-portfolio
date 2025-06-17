export async function generateMetadata({ params }: { params: { slug: string } }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_WP_API_URL}/posts?slug=${params.slug}`);
  const posts = await res.json();
  const post = posts[0];

  if (!post) return {};

  return {
    title: post.title.rendered.replace(/(<([^>]+)>)/gi, ""), // remove HTML tags
    description: post.excerpt?.rendered?.replace(/(<([^>]+)>)/gi, ""),
  };
}
