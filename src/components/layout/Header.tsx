"use client";

import Link from "next/link";
import { useState } from "react";
import AnimatedLogo from "@/components/ui/AnimatedLogo";
import HighContrastToggle from "@/components/ui/HighContrastToggle";
import DarkModeToggle from "@/components/ui/DarkModeToggle";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white dark:bg-[#0a0a0a] border-b border-[#EAEDEF] dark:border-[#404040] fixed top-0 left-0 right-0 z-50 transition-colors header-container overflow-hidden">
      <nav className="container mx-auto px-4 py-4 relative overflow-visible">
        <div className="flex items-center justify-between">
          {/* Animated Logo */}
          <AnimatedLogo />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 overflow-visible">
            <div className="relative group overflow-visible">
              <button
                className="text-[#374045] dark:text-gray-300 hover:text-[#4A12C0] dark:hover:text-[#8B5CF6] font-medium transition-colors flex items-center gap-1"
                aria-expanded="false"
                aria-haspopup="true"
              >
                Solutions
                <svg className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                className="absolute left-0 mt-3 w-56 bg-white dark:bg-[#121212] rounded-lg shadow-2xl border border-gray-200 dark:border-[#404040] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 overflow-hidden translate-y-2 group-hover:translate-y-0"
                style={{ top: '100%', zIndex: 9999 }}
                role="menu"
                aria-label="Solutions menu"
              >
                {/* Dropdown arrow */}
                <div className="absolute left-6 -top-1 w-2 h-2 bg-white dark:bg-[#121212] border-l border-t border-gray-200 dark:border-[#404040] rotate-45"></div>

                <Link
                  href="/for-professors"
                  className="block px-4 py-3 text-[#374045] dark:text-gray-300 hover:bg-[#EDE7F9] dark:hover:bg-[#1a1a1a] hover:text-[#4A12C0] dark:hover:text-[#8B5CF6] transition-colors first:rounded-t-lg"
                >
                  For Professors
                </Link>
                <Link
                  href="/for-administrators"
                  className="block px-4 py-3 text-[#374045] dark:text-gray-300 hover:bg-[#EDE7F9] dark:hover:bg-[#1a1a1a] hover:text-[#4A12C0] dark:hover:text-[#8B5CF6] transition-colors"
                >
                  For Administrators
                </Link>
                <Link
                  href="/for-students"
                  className="block px-4 py-3 text-[#374045] dark:text-gray-300 hover:bg-[#EDE7F9] dark:hover:bg-[#1a1a1a] hover:text-[#4A12C0] dark:hover:text-[#8B5CF6] transition-colors last:rounded-b-lg"
                >
                  For Students
                </Link>
              </div>
            </div>

            <Link
              href="/products"
              className="text-[#374045] dark:text-gray-300 hover:text-[#4A12C0] dark:hover:text-[#8B5CF6] font-medium transition-colors"
            >
              Products
            </Link>

            <Link
              href="/resources"
              className="text-[#374045] dark:text-gray-300 hover:text-[#4A12C0] dark:hover:text-[#8B5CF6] font-medium transition-colors"
            >
              Resources
            </Link>

            <Link
              href="/about"
              className="text-[#374045] dark:text-gray-300 hover:text-[#4A12C0] dark:hover:text-[#8B5CF6] font-medium transition-colors"
            >
              About
            </Link>

            <div className="flex items-center gap-2 ml-4 border-l border-gray-200 dark:border-[#404040] pl-4">
              <DarkModeToggle />
              <HighContrastToggle />
            </div>

            <Link
              href="/demo"
              className="bg-[#4A12C0] dark:bg-[#8B5CF6] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#3a0e99] dark:hover:bg-[#7C3AED] transition-colors shadow-md hover:shadow-lg"
            >
              Get Demo
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[#374045] dark:text-gray-300"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3">
            <div className="space-y-2">
              <p className="text-sm font-semibold text-[#5E6E76] px-4">Solutions</p>
              <Link
                href="/for-professors"
                className="block px-4 py-2 text-[#374045] hover:bg-[#EDE7F9] hover:text-[#4A12C0] rounded transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                For Professors
              </Link>
              <Link
                href="/for-administrators"
                className="block px-4 py-2 text-[#374045] hover:bg-[#EDE7F9] hover:text-[#4A12C0] rounded transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                For Administrators
              </Link>
              <Link
                href="/for-students"
                className="block px-4 py-2 text-[#374045] hover:bg-[#EDE7F9] hover:text-[#4A12C0] rounded transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                For Students
              </Link>
            </div>

            <Link
              href="/products"
              className="block px-4 py-2 text-[#374045] hover:bg-[#EDE7F9] hover:text-[#4A12C0] rounded transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Products
            </Link>

            <Link
              href="/resources"
              className="block px-4 py-2 text-[#374045] hover:bg-[#EDE7F9] hover:text-[#4A12C0] rounded transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Resources
            </Link>

            <Link
              href="/community"
              className="block px-4 py-2 text-[#374045] hover:bg-[#EDE7F9] hover:text-[#4A12C0] rounded transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Community
            </Link>

            <Link
              href="/about"
              className="block px-4 py-2 text-[#374045] hover:bg-[#EDE7F9] hover:text-[#4A12C0] rounded transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>

            <Link
              href="/contact"
              className="block px-4 py-2 text-[#374045] hover:bg-[#EDE7F9] hover:text-[#4A12C0] rounded transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>

            <div className="px-4 py-2 flex gap-4">
              <DarkModeToggle />
              <HighContrastToggle />
            </div>

            <Link
              href="/demo"
              className="block mx-4 text-center bg-[#4A12C0] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#3a0e99] transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Get Demo
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
