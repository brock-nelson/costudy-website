import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service - CoStudy",
  description: "CoStudy's Terms of Service for educational institutions, instructors, and students.",
};

export default function TermsOfService() {
  const lastUpdated = "January 2025";

  return (
    <div className="min-h-screen bg-white dark:bg-[#121212]">
      {/* Header */}
      <section className="bg-gradient-to-br from-teal-600 via-cyan-600 to-blue-600 dark:from-teal-800 dark:via-cyan-800 dark:to-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
            <p className="text-xl text-white/90">Last Updated: {lastUpdated}</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">

          {/* Introduction */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-[#6B3DCB] dark:text-[#E9EEFF] mb-4">Agreement to Terms</h2>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed">
              These Terms of Service (&quot;Terms&quot;) govern your access to and use of CoStudy&apos;s educational
              collaboration platform (the &quot;Service&quot;). By accessing or using the Service, you agree to be
              bound by these Terms.
            </p>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed mt-4">
              These Terms apply to educational institutions, instructors, administrators, students, and all
              other users of the Service.
            </p>
          </div>

          {/* Definitions */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-[#6B3DCB] dark:text-[#E9EEFF] mb-4">Definitions</h2>
            <ul className="space-y-3 text-[#4A5568] dark:text-[#A0AEC0]">
              <li><strong>&quot;Institution&quot;</strong> refers to the educational institution (school, university, college) that has entered into an agreement with CoStudy.</li>
              <li><strong>&quot;Instructor&quot;</strong> refers to professors, teachers, or other educational staff authorized by an Institution to use the Service.</li>
              <li><strong>&quot;Student&quot;</strong> refers to individuals enrolled in courses using the Service.</li>
              <li><strong>&quot;User Content&quot;</strong> refers to any content, data, or materials uploaded, submitted, or created by users through the Service.</li>
            </ul>
          </div>

          {/* Institutional Licensing */}
          <div className="mb-12 bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border-l-4 border-blue-500">
            <h2 className="text-3xl font-bold text-[#6B3DCB] dark:text-[#E9EEFF] mb-4">Institutional Licensing</h2>

            <h3 className="text-2xl font-semibold text-[#2D3748] dark:text-[#E9EEFF] mt-6 mb-3">License Grant</h3>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed">
              Subject to these Terms and payment of applicable fees, CoStudy grants the Institution a non-exclusive,
              non-transferable license to access and use the Service for educational purposes during the subscription term.
            </p>

            <h3 className="text-2xl font-semibold text-[#2D3748] dark:text-[#E9EEFF] mt-6 mb-3">Institutional Responsibilities</h3>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed">
              Institutions are responsible for:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-[#4A5568] dark:text-[#A0AEC0]">
              <li>Ensuring authorized users comply with these Terms</li>
              <li>Maintaining the confidentiality of administrative account credentials</li>
              <li>Obtaining necessary consents and authorizations for student data</li>
              <li>Complying with applicable laws and regulations (including FERPA)</li>
              <li>Providing accurate and complete registration information</li>
            </ul>

            <h3 className="text-2xl font-semibold text-[#2D3748] dark:text-[#E9EEFF] mt-6 mb-3">Subscription and Fees</h3>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed">
              Subscription fees, payment terms, and renewal provisions are set forth in the Institution&apos;s
              subscription agreement. Fees are non-refundable except as required by law or specified in writing.
            </p>
          </div>

          {/* User Accounts */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-[#6B3DCB] dark:text-[#E9EEFF] mb-4">User Accounts</h2>

            <h3 className="text-2xl font-semibold text-[#2D3748] dark:text-[#E9EEFF] mt-6 mb-3">Account Creation</h3>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed">
              Access to the Service is typically provided through your Institution. Students under 13 years
              of age may only access the Service through their educational institution with appropriate consent.
            </p>

            <h3 className="text-2xl font-semibold text-[#2D3748] dark:text-[#E9EEFF] mt-6 mb-3">Account Security</h3>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed">
              You are responsible for:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-[#4A5568] dark:text-[#A0AEC0]">
              <li>Maintaining the confidentiality of your account credentials</li>
              <li>All activities that occur under your account</li>
              <li>Notifying us immediately of any unauthorized access</li>
              <li>Using secure passwords and changing them regularly</li>
            </ul>
          </div>

          {/* Acceptable Use */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-[#6B3DCB] dark:text-[#E9EEFF] mb-4">Acceptable Use Policy</h2>

            <h3 className="text-2xl font-semibold text-[#2D3748] dark:text-[#E9EEFF] mt-6 mb-3">Permitted Use</h3>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed">
              You may use the Service only for legitimate educational purposes in accordance with these Terms
              and your Institution&apos;s policies.
            </p>

            <h3 className="text-2xl font-semibold text-[#2D3748] dark:text-[#E9EEFF] mt-6 mb-3">Prohibited Conduct</h3>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed">
              You agree not to:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-[#4A5568] dark:text-[#A0AEC0]">
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe on intellectual property rights</li>
              <li>Upload viruses, malware, or other malicious code</li>
              <li>Attempt to gain unauthorized access to the Service or other systems</li>
              <li>Interfere with or disrupt the Service or servers</li>
              <li>Harass, abuse, or harm other users</li>
              <li>Post false, misleading, or defamatory content</li>
              <li>Use the Service for commercial purposes without authorization</li>
              <li>Scrape, mine, or extract data from the Service</li>
              <li>Reverse engineer or attempt to derive source code</li>
            </ul>
          </div>

          {/* User Content */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-[#6B3DCB] dark:text-[#E9EEFF] mb-4">User Content</h2>

            <h3 className="text-2xl font-semibold text-[#2D3748] dark:text-[#E9EEFF] mt-6 mb-3">Ownership</h3>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed">
              You retain ownership of any intellectual property rights in your User Content. Your Institution
              retains ownership of student education records.
            </p>

            <h3 className="text-2xl font-semibold text-[#2D3748] dark:text-[#E9EEFF] mt-6 mb-3">License to CoStudy</h3>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed">
              By submitting User Content, you grant CoStudy a limited license to use, store, and display your
              content solely for the purpose of providing and improving the Service. This license terminates
              when you or your Institution deletes the content or terminates the subscription.
            </p>

            <h3 className="text-2xl font-semibold text-[#2D3748] dark:text-[#E9EEFF] mt-6 mb-3">Content Responsibility</h3>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed">
              You are solely responsible for your User Content. We do not endorse or take responsibility for
              User Content. We reserve the right to remove content that violates these Terms.
            </p>
          </div>

          {/* Intellectual Property */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-[#6B3DCB] dark:text-[#E9EEFF] mb-4">Intellectual Property Rights</h2>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed">
              The Service, including all software, content, features, and functionality (excluding User Content),
              is owned by CoStudy and protected by United States and international intellectual property laws.
            </p>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed mt-4">
              You may not:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-[#4A5568] dark:text-[#A0AEC0]">
              <li>Copy, modify, or create derivative works of the Service</li>
              <li>Reproduce, redistribute, or resell the Service</li>
              <li>Remove copyright notices or proprietary markings</li>
              <li>Use CoStudy trademarks without written permission</li>
            </ul>
          </div>

          {/* Privacy and Data Protection */}
          <div className="mb-12 bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg border-l-4 border-purple-500">
            <h2 className="text-3xl font-bold text-[#6B3DCB] dark:text-[#E9EEFF] mb-4">Privacy and Data Protection</h2>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed">
              Our collection, use, and protection of personal information is described in our{" "}
              <Link href="/legal/privacy" className="text-purple-600 dark:text-purple-400 hover:underline">
                Privacy Policy
              </Link>. By using the Service, you consent to our privacy practices.
            </p>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed mt-4">
              Institutions requiring a Data Processing Agreement should refer to our{" "}
              <Link href="/legal/dpa" className="text-purple-600 dark:text-purple-400 hover:underline">
                DPA page
              </Link>.
            </p>
          </div>

          {/* Service Availability */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-[#6B3DCB] dark:text-[#E9EEFF] mb-4">Service Availability</h2>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed">
              We strive to provide reliable access to the Service but do not guarantee uninterrupted availability.
              We may:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-[#4A5568] dark:text-[#A0AEC0]">
              <li>Perform scheduled maintenance with advance notice</li>
              <li>Make emergency updates or repairs</li>
              <li>Modify or discontinue features with reasonable notice</li>
              <li>Suspend access for violations of these Terms</li>
            </ul>
          </div>

          {/* Termination */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-[#6B3DCB] dark:text-[#E9EEFF] mb-4">Termination</h2>

            <h3 className="text-2xl font-semibold text-[#2D3748] dark:text-[#E9EEFF] mt-6 mb-3">By Institution</h3>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed">
              Institutions may terminate their subscription according to the terms of their subscription agreement.
            </p>

            <h3 className="text-2xl font-semibold text-[#2D3748] dark:text-[#E9EEFF] mt-6 mb-3">By CoStudy</h3>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed">
              We may suspend or terminate access to the Service:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-[#4A5568] dark:text-[#A0AEC0]">
              <li>For violations of these Terms</li>
              <li>For non-payment of fees</li>
              <li>If required by law</li>
              <li>If the Service is discontinued</li>
            </ul>

            <h3 className="text-2xl font-semibold text-[#2D3748] dark:text-[#E9EEFF] mt-6 mb-3">Effect of Termination</h3>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed">
              Upon termination:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-[#4A5568] dark:text-[#A0AEC0]">
              <li>Access to the Service will cease immediately</li>
              <li>User Content may be deleted according to our data retention policy</li>
              <li>Institutions may request data export within 30 days</li>
              <li>Obligations that by their nature should survive will continue</li>
            </ul>
          </div>

          {/* Disclaimers */}
          <div className="mb-12 bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg border-l-4 border-yellow-500">
            <h2 className="text-3xl font-bold text-[#6B3DCB] dark:text-[#E9EEFF] mb-4">Disclaimers</h2>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed uppercase font-semibold">
              THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND,
              EXPRESS OR IMPLIED.
            </p>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed mt-4">
              To the fullest extent permitted by law, CoStudy disclaims all warranties, including:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-[#4A5568] dark:text-[#A0AEC0]">
              <li>Warranties of merchantability and fitness for a particular purpose</li>
              <li>That the Service will be error-free or uninterrupted</li>
              <li>That defects will be corrected</li>
              <li>That the Service is free of viruses or harmful components</li>
            </ul>
          </div>

          {/* Limitation of Liability */}
          <div className="mb-12 bg-red-50 dark:bg-red-900/20 p-6 rounded-lg border-l-4 border-red-500">
            <h2 className="text-3xl font-bold text-[#6B3DCB] dark:text-[#E9EEFF] mb-4">Limitation of Liability</h2>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed uppercase font-semibold">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, COSTUDY SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL,
              SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES.
            </p>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed mt-4">
              Our total liability for any claims arising from these Terms or the Service shall not exceed
              the amount paid by the Institution for the Service in the 12 months preceding the claim.
            </p>
          </div>

          {/* Indemnification */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-[#6B3DCB] dark:text-[#E9EEFF] mb-4">Indemnification</h2>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed">
              You agree to indemnify and hold harmless CoStudy from any claims, damages, losses, liabilities,
              and expenses arising from:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-[#4A5568] dark:text-[#A0AEC0]">
              <li>Your use of the Service</li>
              <li>Your violation of these Terms</li>
              <li>Your violation of any rights of another party</li>
              <li>Your User Content</li>
            </ul>
          </div>

          {/* Dispute Resolution */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-[#6B3DCB] dark:text-[#E9EEFF] mb-4">Dispute Resolution</h2>

            <h3 className="text-2xl font-semibold text-[#2D3748] dark:text-[#E9EEFF] mt-6 mb-3">Governing Law</h3>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed">
              These Terms are governed by the laws of the United States, without regard to conflict of law provisions.
            </p>

            <h3 className="text-2xl font-semibold text-[#2D3748] dark:text-[#E9EEFF] mt-6 mb-3">Informal Resolution</h3>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed">
              Before filing a claim, you agree to contact us at{" "}
              <a href="mailto:legal@costudy.co" className="text-blue-600 dark:text-blue-400 hover:underline">
                legal@costudy.co
              </a>
              {" "}to attempt informal resolution.
            </p>

            <h3 className="text-2xl font-semibold text-[#2D3748] dark:text-[#E9EEFF] mt-6 mb-3">Arbitration</h3>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed">
              Any disputes not resolved informally shall be resolved through binding arbitration in accordance
              with the American Arbitration Association&apos;s rules. Exceptions include claims for injunctive
              relief or intellectual property disputes.
            </p>
          </div>

          {/* General Provisions */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-[#6B3DCB] dark:text-[#E9EEFF] mb-4">General Provisions</h2>

            <h3 className="text-2xl font-semibold text-[#2D3748] dark:text-[#E9EEFF] mt-6 mb-3">Entire Agreement</h3>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed">
              These Terms, together with your subscription agreement and our Privacy Policy, constitute
              the entire agreement between you and CoStudy.
            </p>

            <h3 className="text-2xl font-semibold text-[#2D3748] dark:text-[#E9EEFF] mt-6 mb-3">Modifications</h3>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed">
              We may modify these Terms at any time. Material changes will be communicated to Institutions
              with 30 days notice. Continued use after changes constitutes acceptance.
            </p>

            <h3 className="text-2xl font-semibold text-[#2D3748] dark:text-[#E9EEFF] mt-6 mb-3">Severability</h3>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed">
              If any provision is found unenforceable, the remaining provisions will continue in effect.
            </p>

            <h3 className="text-2xl font-semibold text-[#2D3748] dark:text-[#E9EEFF] mt-6 mb-3">Waiver</h3>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed">
              Failure to enforce any right or provision does not constitute a waiver of that right.
            </p>

            <h3 className="text-2xl font-semibold text-[#2D3748] dark:text-[#E9EEFF] mt-6 mb-3">Assignment</h3>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed">
              You may not assign these Terms without our written consent. We may assign these Terms without restriction.
            </p>
          </div>

          {/* Contact Information */}
          <div className="mb-12 bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
            <h2 className="text-3xl font-bold text-[#6B3DCB] dark:text-[#E9EEFF] mb-4">Contact Us</h2>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed">
              Questions about these Terms? Contact us at:
            </p>
            <div className="mt-4 text-[#4A5568] dark:text-[#A0AEC0]">
              <p><strong>Email:</strong> <a href="mailto:legal@costudy.co" className="text-blue-600 dark:text-blue-400 hover:underline">legal@costudy.co</a></p>
              <p className="mt-2"><strong>Website:</strong> <a href="https://costudy.co" className="text-blue-600 dark:text-blue-400 hover:underline">https://costudy.co</a></p>
            </div>
          </div>

          {/* Related Links */}
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold text-[#2D3748] dark:text-[#E9EEFF] mb-4">Related Policies</h3>
            <div className="flex flex-wrap gap-4">
              <Link href="/legal/privacy" className="text-blue-600 dark:text-blue-400 hover:underline">
                Privacy Policy
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
