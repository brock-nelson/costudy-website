import { Metadata } from "next";
import Link from "next/link";
import CertificationBadge from "@/components/security/CertificationBadge";
import SecuritySection from "@/components/security/SecuritySection";

export const metadata: Metadata = {
  title: "Security & Compliance - CoStudy",
  description: "Learn about CoStudy's commitment to security, compliance, and data protection. SOC 2 Type II certified, FERPA and COPPA compliant.",
};

// Schema.org structured data for certifications
const certificationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "CoStudy",
  "url": "https://costudy.co",
  "certification": [
    {
      "@type": "Certification",
      "name": "SOC 2 Type II",
      "certificationIdentification": "SOC 2 Type II Certified",
      "about": "System and Organization Controls 2 Type II certification for security, availability, and confidentiality"
    },
    {
      "@type": "Certification",
      "name": "FERPA Compliance",
      "certificationIdentification": "Family Educational Rights and Privacy Act Compliant",
      "about": "Full compliance with FERPA regulations for student data privacy"
    },
    {
      "@type": "Certification",
      "name": "COPPA Compliance",
      "certificationIdentification": "Children's Online Privacy Protection Act Compliant",
      "about": "Compliant with COPPA requirements for protecting children's privacy online"
    }
  ]
};

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#121212]">
      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(certificationSchema) }}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-800 dark:via-indigo-800 dark:to-purple-800 text-white py-20 overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-12 left-12 text-5xl opacity-20 animate-float">🔒</div>
          <div className="absolute top-20 right-16 text-4xl opacity-20 animate-pulse">🛡️</div>
          <div className="absolute bottom-16 left-1/4 text-4xl opacity-20 animate-bounce">✅</div>
          <div className="absolute bottom-20 right-1/3 text-3xl opacity-20 animate-spin-slow">🔐</div>

          {/* Gradient orbs */}
          <div className="absolute -top-10 -left-10 w-64 h-64 bg-gradient-to-br from-cyan-400/20 to-transparent rounded-full blur-3xl animate-float-delayed"></div>
          <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-gradient-to-tl from-purple-400/20 to-transparent rounded-full blur-3xl animate-float"></div>

          {/* Dot pattern */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)`,
            backgroundSize: '30px 30px'
          }}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-4">
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30 animate-pulse-slow">
                <span className="text-sm font-semibold">Enterprise-Grade Security & Compliance</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 drop-shadow-lg">
              Security & Compliance
            </h1>
            <p className="text-xl md:text-2xl leading-relaxed drop-shadow-md text-white/95 mb-8">
              Your trust is our priority. We maintain the highest standards of security
              and compliance to protect student data and meet institutional requirements.
            </p>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-[#6B3DCB] dark:text-[#E9EEFF]">
            Certifications & Standards
          </h2>
          <p className="text-center text-lg text-[#4A5568] dark:text-[#A0AEC0] mb-12 max-w-3xl mx-auto">
            CoStudy meets and exceeds industry standards for data security and privacy compliance.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <CertificationBadge
              name="SOC 2 Type II"
              description="Independently audited for security, availability, and confidentiality"
              icon="🏆"
            />
            <CertificationBadge
              name="FERPA Compliant"
              description="Full compliance with student data privacy regulations"
              icon="🎓"
            />
            <CertificationBadge
              name="COPPA Compliant"
              description="Protecting children's privacy online"
              icon="👶"
            />
            <CertificationBadge
              name="GDPR Ready"
              description="European data protection standards"
              icon="🇪🇺"
            />
          </div>
        </div>
      </section>

      {/* Data Security Section */}
      <section className="bg-[#EDE7F9] dark:bg-[#1a1a1a] py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <SecuritySection
              title="Data Security"
              icon="🔐"
              items={[
                {
                  title: "AES-256 Encryption at Rest",
                  description: "All data is encrypted using industry-standard AES-256 encryption when stored"
                },
                {
                  title: "TLS 1.3 in Transit",
                  description: "All data transmission is secured with the latest TLS 1.3 protocol"
                },
                {
                  title: "Database Encryption",
                  description: "Multi-layer encryption for all database operations and backups"
                },
                {
                  title: "Secure API Endpoints",
                  description: "All API endpoints are authenticated and rate-limited for security"
                },
                {
                  title: "Authentication Methods",
                  description: "Support for SSO, SAML, and multi-factor authentication"
                }
              ]}
            />
          </div>
        </div>
      </section>

      {/* Infrastructure Security Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <SecuritySection
            title="Infrastructure Security"
            icon="🏗️"
            items={[
              {
                title: "Enterprise Cloud Infrastructure",
                description: "Hosted on tier-1 cloud providers with industry-leading security"
              },
              {
                title: "DDoS Protection",
                description: "Advanced protection against distributed denial-of-service attacks"
              },
              {
                title: "Intrusion Detection",
                description: "24/7 automated monitoring for suspicious activity"
              },
              {
                title: "Regular Security Audits",
                description: "Quarterly third-party security assessments and penetration testing"
              },
              {
                title: "Vulnerability Scanning",
                description: "Continuous automated scanning and patching of vulnerabilities"
              }
            ]}
          />
        </div>
      </section>

      {/* Access Controls Section */}
      <section className="bg-[#EDE7F9] dark:bg-[#1a1a1a] py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <SecuritySection
              title="Access Controls"
              icon="🔑"
              items={[
                {
                  title: "Role-Based Access Control (RBAC)",
                  description: "Granular permissions ensure users only access what they need"
                },
                {
                  title: "SSO/SAML Support",
                  description: "Seamless integration with your institution's authentication system"
                },
                {
                  title: "Multi-Factor Authentication",
                  description: "Optional MFA for enhanced account security"
                },
                {
                  title: "Session Management",
                  description: "Automatic session timeouts and secure token handling"
                },
                {
                  title: "Comprehensive Audit Logging",
                  description: "Complete audit trails for all data access and modifications"
                }
              ]}
            />
          </div>
        </div>
      </section>

      {/* Compliance Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <SecuritySection
            title="Privacy & Compliance"
            icon="📋"
            items={[
              {
                title: "FERPA Compliance",
                description: "We are fully compliant with the Family Educational Rights and Privacy Act, ensuring student educational records are protected"
              },
              {
                title: "COPPA Safe Harbor",
                description: "Certified compliance with Children's Online Privacy Protection Act for users under 13"
              },
              {
                title: "Student Data Privacy",
                description: "We never sell student data and limit data collection to what's necessary for the service"
              },
              {
                title: "Data Retention Policies",
                description: "Clear policies on how long data is retained and when it's deleted"
              },
              {
                title: "Right to Deletion",
                description: "Users can request complete deletion of their data at any time"
              },
              {
                title: "Data Residency Options",
                description: "Choose where your data is stored with regional data center options in the US, EU, and other global regions to meet local compliance requirements"
              }
            ]}
          />
        </div>
      </section>

      {/* Incident Response Section */}
      <section className="bg-[#EDE7F9] dark:bg-[#1a1a1a] py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <SecuritySection
              title="Incident Response"
              icon="🚨"
              items={[
                {
                  title: "Security Incident Protocol",
                  description: "Documented procedures for identifying, containing, and resolving security incidents"
                },
                {
                  title: "Breach Notification",
                  description: "Prompt notification to affected parties in compliance with applicable laws"
                },
                {
                  title: "24/7 Monitoring",
                  description: "Round-the-clock security monitoring and alerting systems"
                },
                {
                  title: "Incident Response Team",
                  description: "Dedicated security team ready to respond to any security concerns"
                },
                {
                  title: "Disaster Recovery Plan",
                  description: "Comprehensive backup and recovery procedures to ensure business continuity"
                }
              ]}
            />
          </div>
        </div>
      </section>

      {/* Downloadable Resources Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-[#6B3DCB] dark:text-[#E9EEFF]">
            Security Resources
          </h2>
          <p className="text-center text-lg text-[#4A5568] dark:text-[#A0AEC0] mb-12">
            Download detailed documentation about our security practices and compliance.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <Link
              href="/resources/security-whitepaper.pdf"
              className="group p-6 bg-white dark:bg-[#1a1a1a] border-2 border-[#6B3DCB]/20 dark:border-[#E9EEFF]/20 rounded-xl hover:border-[#6B3DCB] dark:hover:border-[#E9EEFF] transition-all hover:shadow-lg"
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl">📄</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2 text-[#2D3748] dark:text-[#E9EEFF] group-hover:text-[#6B3DCB] dark:group-hover:text-[#A78BFA]">
                    Security Whitepaper
                  </h3>
                  <p className="text-[#4A5568] dark:text-[#A0AEC0] mb-3">
                    Comprehensive overview of our security architecture and practices
                  </p>
                  <span className="text-[#6B3DCB] dark:text-[#A78BFA] font-semibold group-hover:underline">
                    Download PDF →
                  </span>
                </div>
              </div>
            </Link>

            <Link
              href="/resources/dpa-template.pdf"
              className="group p-6 bg-white dark:bg-[#1a1a1a] border-2 border-[#6B3DCB]/20 dark:border-[#E9EEFF]/20 rounded-xl hover:border-[#6B3DCB] dark:hover:border-[#E9EEFF] transition-all hover:shadow-lg"
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl">📝</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2 text-[#2D3748] dark:text-[#E9EEFF] group-hover:text-[#6B3DCB] dark:group-hover:text-[#A78BFA]">
                    Data Processing Agreement
                  </h3>
                  <p className="text-[#4A5568] dark:text-[#A0AEC0] mb-3">
                    Template DPA for institutional procurement requirements
                  </p>
                  <span className="text-[#6B3DCB] dark:text-[#A78BFA] font-semibold group-hover:underline">
                    Download PDF →
                  </span>
                </div>
              </div>
            </Link>

            <Link
              href="/resources/compliance-checklist.pdf"
              className="group p-6 bg-white dark:bg-[#1a1a1a] border-2 border-[#6B3DCB]/20 dark:border-[#E9EEFF]/20 rounded-xl hover:border-[#6B3DCB] dark:hover:border-[#E9EEFF] transition-all hover:shadow-lg"
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl">✅</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2 text-[#2D3748] dark:text-[#E9EEFF] group-hover:text-[#6B3DCB] dark:group-hover:text-[#A78BFA]">
                    Compliance Checklist
                  </h3>
                  <p className="text-[#4A5568] dark:text-[#A0AEC0] mb-3">
                    Complete list of compliance standards we meet
                  </p>
                  <span className="text-[#6B3DCB] dark:text-[#A78BFA] font-semibold group-hover:underline">
                    Download PDF →
                  </span>
                </div>
              </div>
            </Link>

            <Link
              href="/resources/security-questionnaire.pdf"
              className="group p-6 bg-white dark:bg-[#1a1a1a] border-2 border-[#6B3DCB]/20 dark:border-[#E9EEFF]/20 rounded-xl hover:border-[#6B3DCB] dark:hover:border-[#E9EEFF] transition-all hover:shadow-lg"
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl">❓</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2 text-[#2D3748] dark:text-[#E9EEFF] group-hover:text-[#6B3DCB] dark:group-hover:text-[#A78BFA]">
                    Security Questionnaire
                  </h3>
                  <p className="text-[#4A5568] dark:text-[#A0AEC0] mb-3">
                    Pre-filled responses to common security questions
                  </p>
                  <span className="text-[#6B3DCB] dark:text-[#A78BFA] font-semibold group-hover:underline">
                    Download PDF →
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust & Transparency Section */}
      <section className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-[#1a1a1a] dark:to-[#1a1a1a] py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#6B3DCB] dark:text-[#E9EEFF]">
              Trust & Transparency
            </h2>
            <p className="text-lg text-[#4A5568] dark:text-[#A0AEC0] mb-8 leading-relaxed">
              We believe in complete transparency about our security practices. Our security
              documentation is regularly updated and available to current and prospective customers.
              If you have specific security requirements or questions, our team is ready to assist.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl"
              >
                Contact Security Team
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                href="/demo"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white dark:bg-[#1a1a1a] text-[#6B3DCB] dark:text-[#E9EEFF] font-semibold rounded-lg border-2 border-[#6B3DCB] dark:border-[#E9EEFF] hover:bg-[#EDE7F9] dark:hover:bg-[#2D2433] transition-all"
              >
                Schedule Security Review
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
