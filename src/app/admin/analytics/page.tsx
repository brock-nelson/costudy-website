import { auth } from "@/auth";
import { db, analyticsEvents, demoRequests, contactSubmissions, emailSubscriptions } from "@/db";
import { count, desc, eq, gte } from "drizzle-orm";

export default async function AnalyticsPage() {
  const session = await auth();

  if (!session) {
    return null;
  }

  // Get date 30 days ago
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  // Fetch analytics data
  const [
    totalEvents,
    totalDemoRequests,
    totalContactSubmissions,
    activeSubscribers,
    recentDemoRequests,
    recentContactSubmissions,
    topPages,
  ] = await Promise.all([
    // Total events count
    db.select({ count: count() }).from(analyticsEvents).then(res => res[0]?.count || 0),

    // Demo requests
    db.select({ count: count() }).from(demoRequests).then(res => res[0]?.count || 0),

    // Contact submissions
    db.select({ count: count() }).from(contactSubmissions).then(res => res[0]?.count || 0),

    // Active subscribers
    db
      .select({ count: count() })
      .from(emailSubscriptions)
      .where(eq(emailSubscriptions.isActive, true))
      .then(res => res[0]?.count || 0),

    // Recent demo requests
    db
      .select()
      .from(demoRequests)
      .orderBy(desc(demoRequests.createdAt))
      .limit(10),

    // Recent contact submissions
    db
      .select()
      .from(contactSubmissions)
      .orderBy(desc(contactSubmissions.createdAt))
      .limit(10),

    // Top pages
    db
      .select({
        page: analyticsEvents.page,
        count: count(),
      })
      .from(analyticsEvents)
      .where(gte(analyticsEvents.timestamp, thirtyDaysAgo))
      .groupBy(analyticsEvents.page)
      .orderBy(desc(count()))
      .limit(10),
  ]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Analytics Dashboard
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          View user activity, submissions, and engagement metrics
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          title="Total Events"
          value={totalEvents}
          description="All tracked events"
          gradient="from-purple-500 to-purple-600"
        />
        <StatCard
          title="Demo Requests"
          value={totalDemoRequests}
          description="Total requests"
          gradient="from-blue-500 to-blue-600"
        />
        <StatCard
          title="Contact Submissions"
          value={totalContactSubmissions}
          description="Total submissions"
          gradient="from-cyan-500 to-cyan-600"
        />
        <StatCard
          title="Active Subscribers"
          value={activeSubscribers}
          description="Newsletter subscribers"
          gradient="from-green-500 to-green-600"
        />
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Pages */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Top Pages (Last 30 Days)
          </h2>
          {topPages.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              No data available
            </p>
          ) : (
            <div className="space-y-3">
              {topPages.map((page, index) => (
                <div
                  key={page.page}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-600 text-white text-xs font-bold">
                      {index + 1}
                    </span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {page.page}
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                    {page.count} views
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Demo Requests */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Recent Demo Requests
          </h2>
          {recentDemoRequests.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              No demo requests yet
            </p>
          ) : (
            <div className="space-y-3">
              {recentDemoRequests.map((request) => (
                <div
                  key={request.id}
                  className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {request.name}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {request.email}
                      </p>
                      {request.institution && (
                        <p className="text-xs text-gray-500 dark:text-gray-500">
                          {request.institution}
                        </p>
                      )}
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(request.status)}`}>
                      {request.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                    {new Date(request.createdAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Recent Contact Submissions */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Recent Contact Submissions
        </h2>
        {recentContactSubmissions.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            No contact submissions yet
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recentContactSubmissions.map((submission) => (
              <div
                key={submission.id}
                className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {submission.name}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {submission.email}
                    </p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(submission.status)}`}>
                    {submission.status}
                  </span>
                </div>
                {submission.subject && (
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {submission.subject}
                  </p>
                )}
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                  {submission.message}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                  {new Date(submission.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  description,
  gradient,
}: {
  title: string;
  value: number;
  description: string;
  gradient: string;
}) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center gap-4">
        <div
          className={`w-12 h-12 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-bold text-xl`}
        >
          {value > 999 ? "999+" : value}
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {title}
          </h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {value.toLocaleString()}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    pending: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300",
    new: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300",
    contacted: "bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300",
    scheduled: "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300",
    "in-progress": "bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300",
    responded: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300",
    completed: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300",
    closed: "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300",
    declined: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300",
  };
  return colors[status] || colors.pending;
}
