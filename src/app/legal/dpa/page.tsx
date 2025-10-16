import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Data Processing Agreement - CoStudy",
  description: "Data Processing Agreement (DPA) template for educational institutions using CoStudy.",
};

export default function DataProcessingAgreement() {
  const lastUpdated = "October 16, 2025";

  return (
    <div className="min-h-screen bg-white dark:bg-[#121212]">
      {/* Header */}
      <section className="bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-600 dark:from-indigo-800 dark:via-blue-800 dark:to-cyan-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Data Processing Agreement</h1>
            <p className="text-xl text-white/90">Last Updated: {lastUpdated}</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">

          {/* Introduction */}
          <div className="mb-12 bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border-l-4 border-blue-500">
            <h2 className="text-3xl font-bold text-[#6B3DCB] dark:text-[#E9EEFF] mb-4">Introduction</h2>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed">
              This Data Processing Agreement (&quot;DPA&quot;) forms part of the agreement between CoStudy, Inc.
              (&quot;Processor&quot; or &quot;CoStudy&quot;) and the educational institution (&quot;Controller&quot;
              or &quot;Institution&quot;) for the provision of educational collaboration services.
            </p>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed mt-4">
              This DPA reflects the parties&apos; agreement regarding the processing of Student Personal Data
              in compliance with applicable data protection laws, including FERPA, COPPA, and other relevant
              privacy regulations.
            </p>
          </div>

          {/* Request DPA CTA */}
          <div className="mb-12 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 p-8 rounded-lg border border-purple-200 dark:border-purple-700">
            <h2 className="text-3xl font-bold text-[#6B3DCB] dark:text-[#E9EEFF] mb-4">Request a Signed DPA</h2>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed mb-6">
              Educational institutions can request a fully executed Data Processing Agreement customized for
              their specific needs. Our standard DPA includes all necessary provisions for FERPA compliance,
              data security, and regulatory requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact?subject=DPA+Request"
                className="inline-flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Request DPA
              </Link>
              <a
                href="mailto:legal@costudy.co?subject=DPA%20Request"
                className="inline-flex items-center justify-center gap-2 bg-white dark:bg-gray-800 text-purple-600 dark:text-purple-400 px-6 py-3 rounded-lg font-semibold border-2 border-purple-600 dark:border-purple-400 hover:bg-purple-50 dark:hover:bg-gray-700 transition-colors"
              >
                Email Legal Team
              </a>
            </div>
          </div>

          {/* Definitions */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-[#6B3DCB] dark:text-[#E9EEFF] mb-4">1. Definitions</h2>
            <div className="space-y-4 text-[#4A5568] dark:text-[#A0AEC0]">
              <div>
                <p className="font-semibold">&quot;Student Personal Data&quot;</p>
                <p className="ml-4 leading-relaxed">
                  means any personal information or education records relating to students that is provided
                  by the Controller to the Processor for processing under the Services, including but not
                  limited to student names, email addresses, academic records, and usage data.
                </p>
              </div>
              <div>
                <p className="font-semibold">&quot;Services&quot;</p>
                <p className="ml-4 leading-relaxed">
                  means the educational collaboration platform and related services provided by CoStudy as
                  described in the subscription agreement.
                </p>
              </div>
              <div>
                <p className="font-semibold">&quot;Data Protection Laws&quot;</p>
                <p className="ml-4 leading-relaxed">
                  means all applicable laws and regulations relating to privacy and data protection, including
                  FERPA, COPPA, and state privacy laws.
                </p>
              </div>
              <div>
                <p className="font-semibold">&quot;Subprocessor&quot;</p>
                <p className="ml-4 leading-relaxed">
                  means any third party engaged by CoStudy to process Student Personal Data on behalf of
                  the Controller.
                </p>
              </div>
            </div>
          </div>

          {/* Scope and Roles */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-[#6B3DCB] dark:text-[#E9EEFF] mb-4">2. Scope of Processing and Roles</h2>

            <h3 className="text-2xl font-semibold text-[#2D3748] dark:text-[#E9EEFF] mt-6 mb-3">2.1 Processing Activities</h3>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed">
              CoStudy will process Student Personal Data only for the following purposes:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-[#4A5568] dark:text-[#A0AEC0]">
              <li>Providing the Services as described in the subscription agreement</li>
              <li>Maintaining and supporting the platform</li>
              <li>Ensuring security and preventing fraud</li>
              <li>Complying with legal obligations</li>
              <li>Other purposes explicitly authorized by the Controller in writing</li>
            </ul>

            <h3 className="text-2xl font-semibold text-[#2D3748] dark:text-[#E9EEFF] mt-6 mb-3">2.2 Nature and Purpose</h3>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed">
              The processing is necessary to provide educational collaboration tools including team formation,
              peer feedback, and learning analytics.
            </p>

            <h3 className="text-2xl font-semibold text-[#2D3748] dark:text-[#E9EEFF] mt-6 mb-3">2.3 Duration</h3>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed">
              Processing will continue for the duration of the subscription term and a reasonable period
              thereafter as necessary for data deletion or return.
            </p>

            <h3 className="text-2xl font-semibold text-[#2D3748] dark:text-[#E9EEFF] mt-6 mb-3">2.4 Types of Data</h3>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed">
              Student Personal Data may include:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-[#4A5568] dark:text-[#A0AEC0]">
              <li>Identification information (names, email addresses, student IDs)</li>
              <li>Academic information (course enrollment, assignments, grades)</li>
              <li>Collaboration data (team membership, peer feedback, comments)</li>
              <li>Usage data (login times, feature usage, engagement metrics)</li>
            </ul>
          </div>

          {/* Processor Obligations */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-[#6B3DCB] dark:text-[#E9EEFF] mb-4">3. CoStudy Obligations</h2>

            <h3 className="text-2xl font-semibold text-[#2D3748] dark:text-[#E9EEFF] mt-6 mb-3">3.1 Processing Instructions</h3>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed">
              CoStudy shall process Student Personal Data only on documented instructions from the Controller,
              unless required to do so by applicable law.
            </p>

            <h3 className="text-2xl font-semibold text-[#2D3748] dark:text-[#E9EEFF] mt-6 mb-3">3.2 Confidentiality</h3>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed">
              CoStudy shall ensure that all personnel authorized to process Student Personal Data are bound
              by confidentiality obligations.
            </p>

            <h3 className="text-2xl font-semibold text-[#2D3748] dark:text-[#E9EEFF] mt-6 mb-3">3.3 Security Measures</h3>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed">
              CoStudy implements appropriate technical and organizational measures to protect Student Personal
              Data, including:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-[#4A5568] dark:text-[#A0AEC0]">
              <li>Encryption of data in transit and at rest</li>
              <li>Access controls and authentication</li>
              <li>Regular security assessments and audits</li>
              <li>Incident response procedures</li>
              <li>Employee training on data protection</li>
              <li>Secure data centers and infrastructure</li>
            </ul>

            <h3 className="text-2xl font-semibold text-[#2D3748] dark:text-[#E9EEFF] mt-6 mb-3">3.4 Subprocessors</h3>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed">
              CoStudy may engage Subprocessors to assist in providing the Services. Current Subprocessors
              are listed on our{" "}
              <Link href="/legal/subprocessors" className="text-blue-600 dark:text-blue-400 hover:underline">
                Subprocessor page
              </Link>. CoStudy will:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-[#4A5568] dark:text-[#A0AEC0]">
              <li>Conduct due diligence on all Subprocessors</li>
              <li>Enter into written agreements with Subprocessors imposing data protection obligations</li>
              <li>Provide 30 days notice before adding new Subprocessors</li>
              <li>Allow Controller to object to new Subprocessors</li>
            </ul>

            <h3 className="text-2xl font-semibold text-[#2D3748] dark:text-[#E9EEFF] mt-6 mb-3">3.5 Data Subject Rights</h3>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed">
              CoStudy will assist the Controller in responding to requests from students or parents exercising
              their rights under Data Protection Laws, including rights to access, correction, deletion, and
              data portability.
            </p>

            <h3 className="text-2xl font-semibold text-[#2D3748] dark:text-[#E9EEFF] mt-6 mb-3">3.6 Data Breach Notification</h3>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed">
              CoStudy will notify the Controller without undue delay (and in any case within 72 hours) upon
              becoming aware of any data breach affecting Student Personal Data.
            </p>

            <h3 className="text-2xl font-semibold text-[#2D3748] dark:text-[#E9EEFF] mt-6 mb-3">3.7 Data Protection Impact Assessment</h3>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed">
              CoStudy will provide reasonable assistance to the Controller in conducting data protection
              impact assessments if required by Data Protection Laws.
            </p>
          </div>

          {/* Controller Obligations */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-[#6B3DCB] dark:text-[#E9EEFF] mb-4">4. Controller Obligations</h2>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed">
              The Controller shall:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2 text-[#4A5568] dark:text-[#A0AEC0]">
              <li>Ensure it has the legal basis for providing Student Personal Data to CoStudy</li>
              <li>Obtain all necessary consents and authorizations</li>
              <li>Provide clear and complete processing instructions</li>
              <li>Comply with all applicable Data Protection Laws</li>
              <li>Respond to data subject requests as required by law</li>
            </ul>
          </div>

          {/* Data Return and Deletion */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-[#6B3DCB] dark:text-[#E9EEFF] mb-4">5. Data Return and Deletion</h2>

            <h3 className="text-2xl font-semibold text-[#2D3748] dark:text-[#E9EEFF] mt-6 mb-3">5.1 Return of Data</h3>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed">
              Upon termination of the Services, CoStudy will, at the Controller&apos;s option:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-[#4A5568] dark:text-[#A0AEC0]">
              <li>Return all Student Personal Data to the Controller in a commonly used format</li>
              <li>Securely delete all Student Personal Data</li>
            </ul>

            <h3 className="text-2xl font-semibold text-[#2D3748] dark:text-[#E9EEFF] mt-6 mb-3">5.2 Deletion Timeline</h3>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed">
              Data return or deletion will be completed within 30 days of termination, unless a longer
              retention period is required by law.
            </p>

            <h3 className="text-2xl font-semibold text-[#2D3748] dark:text-[#E9EEFF] mt-6 mb-3">5.3 Certification</h3>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed">
              Upon request, CoStudy will provide written certification of data deletion.
            </p>
          </div>

          {/* Audits and Compliance */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-[#6B3DCB] dark:text-[#E9EEFF] mb-4">6. Audits and Compliance</h2>

            <h3 className="text-2xl font-semibold text-[#2D3748] dark:text-[#E9EEFF] mt-6 mb-3">6.1 Audit Rights</h3>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed">
              CoStudy will allow the Controller to audit compliance with this DPA, subject to:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-[#4A5568] dark:text-[#A0AEC0]">
              <li>Reasonable advance notice (at least 30 days)</li>
              <li>Execution of a confidentiality agreement</li>
              <li>Audits during normal business hours</li>
              <li>Limitation to once per year unless there is a suspected breach</li>
            </ul>

            <h3 className="text-2xl font-semibold text-[#2D3748] dark:text-[#E9EEFF] mt-6 mb-3">6.2 Security Certifications</h3>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed">
              CoStudy maintains industry-standard security certifications and will provide copies of
              relevant audit reports upon request.
            </p>
          </div>

          {/* International Data Transfers */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-[#6B3DCB] dark:text-[#E9EEFF] mb-4">7. International Data Transfers</h2>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed">
              Student Personal Data is primarily stored and processed in the United States. If data is
              transferred outside the United States, CoStudy will ensure appropriate safeguards are in place,
              such as:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-[#4A5568] dark:text-[#A0AEC0]">
              <li>Standard Contractual Clauses</li>
              <li>Adequacy decisions</li>
              <li>Other approved transfer mechanisms</li>
            </ul>
          </div>

          {/* Liability and Indemnification */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-[#6B3DCB] dark:text-[#E9EEFF] mb-4">8. Liability and Indemnification</h2>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed">
              Each party&apos;s liability under this DPA is subject to the limitation of liability provisions
              in the subscription agreement. CoStudy will indemnify the Controller against claims arising
              from CoStudy&apos;s breach of this DPA.
            </p>
          </div>

          {/* Term and Termination */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-[#6B3DCB] dark:text-[#E9EEFF] mb-4">9. Term and Termination</h2>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed">
              This DPA will remain in effect for the duration of the subscription agreement. Upon termination,
              the data return and deletion provisions will apply.
            </p>
          </div>

          {/* Governing Law */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-[#6B3DCB] dark:text-[#E9EEFF] mb-4">10. Governing Law</h2>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed">
              This DPA is governed by the same law as the subscription agreement.
            </p>
          </div>

          {/* Contact Information */}
          <div className="mb-12 bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
            <h2 className="text-3xl font-bold text-[#6B3DCB] dark:text-[#E9EEFF] mb-4">Contact Information</h2>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed mb-4">
              For questions about this DPA or to request a signed agreement:
            </p>
            <div className="space-y-2 text-[#4A5568] dark:text-[#A0AEC0]">
              <p><strong>Email:</strong> <a href="mailto:legal@costudy.co" className="text-blue-600 dark:text-blue-400 hover:underline">legal@costudy.co</a></p>
              <p><strong>Privacy Questions:</strong> <a href="mailto:privacy@costudy.co" className="text-blue-600 dark:text-blue-400 hover:underline">privacy@costudy.co</a></p>
              <p><strong>Data Security:</strong> <a href="mailto:security@costudy.co" className="text-blue-600 dark:text-blue-400 hover:underline">security@costudy.co</a></p>
            </div>
          </div>

          {/* Subprocessors Link */}
          <div className="mb-12 bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-lg border-l-4 border-indigo-500">
            <h2 className="text-3xl font-bold text-[#6B3DCB] dark:text-[#E9EEFF] mb-4">Subprocessors</h2>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed">
              View our current list of subprocessors and third-party service providers who may process
              Student Personal Data on our behalf.
            </p>
            <Link
              href="/legal/subprocessors"
              className="inline-flex items-center gap-2 mt-4 text-indigo-600 dark:text-indigo-400 hover:underline font-semibold"
            >
              View Subprocessor List
              <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
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
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
