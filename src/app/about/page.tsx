import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About CoStudy - Our Mission & Team",
  description: "Learn about CoStudy's mission to transform student collaboration through structured teamwork tools and evidence-based pedagogy.",
};

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-[#4A12C0] text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About CoStudy
            </h1>
            <p className="text-xl">
              We&apos;re on a mission to help students develop essential collaboration skills
              that prepare them for success in school, work, and life.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-[#6B3DCB]">Our Mission</h2>
          <p className="text-lg text-[#5E6E76] mb-4">
            Student collaboration is essential for deep learning, yet it&apos;s often left to chance.
            Teams struggle with unclear expectations, poor communication, and unequal participation.
          </p>
          <p className="text-lg text-[#5E6E76] mb-4">
            CoStudy provides the structure and tools that make teamwork work. We help students
            establish clear expectations, track their growth, and give meaningful feedback to
            their teammates.
          </p>
          <p className="text-lg text-[#5E6E76]">
            By making collaboration visible and intentional, we empower students to build
            skills that will serve them throughout their academic and professional careers.
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-[#EDE7F9] py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#6B3DCB]">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="bg-white w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#374045]">Student-Centered</h3>
              <p className="text-[#5E6E76]">
                Everything we build is designed to help students grow and succeed.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-white w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl">🔬</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#374045]">Evidence-Based</h3>
              <p className="text-[#5E6E76]">
                Our approach is grounded in research on effective learning and teamwork.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-white w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl">🤝</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#374045]">Collaborative</h3>
              <p className="text-[#5E6E76]">
                We partner with educators to continuously improve and innovate.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#6B3DCB]">Our Team</h2>
          <p className="text-lg text-[#5E6E76] text-center mb-12">
            We&apos;re a team of educators, researchers, and technologists passionate about
            transforming how students learn to work together.
          </p>
          {/* Placeholder for team members - can be expanded later */}
          <div className="text-center">
            <p className="text-[#5E6E76]">
              Founded by educators with decades of experience in collaborative learning,
              CoStudy brings together expertise in pedagogy, learning science, and technology.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#4A12C0] text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Join Us in Transforming Student Collaboration
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Whether you&apos;re an educator, administrator, or student, we&apos;d love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-[#4A12C0] px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Get in Touch
            </Link>
            <Link
              href="/demo"
              className="bg-[#6B3DCB] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#5a2fb8] transition-colors border-2 border-white"
            >
              Schedule a Demo
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
