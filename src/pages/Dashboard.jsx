// src/components/Dashboard.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRightIcon } from '@heroicons/react/24/solid'; // Updated import for the icon
import { useTranslation } from 'react-i18next';
import bgVideo from './video-dbt.mp4';

const Dashboard = () => {
  const { t } = useTranslation();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Video Background - आपका वीडियो अपनी जगह पर है */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src={bgVideo} type="video/mp4" />
      </video>

      {/* Dark Overlay - पाठ को पढ़ने योग्य बनाने के लिए */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/60 z-10"></div>

      {/* Hero Content - मुख्य शीर्षक और बटन */}
      <motion.div
        className="relative z-20 flex flex-col items-center justify-center min-h-screen text-center p-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      
      >
        <motion.h1
          className="text-white text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-wide mb-4"
          variants={itemVariants}
        >
          {t('dashboard_main_title')}
        </motion.h1>
        <motion.p
          className="text-lg sm:text-xl text-sky-400 font-semibold mb-2"
          variants={itemVariants}
        >
          <span className="text-3xl font-extrabold text-white">6500+</span> {t('students_benefited')}
        </motion.p>
        <motion.p
          className="text-lg sm:text-xl text-gray-200 font-semibold max-w-2xl mx-auto mb-8"
          variants={itemVariants}
        >
          {t('indians_touched')}
        </motion.p>
        <motion.a
          href="/dbt-checker"
          className="inline-flex items-center justify-center bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-transform duration-300 transform hover:scale-105"
          variants={itemVariants}
        >
          {t('get_started')}
          <ArrowRightIcon className="h-5 w-5 ml-2" />
        </motion.a>
      </motion.div>
    </div>
  );
};

export default Dashboard;