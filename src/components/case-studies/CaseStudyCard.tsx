import Link from "next/link";

interface CaseStudyCardProps {
  slug: string;
  universityName: string;
  department: string;
  logo?: string;
  studentCount: number;
  keyMetric: string;
  quote: string;
  author: string;
  authorTitle: string;
  universitySize: string;
  useCase: string;
}

export default function CaseStudyCard({
  slug,
  universityName,
  department,
  studentCount,
  keyMetric,
  quote,
  author,
  authorTitle,
  universitySize,
  useCase,
}: CaseStudyCardProps) {
  return (
    <Link href={`/case-studies/${slug}`}>
      <div className="group bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
        {/* University Header */}
        <div className="mb-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-[#2D3748] dark:text-[#E9EEFF] mb-1 group-hover:text-[#6B3DCB] dark:group-hover:text-[#A78BFA] transition-colors">
                {universityName}
              </h3>
              <p className="text-sm text-[#718096] dark:text-[#A0AEC0]">{department}</p>
            </div>
            {/* Placeholder for logo */}
            <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-lg flex items-center justify-center">
              <span className="text-2xl">🎓</span>
            </div>
          </div>

          {/* Student Count */}
          <div className="inline-block px-3 py-1 bg-[#EDE7F9] dark:bg-[#2D2440] rounded-full">
            <span className="text-sm font-semibold text-[#6B3DCB] dark:text-[#E9EEFF]">
              {studentCount.toLocaleString()} students
            </span>
          </div>
        </div>

        {/* Key Metric - Prominent Display */}
        <div className="mb-4 p-4 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl border border-emerald-200 dark:border-emerald-800">
          <div className="flex items-start gap-2">
            <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <p className="text-sm font-semibold text-emerald-900 dark:text-emerald-100">
              {keyMetric}
            </p>
          </div>
        </div>

        {/* Quote */}
        <div className="mb-4 flex-1">
          <blockquote className="text-[#4A5568] dark:text-[#A0AEC0] italic leading-relaxed">
            &ldquo;{quote}&rdquo;
          </blockquote>
        </div>

        {/* Author */}
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <p className="font-semibold text-[#2D3748] dark:text-[#E9EEFF] text-sm">
            {author}
          </p>
          <p className="text-xs text-[#718096] dark:text-[#A0AEC0]">{authorTitle}</p>
        </div>

        {/* Tags */}
        <div className="flex gap-2 mt-4">
          <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-full">
            {universitySize}
          </span>
          <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs rounded-full">
            {useCase}
          </span>
        </div>

        {/* Read More Link */}
        <div className="mt-4 flex items-center text-[#6B3DCB] dark:text-[#A78BFA] font-semibold group-hover:gap-2 transition-all">
          <span>Read Full Story</span>
          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
