import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Features - Everything Your University Needs | CoStudy",
  description: "Discover how CoStudy provides comprehensive tools for administrators, IT teams, students, and faculty. Built for higher education, trusted by 50+ universities.",
  openGraph: {
    title: "Features - Everything Your University Needs | CoStudy",
    description: "Comprehensive collaboration tools for higher education. From admin dashboards to SSO integration and student collaboration features.",
    url: "https://costudy.co/features",
  },
};

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#121212]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-50 via-blue-50 to-purple-50 dark:from-[#1a1a1a] dark:via-[#0f0f23] dark:to-[#1a1a1a] py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-[#2D3748] dark:text-[#E9EEFF]">
              Everything Your University Needs to Drive Student Success
            </h1>
            <p className="text-xl text-[#4A5568] dark:text-[#A0AEC0] mb-8">
              Built for higher education, trusted by 50+ universities
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/demo"
                className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-lg transition-all shadow-lg"
              >
                Schedule a Demo
              </Link>
              <Link
                href="/contact"
                className="inline-block px-8 py-4 bg-white dark:bg-[#2a2a2a] text-purple-600 dark:text-purple-400 font-semibold rounded-lg border-2 border-purple-600 dark:border-purple-400 hover:bg-purple-50 dark:hover:bg-[#333] transition-all"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="sticky top-0 z-40 bg-white dark:bg-[#1a1a1a] border-b border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="container mx-auto px-4">
          <nav aria-label="Feature categories" className="flex overflow-x-auto">
            <a href="#administrators" aria-label="Jump to administrator features" className="px-6 py-4 font-semibold text-purple-600 dark:text-purple-400 border-b-2 border-purple-600 dark:border-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors whitespace-nowrap">
              For Administrators
            </a>
            <a href="#it-teams" aria-label="Jump to IT team features" className="px-6 py-4 font-semibold text-[#4A5568] dark:text-[#A0AEC0] hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors whitespace-nowrap">
              For IT Teams
            </a>
            <a href="#students" aria-label="Jump to student features" className="px-6 py-4 font-semibold text-[#4A5568] dark:text-[#A0AEC0] hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors whitespace-nowrap">
              For Students
            </a>
            <a href="#faculty" aria-label="Jump to faculty features" className="px-6 py-4 font-semibold text-[#4A5568] dark:text-[#A0AEC0] hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors whitespace-nowrap">
              For Faculty
            </a>
          </nav>
        </div>
      </section>

      {/* For Administrators */}
      <section id="administrators" className="py-20 bg-white dark:bg-[#121212]">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 text-[#2D3748] dark:text-[#E9EEFF]">
                For University Administrators
              </h2>
              <p className="text-xl text-[#4A5568] dark:text-[#A0AEC0]">
                Comprehensive oversight and data-driven insights for institutional decision-making
              </p>
            </div>

            {/* Admin Dashboard */}
            <div className="mb-20">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="inline-block px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-sm font-semibold mb-4">
                    Admin Dashboard
                  </div>
                  <h3 className="text-3xl font-bold mb-4 text-[#2D3748] dark:text-[#E9EEFF]">
                    Monitor Usage Across All Departments
                  </h3>
                  <p className="text-lg text-[#4A5568] dark:text-[#A0AEC0] mb-6">
                    Get a comprehensive view of student collaboration activity across your entire institution. Track key metrics and identify engagement trends in real-time.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-[#4A5568] dark:text-[#A0AEC0]">Active users by department and course</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-[#4A5568] dark:text-[#A0AEC0]">Study groups created and session attendance rates</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-[#4A5568] dark:text-[#A0AEC0]">Export reports for board presentations and stakeholder meetings</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-[#4A5568] dark:text-[#A0AEC0]">Real-time alerts for low engagement patterns</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-2xl p-8 h-80 flex items-center justify-center border border-purple-200 dark:border-purple-800">
                  <div className="text-center">
                    <div className="text-6xl mb-4">📊</div>
                    <p className="text-[#4A5568] dark:text-[#A0AEC0]">Dashboard Preview</p>
                  </div>
                </div>
              </div>
            </div>

            {/* User Management */}
            <div className="mb-20">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="order-2 md:order-1 bg-gradient-to-br from-green-100 to-teal-100 dark:from-green-900/30 dark:to-teal-900/30 rounded-2xl p-8 h-80 flex items-center justify-center border border-green-200 dark:border-green-800">
                  <div className="text-center">
                    <div className="text-6xl mb-4">👥</div>
                    <p className="text-[#4A5568] dark:text-[#A0AEC0]">User Management Interface</p>
                  </div>
                </div>
                <div className="order-1 md:order-2">
                  <div className="inline-block px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full text-sm font-semibold mb-4">
                    User Management
                  </div>
                  <h3 className="text-3xl font-bold mb-4 text-[#2D3748] dark:text-[#E9EEFF]">
                    Effortless User Administration
                  </h3>
                  <p className="text-lg text-[#4A5568] dark:text-[#A0AEC0] mb-6">
                    Streamline user management with powerful bulk operations and automated provisioning. Manage thousands of users with just a few clicks.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-[#4A5568] dark:text-[#A0AEC0]">Bulk import via CSV for fast onboarding</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-[#4A5568] dark:text-[#A0AEC0]">SSO auto-provisioning for seamless access</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-[#4A5568] dark:text-[#A0AEC0]">Add or remove students instantly</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-[#4A5568] dark:text-[#A0AEC0]">Role-based permissions (admin, instructor, student)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Analytics & Reporting */}
            <div className="mb-12">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-semibold mb-4">
                    Analytics & Reporting
                  </div>
                  <h3 className="text-3xl font-bold mb-4 text-[#2D3748] dark:text-[#E9EEFF]">
                    Data-Driven Insights for Strategic Decisions
                  </h3>
                  <p className="text-lg text-[#4A5568] dark:text-[#A0AEC0] mb-6">
                    Measure the impact of student collaboration on retention and success. Generate custom reports that demonstrate ROI to stakeholders.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-[#4A5568] dark:text-[#A0AEC0]">Engagement metrics (DAU, WAU, cohort retention)</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-[#4A5568] dark:text-[#A0AEC0]">At-risk student identification based on engagement patterns</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-[#4A5568] dark:text-[#A0AEC0]">ROI calculator showing retention impact</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-[#4A5568] dark:text-[#A0AEC0]">Custom reports by course, department, or semester</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-2xl p-8 h-80 flex items-center justify-center border border-blue-200 dark:border-blue-800">
                  <div className="text-center">
                    <div className="text-6xl mb-4">📈</div>
                    <p className="text-[#4A5568] dark:text-[#A0AEC0]">Analytics Dashboard</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* For IT Teams */}
      <section id="it-teams" className="py-20 bg-gray-50 dark:bg-[#0a0a0a]">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 text-[#2D3748] dark:text-[#E9EEFF]">
                For IT Teams
              </h2>
              <p className="text-xl text-[#4A5568] dark:text-[#A0AEC0]">
                Enterprise-grade security, seamless integration, and reliable infrastructure
              </p>
            </div>

            {/* SSO/SAML Integration */}
            <div className="mb-20">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="inline-block px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full text-sm font-semibold mb-4">
                    SSO/SAML Integration
                  </div>
                  <h3 className="text-3xl font-bold mb-4 text-[#2D3748] dark:text-[#E9EEFF]">
                    Enterprise Single Sign-On
                  </h3>
                  <p className="text-lg text-[#4A5568] dark:text-[#A0AEC0] mb-6">
                    Integrate seamlessly with your existing identity infrastructure. Support for all major identity providers with enterprise-grade security.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-[#4A5568] dark:text-[#A0AEC0]">Works with Shibboleth, Azure AD, Okta, Google Workspace</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-[#4A5568] dark:text-[#A0AEC0]">Just-in-time (JIT) user provisioning</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-[#4A5568] dark:text-[#A0AEC0]">Multi-factor authentication (MFA) support</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-[#4A5568] dark:text-[#A0AEC0]">Enterprise-grade security (SOC 2, FERPA compliant)</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-indigo-100 to-blue-100 dark:from-indigo-900/30 dark:to-blue-900/30 rounded-2xl p-8 h-80 flex items-center justify-center border border-indigo-200 dark:border-indigo-800">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🔐</div>
                    <p className="text-[#4A5568] dark:text-[#A0AEC0]">SSO Configuration</p>
                  </div>
                </div>
              </div>
            </div>

            {/* LMS Integration */}
            <div className="mb-20">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="order-2 md:order-1 bg-gradient-to-br from-teal-100 to-green-100 dark:from-teal-900/30 dark:to-green-900/30 rounded-2xl p-8 h-80 flex items-center justify-center border border-teal-200 dark:border-teal-800">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🔗</div>
                    <p className="text-[#4A5568] dark:text-[#A0AEC0]">LMS Integration</p>
                  </div>
                </div>
                <div className="order-1 md:order-2">
                  <div className="inline-block px-4 py-2 bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 rounded-full text-sm font-semibold mb-4">
                    LMS Integration
                  </div>
                  <h3 className="text-3xl font-bold mb-4 text-[#2D3748] dark:text-[#E9EEFF]">
                    Seamless Learning Management System Integration
                  </h3>
                  <p className="text-lg text-[#4A5568] dark:text-[#A0AEC0] mb-6">
                    Integrate directly with your existing LMS. Automatic roster syncing and deep linking make deployment effortless.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-[#4A5568] dark:text-[#A0AEC0]">Auto-sync with Canvas, Blackboard, Moodle</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-[#4A5568] dark:text-[#A0AEC0]">Course rosters update automatically</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-[#4A5568] dark:text-[#A0AEC0]">Deep linking (launch from LMS navigation menu)</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-[#4A5568] dark:text-[#A0AEC0]">Optional grade passback</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Infrastructure */}
            <div className="mb-12">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-semibold mb-4">
                    Infrastructure
                  </div>
                  <h3 className="text-3xl font-bold mb-4 text-[#2D3748] dark:text-[#E9EEFF]">
                    Enterprise-Grade Reliability & Security
                  </h3>
                  <p className="text-lg text-[#4A5568] dark:text-[#A0AEC0] mb-6">
                    Built on industry-leading infrastructure with enterprise SLAs. Fully compliant with education and data privacy regulations.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-[#4A5568] dark:text-[#A0AEC0]">99.9% uptime SLA guaranteed</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-[#4A5568] dark:text-[#A0AEC0]">Hosted on AWS/Vercel enterprise tier</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-[#4A5568] dark:text-[#A0AEC0]">GDPR, FERPA, and COPPA compliant</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-[#4A5568] dark:text-[#A0AEC0]">Data residency options available</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-2xl p-8 h-80 flex items-center justify-center border border-blue-200 dark:border-blue-800">
                  <div className="text-center">
                    <div className="text-6xl mb-4">☁️</div>
                    <p className="text-[#4A5568] dark:text-[#A0AEC0]">Cloud Infrastructure</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* For Students */}
      <section id="students" className="py-20 bg-white dark:bg-[#121212]">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 text-[#2D3748] dark:text-[#E9EEFF]">
                For Students
              </h2>
              <p className="text-xl text-[#4A5568] dark:text-[#A0AEC0]">
                Powerful collaboration tools that make studying together easy and effective
              </p>
            </div>

            {/* Study Group Discovery */}
            <div className="mb-20">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="inline-block px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-sm font-semibold mb-4">
                    Study Group Discovery
                  </div>
                  <h3 className="text-3xl font-bold mb-4 text-[#2D3748] dark:text-[#E9EEFF]">
                    Find Your Perfect Study Group
                  </h3>
                  <p className="text-lg text-[#4A5568] dark:text-[#A0AEC0] mb-6">
                    Discover study groups that match your courses, major, and schedule. Smart matching helps you connect with the right peers.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-[#4A5568] dark:text-[#A0AEC0]">Search by course, major, or study topic</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-[#4A5568] dark:text-[#A0AEC0]">Smart matching algorithm based on schedule compatibility</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-[#4A5568] dark:text-[#A0AEC0]">Join groups with one click</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-[#4A5568] dark:text-[#A0AEC0]">See group size, meeting times, and member profiles</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-2xl p-8 h-80 flex items-center justify-center border border-purple-200 dark:border-purple-800">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🔍</div>
                    <p className="text-[#4A5568] dark:text-[#A0AEC0]">Group Discovery</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Collaboration Tools */}
            <div className="mb-20">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="order-2 md:order-1 bg-gradient-to-br from-blue-100 to-teal-100 dark:from-blue-900/30 dark:to-teal-900/30 rounded-2xl p-8 h-80 flex items-center justify-center border border-blue-200 dark:border-blue-800">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🎥</div>
                    <p className="text-[#4A5568] dark:text-[#A0AEC0]">Collaboration Tools</p>
                  </div>
                </div>
                <div className="order-1 md:order-2">
                  <div className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-semibold mb-4">
                    Collaboration Tools
                  </div>
                  <h3 className="text-3xl font-bold mb-4 text-[#2D3748] dark:text-[#E9EEFF]">
                    Everything You Need to Study Together
                  </h3>
                  <p className="text-lg text-[#4A5568] dark:text-[#A0AEC0] mb-6">
                    Collaborate seamlessly with HD video, screen sharing, virtual whiteboard, and more. All the tools you need in one place.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-[#4A5568] dark:text-[#A0AEC0]">HD video calls supporting up to 50 students</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-[#4A5568] dark:text-[#A0AEC0]">Screen sharing for presentations and demos</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-[#4A5568] dark:text-[#A0AEC0]">Virtual whiteboard for collaborative problem-solving</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-[#4A5568] dark:text-[#A0AEC0]">Session recording (with permission)</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-[#4A5568] dark:text-[#A0AEC0]">Group chat with file sharing</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Scheduling */}
            <div className="mb-12">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="inline-block px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full text-sm font-semibold mb-4">
                    Scheduling
                  </div>
                  <h3 className="text-3xl font-bold mb-4 text-[#2D3748] dark:text-[#E9EEFF]">
                    Never Miss a Study Session
                  </h3>
                  <p className="text-lg text-[#4A5568] dark:text-[#A0AEC0] mb-6">
                    Keep track of all your study sessions with integrated calendar views, automatic reminders, and timezone support.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-[#4A5568] dark:text-[#A0AEC0]">Calendar view of all upcoming sessions</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-[#4A5568] dark:text-[#A0AEC0]">Sync with Google Calendar and iCal</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-[#4A5568] dark:text-[#A0AEC0]">Automatic reminders via email and SMS</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-[#4A5568] dark:text-[#A0AEC0]">Smart timezone support for remote learning</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-green-100 to-teal-100 dark:from-green-900/30 dark:to-teal-900/30 rounded-2xl p-8 h-80 flex items-center justify-center border border-green-200 dark:border-green-800">
                  <div className="text-center">
                    <div className="text-6xl mb-4">📅</div>
                    <p className="text-[#4A5568] dark:text-[#A0AEC0]">Session Calendar</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* For Faculty */}
      <section id="faculty" className="py-20 bg-gray-50 dark:bg-[#0a0a0a]">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 text-[#2D3748] dark:text-[#E9EEFF]">
                For Faculty
              </h2>
              <p className="text-xl text-[#4A5568] dark:text-[#A0AEC0]">
                Powerful insights and tools to support student collaboration and identify at-risk students
              </p>
            </div>

            {/* Course Integration */}
            <div className="mb-20">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="inline-block px-4 py-2 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full text-sm font-semibold mb-4">
                    Course Integration
                  </div>
                  <h3 className="text-3xl font-bold mb-4 text-[#2D3748] dark:text-[#E9EEFF]">
                    Seamless Integration with Your Courses
                  </h3>
                  <p className="text-lg text-[#4A5568] dark:text-[#A0AEC0] mb-6">
                    Automatically create study groups for each course and monitor student collaboration. Identify students who need support.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-[#4A5568] dark:text-[#A0AEC0]">Study groups automatically created for each course</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-[#4A5568] dark:text-[#A0AEC0]">View which students are actively collaborating</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-[#4A5568] dark:text-[#A0AEC0]">Identify at-risk students based on low engagement</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-[#4A5568] dark:text-[#A0AEC0]">Optional: Join study sessions as a facilitator</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-orange-100 to-yellow-100 dark:from-orange-900/30 dark:to-yellow-900/30 rounded-2xl p-8 h-80 flex items-center justify-center border border-orange-200 dark:border-orange-800">
                  <div className="text-center">
                    <div className="text-6xl mb-4">📚</div>
                    <p className="text-[#4A5568] dark:text-[#A0AEC0]">Course Dashboard</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Insights */}
            <div className="mb-12">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="order-2 md:order-1 bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-900/30 dark:to-purple-900/30 rounded-2xl p-8 h-80 flex items-center justify-center border border-pink-200 dark:border-pink-800">
                  <div className="text-center">
                    <div className="text-6xl mb-4">📊</div>
                    <p className="text-[#4A5568] dark:text-[#A0AEC0]">Collaboration Insights</p>
                  </div>
                </div>
                <div className="order-1 md:order-2">
                  <div className="inline-block px-4 py-2 bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 rounded-full text-sm font-semibold mb-4">
                    Insights
                  </div>
                  <h3 className="text-3xl font-bold mb-4 text-[#2D3748] dark:text-[#E9EEFF]">
                    Data-Driven Understanding of Student Collaboration
                  </h3>
                  <p className="text-lg text-[#4A5568] dark:text-[#A0AEC0] mb-6">
                    Gain valuable insights into how collaboration impacts student success in your courses. See trends and measure effectiveness.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-[#4A5568] dark:text-[#A0AEC0]">Aggregate collaboration data (anonymized)</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-[#4A5568] dark:text-[#A0AEC0]">Research shows: Students in study groups score 8% higher on average</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-[#4A5568] dark:text-[#A0AEC0]">Engagement trends over the semester</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-[#4A5568] dark:text-[#A0AEC0]">Export reports for course evaluation</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="py-20 bg-white dark:bg-[#121212]">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 text-[#2D3748] dark:text-[#E9EEFF]">
                How CoStudy Compares
              </h2>
              <p className="text-xl text-[#4A5568] dark:text-[#A0AEC0]">
                See why universities choose CoStudy over other collaboration platforms
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white dark:bg-[#1a1a1a] rounded-lg overflow-hidden shadow-lg">
                <thead>
                  <tr className="bg-purple-600 text-white">
                    <th scope="col" className="p-4 text-left font-semibold">Feature</th>
                    <th scope="col" className="p-4 text-center font-semibold">CoStudy</th>
                    <th scope="col" className="p-4 text-center font-semibold">Zoom</th>
                    <th scope="col" className="p-4 text-center font-semibold">Microsoft Teams</th>
                    <th scope="col" className="p-4 text-center font-semibold">Slack</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr className="hover:bg-purple-50 dark:hover:bg-purple-900/10">
                    <td className="p-4 text-[#4A5568] dark:text-[#A0AEC0]">Built for Education</td>
                    <td className="p-4 text-center">
                      <svg className="w-6 h-6 text-green-500 mx-auto" fill="currentColor" viewBox="0 0 20 20" role="img" aria-label="Yes">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </td>
                    <td className="p-4 text-center">
                      <svg className="w-6 h-6 text-red-500 mx-auto" fill="currentColor" viewBox="0 0 20 20" role="img" aria-label="No">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </td>
                    <td className="p-4 text-center">
                      <svg className="w-6 h-6 text-red-500 mx-auto" fill="currentColor" viewBox="0 0 20 20" role="img" aria-label="No">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </td>
                    <td className="p-4 text-center">
                      <svg className="w-6 h-6 text-red-500 mx-auto" fill="currentColor" viewBox="0 0 20 20" role="img" aria-label="No">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </td>
                  </tr>
                  <tr className="hover:bg-purple-50 dark:hover:bg-purple-900/10">
                    <td className="p-4 text-[#4A5568] dark:text-[#A0AEC0]">LMS Integration</td>
                    <td className="p-4 text-center">
                      <svg className="w-6 h-6 text-green-500 mx-auto" fill="currentColor" viewBox="0 0 20 20" role="img" aria-label="Yes">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </td>
                    <td className="p-4 text-center">
                      <span className="text-yellow-600 dark:text-yellow-400">Partial</span>
                    </td>
                    <td className="p-4 text-center">
                      <span className="text-yellow-600 dark:text-yellow-400">Partial</span>
                    </td>
                    <td className="p-4 text-center">
                      <svg className="w-6 h-6 text-red-500 mx-auto" fill="currentColor" viewBox="0 0 20 20" role="img" aria-label="No">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </td>
                  </tr>
                  <tr className="hover:bg-purple-50 dark:hover:bg-purple-900/10">
                    <td className="p-4 text-[#4A5568] dark:text-[#A0AEC0]">Study Group Discovery</td>
                    <td className="p-4 text-center">
                      <svg className="w-6 h-6 text-green-500 mx-auto" fill="currentColor" viewBox="0 0 20 20" role="img" aria-label="Yes">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </td>
                    <td className="p-4 text-center">
                      <svg className="w-6 h-6 text-red-500 mx-auto" fill="currentColor" viewBox="0 0 20 20" role="img" aria-label="No">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </td>
                    <td className="p-4 text-center">
                      <svg className="w-6 h-6 text-red-500 mx-auto" fill="currentColor" viewBox="0 0 20 20" role="img" aria-label="No">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </td>
                    <td className="p-4 text-center">
                      <svg className="w-6 h-6 text-red-500 mx-auto" fill="currentColor" viewBox="0 0 20 20" role="img" aria-label="No">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </td>
                  </tr>
                  <tr className="hover:bg-purple-50 dark:hover:bg-purple-900/10">
                    <td className="p-4 text-[#4A5568] dark:text-[#A0AEC0]">At-Risk Student Detection</td>
                    <td className="p-4 text-center">
                      <svg className="w-6 h-6 text-green-500 mx-auto" fill="currentColor" viewBox="0 0 20 20" role="img" aria-label="Yes">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </td>
                    <td className="p-4 text-center">
                      <svg className="w-6 h-6 text-red-500 mx-auto" fill="currentColor" viewBox="0 0 20 20" role="img" aria-label="No">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </td>
                    <td className="p-4 text-center">
                      <svg className="w-6 h-6 text-red-500 mx-auto" fill="currentColor" viewBox="0 0 20 20" role="img" aria-label="No">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </td>
                    <td className="p-4 text-center">
                      <svg className="w-6 h-6 text-red-500 mx-auto" fill="currentColor" viewBox="0 0 20 20" role="img" aria-label="No">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </td>
                  </tr>
                  <tr className="hover:bg-purple-50 dark:hover:bg-purple-900/10">
                    <td className="p-4 text-[#4A5568] dark:text-[#A0AEC0]">FERPA Compliant</td>
                    <td className="p-4 text-center">
                      <svg className="w-6 h-6 text-green-500 mx-auto" fill="currentColor" viewBox="0 0 20 20" role="img" aria-label="Yes">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </td>
                    <td className="p-4 text-center">
                      <svg className="w-6 h-6 text-green-500 mx-auto" fill="currentColor" viewBox="0 0 20 20" role="img" aria-label="Yes">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </td>
                    <td className="p-4 text-center">
                      <svg className="w-6 h-6 text-green-500 mx-auto" fill="currentColor" viewBox="0 0 20 20" role="img" aria-label="Yes">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </td>
                    <td className="p-4 text-center">
                      <svg className="w-6 h-6 text-green-500 mx-auto" fill="currentColor" viewBox="0 0 20 20" role="img" aria-label="Yes">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </td>
                  </tr>
                  <tr className="hover:bg-purple-50 dark:hover:bg-purple-900/10">
                    <td className="p-4 text-[#4A5568] dark:text-[#A0AEC0]">Institutional Analytics</td>
                    <td className="p-4 text-center">
                      <svg className="w-6 h-6 text-green-500 mx-auto" fill="currentColor" viewBox="0 0 20 20" role="img" aria-label="Yes">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </td>
                    <td className="p-4 text-center">
                      <svg className="w-6 h-6 text-red-500 mx-auto" fill="currentColor" viewBox="0 0 20 20" role="img" aria-label="No">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </td>
                    <td className="p-4 text-center">
                      <span className="text-yellow-600 dark:text-yellow-400">Limited</span>
                    </td>
                    <td className="p-4 text-center">
                      <svg className="w-6 h-6 text-red-500 mx-auto" fill="currentColor" viewBox="0 0 20 20" role="img" aria-label="No">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-purple-600 via-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform Student Collaboration at Your University?
            </h2>
            <p className="text-xl mb-10 opacity-90">
              Join 50+ universities using CoStudy to drive student success through effective collaboration
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/demo"
                className="inline-block px-8 py-4 bg-white text-purple-600 font-semibold rounded-lg hover:bg-gray-100 transition-all shadow-lg"
              >
                Schedule a Demo
              </Link>
              <Link
                href="/contact"
                className="inline-block px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-purple-600 transition-all"
              >
                Contact Sales
              </Link>
            </div>
            <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm opacity-80">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Free setup & training</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Dedicated support team</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>99.9% uptime guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
