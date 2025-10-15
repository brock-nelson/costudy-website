import Link from "next/link";
import { Integration } from "@/lib/integrations";

interface IntegrationCardProps {
  integration: Integration;
}

export default function IntegrationCard({ integration }: IntegrationCardProps) {
  const categoryColors = {
    LMS: "from-blue-500/10 to-blue-600/10 dark:from-blue-400/20 dark:to-blue-500/20 border-blue-200 dark:border-blue-800",
    SSO: "from-purple-500/10 to-purple-600/10 dark:from-purple-400/20 dark:to-purple-500/20 border-purple-200 dark:border-purple-800",
    SIS: "from-green-500/10 to-green-600/10 dark:from-green-400/20 dark:to-green-500/20 border-green-200 dark:border-green-800",
    Communication: "from-orange-500/10 to-orange-600/10 dark:from-orange-400/20 dark:to-orange-500/20 border-orange-200 dark:border-orange-800",
    Productivity: "from-pink-500/10 to-pink-600/10 dark:from-pink-400/20 dark:to-pink-500/20 border-pink-200 dark:border-pink-800"
  };

  const difficultyColors = {
    Easy: "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30",
    Medium: "text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/30",
    Advanced: "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30"
  };

  const isComingSoon = integration.status === "coming-soon";

  const CardContent = () => (
    <div
      className={`group relative p-6 rounded-2xl border bg-gradient-to-br ${
        categoryColors[integration.category]
      } ${
        isComingSoon
          ? "opacity-75"
          : "hover:shadow-xl hover:scale-[1.02]"
      } transition-all duration-300`}
    >
      {/* Status Badge */}
      {isComingSoon && (
        <div className="absolute top-4 right-4 px-3 py-1 bg-purple-600 text-white text-xs font-semibold rounded-full">
          Coming Soon
        </div>
      )}

      {/* Logo */}
      <div className="text-5xl mb-4">{integration.logo}</div>

      {/* Name */}
      <h3 className="text-xl font-bold mb-2 text-[#2D3748] dark:text-[#E9EEFF] group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
        {integration.name}
      </h3>

      {/* Category Badge */}
      <div className="inline-block px-3 py-1 bg-white/50 dark:bg-black/30 text-xs font-medium rounded-full mb-3 text-[#4A5568] dark:text-[#A0AEC0]">
        {integration.category}
      </div>

      {/* Description */}
      <p className="text-[#4A5568] dark:text-[#A0AEC0] text-sm leading-relaxed mb-4">
        {integration.description}
      </p>

      {/* Metadata */}
      {!isComingSoon && (
        <div className="flex flex-wrap gap-2 text-xs">
          {integration.setupDifficulty && (
            <span
              className={`px-2 py-1 rounded-full font-medium ${
                difficultyColors[integration.setupDifficulty]
              }`}
            >
              {integration.setupDifficulty}
            </span>
          )}
          {integration.setupTime && (
            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-full font-medium">
              ⏱️ {integration.setupTime}
            </span>
          )}
        </div>
      )}

      {/* Hover Arrow */}
      {!isComingSoon && (
        <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
          <svg
            className="w-5 h-5 text-purple-600 dark:text-purple-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </div>
      )}
    </div>
  );

  if (isComingSoon) {
    return <CardContent />;
  }

  return (
    <Link href={`/integrations/${integration.slug}`} aria-label={`Learn more about ${integration.name} integration`}>
      <CardContent />
    </Link>
  );
}
