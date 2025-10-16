"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ResourceDownloadForm from "@/components/forms/ResourceDownloadForm";
import NewsletterForm from "@/components/newsletter/NewsletterForm";

interface Resource {
  id: string;
  title: string;
  description: string;
  type: string;
  category: string | null;
  thumbnailUrl: string | null;
  fileUrl: string | null;
  fileSize: string | null;
  duration: string | null;
  isGated: boolean;
  author: string | null;
  downloadCount: number;
  publishedAt: string | null;
}

export default function Resources() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [filteredResources, setFilteredResources] = useState<Resource[]>([]);
  const [selectedType, setSelectedType] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(true);
  const [downloadingResource, setDownloadingResource] = useState<Resource | null>(null);

  // Fetch resources on mount
  useEffect(() => {
    fetchResources();
  }, []);

  // Filter resources when type changes
  useEffect(() => {
    if (selectedType === "all") {
      setFilteredResources(resources);
    } else {
      setFilteredResources(resources.filter((r) => r.type === selectedType));
    }
  }, [selectedType, resources]);

  const fetchResources = async () => {
    try {
      const response = await fetch("/api/resources");
      const data = await response.json();
      if (data.success) {
        setResources(data.resources);
        setFilteredResources(data.resources);
      }
    } catch (error) {
      console.error("Failed to fetch resources:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResourceClick = (resource: Resource) => {
    if (resource.isGated) {
      setDownloadingResource(resource);
    } else if (resource.fileUrl) {
      window.open(resource.fileUrl, "_blank");
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "whitepaper":
        return "📄";
      case "guide":
        return "📋";
      case "checklist":
        return "✅";
      case "webinar":
        return "🎥";
      case "case-study":
        return "📊";
      default:
        return "📘";
    }
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case "whitepaper":
        return "bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300";
      case "guide":
        return "bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300";
      case "checklist":
        return "bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300";
      case "webinar":
        return "bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300";
      case "case-study":
        return "bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300";
      default:
        return "bg-gray-100 dark:bg-gray-900/50 text-gray-700 dark:text-gray-300";
    }
  };

  const formatType = (type: string) => {
    return type
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#121212]">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/30 via-transparent to-transparent dark:from-blue-900/10 pointer-events-none"></div>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-blue-300/20 dark:from-blue-600/20 to-transparent rounded-full blur-2xl animate-pulse-slow"></div>
          <div className="absolute bottom-10 left-10 w-40 h-40 bg-gradient-to-tr from-purple-300/20 dark:from-purple-600/20 to-transparent rounded-full blur-2xl animate-float"></div>
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#2D3748] dark:text-[#E9EEFF]">
              Resources to Help You Improve Student Success
            </h1>
            <p className="text-xl text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed">
              Whitepapers, guides, case studies, and more to support your student engagement initiatives.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="container mx-auto px-4 pb-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => setSelectedType("all")}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                selectedType === "all"
                  ? "bg-blue-600 dark:bg-blue-500 text-white shadow-lg"
                  : "bg-gray-100 dark:bg-[#1E1E1E] text-[#4A5568] dark:text-[#A0AEC0] hover:bg-gray-200 dark:hover:bg-[#2e2e2e]"
              }`}
            >
              All Resources
            </button>
            <button
              onClick={() => setSelectedType("whitepaper")}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                selectedType === "whitepaper"
                  ? "bg-blue-600 dark:bg-blue-500 text-white shadow-lg"
                  : "bg-gray-100 dark:bg-[#1E1E1E] text-[#4A5568] dark:text-[#A0AEC0] hover:bg-gray-200 dark:hover:bg-[#2e2e2e]"
              }`}
            >
              📄 Whitepapers
            </button>
            <button
              onClick={() => setSelectedType("guide")}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                selectedType === "guide"
                  ? "bg-blue-600 dark:bg-blue-500 text-white shadow-lg"
                  : "bg-gray-100 dark:bg-[#1E1E1E] text-[#4A5568] dark:text-[#A0AEC0] hover:bg-gray-200 dark:hover:bg-[#2e2e2e]"
              }`}
            >
              📋 Guides
            </button>
            <button
              onClick={() => setSelectedType("case-study")}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                selectedType === "case-study"
                  ? "bg-blue-600 dark:bg-blue-500 text-white shadow-lg"
                  : "bg-gray-100 dark:bg-[#1E1E1E] text-[#4A5568] dark:text-[#A0AEC0] hover:bg-gray-200 dark:hover:bg-[#2e2e2e]"
              }`}
            >
              📊 Case Studies
            </button>
            <button
              onClick={() => setSelectedType("webinar")}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                selectedType === "webinar"
                  ? "bg-blue-600 dark:bg-blue-500 text-white shadow-lg"
                  : "bg-gray-100 dark:bg-[#1E1E1E] text-[#4A5568] dark:text-[#A0AEC0] hover:bg-gray-200 dark:hover:bg-[#2e2e2e]"
              }`}
            >
              🎥 Webinars
            </button>
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {isLoading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-[#4A5568] dark:text-[#A0AEC0]">Loading resources...</p>
            </div>
          ) : filteredResources.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-[#4A5568] dark:text-[#A0AEC0]">
                No resources found. Check back soon!
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((resource) => (
                <div
                  key={resource.id}
                  className="group bg-white dark:bg-[#1E1E1E] border border-gray-200 dark:border-[#404040] rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
                  onClick={() => handleResourceClick(resource)}
                >
                  {/* Thumbnail */}
                  {resource.thumbnailUrl ? (
                    <div className="h-48 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30">
                      <img
                        src={resource.thumbnailUrl}
                        alt={resource.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="h-48 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 flex items-center justify-center">
                      <span className="text-6xl">{getTypeIcon(resource.type)}</span>
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getTypeBadgeColor(resource.type)}`}>
                        {formatType(resource.type)}
                      </span>
                      {resource.duration && (
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {resource.duration}
                        </span>
                      )}
                      {resource.fileSize && (
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {resource.fileSize}
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-bold mb-2 text-[#2D3748] dark:text-[#E9EEFF] group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                      {resource.title}
                    </h3>

                    <p className="text-[#4A5568] dark:text-[#A0AEC0] text-sm mb-4 line-clamp-3">
                      {resource.description}
                    </p>

                    {resource.author && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                        By {resource.author}
                      </p>
                    )}

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {resource.downloadCount} downloads
                      </span>
                      <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm group-hover:translate-x-1 transition-transform">
                        {resource.isGated ? "Get Access →" : "View →"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50/30 via-blue-50/20 to-transparent dark:from-purple-900/10 dark:via-blue-900/10 pointer-events-none"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-2xl mx-auto bg-white dark:bg-[#1E1E1E] rounded-2xl p-8 md:p-12 shadow-xl border border-gray-200 dark:border-[#404040]">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#2D3748] dark:text-[#E9EEFF]">
                Get Student Success Insights in Your Inbox
              </h2>
              <p className="text-lg text-[#4A5568] dark:text-[#A0AEC0]">
                Weekly tips, research, and updates to help improve student engagement and retention.
              </p>
            </div>
            <NewsletterForm source="resources-page" variant="minimal" />
          </div>
        </div>
      </section>

      {/* Blog Link Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4 text-[#2D3748] dark:text-[#E9EEFF]">
            Looking for More?
          </h2>
          <p className="text-lg text-[#4A5568] dark:text-[#A0AEC0] mb-6">
            Check out our blog for the latest insights on student success and peer learning.
          </p>
          <Link
            href="/blog"
            className="inline-block bg-white dark:bg-[#1E1E1E] text-blue-600 dark:text-blue-400 px-8 py-4 rounded-xl font-semibold border-2 border-blue-600 dark:border-[#404040] hover:bg-blue-50 dark:hover:bg-[#2e2e2e] hover:scale-105 transition-all duration-300"
          >
            Visit Our Blog →
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-transparent dark:from-blue-900/10 pointer-events-none"></div>
        <div className="container mx-auto px-4 text-center relative">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#2D3748] dark:text-[#E9EEFF]">
              Ready to See CoStudy in Action?
            </h2>
            <p className="text-xl text-[#4A5568] dark:text-[#A0AEC0] mb-10 leading-relaxed">
              Schedule a personalized demo and learn how CoStudy can transform student engagement at your institution.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/demo"
                className="bg-blue-600 dark:bg-blue-500 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 hover:shadow-lg hover:scale-105 transition-all duration-300 shadow-md"
              >
                Schedule a Demo
              </Link>
              <Link
                href="/contact"
                className="bg-white dark:bg-[#1a1a1a] text-blue-600 dark:text-blue-300 px-8 py-4 rounded-xl font-semibold border-2 border-blue-600 dark:border-[#404040] hover:bg-blue-50 dark:hover:bg-[#2e2e2e] hover:scale-105 transition-all duration-300"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Download Form Modal */}
      {downloadingResource && (
        <ResourceDownloadForm
          resourceId={downloadingResource.id}
          resourceTitle={downloadingResource.title}
          resourceType={formatType(downloadingResource.type)}
          onSuccess={() => {
            setDownloadingResource(null);
            // Optionally show a success message or trigger a download
          }}
          onCancel={() => setDownloadingResource(null)}
        />
      )}
    </div>
  );
}
