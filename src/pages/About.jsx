// src/components/AboutUs.jsx
import React from 'react';
import { motion } from 'framer-motion';
import {
  ChatBubbleLeftRightIcon,
  CheckCircleIcon,
  GlobeAsiaAustraliaIcon,
  MegaphoneIcon,
  LightBulbIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';
import { AcademicCapIcon } from '@heroicons/react/24/solid';
import { useTranslation } from 'react-i18next';

const AboutUs = () => {
  const { t } = useTranslation();
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      {/* Hero Section */}
      <section className="py-20 md:py-32 px-4 text-center bg-gradient-to-br from-indigo-50 dark:from-gray-800 to-sky-100 dark:to-gray-900">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
        >
          <motion.h1
            className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
            variants={itemVariants}
          >
            {t('about_mission_title')}
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto"
            variants={itemVariants}
          >
            {t('about_mission_description')}
          </motion.p>
        </motion.div>
      </section>

      {/* Who We Are & Why It Matters */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={sectionVariants}
          >
            <motion.h2 className="text-3xl font-extrabold mb-4" variants={itemVariants}>
              <UserGroupIcon className="h-8 w-8 inline-block mr-2 text-sky-500" />
              {t('about_who_we_are')}
            </motion.h2>
            <motion.p className="text-lg leading-relaxed mb-6" variants={itemVariants}>
              {t('about_who_we_are_description')}
            </motion.p>
            <motion.h2 className="text-3xl font-extrabold mt-8 mb-4" variants={itemVariants}>
              <LightBulbIcon className="h-8 w-8 inline-block mr-2 text-sky-500" />
              {t('about_why_matters')}
            </motion.h2>
            <motion.p className="text-lg leading-relaxed" variants={itemVariants}>
              {t('about_why_matters_description')}
            </motion.p>
          </motion.div>
          
          <motion.div
            className="flex items-center justify-center p-8 bg-gray-100 dark:bg-gray-800 rounded-2xl shadow-xl"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <AcademicCapIcon className="h-48 w-48 text-gray-300 dark:text-gray-700 animate-pulse" />
          </motion.div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-16 md:py-24 px-4 bg-gray-100 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-3xl font-extrabold text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <GlobeAsiaAustraliaIcon className="h-8 w-8 inline-block mr-2 text-sky-500" />
            {t('about_what_we_do')}
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {['Real-Time DBT Status Checker', 'Student-Centric Resources', 'Awareness & Outreach', 'AI Chat Assistant', 'Error Prevention'].map((item, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-md"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex items-center space-x-3 mb-3">
                  <CheckCircleIcon className="h-6 w-6 text-green-500" />
                  <h4 className="text-xl font-semibold">{item}</h4>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  {/* You can add specific descriptions here if needed */}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* NPCI & DBT Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            className="bg-gray-100 dark:bg-gray-800 p-8 rounded-2xl shadow-xl"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-extrabold text-sky-500 mb-4">
              What Is NPCI & DBT?
            </h2>
            <p className="text-lg leading-relaxed mb-4">
              NPCI (National Payments Corporation of India) is the authority that connects Aadhaar numbers with bank accounts through its Aadhaar Payment Bridge System (APBS).
            </p>
            <p className="text-lg leading-relaxed">
              DBT (Direct Benefit Transfer) is how the Indian government directly deposits funds (like scholarships) into your bank account — but only if your account is correctly Aadhaar-seeded and NPCI-mapped.
            </p>
          </motion.div>
          <motion.div
            className="text-center md:text-left"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-xl font-bold mb-4">
              If your account isn’t DBT-enabled, you won’t receive any scholarship, even if approved.
            </h3>
            <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-400">
              This is the key challenge we solve. Our tools ensure that this doesn't happen to you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Vision & Join Us */}
      <section className="py-16 md:py-24 px-4 text-center bg-gray-100 dark:bg-gray-800">
        <motion.div
          className="max-w-3xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
        >
          <motion.h2 className="text-3xl font-extrabold mb-4" variants={itemVariants}>
            <MegaphoneIcon className="h-8 w-8 inline-block mr-2 text-sky-500" />
            Our Vision & Join Us
          </motion.h2>
          <motion.p className="text-lg leading-relaxed mb-6" variants={itemVariants}>
            A future where no student is left behind due to digital illiteracy or lack of awareness. We’re building tools, campaigns, and systems to ensure that every eligible student gets the help, support, and funding they deserve — without red tape, delays, or confusion.
          </motion.p>
          <motion.a
            href="#"
            className="inline-flex items-center justify-center bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-transform duration-300 transform hover:scale-105"
            variants={itemVariants}
          >
            Spread the Word
            <ChatBubbleLeftRightIcon className="h-5 w-5 ml-2" />
          </motion.a>
        </motion.div>
      </section>
    </div>
  );
};

export default AboutUs;