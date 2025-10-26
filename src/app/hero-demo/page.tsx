import { Metadata } from "next";
import StripeHero from "@/components/hero/StripeHero";

export const metadata: Metadata = {
  title: "Hero Demo - CoStudy Stripe-Inspired Design",
  description: "Preview of CoStudy's new Stripe-inspired hero section with animated gradients and layered product screenshots",
};

export default function HeroDemoPage() {
  return (
    <div className="min-h-screen">
      <StripeHero />

      {/* Additional content section to demonstrate scroll behavior */}
      <section className="bg-gray-50 dark:bg-gray-900 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
              Why Choose CoStudy?
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
              This demo showcases our new Stripe-inspired hero design. Scroll to see how the layout flows naturally into the rest of the page.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">Focused</h3>
                <p className="text-gray-600 dark:text-gray-400">Clean, distraction-free study environment</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                <div className="text-4xl mb-4">🤝</div>
                <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">Collaborative</h3>
                <p className="text-gray-600 dark:text-gray-400">Work together in real-time groups</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                <div className="text-4xl mb-4">📊</div>
                <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">Data-Driven</h3>
                <p className="text-gray-600 dark:text-gray-400">Track progress with smart analytics</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
