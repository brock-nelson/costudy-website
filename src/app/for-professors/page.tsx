import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CoStudy for Professors - Streamline Team-Based Learning",
  description: "Make team-based learning easier with CoStudy. Automate team formation, track collaboration, and integrate with your LMS.",
  openGraph: {
    title: "CoStudy for Professors - Streamline Team-Based Learning",
    description: "Make team-based learning easier with CoStudy. Automate team formation, track collaboration, and integrate with your LMS.",
    url: "https://costudy.co/for-professors",
  },
  twitter: {
    card: "summary_large_image",
    title: "CoStudy for Professors - Streamline Team-Based Learning",
    description: "Make team-based learning easier with CoStudy. Automate team formation, track collaboration, and integrate with your LMS.",
  },
};

export default function ForProfessors() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#121212]">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-700 dark:to-blue-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              For Professors: Make Team-Based Learning Effortless
            </h1>
            <p className="text-xl mb-8 leading-relaxed text-white/95">
              Spend less time managing teams and more time teaching. CoStudy automates the logistics
              while giving you powerful insights into student collaboration.
            </p>
            <Link
              href="/demo"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
            >
              Schedule a Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#6B3DCB] dark:text-[#E0E7FF]">
          Why Professors Choose CoStudy
        </h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="border-l-4 border-blue-600 dark:border-[#404040] pl-6">
            <h3 className="text-xl font-bold mb-3 text-[#2D3748] dark:text-[#E0E7FF]">Save Time on Team Management</h3>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed">
              Automated team formation, charter creation, and feedback collection eliminate hours of administrative work.
            </p>
          </div>

          <div className="border-l-4 border-blue-600 dark:border-[#404040] pl-6">
            <h3 className="text-xl font-bold mb-3 text-[#2D3748] dark:text-[#E0E7FF]">Real-Time Collaboration Insights</h3>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed">
              Monitor team health, identify struggling groups early, and intervene before issues escalate.
            </p>
          </div>

          <div className="border-l-4 border-blue-600 dark:border-[#404040] pl-6">
            <h3 className="text-xl font-bold mb-3 text-[#2D3748] dark:text-[#E0E7FF]">Seamless LMS Integration</h3>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed">
              Works with Canvas, Blackboard, Moodle, and more. No disruption to your existing workflow.
            </p>
          </div>

          <div className="border-l-4 border-blue-600 dark:border-[#404040] pl-6">
            <h3 className="text-xl font-bold mb-3 text-[#2D3748] dark:text-[#E0E7FF]">Evidence-Based Pedagogy</h3>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed">
              Built on research-backed principles of effective team learning and student development.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 dark:bg-[#1a1a1a] py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#6B3DCB] dark:text-[#E0E7FF]">
            Powerful Features for Your Classroom
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-[#1a1a1a] p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3 text-[#2D3748] dark:text-[#E0E7FF]">Smart Team Formation</h3>
              <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed">
                Create balanced teams based on skills, schedules, and learning goals with one click.
              </p>
            </div>

            <div className="bg-white dark:bg-[#1a1a1a] p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3 text-[#2D3748] dark:text-[#E0E7FF]">Team Charters</h3>
              <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed">
                Guide students through creating effective team agreements with customizable templates.
              </p>
            </div>

            <div className="bg-white dark:bg-[#1a1a1a] p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3 text-[#2D3748] dark:text-[#E0E7FF]">Peer Assessment</h3>
              <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed">
                Structured peer feedback that promotes accountability and continuous improvement.
              </p>
            </div>

            <div className="bg-white dark:bg-[#1a1a1a] p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3 text-[#2D3748] dark:text-[#E0E7FF]">Progress Tracking</h3>
              <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed">
                Visualize team dynamics and individual contributions throughout the semester.
              </p>
            </div>

            <div className="bg-white dark:bg-[#1a1a1a] p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3 text-[#2D3748] dark:text-[#E0E7FF]">Intervention Alerts</h3>
              <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed">
                Get notified when teams show signs of dysfunction so you can help early.
              </p>
            </div>

            <div className="bg-white dark:bg-[#1a1a1a] p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3 text-[#2D3748] dark:text-[#E0E7FF]">Grade Integration</h3>
              <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed">
                Export participation and peer feedback data directly to your gradebook.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#2D3748] dark:text-[#E0E7FF]">
          Ready to Transform Your Team-Based Courses?
        </h2>
        <p className="text-xl text-[#4A5568] dark:text-[#A0AEC0] mb-8 max-w-2xl mx-auto leading-relaxed">
          Join hundreds of professors using CoStudy to create more effective collaborative learning experiences.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/demo"
            className="bg-blue-600 dark:bg-blue-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
          >
            Schedule a Demo
          </Link>
          <Link
            href="/resources"
            className="bg-white dark:bg-[#1a1a1a] text-blue-600 dark:text-blue-300 px-8 py-4 rounded-lg font-semibold border-2 border-blue-600 dark:border-[#404040] hover:bg-blue-50 dark:hover:bg-[#2e2e2e] transition-colors"
          >
            View Case Studies
          </Link>
        </div>
      </section>
    </div>
  );
}
