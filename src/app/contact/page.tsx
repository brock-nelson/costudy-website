import { Metadata } from "next";
import { Suspense } from "react";
import ContactForm from "@/components/forms/ContactForm";

export const metadata: Metadata = {
  title: "Contact CoStudy - Get in Touch",
  description: "Contact CoStudy to learn more about our student collaboration platform. We're here to help you transform teamwork in your classroom.",
};

export default function Contact() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#121212]">
      {/* Hero Section */}
      <section className="bg-[#EDE7F9] dark:bg-[#1a1a1a] py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#2D3748] dark:text-[#E9EEFF]">
              Get in Touch
            </h1>
            <p className="text-xl text-[#4A5568] dark:text-[#A0AEC0]">
              Have questions about CoStudy? We&apos;d love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="container mx-auto px-4 py-16">
        <Suspense fallback={<div className="text-center">Loading...</div>}>
          <ContactForm />
        </Suspense>
      </section>

      {/* Alternative Contact Methods */}
      <section className="bg-[#EAEDEF] dark:bg-[#1a1a1a] py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-12 text-[#2D3748] dark:text-[#E9EEFF]">
            Other Ways to Connect
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="bg-white dark:bg-[#1a1a1a] w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center shadow-sm">
                <span className="text-3xl">📧</span>
              </div>
              <h3 className="font-bold mb-2 text-[#2D3748] dark:text-[#E9EEFF]">Email Us</h3>
              <p className="text-[#4A5568] dark:text-[#A0AEC0]">hello@costudy.co</p>
            </div>

            <div className="text-center">
              <div className="bg-white dark:bg-[#1a1a1a] w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center shadow-sm">
                <span className="text-3xl">📅</span>
              </div>
              <h3 className="font-bold mb-2 text-[#2D3748] dark:text-[#E9EEFF]">Schedule a Demo</h3>
              <p className="text-[#4A5568] dark:text-[#A0AEC0]">See CoStudy in action</p>
            </div>

            <div className="text-center">
              <div className="bg-white dark:bg-[#1a1a1a] w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center shadow-sm">
                <span className="text-3xl">💬</span>
              </div>
              <h3 className="font-bold mb-2 text-[#2D3748] dark:text-[#E9EEFF]">Join the Community</h3>
              <p className="text-[#4A5568] dark:text-[#A0AEC0]">Connect with other educators</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
