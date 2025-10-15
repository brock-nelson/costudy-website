import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cookie Policy - CoStudy",
  description: "Learn about how CoStudy uses cookies and similar technologies on our educational platform.",
};

export default function CookiePolicy() {
  const lastUpdated = "January 2025";

  return (
    <div className="min-h-screen bg-white dark:bg-[#121212]">
      {/* Header */}
      <section className="bg-gradient-to-br from-orange-600 via-pink-600 to-purple-600 dark:from-orange-800 dark:via-pink-800 dark:to-purple-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Cookie Policy</h1>
            <p className="text-xl text-white/90">Last Updated: {lastUpdated}</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">

          {/* Introduction */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-[#6B3DCB] dark:text-[#E9EEFF] mb-4">What Are Cookies?</h2>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed">
              Cookies are small text files that are stored on your device when you visit a website. They help
              websites remember your preferences, understand how you use the site, and provide a better user experience.
            </p>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed mt-4">
              This Cookie Policy explains how CoStudy uses cookies and similar tracking technologies on our
              educational collaboration platform.
            </p>
          </div>

          {/* Types of Cookies */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-[#6B3DCB] dark:text-[#E9EEFF] mb-4">Types of Cookies We Use</h2>

            {/* Essential Cookies */}
            <div className="mb-8 bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border-l-4 border-green-500">
              <h3 className="text-2xl font-semibold text-[#2D3748] dark:text-[#E9EEFF] mb-3">
                Essential Cookies (Always Active)
              </h3>
              <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed">
                These cookies are necessary for the Service to function and cannot be disabled. They enable
                core functionality such as:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1 text-[#4A5568] dark:text-[#A0AEC0]">
                <li>User authentication and session management</li>
                <li>Security features and fraud prevention</li>
                <li>Remembering your login state</li>
                <li>Enabling core platform features</li>
              </ul>
              <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed mt-4">
                <strong>Duration:</strong> Session cookies (deleted when browser closes) and persistent
                cookies (up to 1 year)
              </p>
            </div>

            {/* Functional Cookies */}
            <div className="mb-8 bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border-l-4 border-blue-500">
              <h3 className="text-2xl font-semibold text-[#2D3748] dark:text-[#E9EEFF] mb-3">
                Functional Cookies
              </h3>
              <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed">
                These cookies enable enhanced functionality and personalization:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1 text-[#4A5568] dark:text-[#A0AEC0]">
                <li>Remembering your preferences and settings</li>
                <li>Saving your language and display preferences</li>
                <li>Storing your theme choice (light/dark mode)</li>
                <li>Remembering your last viewed page or module</li>
              </ul>
              <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed mt-4">
                <strong>Duration:</strong> Up to 1 year
              </p>
              <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed mt-2">
                <strong>Can be disabled:</strong> Yes, but some features may not work properly
              </p>
            </div>

            {/* Analytics Cookies */}
            <div className="mb-8 bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg border-l-4 border-purple-500">
              <h3 className="text-2xl font-semibold text-[#2D3748] dark:text-[#E9EEFF] mb-3">
                Analytics Cookies
              </h3>
              <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed">
                These cookies help us understand how users interact with the Service:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1 text-[#4A5568] dark:text-[#A0AEC0]">
                <li>Tracking page visits and user journeys</li>
                <li>Measuring feature usage and engagement</li>
                <li>Identifying technical issues and errors</li>
                <li>Improving platform performance</li>
              </ul>
              <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed mt-4">
                <strong>Third-party services:</strong> Google Analytics, Vercel Analytics
              </p>
              <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed mt-2">
                <strong>Duration:</strong> Up to 2 years
              </p>
              <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed mt-2">
                <strong>Can be disabled:</strong> Yes
              </p>
            </div>

            {/* Performance Cookies */}
            <div className="mb-8 bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg border-l-4 border-orange-500">
              <h3 className="text-2xl font-semibold text-[#2D3748] dark:text-[#E9EEFF] mb-3">
                Performance Cookies
              </h3>
              <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed">
                These cookies help us monitor and improve platform performance:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1 text-[#4A5568] dark:text-[#A0AEC0]">
                <li>Measuring page load times</li>
                <li>Tracking server response times</li>
                <li>Identifying performance bottlenecks</li>
                <li>Optimizing content delivery</li>
              </ul>
              <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed mt-4">
                <strong>Third-party services:</strong> Vercel Speed Insights
              </p>
              <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed mt-2">
                <strong>Duration:</strong> Session to 1 year
              </p>
              <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed mt-2">
                <strong>Can be disabled:</strong> Yes
              </p>
            </div>
          </div>

          {/* What We Don't Use */}
          <div className="mb-12 bg-red-50 dark:bg-red-900/20 p-6 rounded-lg border-l-4 border-red-500">
            <h2 className="text-3xl font-bold text-[#6B3DCB] dark:text-[#E9EEFF] mb-4">What We Don&apos;t Use</h2>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed">
              CoStudy is committed to student privacy. We explicitly DO NOT use:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2 text-[#4A5568] dark:text-[#A0AEC0]">
              <li><strong>Advertising Cookies:</strong> We do not use cookies for advertising or marketing purposes</li>
              <li><strong>Cross-site Tracking:</strong> We do not track students across other websites</li>
              <li><strong>Social Media Tracking:</strong> We do not use social media pixels or tracking technologies</li>
              <li><strong>Behavioral Profiling:</strong> We do not create behavioral profiles for non-educational purposes</li>
            </ul>
          </div>

          {/* Specific Cookies */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-[#6B3DCB] dark:text-[#E9EEFF] mb-4">Specific Cookies We Use</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700" aria-label="Cookie usage details">
                <caption className="sr-only">List of cookies used by CoStudy platform</caption>
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-800">
                    <th scope="col" className="px-6 py-3 text-left text-sm font-semibold text-[#2D3748] dark:text-[#E9EEFF]">Cookie Name</th>
                    <th scope="col" className="px-6 py-3 text-left text-sm font-semibold text-[#2D3748] dark:text-[#E9EEFF]">Purpose</th>
                    <th scope="col" className="px-6 py-3 text-left text-sm font-semibold text-[#2D3748] dark:text-[#E9EEFF]">Type</th>
                    <th scope="col" className="px-6 py-3 text-left text-sm font-semibold text-[#2D3748] dark:text-[#E9EEFF]">Duration</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr>
                    <td className="px-6 py-4 text-sm text-[#4A5568] dark:text-[#A0AEC0]">next-auth.session-token</td>
                    <td className="px-6 py-4 text-sm text-[#4A5568] dark:text-[#A0AEC0]">User authentication</td>
                    <td className="px-6 py-4 text-sm text-[#4A5568] dark:text-[#A0AEC0]">Essential</td>
                    <td className="px-6 py-4 text-sm text-[#4A5568] dark:text-[#A0AEC0]">Session</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-[#4A5568] dark:text-[#A0AEC0]">__Secure-next-auth.session-token</td>
                    <td className="px-6 py-4 text-sm text-[#4A5568] dark:text-[#A0AEC0]">Secure authentication</td>
                    <td className="px-6 py-4 text-sm text-[#4A5568] dark:text-[#A0AEC0]">Essential</td>
                    <td className="px-6 py-4 text-sm text-[#4A5568] dark:text-[#A0AEC0]">Session</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-[#4A5568] dark:text-[#A0AEC0]">theme</td>
                    <td className="px-6 py-4 text-sm text-[#4A5568] dark:text-[#A0AEC0]">Remember theme preference</td>
                    <td className="px-6 py-4 text-sm text-[#4A5568] dark:text-[#A0AEC0]">Functional</td>
                    <td className="px-6 py-4 text-sm text-[#4A5568] dark:text-[#A0AEC0]">1 year</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-[#4A5568] dark:text-[#A0AEC0]">cookie-consent</td>
                    <td className="px-6 py-4 text-sm text-[#4A5568] dark:text-[#A0AEC0]">Remember cookie preferences</td>
                    <td className="px-6 py-4 text-sm text-[#4A5568] dark:text-[#A0AEC0]">Essential</td>
                    <td className="px-6 py-4 text-sm text-[#4A5568] dark:text-[#A0AEC0]">1 year</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-[#4A5568] dark:text-[#A0AEC0]">_ga</td>
                    <td className="px-6 py-4 text-sm text-[#4A5568] dark:text-[#A0AEC0]">Google Analytics - distinguish users</td>
                    <td className="px-6 py-4 text-sm text-[#4A5568] dark:text-[#A0AEC0]">Analytics</td>
                    <td className="px-6 py-4 text-sm text-[#4A5568] dark:text-[#A0AEC0]">2 years</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-[#4A5568] dark:text-[#A0AEC0]">_ga_*</td>
                    <td className="px-6 py-4 text-sm text-[#4A5568] dark:text-[#A0AEC0]">Google Analytics - session data</td>
                    <td className="px-6 py-4 text-sm text-[#4A5568] dark:text-[#A0AEC0]">Analytics</td>
                    <td className="px-6 py-4 text-sm text-[#4A5568] dark:text-[#A0AEC0]">2 years</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Managing Cookies */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-[#6B3DCB] dark:text-[#E9EEFF] mb-4">Managing Your Cookie Preferences</h2>

            <h3 className="text-2xl font-semibold text-[#2D3748] dark:text-[#E9EEFF] mt-6 mb-3">Cookie Consent Banner</h3>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed">
              When you first visit CoStudy, you&apos;ll see a cookie consent banner allowing you to accept or
              customize your cookie preferences. You can change your preferences at any time by:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-[#4A5568] dark:text-[#A0AEC0]">
              <li>Clicking the &quot;Cookie Preferences&quot; link in the footer</li>
              <li>Accessing cookie settings in your account preferences</li>
            </ul>

            <h3 className="text-2xl font-semibold text-[#2D3748] dark:text-[#E9EEFF] mt-6 mb-3">Browser Settings</h3>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed">
              You can also control cookies through your browser settings:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2 text-[#4A5568] dark:text-[#A0AEC0]">
              <li>
                <strong>Chrome:</strong> Settings &gt; Privacy and security &gt; Cookies and other site data
              </li>
              <li>
                <strong>Firefox:</strong> Settings &gt; Privacy & Security &gt; Cookies and Site Data
              </li>
              <li>
                <strong>Safari:</strong> Preferences &gt; Privacy &gt; Cookies and website data
              </li>
              <li>
                <strong>Edge:</strong> Settings &gt; Privacy, search, and services &gt; Cookies and site permissions
              </li>
            </ul>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed mt-4">
              <strong>Note:</strong> Disabling essential cookies may prevent you from using certain features
              of the Service.
            </p>

            <h3 className="text-2xl font-semibold text-[#2D3748] dark:text-[#E9EEFF] mt-6 mb-3">Opt-Out Links</h3>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed">
              For specific analytics services:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-[#4A5568] dark:text-[#A0AEC0]">
              <li>
                <strong>Google Analytics:</strong>{" "}
                <a href="https://tools.google.com/dlpage/gaoptout" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">
                  Google Analytics Opt-out Browser Add-on
                </a>
              </li>
            </ul>
          </div>

          {/* Mobile Devices */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-[#6B3DCB] dark:text-[#E9EEFF] mb-4">Mobile Devices</h2>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed">
              If you access CoStudy through a mobile device, you can manage cookies and tracking through
              your device settings:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2 text-[#4A5568] dark:text-[#A0AEC0]">
              <li><strong>iOS:</strong> Settings &gt; Safari &gt; Privacy & Security</li>
              <li><strong>Android:</strong> Settings &gt; Google &gt; Ads (or browser-specific settings)</li>
            </ul>
          </div>

          {/* Other Tracking Technologies */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-[#6B3DCB] dark:text-[#E9EEFF] mb-4">Other Tracking Technologies</h2>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed">
              In addition to cookies, we may use similar technologies:
            </p>

            <h3 className="text-2xl font-semibold text-[#2D3748] dark:text-[#E9EEFF] mt-6 mb-3">Local Storage</h3>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed">
              We use browser local storage to save user preferences and application state data. This helps
              provide a seamless experience across sessions.
            </p>

            <h3 className="text-2xl font-semibold text-[#2D3748] dark:text-[#E9EEFF] mt-6 mb-3">Session Storage</h3>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed">
              Temporary storage used during your browsing session to maintain application state. This data
              is automatically deleted when you close your browser.
            </p>

            <h3 className="text-2xl font-semibold text-[#2D3748] dark:text-[#E9EEFF] mt-6 mb-3">Web Beacons</h3>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed">
              Small graphic images (also called &quot;pixel tags&quot;) used in combination with cookies to
              understand user behavior and measure campaign effectiveness.
            </p>
          </div>

          {/* Updates to Cookie Policy */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-[#6B3DCB] dark:text-[#E9EEFF] mb-4">Updates to This Cookie Policy</h2>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed">
              We may update this Cookie Policy from time to time to reflect changes in our practices or for
              other operational, legal, or regulatory reasons. We will notify you of material changes through
              the Service or via email.
            </p>
          </div>

          {/* Contact Information */}
          <div className="mb-12 bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
            <h2 className="text-3xl font-bold text-[#6B3DCB] dark:text-[#E9EEFF] mb-4">Questions About Cookies?</h2>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed">
              If you have questions about our use of cookies or other tracking technologies, please contact us:
            </p>
            <div className="mt-4 text-[#4A5568] dark:text-[#A0AEC0]">
              <p><strong>Email:</strong> <a href="mailto:privacy@costudy.co" className="text-blue-600 dark:text-blue-400 hover:underline">privacy@costudy.co</a></p>
              <p className="mt-2">
                For more information about our privacy practices, see our{" "}
                <Link href="/legal/privacy" className="text-blue-600 dark:text-blue-400 hover:underline">
                  Privacy Policy
                </Link>.
              </p>
            </div>
          </div>

          {/* Related Links */}
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold text-[#2D3748] dark:text-[#E9EEFF] mb-4">Related Policies</h3>
            <div className="flex flex-wrap gap-4">
              <Link href="/legal/privacy" className="text-blue-600 dark:text-blue-400 hover:underline">
                Privacy Policy
              </Link>
              <Link href="/legal/terms" className="text-blue-600 dark:text-blue-400 hover:underline">
                Terms of Service
              </Link>
              <Link href="/legal/dpa" className="text-blue-600 dark:text-blue-400 hover:underline">
                Data Processing Agreement
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
