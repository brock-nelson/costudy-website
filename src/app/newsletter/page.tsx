import { Metadata } from "next";
import NewsletterForm from "@/components/newsletter/NewsletterForm";

export const metadata: Metadata = {
  title: "Subscribe to CoStudy Newsletter - Stay Updated",
  description: "Get the latest CoStudy updates, new features, and educational insights delivered to your inbox.",
};

export default function NewsletterPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#121212]">
      {/* Hero Section */}
      <section className="bg-[#EDE7F9] dark:bg-[#1a1a1a] py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#2D3748] dark:text-[#E9EEFF]">
              Stay in the Loop
            </h1>
            <p className="text-xl text-[#4A5568] dark:text-[#A0AEC0]">
              Subscribe to our newsletter for the latest product updates, educational
              insights, and tips for better student collaboration.
            </p>
          </div>
        </div>
      </section>

      {/* Newsletter Form Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <NewsletterForm source="newsletter-page" />
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#2D3748] dark:text-[#E9EEFF]">
            What You&apos;ll Get
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-3xl">
                🚀
              </div>
              <h3 className="text-xl font-bold mb-2 text-[#2D3748] dark:text-[#E9EEFF]">
                Feature Updates
              </h3>
              <p className="text-[#4A5568] dark:text-[#A0AEC0]">
                Be the first to know about new features and improvements to CoStudy
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-3xl">
                💡
              </div>
              <h3 className="text-xl font-bold mb-2 text-[#2D3748] dark:text-[#E9EEFF]">
                Tips & Best Practices
              </h3>
              <p className="text-[#4A5568] dark:text-[#A0AEC0]">
                Learn how to get the most out of collaborative learning tools
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-3xl">
                🎓
              </div>
              <h3 className="text-xl font-bold mb-2 text-[#2D3748] dark:text-[#E9EEFF]">
                Educational Insights
              </h3>
              <p className="text-[#4A5568] dark:text-[#A0AEC0]">
                Research-backed strategies for effective group work and collaboration
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="bg-[#EAEDEF] dark:bg-[#1a1a1a] py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-lg text-[#4A5568] dark:text-[#A0AEC0] italic mb-4">
              &quot;The CoStudy newsletter keeps me updated on the latest collaboration
              tools and teaching strategies. It&apos;s become an essential resource for my
              classroom.&quot;
            </p>
            <p className="text-sm font-semibold text-[#2D3748] dark:text-[#E9EEFF]">
              — Professor Sarah Chen, Stanford University
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
