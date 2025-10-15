'use client';

export function ShareButtons({ slug, title }: { slug: string; title: string }) {
  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://costudy.co/blog/${slug}`);
  };

  return (
    <div className="mt-8 flex items-center gap-4">
      <span className="font-semibold text-[#2D3748] dark:text-[#E9EEFF]">Share:</span>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(`https://costudy.co/blog/${slug}`)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
      >
        Twitter
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://costudy.co/blog/${slug}`)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
      >
        LinkedIn
      </a>
      <button
        onClick={handleCopyLink}
        className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
      >
        Copy Link
      </button>
    </div>
  );
}
