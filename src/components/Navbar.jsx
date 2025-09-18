import React, { useState, useEffect } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";
import img1 from "./img22.png";

const navLinks = [
  { name: "Home", to: "/" },
  { name: "AboutUs", to: "/about" },
  { name: "Students", to: "/students" },
  { name: "Compare", to: "/compare" },
  { name: "DbtChecker", to: "/dbt-checker" },
  { name: "Resources", to: "/resources" },
  { name: "Notifications", to: "/notifications" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed w-full top-0 left-0 z-50">
      <div
        className={`relative transition-all duration-300 ${
          isScrolled ? "backdrop-blur-lg bg-white/20" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
          <div className="flex justify-between items-center h-16 ">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0 flex flex-col">
              <img
                src={img1}
                alt="Company Logo"
                height="50"
                width="50"
                className="flex flex-col"
              />
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex space-x-6 items-center">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.to}
                  className="text-gray-900 dark:text-gray-100 hover:text-blue-600 transition duration-300 relative group"
                >
                  {t(link.name)}
                  <span className="absolute left-0 bottom-0 w-full h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                </Link>
              ))}
              
              {/* Language Switcher */}
              <LanguageSwitcher />
            </div>

            {/* Mobile Hamburger Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(true)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-900 dark:text-gray-100 hover:text-blue-600 focus:outline-none"
              >
                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay Background */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300"
        />
      )}

      {/* Sidebar Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white/20 dark:bg-gray-800/20 backdrop-blur-lg text-gray-900 dark:text-white shadow-lg transform transition-transform duration-300 z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close Button */}
        <div className="flex justify-end p-4">
          <button onClick={() => setIsOpen(false)}>
            <XMarkIcon className="h-6 w-6 text-gray-900 dark:text-white" />
          </button>
        </div>

        {/* Nav Links */}
        <div className="flex flex-col px-6 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              className="text-lg font-medium hover:bg-white/30 dark:hover:bg-gray-700/30 px-3 py-2 rounded-md transition"
              onClick={() => setIsOpen(false)}
            >
              {t(link.name)}
            </Link>
          ))}
          
          {/* Mobile Language Switcher */}
          <div className="pt-4 border-t border-white/20">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;










