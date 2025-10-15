import Link from "next/link";
import NewsletterForm from "@/components/newsletter/NewsletterForm";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#2a2f33] dark:bg-[#0a0a0a] text-white border-t border-gray-700 dark:border-gray-800">
      <div className="container mx-auto px-4 py-12">
        {/* Newsletter Section */}
        <div className="mb-12 pb-8 border-b border-gray-600 dark:border-gray-800">
          <div className="max-w-2xl">
            <h3 className="text-xl font-bold mb-2 text-white">Stay Updated</h3>
            <p className="text-gray-300 dark:text-[#A0AEC0] mb-4">
              Get weekly insights on student collaboration and EdTech trends.
            </p>
            <NewsletterForm source="footer" variant="minimal" />
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-black mb-4 text-white">CoStudy</h3>
            <p className="text-gray-300 dark:text-[#A0AEC0] mb-4 leading-relaxed">
              Transforming student collaboration through structured teamwork tools.
            </p>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="font-bold text-white mb-4 uppercase text-sm tracking-wide">Solutions</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/for-professors"
                  className="text-gray-300 dark:text-[#A0AEC0] hover:text-purple-400 dark:hover:text-purple-300 transition-colors"
                >
                  For Professors
                </Link>
              </li>
              <li>
                <Link
                  href="/for-administrators"
                  className="text-gray-300 dark:text-[#A0AEC0] hover:text-purple-400 dark:hover:text-purple-300 transition-colors"
                >
                  For Administrators
                </Link>
              </li>
              <li>
                <Link
                  href="/for-students"
                  className="text-gray-300 dark:text-[#A0AEC0] hover:text-purple-400 dark:hover:text-purple-300 transition-colors"
                >
                  For Students
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-bold text-white mb-4 uppercase text-sm tracking-wide">Resources</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/products"
                  className="text-gray-300 dark:text-[#A0AEC0] hover:text-purple-400 dark:hover:text-purple-300 transition-colors"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-gray-300 dark:text-[#A0AEC0] hover:text-purple-400 dark:hover:text-purple-300 transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/resources"
                  className="text-gray-300 dark:text-[#A0AEC0] hover:text-purple-400 dark:hover:text-purple-300 transition-colors"
                >
                  Case Studies
                </Link>
              </li>
              <li>
                <Link
                  href="/community"
                  className="text-gray-300 dark:text-[#A0AEC0] hover:text-purple-400 dark:hover:text-purple-300 transition-colors"
                >
                  Community
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold text-white mb-4 uppercase text-sm tracking-wide">Company</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-gray-300 dark:text-[#A0AEC0] hover:text-purple-400 dark:hover:text-purple-300 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-300 dark:text-[#A0AEC0] hover:text-purple-400 dark:hover:text-purple-300 transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/demo"
                  className="text-gray-300 dark:text-[#A0AEC0] hover:text-purple-400 dark:hover:text-purple-300 transition-colors"
                >
                  Request Demo
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-600 dark:border-gray-800 mt-10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 dark:text-[#A0AEC0] text-sm mb-4 md:mb-0">
            &copy; {currentYear} CoStudy. All rights reserved.
          </p>

          <div className="flex space-x-6">
            <Link
              href="/privacy"
              className="text-gray-400 dark:text-[#A0AEC0] hover:text-white dark:hover:text-gray-300 text-sm transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-gray-400 dark:text-[#A0AEC0] hover:text-white dark:hover:text-gray-300 text-sm transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
