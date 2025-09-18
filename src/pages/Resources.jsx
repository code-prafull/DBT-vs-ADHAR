// src/components/ResourcesPage.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  BookOpenIcon,
  PlayCircleIcon,
  DocumentTextIcon,
  ChatBubbleLeftRightIcon,
  UsersIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';

const ResourcesPage = () => {
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

  const resourceSections = [
    {
      title: t('guides_faqs'),
      icon: <BookOpenIcon className="h-10 w-10 text-sky-500 mb-2" />,
      items: [
        t('link_aadhaar_bank'),
        t('seed_aadhaar_npci'),
        t('check_dbt_enabled'),
        t('understand_errors')
      ],
      link: '#'
    },
    {
      title: t('video_tutorials'),
      icon: <PlayCircleIcon className="h-10 w-10 text-green-500 mb-2" />,
      items: [
        t('dbt_benefits'),
        t('npci_payments'),
        t('govt_deadlines')
      ],
      link: '#'
    },
    {
      title: t('official_documents'),
      icon: <DocumentTextIcon className="h-10 w-10 text-purple-500 mb-2" />,
      items: [
        t('govt_circulars'),
        t('npci_guidelines'),
        t('scholarship_forms')
      ],
      link: '#'
    }
  ];

  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900 dark:text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {t('resources_hub_title')}
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {t('resources_hub_description')}
        </motion.p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {resourceSections.map((section, index) => (
          <motion.div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 flex flex-col items-start"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={sectionVariants}
          >
            <motion.div variants={itemVariants}>{section.icon}</motion.div>
            <motion.h3
              className="text-2xl font-bold text-gray-900 dark:text-white mt-4 mb-3"
              variants={itemVariants}
            >
              {section.title}
            </motion.h3>
            <motion.ul className="space-y-3 mb-6" variants={sectionVariants}>
              {section.items.map((item, i) => (
                <motion.li key={i} className="flex items-center text-gray-600 dark:text-gray-300" variants={itemVariants}>
                  <ChevronRightIcon className="h-5 w-5 mr-2 text-sky-500" />
                  <span>{item}</span>
                </motion.li>
              ))}
            </motion.ul>
            <motion.a
              href={section.link}
              className="mt-auto text-sky-500 hover:text-sky-600 font-semibold flex items-center transition-colors"
              variants={itemVariants}
            >
              {t('explore_now')}
              <ChevronRightIcon className="h-4 w-4 ml-1" />
            </motion.a>
          </motion.div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto mt-16 md:mt-24 px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* AI Chat Assistant */}
        <motion.div
          className="bg-gray-100 dark:bg-gray-800 rounded-xl shadow-lg p-8 flex items-start space-x-6"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <ChatBubbleLeftRightIcon className="h-12 w-12 text-blue-500 flex-shrink-0" />
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{t('ai_chat_assistant')}</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {t('ai_chat_description')}
            </p>
            <a href="#" className="text-blue-500 hover:text-blue-600 font-semibold flex items-center transition-colors">
              {t('start_chatting')}
              <ChevronRightIcon className="h-4 w-4 ml-1" />
            </a>
          </div>
        </motion.div>

        {/* Community Group */}
        <motion.div
          className="bg-gray-100 dark:bg-gray-800 rounded-xl shadow-lg p-8 flex items-start space-x-6"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <UsersIcon className="h-12 w-12 text-yellow-500 flex-shrink-0" />
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{t('community_group')}</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {t('community_description')}
            </p>
            <a href="[Insert Link to Official Group Here]" className="text-yellow-500 hover:text-yellow-600 font-semibold flex items-center transition-colors">
              {t('join_now')}
              <ChevronRightIcon className="h-4 w-4 ml-1" />
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ResourcesPage;