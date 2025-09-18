// src/components/Notifications.jsx
import React from 'react';
import { motion } from 'framer-motion';
import {
  BellIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  CalendarIcon,
  BanknotesIcon,
} from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

const NotificationCard = ({ notification }) => {
  const { t } = useTranslation();
  const bgColor = {
    success: 'bg-green-900',
    warning: 'bg-yellow-900',
    info: 'bg-blue-900',
  };

  return (
    <motion.div
      className={`relative p-5 rounded-xl shadow-lg flex items-start space-x-4 ${bgColor[notification.type]} bg-opacity-70 backdrop-blur-sm`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex-shrink-0 mt-1">{notification.icon}</div>
      <div>
        <h3 className="text-lg font-semibold text-white">{notification.title}</h3>
        <p className="text-gray-200 mt-1 text-sm">{notification.message}</p>
        <p className="text-gray-400 text-xs mt-2">{notification.time}</p>
      </div>
    </motion.div>
  );
};

const Notifications = () => {
  const { t } = useTranslation();
  
  const notifications = [
    {
      type: 'success',
      icon: <CheckCircleIcon className="h-6 w-6 text-green-400" />,
      title: 'छात्रवृत्ति जमा (Scholarship Credited)!',
      message: 'आपकी प्री-मैट्रिक छात्रवृत्ति सफलतापूर्वक आपके DBT-इनेबल्ड खाते में जमा कर दी गई है।',
      time: '2 घंटे पहले',
    },
    {
      type: 'warning',
      icon: <ExclamationTriangleIcon className="h-6 w-6 text-yellow-400" />,
      title: 'आधार सीडिंग अलर्ट (Aadhaar Seeding Alert)',
      message: 'आपका आधार खाता अभी तक NPCI से सीडेड नहीं है। कृपया तुरंत अपनी बैंक शाखा से संपर्क करें।',
      time: 'आज सुबह 10:30 बजे',
    },
    {
      type: 'info',
      icon: <InformationCircleIcon className="h-6 w-6 text-blue-400" />,
      title: 'नई आवेदन की अंतिम तिथि (New Application Deadline)',
      message: 'पोस्ट-मैट्रिक छात्रवृत्ति के लिए आवेदन की अंतिम तिथि 30 सितंबर तक बढ़ा दी गई है।',
      time: 'कल',
    },
    {
      type: 'success',
      icon: <CheckCircleIcon className="h-6 w-6 text-green-400" />,
      title: 'आवेदन सफलतापूर्वक जमा किया गया (Application Submitted)',
      message: 'आपका छात्रवृत्ति आवेदन सफलतापूर्वक प्राप्त हो गया है और समीक्षाधीन है।',
      time: '3 दिन पहले',
    },
    {
      type: 'info',
      icon: <CalendarIcon className="h-6 w-6 text-indigo-400" />,
      title: 'DBT स्थिति की जाँच करें (Check DBT Status)',
      message: 'अपनी DBT स्थिति नियमित रूप से जांचना याद रखें ताकि कोई भी चूक न हो।',
      time: '1 हफ़्ते पहले',
    },
    {
      type: 'warning',
      icon: <BanknotesIcon className="h-6 w-6 text-red-400" />,
      title: 'बैंक विवरण अपडेट (Bank Details Update)',
      message: 'आपके बैंक खाते के विवरण में विसंगति पाई गई है। कृपया अपडेट करें।',
      time: '2 हफ़्ते पहले',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <section className="bg-gradient-to-br from-indigo-900 to-navy-900 py-12 md:py-24 px-4 text-white min-h-screen">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h1
          className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-green-400 to-blue-600 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {t('notifications_title')}
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {t('notifications_subtitle')}
        </motion.p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors mb-12">
          {t('mark_all_read')}
        </button>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {notifications.map((notification, index) => (
            <NotificationCard key={index} notification={notification} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Notifications;