// src/components/AccountComparison.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';

const features = [
  {
    feature: 'Primary Purpose',
    aadhaarLinked: 'Identity Verification (e-KYC)',
    dbtEnabled: 'Receiving Government Subsidies & Benefits',
    isDbtBeneficial: true,
  },
  {
    feature: 'Scholarship Disbursement',
    aadhaarLinked: 'Not guaranteed. Funds may be delayed or fail.',
    dbtEnabled: 'Guaranteed if application is approved.',
    isDbtBeneficial: true,
  },
  {
    feature: 'Process',
    aadhaarLinked: 'Simply linking Aadhaar number to bank account.',
    dbtEnabled: 'Aadhaar Seeding / NPCI Mapping',
    isDbtBeneficial: true,
  },
  {
    feature: 'How to check?',
    aadhaarLinked: 'Bank passbook or net banking portal.',
    dbtEnabled: 'This portal or UIDAI website',
    isDbtBeneficial: true,
  },
  {
    feature: 'Requirement for Scholarships',
    aadhaarLinked: 'Basic requirement for KYC.',
    dbtEnabled: 'Mandatory for receiving scholarship money.',
    isDbtBeneficial: true,
  },
  {
    feature: 'Technical Term',
    aadhaarLinked: 'Aadhaar Authentication',
    dbtEnabled: 'Aadhaar Payment Bridge (APB) System',
    isDbtBeneficial: true,
  },
];

const AccountComparison = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 py-16 px-4">
      <motion.div
        className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 md:p-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Title */}
        <motion.h2
          className="text-center text-3xl md:text-4xl font-extrabold text-sky-600 dark:text-sky-400 mb-8"
          variants={itemVariants}
        >
          Account Type Comparison
        </motion.h2>

        {/* Header Row */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 gap-4 border-b-2 border-gray-200 dark:border-gray-700 pb-4 text-center font-bold text-gray-700 dark:text-gray-300"
          variants={itemVariants}
        >
          <div className="hidden md:block">Feature</div>
          <div className="md:text-left">Aadhaar-Linked Only</div>
          <div className="md:text-left">DBT-Enabled (Recommended)</div>
        </motion.div>

        {/* Feature Rows */}
        <div className="space-y-4 mt-4">
          {features.map((item, index) => (
            <motion.div
              key={index}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-lg transition-all duration-300 hover:bg-sky-50 dark:hover:bg-gray-700"
              variants={itemVariants}
            >
              {/* Feature Title (for mobile view) */}
              <div className="md:hidden font-bold text-gray-800 dark:text-gray-200">{item.feature}</div>
              
              {/* Feature Title (for desktop view) */}
              <div className="hidden md:block text-gray-800 dark:text-gray-200">{item.feature}</div>

              {/* Aadhaar-Linked Column */}
              <div className="flex items-start md:items-center text-gray-600 dark:text-gray-400">
                <XCircleIcon className="h-6 w-6 text-red-500 flex-shrink-0 mr-2" />
                <span>{item.aadhaarLinked}</span>
              </div>

              {/* DBT-Enabled Column */}
              <div className="flex items-start md:items-center text-gray-600 dark:text-gray-400">
                <CheckCircleIcon className="h-6 w-6 text-green-500 flex-shrink-0 mr-2" />
                <span>{item.dbtEnabled}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <hr className="my-8 border-gray-200 dark:border-gray-700" />

        {/* Expert Opinion Section */}
        <motion.div
          className="bg-sky-50 dark:bg-sky-950 rounded-xl p-6 md:p-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h3 className="text-xl md:text-2xl font-bold text-sky-700 dark:text-sky-300 mb-3">
            हमारी राय: अपने स्कॉलरशिप को सुरक्षित करें
          </h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            कई छात्रों को यह नहीं पता होता कि सिर्फ़ **आधार को बैंक से लिंक करना ही काफ़ी नहीं है**। छात्रवृत्ति जैसी सरकारी योजनाओं का पैसा पाने के लिए, आपका खाता **DBT-Enabled (NPCI से मैप)** होना बहुत ज़रूरी है। यह एकमात्र तरीका है जिससे आपका पैसा सीधे और बिना किसी देरी के आपके बैंक खाते में जमा होगा।
          </p>
          <a
            href="https://www.npci.org.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center font-semibold text-sky-600 dark:text-sky-400 hover:underline transition-transform duration-200"
          >
            अधिक जानें
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AccountComparison;
