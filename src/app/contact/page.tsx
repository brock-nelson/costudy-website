"use client";

import Link from "next/link";
import { useState } from "react";
import SalesInquiryForm from "@/components/forms/SalesInquiryForm";

export default function Contact() {
  const [showSalesForm, setShowSalesForm] = useState(false);

  return (
    <div className="min-h-screen bg-white dark:bg-[#121212]">
      {/* Hero Section */}
      <section className="bg-[#EDE7F9] dark:bg-[#1a1a1a] py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#2D3748] dark:text-[#E9EEFF]">
              Let&apos;s Talk About Student Success
            </h1>
            <p className="text-xl text-[#4A5568] dark:text-[#A0AEC0]">
              Whether you&apos;re exploring CoStudy or need support, we&apos;re here to help
            </p>
          </div>
        </div>
      </section>

      {/* Contact Options Cards */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {/* Schedule a Demo */}
          <div className="bg-white dark:bg-[#1a1a1a] rounded-xl p-6 shadow-sm border border-gray-200 dark:border-[#404040] hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-lg font-bold mb-2 text-[#2D3748] dark:text-[#E9EEFF]">
              Schedule a Demo
            </h2>
            <p className="text-[#5E6E76] dark:text-[#A0AEC0] mb-4 text-sm">
              Interested in CoStudy for your university?
            </p>
            <Link
              href="/demo"
              className="inline-block w-full text-center bg-[#4A12C0] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#3a0e99] transition-colors"
            >
              Book Demo
            </Link>
          </div>

          {/* Sales Inquiry */}
          <div className="bg-white dark:bg-[#1a1a1a] rounded-xl p-6 shadow-sm border border-gray-200 dark:border-[#404040] hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h2 className="text-lg font-bold mb-2 text-[#2D3748] dark:text-[#E9EEFF]">
              Sales Inquiry
            </h2>
            <p className="text-[#5E6E76] dark:text-[#A0AEC0] mb-4 text-sm">
              Have questions about pricing, features, or pilot programs?
            </p>
            <button
              onClick={() => setShowSalesForm(true)}
              className="inline-block w-full text-center bg-[#4A12C0] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#3a0e99] transition-colors"
            >
              Contact Sales
            </button>
          </div>

          {/* Existing Customer Support */}
          <div className="bg-white dark:bg-[#1a1a1a] rounded-xl p-6 shadow-sm border border-gray-200 dark:border-[#404040] hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h2 className="text-lg font-bold mb-2 text-[#2D3748] dark:text-[#E9EEFF]">
              Customer Support
            </h2>
            <p className="text-[#5E6E76] dark:text-[#A0AEC0] mb-4 text-sm">
              Need help with your account or have a technical question?
            </p>
            <a
              href="mailto:support@costudy.co"
              className="inline-block w-full text-center bg-[#4A12C0] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#3a0e99] transition-colors"
            >
              Get Support
            </a>
          </div>

          {/* Partnerships */}
          <div className="bg-white dark:bg-[#1a1a1a] rounded-xl p-6 shadow-sm border border-gray-200 dark:border-[#404040] hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-lg font-bold mb-2 text-[#2D3748] dark:text-[#E9EEFF]">
              Partnerships
            </h2>
            <p className="text-[#5E6E76] dark:text-[#A0AEC0] mb-4 text-sm">
              Interested in partnering with CoStudy?
            </p>
            <a
              href="mailto:partnerships@costudy.co"
              className="inline-block w-full text-center bg-[#4A12C0] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#3a0e99] transition-colors"
            >
              Partnership Inquiry
            </a>
          </div>
        </div>
      </section>

      {/* Sales Form Modal */}
      {showSalesForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-[#1a1a1a] rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
            <div className="sticky top-0 bg-white dark:bg-[#1a1a1a] border-b border-gray-200 dark:border-[#404040] px-6 py-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-[#2D3748] dark:text-[#E9EEFF]">
                Sales Inquiry
              </h2>
              <button
                onClick={() => setShowSalesForm(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <SalesInquiryForm onSuccess={() => setShowSalesForm(false)} />
            </div>
          </div>
        </div>
      )}

      {/* Social Links Section */}
      <section className="bg-[#EAEDEF] dark:bg-[#1a1a1a] py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-4 text-[#2D3748] dark:text-[#E9EEFF]">
            Follow Us for Updates
          </h2>
          <div className="flex justify-center gap-6 mb-12">
            <a
              href="https://linkedin.com/company/costudy"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow us on LinkedIn"
              className="w-12 h-12 bg-white dark:bg-[#2D3748] rounded-full flex items-center justify-center text-[#4A12C0] dark:text-[#E9EEFF] hover:bg-[#4A12C0] hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a
              href="https://twitter.com/costudy"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow us on Twitter"
              className="w-12 h-12 bg-white dark:bg-[#2D3748] rounded-full flex items-center justify-center text-[#4A12C0] dark:text-[#E9EEFF] hover:bg-[#4A12C0] hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
            <a
              href="https://github.com/costudy"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow us on GitHub"
              className="w-12 h-12 bg-white dark:bg-[#2D3748] rounded-full flex items-center justify-center text-[#4A12C0] dark:text-[#E9EEFF] hover:bg-[#4A12C0] hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
              </svg>
            </a>
          </div>

          {/* Contact Information Footer */}
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <h3 className="text-base font-bold mb-2 text-[#2D3748] dark:text-[#E9EEFF]">General</h3>
              <a href="mailto:info@costudy.co" className="text-[#4A5568] dark:text-[#A0AEC0] hover:text-[#4A12C0] dark:hover:text-[#E9EEFF]">
                info@costudy.co
              </a>
            </div>
            <div>
              <h3 className="text-base font-bold mb-2 text-[#2D3748] dark:text-[#E9EEFF]">Sales</h3>
              <a href="mailto:sales@costudy.co" className="text-[#4A5568] dark:text-[#A0AEC0] hover:text-[#4A12C0] dark:hover:text-[#E9EEFF]">
                sales@costudy.co
              </a>
            </div>
            <div>
              <h3 className="text-base font-bold mb-2 text-[#2D3748] dark:text-[#E9EEFF]">Support</h3>
              <a href="mailto:support@costudy.co" className="text-[#4A5568] dark:text-[#A0AEC0] hover:text-[#4A12C0] dark:hover:text-[#E9EEFF]">
                support@costudy.co
              </a>
            </div>
            <div>
              <h3 className="text-base font-bold mb-2 text-[#2D3748] dark:text-[#E9EEFF]">Phone</h3>
              <a href="tel:+15551234567" className="text-[#4A5568] dark:text-[#A0AEC0] hover:text-[#4A12C0] dark:hover:text-[#E9EEFF]">
                (555) 123-4567
              </a>
              <p className="text-sm text-[#92A2AA] dark:text-[#A0AEC0] mt-1">M-F 9am-6pm ET</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
