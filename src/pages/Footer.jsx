import React from 'react';
import { AcademicCapIcon, ArrowUpIcon } from '@heroicons/react/24/solid';
import {
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from 'react-icons/fa';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-6 relative">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand / Logo Section */}
        <div className="flex flex-col items-start">
          <div className="flex items-center text-white text-2xl font-extrabold tracking-wider mb-2">
            <AcademicCapIcon className="h-8 w-8 mr-2 text-sky-400" />
            Scholarship.in
          </div>
          <p className="text-sm text-gray-400">
            Empowering Students Through Financial Awareness.
          </p>
        </div>

        {/* Quick Navigation Links */}
        <div>
          <h3 className="text-lg font-bold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="/"ame="hover:text-white transition-colors">
                Home
              </a>
            </li>
            <li>
              <a href="about" className="hover:text-white transition-colors">
                About
              </a>
            </li>
            <li>
              <a href="/students" className="hover:text-white transition-colors">
                Students
              </a>
            </li>
            <li>
              <a href="/dbt-checker" className="hover:text-white transition-colors">
                DBT Checker
              </a>
            </li>
            <li>
              <a href="/compare" className="hover:text-white transition-colors">
                Compare
              </a>
            </li>
            <li>
              <a href="resources" className="hover:text-white transition-colors">
                Resources
              </a>
            </li>
            <li>
              <a href="Notifications" className="hover:text-white transition-colors">
                Notifications
              </a>
            </li>
          </ul>
        </div>

        {/* Support / Contact */}
        <div>
          <h3 className="text-lg font-bold text-white mb-4">Support</h3>
          <ul className="space-y-2">
            <li>
              Email:{' '}
              <a
                href="mailto:support@scholarship.in"
                className="hover:text-white transition-colors"
              >
                support@scholarship.in
              </a>
            </li>
            <li>
              Phone:{}
              <a
                href="tel:+919770819738"
                className="hover:text-white transition-colors"
              >
                +91 9770819738
              </a>
            </li>
            <li>
              <a href="https://uidai.gov.in/en/contact-support.html" className="hover:text-white transition-colors">
                Contact Us
              </a>
            </li>
            <li>
              <a href="https://uidai.gov.in/en/contact-support.html" className="hover:text-white transition-colors">
                Help Center
              </a>
            </li>
          </ul>
        </div>

        {/* Legal & Social Media */}
        <div className="flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <span className="text-xs text-gray-500 italic">
                  *Disclaimer: Information is based on publicly available
                  government data.
                </span>
              </li>
            </ul>
          </div>

          {/* Social Media Icons */}
          <div className="mt-8 flex space-x-4 text-white">
            <a href="#" aria-label="Instagram">
              <FaInstagram className="h-6 w-6 hover:text-sky-400 transition-colors" />
            </a>
            <a href="#" aria-label="LinkedIn">
              <FaLinkedinIn className="h-6 w-6 hover:text-sky-400 transition-colors" />
            </a>
            <a href="#" aria-label="Twitter">
              <FaTwitter className="h-6 w-6 hover:text-sky-400 transition-colors" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 mt-12 pt-6 flex flex-col items-center justify-between text-center text-sm text-gray-500">
        <p>
          &copy; {new Date().getFullYear()} Scholarship.in. All rights reserved.
        </p>
        <p className="mt-2">Made with ❤️ by Hackathon Team</p>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 p-3 bg-sky-500 text-white rounded-full shadow-lg hover:bg-sky-600 transition-transform duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50"
        aria-label="Back to top"
      >
        <ArrowUpIcon className="h-6 w-6" />
      </button>
    </footer>
  );
};

export default Footer;