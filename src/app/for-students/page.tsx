import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CoStudy for Students - Build Essential Teamwork Skills",
  description: "Develop real-world collaboration skills with CoStudy. Set goals, give feedback, and become a better teammate.",
  openGraph: {
    title: "CoStudy for Students - Build Essential Teamwork Skills",
    description: "Develop real-world collaboration skills with CoStudy. Set goals, give feedback, and become a better teammate.",
    url: "https://costudy.co/for-students",
  },
  twitter: {
    card: "summary_large_image",
    title: "CoStudy for Students - Build Essential Teamwork Skills",
    description: "Develop real-world collaboration skills with CoStudy. Set goals, give feedback, and become a better teammate.",
  },
};

export default function ForStudents() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#121212]">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-purple-700 dark:from-purple-700 dark:to-purple-900 text-white py-20" aria-labelledby="students-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 id="students-hero" className="text-4xl md:text-5xl font-bold mb-6">
              For Students: Master the Art of Teamwork
            </h1>
            <p className="text-xl mb-8 leading-relaxed">
              Build the collaboration skills that employers value most. CoStudy helps you become
              a more effective team member and leader.
            </p>
            <Link
              href="/community"
              className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
              aria-label="Join the CoStudy student community"
            >
              Join the Community
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container mx-auto px-4 py-16" aria-labelledby="benefits-heading">
        <h2 id="benefits-heading" className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#6B3DCB] dark:text-[#C4B5FD]">
          Why Students Love CoStudy
        </h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="border-l-4 border-purple-600 dark:border-purple-400 pl-6">
            <h3 className="text-xl font-semibold mb-3 text-[#374045] dark:text-gray-100">Clear Expectations</h3>
            <p className="text-[#5E6E76] dark:text-gray-200 leading-relaxed">
              Team charters help everyone understand roles, responsibilities, and how you&apos;ll work together.
            </p>
          </div>

          <div className="border-l-4 border-purple-600 dark:border-purple-400 pl-6">
            <h3 className="text-xl font-semibold mb-3 text-[#374045] dark:text-gray-100">Track Your Growth</h3>
            <p className="text-[#5E6E76] dark:text-gray-200 leading-relaxed">
              Set personal collaboration goals and see your progress throughout the semester.
            </p>
          </div>

          <div className="border-l-4 border-purple-600 dark:border-purple-400 pl-6">
            <h3 className="text-xl font-semibold mb-3 text-[#374045] dark:text-gray-100">Give Better Feedback</h3>
            <p className="text-[#5E6E76] dark:text-gray-200 leading-relaxed">
              Learn to provide constructive feedback that helps your teammates improve.
            </p>
          </div>

          <div className="border-l-4 border-purple-600 dark:border-purple-400 pl-6">
            <h3 className="text-xl font-semibold mb-3 text-[#374045] dark:text-gray-100">Build Your Portfolio</h3>
            <p className="text-[#5E6E76] dark:text-gray-200 leading-relaxed">
              Document your teamwork skills and experiences for internships and job applications.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-50 dark:bg-[#1a1a1a] py-16" aria-labelledby="how-it-works-heading">
        <div className="container mx-auto px-4">
          <h2 id="how-it-works-heading" className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#6B3DCB] dark:text-[#C4B5FD]">
            How CoStudy Works for You
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex gap-6 p-6 rounded-xl bg-white dark:bg-[#1a1a1a]/50 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-purple-600 to-purple-700 dark:from-purple-500 dark:to-purple-600 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-md" aria-hidden="true">
                1
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2 text-[#2D3748] dark:text-white">Build Your Foundation</h3>
                <p className="text-[#4A5568] dark:text-gray-200 leading-relaxed">
                  Create a team charter and set personal collaboration goals that align with your growth.
                </p>
              </div>
            </div>

            <div className="flex gap-6 p-6 rounded-xl bg-white dark:bg-[#1a1a1a]/50 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-purple-600 to-purple-700 dark:from-purple-500 dark:to-purple-600 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-md" aria-hidden="true">
                2
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2 text-[#2D3748] dark:text-white">Collaborate & Learn</h3>
                <p className="text-[#4A5568] dark:text-gray-200 leading-relaxed">
                  Work on projects while CoStudy helps you reflect on team dynamics and individual contributions.
                </p>
              </div>
            </div>

            <div className="flex gap-6 p-6 rounded-xl bg-white dark:bg-[#1a1a1a]/50 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-purple-600 to-purple-700 dark:from-purple-500 dark:to-purple-600 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-md" aria-hidden="true">
                3
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2 text-[#2D3748] dark:text-white">Grow Together</h3>
                <p className="text-[#4A5568] dark:text-gray-200 leading-relaxed">
                  Exchange constructive feedback and track your progress toward becoming an exceptional teammate.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills You'll Build */}
      <section className="container mx-auto px-4 py-16" aria-labelledby="skills-heading">
        <h2 id="skills-heading" className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#6B3DCB] dark:text-[#C4B5FD]">
          Skills You&apos;ll Develop
        </h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg">
            <h3 className="font-semibold mb-2 text-[#374045] dark:text-gray-100">Communication</h3>
            <p className="text-[#5E6E76] dark:text-gray-200 text-sm leading-relaxed">
              Express ideas clearly, listen actively, and adapt your style to different contexts.
            </p>
          </div>

          <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg">
            <h3 className="font-semibold mb-2 text-[#374045] dark:text-gray-100">Accountability</h3>
            <p className="text-[#5E6E76] dark:text-gray-200 text-sm leading-relaxed">
              Follow through on commitments and take responsibility for your contributions.
            </p>
          </div>

          <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg">
            <h3 className="font-semibold mb-2 text-[#374045] dark:text-gray-100">Conflict Resolution</h3>
            <p className="text-[#5E6E76] dark:text-gray-200 text-sm leading-relaxed">
              Navigate disagreements constructively and find win-win solutions.
            </p>
          </div>

          <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg">
            <h3 className="font-semibold mb-2 text-[#374045] dark:text-gray-100">Leadership</h3>
            <p className="text-[#5E6E76] dark:text-gray-200 text-sm leading-relaxed">
              Take initiative, motivate others, and guide teams toward shared goals.
            </p>
          </div>

          <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg">
            <h3 className="font-semibold mb-2 text-[#374045] dark:text-gray-100">Empathy</h3>
            <p className="text-[#5E6E76] dark:text-gray-200 text-sm leading-relaxed">
              Understand diverse perspectives and build inclusive team environments.
            </p>
          </div>

          <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg">
            <h3 className="font-semibold mb-2 text-[#374045] dark:text-gray-100">Adaptability</h3>
            <p className="text-[#5E6E76] dark:text-gray-200 text-sm leading-relaxed">
              Adjust to changing team dynamics and respond flexibly to challenges.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 dark:from-purple-700 dark:via-purple-800 dark:to-purple-900 text-white py-16 overflow-hidden" aria-labelledby="students-cta">
        {/* Decorative background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 right-10 w-32 h-32 bg-purple-400/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-40 h-40 bg-purple-300/15 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white/5 border border-white/10 rounded-3xl rotate-12 backdrop-blur-sm"></div>
          <div className="absolute bottom-1/4 right-1/3 w-20 h-20 bg-white/5 border border-white/10 rounded-2xl -rotate-12 backdrop-blur-sm"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative">
          <h2 id="students-cta" className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Level Up Your Teamwork Skills?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto leading-relaxed text-white/95">
            Ask your professor about using CoStudy in your course, or join our student community to learn more.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/community"
              className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              aria-label="Join the CoStudy community"
            >
              Join the Community
            </Link>
            <Link
              href="/blog"
              className="bg-purple-700 dark:bg-purple-800 text-white px-8 py-4 rounded-lg font-semibold hover:bg-purple-800 dark:hover:bg-purple-900 transition-colors border-2 border-white"
              aria-label="Read student success stories"
            >
              Read Student Stories
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
