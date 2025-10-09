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
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              For Professors: Make Team-Based Learning Effortless
            </h1>
            <p className="text-xl mb-8">
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
        <h2 className="text-3xl font-bold text-center mb-12 text-[#6B3DCB]">
          Why Professors Choose CoStudy
        </h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="border-l-4 border-blue-600 pl-6">
            <h3 className="text-xl font-semibold mb-3 text-[#374045]">Save Time on Team Management</h3>
            <p className="text-[#5E6E76]">
              Automated team formation, charter creation, and feedback collection eliminate hours of administrative work.
            </p>
          </div>

          <div className="border-l-4 border-blue-600 pl-6">
            <h3 className="text-xl font-semibold mb-3 text-[#374045]">Real-Time Collaboration Insights</h3>
            <p className="text-[#5E6E76]">
              Monitor team health, identify struggling groups early, and intervene before issues escalate.
            </p>
          </div>

          <div className="border-l-4 border-blue-600 pl-6">
            <h3 className="text-xl font-semibold mb-3 text-[#374045]">Seamless LMS Integration</h3>
            <p className="text-[#5E6E76]">
              Works with Canvas, Blackboard, Moodle, and more. No disruption to your existing workflow.
            </p>
          </div>

          <div className="border-l-4 border-blue-600 pl-6">
            <h3 className="text-xl font-semibold mb-3 text-[#374045]">Evidence-Based Pedagogy</h3>
            <p className="text-[#5E6E76]">
              Built on research-backed principles of effective team learning and student development.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#6B3DCB]">
            Powerful Features for Your Classroom
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-[#374045]">Smart Team Formation</h3>
              <p className="text-[#5E6E76]">
                Create balanced teams based on skills, schedules, and learning goals with one click.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-[#374045]">Team Charters</h3>
              <p className="text-[#5E6E76]">
                Guide students through creating effective team agreements with customizable templates.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-[#374045]">Peer Assessment</h3>
              <p className="text-[#5E6E76]">
                Structured peer feedback that promotes accountability and continuous improvement.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-[#374045]">Progress Tracking</h3>
              <p className="text-[#5E6E76]">
                Visualize team dynamics and individual contributions throughout the semester.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-[#374045]">Intervention Alerts</h3>
              <p className="text-[#5E6E76]">
                Get notified when teams show signs of dysfunction so you can help early.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-[#374045]">Grade Integration</h3>
              <p className="text-[#5E6E76]">
                Export participation and peer feedback data directly to your gradebook.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold mb-6 text-[#374045]">
          Ready to Transform Your Team-Based Courses?
        </h2>
        <p className="text-xl text-[#5E6E76] mb-8 max-w-2xl mx-auto">
          Join hundreds of professors using CoStudy to create more effective collaborative learning experiences.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/demo"
            className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Schedule a Demo
          </Link>
          <Link
            href="/resources"
            className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transition-colors"
          >
            View Case Studies
          </Link>
        </div>
      </section>
    </div>
  );
}
