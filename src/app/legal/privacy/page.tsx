import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy - CoStudy",
  description: "CoStudy's Privacy Policy including FERPA and COPPA compliance for educational institutions and student data protection.",
};

export default function PrivacyPolicy() {
  const lastUpdated = "October 16, 2025";

  return (
    <div className="min-h-screen bg-white dark:bg-[#121212]">
      {/* Header */}
      <section className="bg-gradient-to-br from-purple-600 via-blue-600 to-teal-600 dark:from-purple-800 dark:via-blue-800 dark:to-teal-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
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
              CoStudy (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to protecting the privacy and security of
              student data. This Privacy Policy explains how we collect, use, disclose, and safeguard information
              when you use our educational collaboration platform.
            </p>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed mt-4">
              We comply with the Family Educational Rights and Privacy Act (FERPA), the Children&apos;s Online
              Privacy Protection Act (COPPA), and other applicable data protection laws.
            </p>
          </div>

          {/* FERPA Compliance */}
          <div className="mb-12 bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border-l-4 border-blue-500">
            <h2 className="text-3xl font-bold text-[#6B3DCB] dark:text-[#E9EEFF] mb-4">FERPA Compliance</h2>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed">
              CoStudy acts as a &quot;school official&quot; with legitimate educational interests under FERPA when providing
              services to educational institutions. We:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2 text-[#4A5568] dark:text-[#A0AEC0]">
              <li>Only access student education records as necessary to provide our services</li>
              <li>Do not use student education records for any purpose other than providing our services</li>
              <li>Do not disclose student education records to third parties without institutional authorization</li>
              <li>Maintain appropriate administrative, technical, and physical safeguards</li>
              <li>Comply with institutional policies regarding data destruction upon request</li>
            </ul>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed mt-4">
              For more information about FERPA, visit{" "}
              <a href="https://www2.ed.gov/policy/gen/guid/fpco/ferpa/" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">
                https://www2.ed.gov/policy/gen/guid/fpco/ferpa/
              </a>
            </p>
          </div>

          {/* COPPA Compliance */}
          <div className="mb-12 bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg border-l-4 border-purple-500">
            <h2 className="text-3xl font-bold text-[#6B3DCB] dark:text-[#E9EEFF] mb-4">COPPA Compliance</h2>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed">
              We comply with the Children&apos;s Online Privacy Protection Act (COPPA) for users under 13 years of age:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2 text-[#4A5568] dark:text-[#A0AEC0]">
              <li>We only collect information from children under 13 at the direction of educational institutions</li>
              <li>We obtain consent from schools acting in loco parentis for educational purposes</li>
              <li>Parents may review their child&apos;s personal information through their educational institution</li>
              <li>Parents may request deletion of their child&apos;s information through their school</li>
              <li>We do not condition participation on disclosure of more information than reasonably necessary</li>
            </ul>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed mt-4">
              For more information about COPPA, visit{" "}
              <a href="https://www.ftc.gov/legal-library/browse/rules/childrens-online-privacy-protection-rule-coppa" className="text-purple-600 dark:text-purple-400 hover:underline" target="_blank" rel="noopener noreferrer">
                FTC COPPA Guidelines
              </a>
            </p>
          </div>

          {/* Information We Collect */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-[#6B3DCB] dark:text-[#E9EEFF] mb-4">Information We Collect</h2>

            <h3 className="text-2xl font-semibold text-[#2D3748] dark:text-[#E9EEFF] mt-6 mb-3">Student Information</h3>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed">
              We collect information provided by educational institutions, including:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-[#4A5568] dark:text-[#A0AEC0]">
              <li>Name and email address</li>
              <li>Student ID or unique identifier</li>
              <li>Course enrollment information</li>
              <li>Team participation and collaboration data</li>
              <li>Peer feedback and assessments</li>
              <li>Learning activity and progress information</li>
            </ul>

            <h3 className="text-2xl font-semibold text-[#2D3748] dark:text-[#E9EEFF] mt-6 mb-3">Educator Information</h3>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed">
              For instructors and administrators, we collect:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-[#4A5568] dark:text-[#A0AEC0]">
              <li>Name and contact information</li>
              <li>Institutional affiliation</li>
              <li>Course and class management data</li>
              <li>Usage and analytics data</li>
            </ul>

            <h3 className="text-2xl font-semibold text-[#2D3748] dark:text-[#E9EEFF] mt-6 mb-3">Automatically Collected Information</h3>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed">
              We automatically collect:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-[#4A5568] dark:text-[#A0AEC0]">
              <li>Device and browser information</li>
              <li>IP address and location data</li>
              <li>Usage patterns and analytics</li>
              <li>Cookies and similar technologies (see our <Link href="/legal/cookies" className="text-blue-600 dark:text-blue-400 hover:underline">Cookie Policy</Link>)</li>
            </ul>
          </div>

          {/* How We Use Information */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-[#6B3DCB] dark:text-[#E9EEFF] mb-4">How We Use Information</h2>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed">
              We use collected information solely for educational purposes:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2 text-[#4A5568] dark:text-[#A0AEC0]">
              <li>Providing and improving our educational services</li>
              <li>Facilitating student collaboration and peer feedback</li>
              <li>Generating analytics and reports for educators</li>
              <li>Communicating with students and educators about the service</li>
              <li>Ensuring platform security and preventing fraud</li>
              <li>Complying with legal obligations</li>
            </ul>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed mt-4 font-semibold">
              We do not use student data for advertising or marketing purposes.
            </p>
          </div>

          {/* Information Sharing */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-[#6B3DCB] dark:text-[#E9EEFF] mb-4">Information Sharing and Disclosure</h2>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed">
              We do not sell, rent, or trade student information. We may share information only in these limited circumstances:
            </p>

            <h3 className="text-2xl font-semibold text-[#2D3748] dark:text-[#E9EEFF] mt-6 mb-3">With Educational Institutions</h3>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed">
              We share student data with the educational institution that provided access to our services.
            </p>

            <h3 className="text-2xl font-semibold text-[#2D3748] dark:text-[#E9EEFF] mt-6 mb-3">With Service Providers</h3>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed">
              We work with trusted service providers who assist in delivering our services. These providers are
              contractually obligated to protect student data and use it only for providing services to us.
              See our <Link href="/legal/subprocessors" className="text-blue-600 dark:text-blue-400 hover:underline">Subprocessor List</Link> for details.
            </p>

            <h3 className="text-2xl font-semibold text-[#2D3748] dark:text-[#E9EEFF] mt-6 mb-3">Legal Requirements</h3>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed">
              We may disclose information when required by law, such as in response to valid legal process or to protect rights and safety.
            </p>
          </div>

          {/* Data Security */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-[#6B3DCB] dark:text-[#E9EEFF] mb-4">Data Security</h2>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed">
              We implement industry-standard security measures to protect student data:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2 text-[#4A5568] dark:text-[#A0AEC0]">
              <li>Encryption of data in transit and at rest</li>
              <li>Regular security assessments and penetration testing</li>
              <li>Access controls and authentication measures</li>
              <li>Employee training on data protection</li>
              <li>Incident response and breach notification procedures</li>
              <li>Regular backups and disaster recovery planning</li>
            </ul>
          </div>

          {/* Data Retention */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-[#6B3DCB] dark:text-[#E9EEFF] mb-4">Data Retention and Deletion</h2>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed">
              We retain student data only as long as necessary to provide our services or as required by law:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2 text-[#4A5568] dark:text-[#A0AEC0]">
              <li>Active student data is retained while the educational institution maintains an active account</li>
              <li>Upon request, we will delete student data within 30 days</li>
              <li>We may retain de-identified data for research and product improvement</li>
              <li>Backup copies are deleted according to our standard retention schedule</li>
            </ul>
          </div>

          {/* Student and Parent Rights */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-[#6B3DCB] dark:text-[#E9EEFF] mb-4">Student and Parent Rights</h2>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed">
              Students and parents have the following rights regarding personal information:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2 text-[#4A5568] dark:text-[#A0AEC0]">
              <li><strong>Access:</strong> Request access to personal information we hold</li>
              <li><strong>Correction:</strong> Request correction of inaccurate information</li>
              <li><strong>Deletion:</strong> Request deletion of personal information</li>
              <li><strong>Data Portability:</strong> Request a copy of data in a portable format</li>
              <li><strong>Opt-out:</strong> Opt-out of certain data processing activities</li>
            </ul>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed mt-4">
              To exercise these rights, please contact your educational institution or reach us at{" "}
              <a href="mailto:privacy@costudy.co" className="text-blue-600 dark:text-blue-400 hover:underline">
                privacy@costudy.co
              </a>
            </p>
          </div>

          {/* International Data Transfers */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-[#6B3DCB] dark:text-[#E9EEFF] mb-4">International Data Transfers</h2>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed">
              Student data is primarily stored and processed in the United States. If you are accessing our
              services from outside the United States, please be aware that your information may be transferred
              to, stored, and processed in the United States. We ensure appropriate safeguards are in place for
              international data transfers.
            </p>
          </div>

          {/* Changes to Privacy Policy */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-[#6B3DCB] dark:text-[#E9EEFF] mb-4">Changes to This Privacy Policy</h2>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify educational institutions of
              material changes and provide updated notice before the changes take effect. Continued use of our
              services after notice constitutes acceptance of the updated policy.
            </p>
          </div>

          {/* Contact Information */}
          <div className="mb-12 bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
            <h2 className="text-3xl font-bold text-[#6B3DCB] dark:text-[#E9EEFF] mb-4">Contact Us</h2>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed">
              If you have questions or concerns about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="mt-4 text-[#4A5568] dark:text-[#A0AEC0]">
              <p><strong>Email:</strong> <a href="mailto:privacy@costudy.co" className="text-blue-600 dark:text-blue-400 hover:underline">privacy@costudy.co</a></p>
              <p className="mt-2"><strong>Address:</strong> CoStudy, Inc.</p>
              <p className="mt-2">
                For Data Processing Agreement inquiries, visit our{" "}
                <Link href="/legal/dpa" className="text-blue-600 dark:text-blue-400 hover:underline">DPA page</Link>.
              </p>
            </div>
          </div>

          {/* Related Links */}
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold text-[#2D3748] dark:text-[#E9EEFF] mb-4">Related Policies</h3>
            <div className="flex flex-wrap gap-4">
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
