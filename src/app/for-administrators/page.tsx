import Link from "next/link";
import { Metadata } from "next";
import ROICalculator from "@/components/calculators/ROICalculator";

export const metadata: Metadata = {
  title: "CoStudy for Administrators - Measure Student Success & ROI",
  description: "Track institutional impact, measure student outcomes, and demonstrate ROI with CoStudy's comprehensive analytics platform.",
  openGraph: {
    title: "CoStudy for Administrators - Measure Student Success & ROI",
    description: "Track institutional impact, measure student outcomes, and demonstrate ROI with CoStudy's comprehensive analytics platform.",
    url: "https://costudy.co/for-administrators",
  },
  twitter: {
    card: "summary_large_image",
    title: "CoStudy for Administrators - Measure Student Success & ROI",
    description: "Track institutional impact, measure student outcomes, and demonstrate ROI with CoStudy's comprehensive analytics platform.",
  },
};

export default function ForAdministrators() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-800 dark:from-green-700 dark:to-green-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              For Administrators: Data-Driven Student Success
            </h1>
            <p className="text-xl mb-8 leading-relaxed">
              Make informed decisions with comprehensive analytics on student collaboration,
              skill development, and learning outcomes across your institution.
            </p>
            <Link
              href="/demo"
              className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
            >
              See the Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#6B3DCB] dark:text-[#C4B5FD]">
          Strategic Insights for Institutional Leaders
        </h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="border-l-4 border-green-600 dark:border-green-400 pl-6">
            <h3 className="text-xl font-semibold mb-3 text-[#374045] dark:text-gray-100">Measure Student Outcomes</h3>
            <p className="text-[#5E6E76] dark:text-gray-200 leading-relaxed">
              Track collaboration skills, retention rates, and career readiness across departments and cohorts.
            </p>
          </div>

          <div className="border-l-4 border-green-600 dark:border-green-400 pl-6">
            <h3 className="text-xl font-semibold mb-3 text-[#374045] dark:text-gray-100">Demonstrate ROI</h3>
            <p className="text-[#5E6E76] dark:text-gray-200 leading-relaxed">
              Quantify the impact of teamwork initiatives with clear metrics on student success and satisfaction.
            </p>
          </div>

          <div className="border-l-4 border-green-600 dark:border-green-400 pl-6">
            <h3 className="text-xl font-semibold mb-3 text-[#374045] dark:text-gray-100">Support Faculty Adoption</h3>
            <p className="text-[#5E6E76] dark:text-gray-200 leading-relaxed">
              Easy onboarding, training resources, and ongoing support ensure high faculty engagement.
            </p>
          </div>

          <div className="border-l-4 border-green-600 dark:border-green-400 pl-6">
            <h3 className="text-xl font-semibold mb-3 text-[#374045] dark:text-gray-100">Institutional Scalability</h3>
            <p className="text-[#5E6E76] dark:text-gray-200 leading-relaxed">
              From single departments to university-wide deployment, CoStudy scales with your needs.
            </p>
          </div>
        </div>
      </section>

      {/* Analytics Dashboard Preview */}
      <section className="bg-gray-50 dark:bg-gray-800 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#6B3DCB] dark:text-[#C4B5FD]">
            Comprehensive Analytics & Reporting
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-semibold mb-3 text-[#374045] dark:text-gray-100">Institutional Dashboards</h3>
              <p className="text-[#5E6E76] dark:text-gray-200 leading-relaxed">
                Real-time visibility into collaboration metrics across all courses and programs.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
              <div className="text-4xl mb-4">📈</div>
              <h3 className="text-xl font-semibold mb-3 text-[#374045] dark:text-gray-100">Skill Development Tracking</h3>
              <p className="text-[#5E6E76] dark:text-gray-200 leading-relaxed">
                Monitor student growth in communication, leadership, and teamwork competencies.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold mb-3 text-[#374045] dark:text-gray-100">Success Metrics</h3>
              <p className="text-[#5E6E76] dark:text-gray-200 leading-relaxed">
                Track retention, engagement, and satisfaction rates with actionable insights.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-3 text-[#374045] dark:text-gray-100">Equity Analysis</h3>
              <p className="text-[#5E6E76] dark:text-gray-200 leading-relaxed">
                Identify and address disparities in student collaboration experiences.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
              <div className="text-4xl mb-4">📋</div>
              <h3 className="text-xl font-semibold mb-3 text-[#374045] dark:text-gray-100">Custom Reports</h3>
              <p className="text-[#5E6E76] dark:text-gray-200 leading-relaxed">
                Generate reports for accreditation, grants, and stakeholder communications.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-semibold mb-3 text-[#374045] dark:text-gray-100">ROI Calculator</h3>
              <p className="text-[#5E6E76] dark:text-gray-200 leading-relaxed">
                Quantify cost savings and impact on student outcomes with our interactive tool.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ROI Calculator Section */}
      <section className="bg-gradient-to-b from-green-50/30 to-transparent dark:from-green-900/10 py-16">
        <div className="container mx-auto px-4">
          <ROICalculator />
        </div>
      </section>

      {/* Implementation Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#6B3DCB] dark:text-[#C4B5FD]">
          Enterprise-Ready Implementation
        </h2>
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-3 text-[#374045] dark:text-gray-100">Secure & Compliant</h3>
            <p className="text-[#5E6E76] dark:text-gray-200 mb-4 leading-relaxed">
              FERPA-compliant, SOC 2 certified, and enterprise-grade security to protect student data.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3 text-[#374045] dark:text-gray-100">Flexible Integration</h3>
            <p className="text-[#5E6E76] dark:text-gray-200 mb-4 leading-relaxed">
              Works with your existing LMS, SIS, and data warehouse infrastructure.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3 text-[#374045] dark:text-gray-100">Dedicated Support</h3>
            <p className="text-[#5E6E76] dark:text-gray-200 mb-4 leading-relaxed">
              White-glove onboarding, training, and ongoing technical support for your team.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3 text-[#374045] dark:text-gray-100">Custom Solutions</h3>
            <p className="text-[#5E6E76] dark:text-gray-200 mb-4 leading-relaxed">
              Tailored features and workflows to match your institutional needs and policies.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-green-600 dark:bg-green-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to See the Full Picture?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
            Schedule a personalized demo to explore our analytics dashboard and discuss your institutional goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/demo"
              className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Schedule a Demo
            </Link>
            <Link
              href="/contact"
              className="bg-green-700 dark:bg-green-800 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-800 dark:hover:bg-green-900 transition-colors border-2 border-white"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
