import { Metadata } from "next";
import UniversityDemoForm from "@/components/forms/UniversityDemoForm";

export const metadata: Metadata = {
  title: "Request a University Demo - CoStudy",
  description: "See how CoStudy transforms student success at your university. Request a personalized demo to learn about our platform for higher education institutions.",
};

export default function Demo() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a]">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-600 via-blue-600 to-purple-700 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-10 left-10 w-20 h-20 border-4 border-white/30 rounded-full animate-float"></div>
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br from-cyan-400/30 to-transparent rounded-full blur-3xl animate-float-delayed"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-lg">
              See How CoStudy Transforms Student Success
            </h1>
            <p className="text-xl text-white/95 leading-relaxed mb-8">
              Discover how leading universities are improving retention, increasing engagement, and supporting remote learning with CoStudy.
            </p>

            {/* Video Placeholder - Will add actual video later */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="aspect-video bg-gradient-to-br from-purple-900/50 to-blue-900/50 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <svg className="w-20 h-20 mx-auto mb-4 text-white/80" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                  </svg>
                  <p className="text-white/80 text-sm">2-3 minute platform walkthrough</p>
                  <p className="text-white/60 text-xs mt-2">University admin perspective</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Request Form Section */}
      <section className="py-16 bg-gradient-to-b from-white dark:from-[#0a0a0a] to-gray-50 dark:to-[#1a1a1a]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#374045] dark:text-[#E9EEFF]">
              Request Your University Demo
            </h2>
            <p className="text-lg text-[#5E6E76] dark:text-[#A0AEC0] max-w-2xl mx-auto">
              Fill out the form below and we&apos;ll schedule a personalized demo tailored to your institution&apos;s needs.
            </p>
          </div>

          <UniversityDemoForm />
        </div>
      </section>

      {/* What Happens Next Section */}
      <section className="py-16 bg-white dark:bg-[#0a0a0a]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#374045] dark:text-[#E9EEFF]">
              What Happens Next
            </h2>

            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    1
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2 text-[#374045] dark:text-[#E9EEFF]">
                    Instant Confirmation
                  </h3>
                  <p className="text-[#5E6E76] dark:text-[#A0AEC0]">
                    You&apos;ll receive an automated email confirmation right away, and our sales team will be notified via Slack and email.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    2
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2 text-[#374045] dark:text-[#E9EEFF]">
                    Personal Outreach (Within 24 Hours)
                  </h3>
                  <p className="text-[#5E6E76] dark:text-[#A0AEC0]">
                    A member of our team will reach out to schedule a Zoom demo at a time that works best for you.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    3
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2 text-[#374045] dark:text-[#E9EEFF]">
                    Personalized Demo
                  </h3>
                  <p className="text-[#5E6E76] dark:text-[#A0AEC0]">
                    We&apos;ll walk you through the platform, focusing on your specific goals and answering all your questions.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    4
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2 text-[#374045] dark:text-[#E9EEFF]">
                    Next Steps & Pilot Program
                  </h3>
                  <p className="text-[#5E6E76] dark:text-[#A0AEC0]">
                    If it&apos;s a good fit, we&apos;ll discuss implementation timelines, pricing, and our pilot program options.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-16 bg-gradient-to-b from-gray-50 dark:from-[#1a1a1a] to-white dark:to-[#0a0a0a]">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-[#374045] dark:text-[#E9EEFF]">
              Join Universities Already Using CoStudy
            </h2>
            <p className="text-center text-[#5E6E76] dark:text-[#A0AEC0] mb-12">
              See what university administrators are saying about CoStudy
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-[#1a1a1a] p-6 rounded-xl shadow-lg border border-purple-100 dark:border-[#404040]/50">
                <div className="mb-4">
                  <svg className="w-8 h-8 text-purple-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                <p className="text-[#5E6E76] dark:text-[#A0AEC0] mb-4 italic">
                  &quot;CoStudy has transformed how our students collaborate. We&apos;ve seen a 30% increase in student engagement since implementing the platform.&quot;
                </p>
                <div>
                  <p className="font-bold text-[#374045] dark:text-[#E9EEFF]">Dr. Sarah Johnson</p>
                  <p className="text-sm text-[#92A2AA] dark:text-[#A0AEC0]">Dean of Student Success</p>
                  <p className="text-sm text-[#92A2AA] dark:text-[#A0AEC0]">State University</p>
                </div>
              </div>

              <div className="bg-white dark:bg-[#1a1a1a] p-6 rounded-xl shadow-lg border border-purple-100 dark:border-[#404040]/50">
                <div className="mb-4">
                  <svg className="w-8 h-8 text-purple-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                <p className="text-[#5E6E76] dark:text-[#A0AEC0] mb-4 italic">
                  &quot;The analytics dashboard gives us unprecedented insight into student teamwork. It&apos;s been invaluable for early intervention.&quot;
                </p>
                <div>
                  <p className="font-bold text-[#374045] dark:text-[#E9EEFF]">Prof. Michael Chen</p>
                  <p className="text-sm text-[#92A2AA] dark:text-[#A0AEC0]">IT Director</p>
                  <p className="text-sm text-[#92A2AA] dark:text-[#A0AEC0]">Tech Institute</p>
                </div>
              </div>

              <div className="bg-white dark:bg-[#1a1a1a] p-6 rounded-xl shadow-lg border border-purple-100 dark:border-[#404040]/50">
                <div className="mb-4">
                  <svg className="w-8 h-8 text-purple-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                <p className="text-[#5E6E76] dark:text-[#A0AEC0] mb-4 italic">
                  &quot;Implementation was seamless, and our faculty adopted it quickly. Students love the peer feedback features.&quot;
                </p>
                <div>
                  <p className="font-bold text-[#374045] dark:text-[#E9EEFF]">Dr. Emily Rodriguez</p>
                  <p className="text-sm text-[#92A2AA] dark:text-[#A0AEC0]">Associate Dean</p>
                  <p className="text-sm text-[#92A2AA] dark:text-[#A0AEC0]">Liberal Arts College</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white dark:bg-[#0a0a0a]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#374045] dark:text-[#E9EEFF]">
              Frequently Asked Questions
            </h2>

            <div className="space-y-6">
              <div className="bg-gray-50 dark:bg-[#1a1a1a] p-6 rounded-xl border border-purple-100 dark:border-[#404040]/50">
                <h3 className="text-xl font-bold mb-3 text-[#374045] dark:text-[#E9EEFF]">
                  How long does implementation take?
                </h3>
                <p className="text-[#5E6E76] dark:text-[#A0AEC0]">
                  Most universities are up and running within 2-4 weeks. Our team handles the technical setup, LMS integration, and provides comprehensive training for your faculty and administrators.
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-[#1a1a1a] p-6 rounded-xl border border-purple-100 dark:border-[#404040]/50">
                <h3 className="text-xl font-bold mb-3 text-[#374045] dark:text-[#E9EEFF]">
                  What integrations do you support?
                </h3>
                <p className="text-[#5E6E76] dark:text-[#A0AEC0]">
                  CoStudy integrates seamlessly with popular Learning Management Systems including Canvas, Blackboard, Moodle, and D2L. We also support SSO authentication and can work with your existing student information systems.
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-[#1a1a1a] p-6 rounded-xl border border-purple-100 dark:border-[#404040]/50">
                <h3 className="text-xl font-bold mb-3 text-[#374045] dark:text-[#E9EEFF]">
                  How is pricing structured?
                </h3>
                <p className="text-[#5E6E76] dark:text-[#A0AEC0]">
                  We offer flexible pricing based on your institution&apos;s student count and needs. Pricing includes unlimited users, all features, ongoing support, and regular updates. Contact us for a customized quote that fits your budget.
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-[#1a1a1a] p-6 rounded-xl border border-purple-100 dark:border-[#404040]/50">
                <h3 className="text-xl font-bold mb-3 text-[#374045] dark:text-[#E9EEFF]">
                  Is there a pilot program?
                </h3>
                <p className="text-[#5E6E76] dark:text-[#A0AEC0]">
                  Yes! We offer pilot programs where you can test CoStudy with a select group of courses before a full campus rollout. This allows you to evaluate the platform&apos;s impact on student engagement and learning outcomes with minimal risk.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
