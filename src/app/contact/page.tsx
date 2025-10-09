import { Metadata } from "next";
import ContactForm from "@/components/forms/ContactForm";

export const metadata: Metadata = {
  title: "Contact CoStudy - Get in Touch",
  description: "Contact CoStudy to learn more about our student collaboration platform. We're here to help you transform teamwork in your classroom.",
};

export default function Contact() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-[#EDE7F9] py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#374045]">
              Get in Touch
            </h1>
            <p className="text-xl text-[#5E6E76]">
              Have questions about CoStudy? We&apos;d love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="container mx-auto px-4 py-16">
        <ContactForm />
      </section>

      {/* Alternative Contact Methods */}
      <section className="bg-[#EAEDEF] py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-12 text-[#374045]">
            Other Ways to Connect
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="bg-white w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-3xl">📧</span>
              </div>
              <h3 className="font-semibold mb-2 text-[#374045]">Email Us</h3>
              <p className="text-[#5E6E76]">hello@costudy.co</p>
            </div>

            <div className="text-center">
              <div className="bg-white w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-3xl">📅</span>
              </div>
              <h3 className="font-semibold mb-2 text-[#374045]">Schedule a Demo</h3>
              <p className="text-[#5E6E76]">See CoStudy in action</p>
            </div>

            <div className="text-center">
              <div className="bg-white w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-3xl">💬</span>
              </div>
              <h3 className="font-semibold mb-2 text-[#374045]">Join the Community</h3>
              <p className="text-[#5E6E76]">Connect with other educators</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
