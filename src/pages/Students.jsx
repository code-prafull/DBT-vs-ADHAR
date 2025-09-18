// src/components/ScholarshipQuest.jsx

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircleIcon, ExclamationTriangleIcon, AcademicCapIcon, BanknotesIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon, PlayIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { useTranslation } from 'react-i18next';
import img from './aa.jpg'

// Reusable animated card component for the stages
const QuestStageCard = ({ icon, title, description, isExpanded, onClick }) => {
  return (
    <motion.div
      className="bg-gray-800 text-white rounded-xl shadow-lg p-6 cursor-pointer transform transition-all duration-300 hover:scale-105"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onClick={onClick}
    >
      <div className="flex items-center gap-4">
        <div className="bg-gray-700 p-3 rounded-full">{icon}</div>
        <h3 className="text-xl font-bold text-gray-100">{title}</h3>
        <ChevronDownIcon className={`ml-auto h-6 w-6 text-gray-400 transform transition-transform ${isExpanded ? 'rotate-180' : 'rotate-0'}`} />
      </div>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="mt-4 text-gray-300">{description}</p>
      </motion.div>
    </motion.div>
  );
};

const ScholarshipQuest = () => {
  const { t } = useTranslation();
  const [expandedStage, setExpandedStage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleStage = (stage) => {
    setExpandedStage(expandedStage === stage ? null : stage);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  return (
    <section className="bg-gradient-to-br from-gray-900 to-blue-900 py-12 md:py-24 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h1
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {t('students_quest_title')}
        </motion.h1>
        <motion.p
          className="mt-4 text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {t('students_quest_subtitle')}
        </motion.p>
      </div>

      <div className="mt-12 lg:mt-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* The Quest Visual */}
        <motion.div
          className="order-2 md:order-1 flex justify-center"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <img
            src={img}
            alt="Indian student with Aadhaar and smartphone in front of bank with DBT icons"
            className="w-full max-w-lg rounded-xl shadow-2xl"
          />
        </motion.div>

        {/* The Quest Stages */}
        <motion.div
          className="order-1 md:order-2 space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <QuestStageCard
            icon={<CheckCircleIcon className="h-6 w-6 text-green-400" />}
            title={t('stage1_title')}
            description={t('stage1_description')}
            isExpanded={expandedStage === 'stage1'}
            onClick={() => toggleStage('stage1')}
          />
          <QuestStageCard
            icon={<ExclamationTriangleIcon className="h-6 w-6 text-yellow-400" />}
            title={t('stage2_title')}
            description={t('stage2_description')}
            isExpanded={expandedStage === 'stage2'}
            onClick={() => toggleStage('stage2')}
          />
          <QuestStageCard
            icon={<AcademicCapIcon className="h-6 w-6 text-indigo-400" />}
            title={t('stage3_title')}
            description={t('stage3_description')}
            isExpanded={expandedStage === 'stage3'}
            onClick={() => toggleStage('stage3')}
          />
          <QuestStageCard
            icon={<BanknotesIcon className="h-6 w-6 text-blue-400" />}
            title={t('stage4_title')}
            description={t('stage4_description')}
            isExpanded={expandedStage === 'stage4'}
            onClick={() => toggleStage('stage4')}
          />
        </motion.div>
      </div>
      
      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold text-white">{t('need_help_quest')}</h2>
        <p className="mt-2 text-gray-300">{t('check_status_or_video')}</p>
        <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
          <motion.a
            href="https://www.google.com/search?q=how+to+check+dbt+status+npci+mapping"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
          >
            {t('check_account_now')}
          </motion.a>
          <motion.button
            onClick={() => setIsModalOpen(true)}
            className="border border-blue-600 text-blue-400 hover:bg-blue-900 font-bold py-3 px-6 rounded-lg transform hover:scale-105 transition-transform duration-300 flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
          >
            <PlayIcon className="h-5 w-5 mr-2" /> {t('watch_video')}
          </motion.button>
        </div>
      </div>

      {/* Video Modal Component */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-75 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-4xl bg-gray-800 rounded-xl p-4 shadow-xl">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-200 transition"
            >
              <XMarkIcon className="h-7 w-7" />
            </button>
            <div className="relative" style={{ paddingBottom: '56.25%', height: 0 }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-lg"
                src="https://www.youtube.com/embed/your-video-id"
                title="Scholarship Explainer Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ScholarshipQuest;
