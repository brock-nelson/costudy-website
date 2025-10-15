import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { blogPosts } from '../blogData';
import { ShareButtons } from './ShareButtons';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    authors: [{ name: post.author.name }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishDate,
      authors: [post.author.name],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
  };
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="min-h-screen bg-white dark:bg-[#121212]">
      {/* Article Header */}
      <header className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-50/30 via-transparent to-transparent dark:from-purple-900/10 pointer-events-none"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/blog"
              className="inline-flex items-center text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 mb-6 transition-colors"
            >
              ← Back to Blog
            </Link>

            <div className="flex items-center gap-3 mb-6">
              <span className="text-sm font-semibold px-4 py-1.5 bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 rounded-full">
                {post.category}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {post.readingTime}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#2D3748] dark:text-[#E9EEFF]">
              {post.title}
            </h1>

            <p className="text-xl text-[#4A5568] dark:text-[#A0AEC0] mb-8">
              {post.excerpt}
            </p>

            <div className="flex items-center gap-4 pb-8 border-b border-gray-200 dark:border-[#404040]">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <div className="font-semibold text-[#2D3748] dark:text-[#E9EEFF]">
                  {post.author.name}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(post.publishDate).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Article Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div
            className="prose prose-lg dark:prose-invert max-w-none
              prose-headings:text-[#2D3748] dark:prose-headings:text-[#E9EEFF]
              prose-p:text-[#4A5568] dark:prose-p:text-[#A0AEC0]
              prose-a:text-purple-600 dark:prose-a:text-purple-400
              prose-strong:text-[#2D3748] dark:prose-strong:text-[#E9EEFF]
              prose-code:text-purple-600 dark:prose-code:text-purple-400
              prose-pre:bg-gray-50 dark:prose-pre:bg-[#1E1E1E]
              prose-li:text-[#4A5568] dark:prose-li:text-[#A0AEC0]"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags */}
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-[#404040]">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-sm px-3 py-1 bg-gray-100 dark:bg-[#1E1E1E] text-gray-700 dark:text-gray-300 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Share Buttons */}
          <ShareButtons slug={post.slug} title={post.title} />
        </div>
      </div>

      {/* Author Bio */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-gray-50 dark:bg-[#1E1E1E] rounded-2xl p-8">
          <div className="flex items-start gap-6">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-20 h-20 rounded-full"
            />
            <div>
              <h3 className="text-xl font-bold text-[#2D3748] dark:text-[#E9EEFF] mb-2">
                About {post.author.name}
              </h3>
              <p className="text-[#4A5568] dark:text-[#A0AEC0]">
                {post.author.bio}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-purple-600 to-purple-800 dark:from-purple-700 dark:to-purple-900 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            {post.cta.title}
          </h2>
          <p className="text-purple-100 text-lg mb-8 max-w-2xl mx-auto">
            {post.cta.description}
          </p>
          <Link
            href={post.cta.buttonLink}
            className="bg-white text-purple-700 px-8 py-4 rounded-xl font-semibold hover:bg-purple-50 hover:shadow-lg hover:scale-105 transition-all duration-300 inline-block"
          >
            {post.cta.buttonText}
          </Link>
        </div>
      </section>

      {/* Related Articles */}
      {post.relatedArticles && post.relatedArticles.length > 0 && (
        <section className="container mx-auto px-4 py-16 border-t border-gray-200 dark:border-[#404040]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-[#2D3748] dark:text-[#E9EEFF] mb-8">
              Related Articles
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {post.relatedArticles.map((slug) => {
                const relatedPost = blogPosts.find((p) => p.slug === slug);
                if (!relatedPost) return null;
                return (
                  <Link
                    key={slug}
                    href={`/blog/${slug}`}
                    className="group bg-white dark:bg-[#1E1E1E] border border-gray-200 dark:border-[#404040] rounded-xl p-6 hover:shadow-lg transition-all duration-300"
                  >
                    <h3 className="font-bold text-[#2D3748] dark:text-[#E9EEFF] mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                      {relatedPost.title}
                    </h3>
                    <p className="text-sm text-[#4A5568] dark:text-[#A0AEC0] line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
