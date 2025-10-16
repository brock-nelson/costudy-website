import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Subprocessor List - CoStudy",
  description: "List of subprocessors and third-party service providers that CoStudy uses to deliver educational services.",
};

export default function SubprocessorList() {
  const lastUpdated = "October 16, 2025";

  return (
    <div className="min-h-screen bg-white dark:bg-[#121212]">
      {/* Header */}
      <section className="bg-gradient-to-br from-green-600 via-teal-600 to-blue-600 dark:from-green-800 dark:via-teal-800 dark:to-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Subprocessor List</h1>
            <p className="text-xl text-white/90">Last Updated: {lastUpdated}</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">

          {/* Introduction */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-[#6B3DCB] dark:text-[#E9EEFF] mb-4">Introduction</h2>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed">
              CoStudy engages certain third-party service providers (&quot;Subprocessors&quot;) to assist in delivering
              our educational services. This list identifies all Subprocessors that may process customer data,
              including student information, on our behalf.
            </p>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed mt-4">
              All Subprocessors are contractually bound to maintain appropriate security measures and comply with
              applicable data protection laws, including FERPA and COPPA requirements.
            </p>
          </div>

          {/* Notification of Changes */}
          <div className="mb-12 bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border-l-4 border-blue-500">
            <h2 className="text-3xl font-bold text-[#6B3DCB] dark:text-[#E9EEFF] mb-4">Notification of Changes</h2>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed">
              We will notify educational institutions at least 30 days in advance of any addition or replacement
              of Subprocessors. Institutions may object to a new Subprocessor on reasonable grounds relating to
              data protection within 10 days of notification.
            </p>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed mt-4">
              To receive notifications, please ensure your contact information is up to date by emailing{" "}
              <a href="mailto:privacy@costudy.co" className="text-blue-600 dark:text-blue-400 hover:underline">
                privacy@costudy.co
              </a>
            </p>
          </div>

          {/* Current Subprocessors */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-[#6B3DCB] dark:text-[#E9EEFF] mb-4">Current Subprocessors</h2>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed mb-6">
              The following table lists all Subprocessors currently engaged by CoStudy:
            </p>

            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-700">
                <caption className="sr-only">List of CoStudy Subprocessors</caption>
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-800">
                    <th scope="col" className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-left text-sm font-semibold text-[#2D3748] dark:text-[#E9EEFF]">
                      Subprocessor
                    </th>
                    <th scope="col" className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-left text-sm font-semibold text-[#2D3748] dark:text-[#E9EEFF]">
                      Purpose
                    </th>
                    <th scope="col" className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-left text-sm font-semibold text-[#2D3748] dark:text-[#E9EEFF]">
                      Location
                    </th>
                    <th scope="col" className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-left text-sm font-semibold text-[#2D3748] dark:text-[#E9EEFF]">
                      Data Categories
                    </th>
                  </tr>
                </thead>
                <tbody className="text-[#4A5568] dark:text-[#A0AEC0]">
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">
                      <strong>Vercel Inc.</strong>
                      <br />
                      <a href="https://vercel.com" className="text-blue-600 dark:text-blue-400 hover:underline text-sm" target="_blank" rel="noopener noreferrer">
                        vercel.com
                      </a>
                    </td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">
                      Cloud hosting and content delivery network
                    </td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">
                      United States
                    </td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">
                      User account data, usage logs
                    </td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-gray-900/50">
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">
                      <strong>Supabase Inc.</strong>
                      <br />
                      <a href="https://supabase.com" className="text-blue-600 dark:text-blue-400 hover:underline text-sm" target="_blank" rel="noopener noreferrer">
                        supabase.com
                      </a>
                    </td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">
                      Database and authentication services
                    </td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">
                      United States
                    </td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">
                      Student data, course information, authentication credentials
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">
                      <strong>SendGrid (Twilio Inc.)</strong>
                      <br />
                      <a href="https://sendgrid.com" className="text-blue-600 dark:text-blue-400 hover:underline text-sm" target="_blank" rel="noopener noreferrer">
                        sendgrid.com
                      </a>
                    </td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">
                      Transactional email delivery
                    </td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">
                      United States
                    </td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">
                      Email addresses, notification content
                    </td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-gray-900/50">
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">
                      <strong>Google Cloud Platform</strong>
                      <br />
                      <a href="https://cloud.google.com" className="text-blue-600 dark:text-blue-400 hover:underline text-sm" target="_blank" rel="noopener noreferrer">
                        cloud.google.com
                      </a>
                    </td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">
                      Cloud infrastructure and analytics
                    </td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">
                      United States
                    </td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">
                      Usage analytics, system logs
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">
                      <strong>Stripe, Inc.</strong>
                      <br />
                      <a href="https://stripe.com" className="text-blue-600 dark:text-blue-400 hover:underline text-sm" target="_blank" rel="noopener noreferrer">
                        stripe.com
                      </a>
                    </td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">
                      Payment processing
                    </td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">
                      United States
                    </td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">
                      Institution billing information, payment data
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Security and Compliance */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-[#6B3DCB] dark:text-[#E9EEFF] mb-4">Security and Compliance</h2>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed">
              All Subprocessors listed above:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2 text-[#4A5568] dark:text-[#A0AEC0]">
              <li>Are contractually bound to maintain appropriate security measures</li>
              <li>Have agreed to process data only as instructed by CoStudy</li>
              <li>Maintain industry-standard certifications (SOC 2, ISO 27001, or equivalent)</li>
              <li>Comply with applicable data protection laws including FERPA and COPPA</li>
              <li>Implement encryption for data in transit and at rest</li>
              <li>Undergo regular security assessments and audits</li>
            </ul>
          </div>

          {/* Data Processing Agreements */}
          <div className="mb-12 bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg border-l-4 border-purple-500">
            <h2 className="text-3xl font-bold text-[#6B3DCB] dark:text-[#E9EEFF] mb-4">Data Processing Agreements</h2>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed">
              CoStudy has entered into Data Processing Agreements (DPAs) or equivalent contracts with all
              Subprocessors to ensure they meet our data protection standards. Upon request, we can provide
              copies of relevant DPA provisions to educational institutions.
            </p>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed mt-4">
              For more information about our data processing practices, please review our{" "}
              <Link href="/legal/dpa" className="text-purple-600 dark:text-purple-400 hover:underline">
                Data Processing Agreement
              </Link>.
            </p>
          </div>

          {/* International Data Transfers */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-[#6B3DCB] dark:text-[#E9EEFF] mb-4">International Data Transfers</h2>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed">
              All current Subprocessors are based in the United States and process data within U.S. data centers.
              If we engage Subprocessors outside the United States in the future, we will:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2 text-[#4A5568] dark:text-[#A0AEC0]">
              <li>Notify educational institutions in advance</li>
              <li>Ensure appropriate safeguards are in place (Standard Contractual Clauses, etc.)</li>
              <li>Update this list with the Subprocessor&apos;s location</li>
              <li>Obtain any necessary consent from institutions</li>
            </ul>
          </div>

          {/* Requesting Updates */}
          <div className="mb-12 bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
            <h2 className="text-3xl font-bold text-[#6B3DCB] dark:text-[#E9EEFF] mb-4">Requesting Updates or Information</h2>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed">
              If you have questions about our Subprocessors or wish to receive notifications about changes to this
              list, please contact us:
            </p>
            <div className="mt-4 text-[#4A5568] dark:text-[#A0AEC0]">
              <p>
                <strong>Email:</strong>{" "}
                <a href="mailto:privacy@costudy.co" className="text-blue-600 dark:text-blue-400 hover:underline">
                  privacy@costudy.co
                </a>
              </p>
              <p className="mt-2">
                <strong>Subject:</strong> Subprocessor List Inquiry
              </p>
            </div>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed mt-4">
              We will respond to inquiries within 10 business days.
            </p>
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
              <Link href="/legal/cookies" className="text-blue-600 dark:text-blue-400 hover:underline">
                Cookie Policy
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
