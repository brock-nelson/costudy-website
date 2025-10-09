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
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-purple-700 text-white py-20" aria-labelledby="students-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 id="students-hero" className="text-4xl md:text-5xl font-bold mb-6">
              For Students: Master the Art of Teamwork
            </h1>
            <p className="text-xl mb-8">
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
        <h2 id="benefits-heading" className="text-3xl font-bold text-center mb-12 text-[#6B3DCB]">
          Why Students Love CoStudy
        </h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="border-l-4 border-purple-600 pl-6">
            <h3 className="text-xl font-semibold mb-3 text-[#374045]">Clear Expectations</h3>
            <p className="text-[#5E6E76]">
              Team charters help everyone understand roles, responsibilities, and how you&apos;ll work together.
            </p>
          </div>

          <div className="border-l-4 border-purple-600 pl-6">
            <h3 className="text-xl font-semibold mb-3 text-[#374045]">Track Your Growth</h3>
            <p className="text-[#5E6E76]">
              Set personal collaboration goals and see your progress throughout the semester.
            </p>
          </div>

          <div className="border-l-4 border-purple-600 pl-6">
            <h3 className="text-xl font-semibold mb-3 text-[#374045]">Give Better Feedback</h3>
            <p className="text-[#5E6E76]">
              Learn to provide constructive feedback that helps your teammates improve.
            </p>
          </div>

          <div className="border-l-4 border-purple-600 pl-6">
            <h3 className="text-xl font-semibold mb-3 text-[#374045]">Build Your Portfolio</h3>
            <p className="text-[#5E6E76]">
              Document your teamwork skills and experiences for internships and job applications.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-50 py-16" aria-labelledby="how-it-works-heading">
        <div className="container mx-auto px-4">
          <h2 id="how-it-works-heading" className="text-3xl font-bold text-center mb-12 text-[#6B3DCB]">
            How CoStudy Works for You
          </h2>
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-xl" aria-hidden="true">
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-[#374045]">Create Your Team Charter</h3>
                <p className="text-[#5E6E76]">
                  Work with your teammates to set ground rules, communication norms, and shared goals.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-xl" aria-hidden="true">
                2
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-[#374045]">Set Personal Goals</h3>
                <p className="text-[#5E6E76]">
                  Choose collaboration skills you want to develop, like active listening or conflict resolution.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-xl" aria-hidden="true">
                3
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-[#374045]">Work and Reflect</h3>
                <p className="text-[#5E6E76]">
                  Collaborate on projects while reflecting on team dynamics and your individual contributions.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-xl" aria-hidden="true">
                4
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-[#374045]">Exchange Feedback</h3>
                <p className="text-[#5E6E76]">
                  Give and receive constructive peer feedback to help everyone grow and improve.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-xl" aria-hidden="true">
                5
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-[#374045]">Measure Progress</h3>
                <p className="text-[#5E6E76]">
                  See how you&apos;ve grown and showcase your teamwork skills to future employers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills You'll Build */}
      <section className="container mx-auto px-4 py-16" aria-labelledby="skills-heading">
        <h2 id="skills-heading" className="text-3xl font-bold text-center mb-12 text-[#6B3DCB]">
          Skills You&apos;ll Develop
        </h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="bg-purple-50 p-6 rounded-lg">
            <h3 className="font-semibold mb-2 text-[#374045]">Communication</h3>
            <p className="text-[#5E6E76] text-sm">
              Express ideas clearly, listen actively, and adapt your style to different contexts.
            </p>
          </div>

          <div className="bg-purple-50 p-6 rounded-lg">
            <h3 className="font-semibold mb-2 text-[#374045]">Accountability</h3>
            <p className="text-[#5E6E76] text-sm">
              Follow through on commitments and take responsibility for your contributions.
            </p>
          </div>

          <div className="bg-purple-50 p-6 rounded-lg">
            <h3 className="font-semibold mb-2 text-[#374045]">Conflict Resolution</h3>
            <p className="text-[#5E6E76] text-sm">
              Navigate disagreements constructively and find win-win solutions.
            </p>
          </div>

          <div className="bg-purple-50 p-6 rounded-lg">
            <h3 className="font-semibold mb-2 text-[#374045]">Leadership</h3>
            <p className="text-[#5E6E76] text-sm">
              Take initiative, motivate others, and guide teams toward shared goals.
            </p>
          </div>

          <div className="bg-purple-50 p-6 rounded-lg">
            <h3 className="font-semibold mb-2 text-[#374045]">Empathy</h3>
            <p className="text-[#5E6E76] text-sm">
              Understand diverse perspectives and build inclusive team environments.
            </p>
          </div>

          <div className="bg-purple-50 p-6 rounded-lg">
            <h3 className="font-semibold mb-2 text-[#374045]">Adaptability</h3>
            <p className="text-[#5E6E76] text-sm">
              Adjust to changing team dynamics and respond flexibly to challenges.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-purple-600 text-white py-16" aria-labelledby="students-cta">
        <div className="container mx-auto px-4 text-center">
          <h2 id="students-cta" className="text-3xl font-bold mb-6">
            Ready to Level Up Your Teamwork Skills?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
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
              className="bg-purple-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-purple-800 transition-colors border-2 border-white"
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
