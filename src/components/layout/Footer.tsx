import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#374045] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">CoStudy</h3>
            <p className="text-[#92A2AA] mb-4">
              Transforming student collaboration through structured teamwork tools.
            </p>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="font-semibold mb-4">Solutions</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/for-professors"
                  className="text-[#92A2AA] hover:text-white transition-colors"
                >
                  For Professors
                </Link>
              </li>
              <li>
                <Link
                  href="/for-administrators"
                  className="text-[#92A2AA] hover:text-white transition-colors"
                >
                  For Administrators
                </Link>
              </li>
              <li>
                <Link
                  href="/for-students"
                  className="text-[#92A2AA] hover:text-white transition-colors"
                >
                  For Students
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/products"
                  className="text-[#92A2AA] hover:text-white transition-colors"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-[#92A2AA] hover:text-white transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/resources"
                  className="text-[#92A2AA] hover:text-white transition-colors"
                >
                  Case Studies
                </Link>
              </li>
              <li>
                <Link
                  href="/community"
                  className="text-[#92A2AA] hover:text-white transition-colors"
                >
                  Community
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-[#92A2AA] hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-[#92A2AA] hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/demo"
                  className="text-[#92A2AA] hover:text-white transition-colors"
                >
                  Request Demo
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#5E6E76] mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-[#92A2AA] text-sm mb-4 md:mb-0">
            &copy; {currentYear} CoStudy. All rights reserved.
          </p>

          <div className="flex space-x-6">
            <Link
              href="/privacy"
              className="text-[#92A2AA] hover:text-white text-sm transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-[#92A2AA] hover:text-white text-sm transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
