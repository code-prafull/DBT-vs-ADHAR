// src/components/DBTStatusChecker.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircleIcon, XCircleIcon, ExclamationTriangleIcon, ArrowPathIcon, DocumentTextIcon, PrinterIcon } from '@heroicons/react/24/solid';
import { FingerPrintIcon, CreditCardIcon, InformationCircleIcon, LinkIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

const DBTStatusChecker = () => {
  const { t } = useTranslation();
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [checkCompleted, setCheckCompleted] = useState(false);
  const [receipt, setReceipt] = useState(null);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [otpVerified, setOtpVerified] = useState(false);
  const [statusData, setStatusData] = useState({
    aadhaarLinked: { status: null, message: t('aadhaar_placeholder'), url: null },
    dbtEnabled: { status: null, message: '', url: null },
    npciMapping: { status: null, message: '', url: null },
  });

  // Aadhaar validation function
  const validateAadhaar = (number) => {
    // Remove spaces and special characters
    const cleanNumber = number.replace(/\s+/g, '').replace(/[^0-9]/g, '');
    
    // Check if it's 12 digits
    if (cleanNumber.length !== 12) {
      return { isValid: false, message: t('aadhaar_12_digits') };
    }
    
    // Check if all digits are same (invalid Aadhaar)
    if (/^(.)\1{11}$/.test(cleanNumber)) {
      return { isValid: false, message: t('invalid_aadhaar') };
    }
    
    return { isValid: true, message: t('aadhaar_linked_success') };
  };

  // Format Aadhaar number
  const formatAadhaar = (value) => {
    const cleanValue = value.replace(/\s+/g, '').replace(/[^0-9]/g, '');
    const formatted = cleanValue.replace(/(\d{4})(\d{4})(\d{4})/, '$1 $2 $3');
    return formatted;
  };

  // Generate receipt
  const generateReceipt = (statusData, aadhaarNumber) => {
    const timestamp = new Date().toLocaleString('hi-IN');
    const receiptId = `DBT-${Date.now()}`;
    
    return {
      id: receiptId,
      timestamp,
      aadhaarNumber: aadhaarNumber.replace(/.(?=.{4})/g, 'X'),
      checks: statusData,
      summary: {
        totalChecks: 4,
        passed: Object.values(statusData).filter(item => item.status === true).length,
        failed: Object.values(statusData).filter(item => item.status === false).length,
      }
    };
  };

  // Mock DBT service URLs
  const serviceUrls = {
    aadhaar: 'https://uidai.gov.in/aadhaar_dashboard/',
    dbt: 'https://dbtbharat.gov.in/',
    npci: 'https://www.npci.org.in/what-we-do/upi',
    bank: 'https://pmjdy.gov.in/account-holders'
  };

  // Generate OTP
  const generateOtp = () => {
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(newOtp);
    setShowOtpModal(true);
    // Simulate SMS sent
    alert(`OTP भेजा गया: ${newOtp} (Demo के लिए)`);
  };

  // Verify OTP
  const verifyOtp = () => {
    if (otp === generatedOtp) {
      setOtpVerified(true);
      setShowOtpModal(false);
      alert(t('otp_verified'));
      performStatusCheck();
    } else {
      alert(t('wrong_otp'));
    }
  };

  const handleCheckStatus = (e) => {
    e.preventDefault();
    
    // Validate Aadhaar first
    const validation = validateAadhaar(aadhaarNumber);
    if (!validation.isValid) {
      alert(validation.message);
      return;
    }

    // Generate and send OTP
    generateOtp();
  };

  const performStatusCheck = () => {
    setLoading(true);
    setCheckCompleted(false);
    setReceipt(null);
    
    setStatusData({
      aadhaarLinked: { status: null, message: 'आधार स्थिति जांच हो रही है...', url: serviceUrls.aadhaar },
      dbtEnabled: { status: null, message: 'DBT स्थिति जांच हो रही है...', url: serviceUrls.dbt },
      npciMapping: { status: null, message: 'NPCI मैपिंग जांच हो रही है...', url: serviceUrls.npci },
    });

    // Simulate realistic API calls with varied outcomes
    setTimeout(() => {
      // Create realistic scenarios for 3 checks - sometimes all pass, sometimes only few
      const scenarios = [
        // Scenario 1: All 3 pass (25% chance)
        { aadhaar: true, dbt: true, npci: true, weight: 25 },
        // Scenario 2: 2 pass (35% chance) - Most Common
        { aadhaar: true, dbt: true, npci: false, weight: 35 },
        // Scenario 3: Only 1 pass (25% chance)
        { aadhaar: true, dbt: false, npci: false, weight: 25 },
        // Scenario 4: None pass (15% chance)
        { aadhaar: false, dbt: false, npci: false, weight: 15 }
      ];
      
      // Select scenario based on weighted probability
      const random = Math.random() * 100;
      let currentWeight = 0;
      let selectedScenario = scenarios[0];
      
      for (const scenario of scenarios) {
        currentWeight += scenario.weight;
        if (random <= currentWeight) {
          selectedScenario = scenario;
          break;
        }
      }
      
      const { aadhaar: aadhaarLinked, dbt: dbtEnabled, npci: npciMapped } = selectedScenario;
      
      // Step 1: Aadhaar Check
      setStatusData(prev => ({
        ...prev,
        aadhaarLinked: { 
          status: aadhaarLinked, 
          message: aadhaarLinked ? 'आपका आधार सफलतापूर्वक लिंक है।' : 'आधार लिंकिंग लंबित है। कृपया अपने बैंक से संपर्क करें।',
          url: serviceUrls.aadhaar
        }
      }));
      
      setTimeout(() => {
        // Step 2: DBT Check
        setStatusData(prev => ({
          ...prev,
          dbtEnabled: { 
            status: dbtEnabled, 
            message: dbtEnabled ? 'आपका खाता DBT के लिए सक्रिय है।' : 'DBT सक्रियण लंबित है। कृपया DBT पोर्टल पर जाएं।',
            url: serviceUrls.dbt
          }
        }));
        
        setTimeout(() => {
          // Step 3: NPCI Check - Final Results
          const finalStatusData = {
            aadhaarLinked: { 
              status: aadhaarLinked, 
              message: aadhaarLinked ? 'आपका आधार सफलतापूर्वक लिंक है।' : 'आधार लिंकिंग लंबित है। कृपया अपने बैंक से संपर्क करें।',
              url: serviceUrls.aadhaar
            },
            dbtEnabled: { 
              status: dbtEnabled, 
              message: dbtEnabled ? 'आपका खाता DBT के लिए सक्रिय है।' : 'DBT सक्रियण लंबित है। कृपया DBT पोर्टल पर जाएं।',
              url: serviceUrls.dbt
            },
            npciMapping: { 
              status: npciMapped, 
              message: npciMapped ? 'NPCI मैपिंग पूरी हो गई है।' : 'NPCI मैपिंग लंबित है। UPI ऐप से जांचें।',
              url: serviceUrls.npci
            }
          };
          
          setStatusData(finalStatusData);
          setLoading(false);
          setCheckCompleted(true);
          
          // Generate receipt
          const generatedReceipt = generateReceipt(finalStatusData, aadhaarNumber);
          setReceipt(generatedReceipt);
        }, 600);
      }, 400);
    }, 1000);
  };

  const handlePrintReceipt = () => {
    if (!receipt) return;
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>भारत सरकार - DBT स्थिति प्रमाणपत्र</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;700&display=swap');
            body { 
              font-family: 'Noto Sans Devanagari', Arial, sans-serif; 
              padding: 20px; 
              background: #f8f9fa;
              margin: 0;
            }
            .govt-header {
              text-align: center;
              border: 3px solid #FF6B35;
              padding: 20px;
              background: linear-gradient(135deg, #FF6B35 0%, #F7931E 100%);
              color: white;
              margin-bottom: 20px;
            }
            .emblem {
              width: 60px;
              height: 60px;
              background: white;
              border-radius: 50%;
              margin: 0 auto 10px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 24px;
              color: #FF6B35;
              font-weight: bold;
            }
            .govt-title {
              font-size: 24px;
              font-weight: bold;
              margin: 10px 0;
            }
            .dept-name {
              font-size: 18px;
              margin: 5px 0;
            }
            .certificate-body {
              background: white;
              border: 2px solid #ddd;
              padding: 30px;
              border-radius: 10px;
              box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            }
            .receipt-header {
              text-align: center;
              border-bottom: 2px solid #FF6B35;
              padding-bottom: 15px;
              margin-bottom: 20px;
            }
            .receipt-id {
              background: #FF6B35;
              color: white;
              padding: 8px 15px;
              border-radius: 20px;
              display: inline-block;
              font-weight: bold;
            }
            .applicant-info {
              background: #f8f9fa;
              padding: 15px;
              border-radius: 8px;
              margin: 20px 0;
              border-left: 4px solid #FF6B35;
            }
            .status-grid {
              display: grid;
              grid-template-columns: 1fr 1fr 1fr;
              gap: 15px;
              margin: 20px 0;
            }
            .status-card {
              border: 2px solid #ddd;
              padding: 15px;
              border-radius: 8px;
              text-align: center;
            }
            .status-pass {
              border-color: #28a745;
              background: #d4f6d4;
            }
            .status-fail {
              border-color: #dc3545;
              background: #fdd6d6;
            }
            .status-icon {
              font-size: 30px;
              margin-bottom: 10px;
            }
            .summary-section {
              background: #e9ecef;
              padding: 20px;
              border-radius: 8px;
              margin: 20px 0;
              text-align: center;
            }
            .verification-footer {
              margin-top: 30px;
              padding-top: 20px;
              border-top: 2px solid #ddd;
              text-align: center;
              font-size: 12px;
              color: #666;
            }
            .qr-code {
              width: 80px;
              height: 80px;
              background: #333;
              margin: 10px auto;
              display: flex;
              align-items: center;
              justify-content: center;
              color: white;
              font-weight: bold;
            }
            .digital-signature {
              text-align: right;
              margin-top: 20px;
              font-style: italic;
            }
          </style>
        </head>
        <body>
          <div class="govt-header">
            <div class="emblem">🇮🇳</div>
            <div class="govt-title">भारत सरकार</div>
            <div class="dept-name">प्रत्यक्ष लाभ हस्तांतरण विभाग</div>
            <div style="font-size: 14px; margin-top: 10px;">GOVERNMENT OF INDIA<br>DIRECT BENEFIT TRANSFER DEPARTMENT</div>
          </div>
          
          <div class="certificate-body">
            <div class="receipt-header">
              <h2 style="color: #FF6B35; margin: 0;">DBT स्थिति सत्यापन प्रमाणपत्र</h2>
              <p style="margin: 10px 0;">DBT STATUS VERIFICATION CERTIFICATE</p>
              <div class="receipt-id">प्रमाणपत्र संख्या: ${receipt.id}</div>
            </div>
            
            <div class="applicant-info">
              <h3 style="margin: 0 0 10px 0; color: #FF6B35;">आवेदक विवरण / Applicant Details</h3>
              <p><strong>आधार संख्या / Aadhaar Number:</strong> ${receipt.aadhaarNumber}</p>
              <p><strong>सत्यापन दिनांक / Verification Date:</strong> ${receipt.timestamp}</p>
              <p><strong>OTP सत्यापित / OTP Verified:</strong> ✅ हाँ</p>
            </div>
            
            <div class="status-grid">
              ${Object.entries(receipt.checks).map(([key, data]) => `
                <div class="status-card ${data.status ? 'status-pass' : 'status-fail'}">
                  <div class="status-icon">${data.status ? '✅' : '❌'}</div>
                  <strong>${
                    key === 'aadhaarLinked' ? 'आधार लिंकिंग<br>Aadhaar Linking' : 
                    key === 'dbtEnabled' ? 'DBT सक्रियण<br>DBT Activation' : 
                    'NPCI मैपिंग<br>NPCI Mapping'
                  }</strong><br>
                  <span style="font-size: 12px; color: #666;">${data.status ? 'सक्रिय / ACTIVE' : 'निष्क्रिय / INACTIVE'}</span>
                </div>
              `).join('')}
            </div>
            
            <div class="summary-section">
              <h3 style="color: #FF6B35; margin: 0 0 15px 0;">सारांश / Summary</h3>
              <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px;">
                <div>
                  <div style="font-size: 24px; font-weight: bold; color: #007bff;">${receipt.summary.totalChecks}</div>
                  <div>कुल जांच / Total Checks</div>
                </div>
                <div>
                  <div style="font-size: 24px; font-weight: bold; color: #28a745;">${receipt.summary.passed}</div>
                  <div>सफल / Passed</div>
                </div>
                <div>
                  <div style="font-size: 24px; font-weight: bold; color: #dc3545;">${receipt.summary.failed}</div>
                  <div>असफल / Failed</div>
                </div>
              </div>
            </div>
            
            <div class="verification-footer">
              <div class="qr-code">QR</div>
              <p><strong>डिजिटल हस्ताक्षर सत्यापित / Digitally Signed & Verified</strong></p>
              <p>यह एक कंप्यूटर जनरेटेड दस्तावेज है और इसमें हस्ताक्षर की आवश्यकता नहीं है।<br>
              This is a computer generated document and does not require signature.</p>
              
              <div class="digital-signature">
                <p style="margin: 20px 0 5px 0;"><strong>प्राधिकृत अधिकारी</strong></p>
                <p style="margin: 0;">DBT विभाग, भारत सरकार</p>
                <p style="font-size: 10px; margin: 5px 0 0 0;">Generated on: ${new Date().toLocaleString()}</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  const StatusCard = ({ title, status, message, icon, url }) => {
    let cardStatus = 'info';
    if (status === true) cardStatus = 'success';
    else if (status === false) cardStatus = 'warning';
  
    const statusIcon = {
      success: <CheckCircleIcon className="h-10 w-10 text-green-500" />,
      warning: <XCircleIcon className="h-10 w-10 text-red-500" />,
      info: loading ? <ArrowPathIcon className="h-10 w-10 text-blue-500 animate-spin" /> : <InformationCircleIcon className="h-10 w-10 text-gray-400" />,
    };
  
    return (
      <motion.div
        className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-col items-center text-center border-2 ${
          cardStatus === 'success' ? 'border-green-200' : 
          cardStatus === 'warning' ? 'border-red-200' : 'border-gray-200'
        }`}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: 'spring' }}
      >
        <div className="mb-4">{statusIcon[cardStatus]}</div>
        <div className="text-gray-900 dark:text-white mb-2">{icon}</div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{message}</p>
        
        {url && (
          <a 
            href={url} 
            target="_blank" 
            rel="noopener noreferrer"
            className={`inline-flex items-center px-3 py-2 text-xs font-medium rounded-lg transition-colors ${
              status === true ? 'bg-green-100 text-green-700 hover:bg-green-200' :
              status === false ? 'bg-red-100 text-red-700 hover:bg-red-200' :
              'bg-blue-100 text-blue-700 hover:bg-blue-200'
            }`}
          >
            <LinkIcon className="h-4 w-4 mr-1" />
            {status === true ? 'Link Working ✅' : status === false ? 'Check Link ⚠️' : 'Visit Portal'}
          </a>
        )}
      </motion.div>
    );
  };

  return (
    <section className="bg-gradient-to-br from-indigo-50 to-blue-100 dark:from-gray-900 dark:to-blue-900 py-12 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">
            {t('dbt_checker_title')}
          </h1>
          <p className="mt-4 text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            {t('dbt_checker_subtitle')}
          </p>
        </motion.div>

        <form onSubmit={handleCheckStatus} className="max-w-xl mx-auto mb-12">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="tel"
              inputMode="numeric"
              pattern="[0-9\s]*"
              value={aadhaarNumber}
              onChange={(e) => {
                const value = e.target.value;
                // Only allow numbers and spaces
                if (/^[0-9\s]*$/.test(value)) {
                  const formatted = formatAadhaar(value);
                  if (formatted.replace(/\s/g, '').length <= 12) {
                    setAadhaarNumber(formatted);
                  }
                }
              }}
              placeholder={t('aadhaar_placeholder')}
              className="flex-grow rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm p-3"
              required
            />
            <motion.button
              type="submit"
              className={`flex-shrink-0 flex items-center justify-center rounded-md py-3 px-6 shadow-sm text-white font-bold transition-all duration-300 ${
                loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
              }`}
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? (
                <>
                  <ArrowPathIcon className="h-5 w-5 mr-2 animate-spin" />
                  {t('checking')}
                </>
              ) : (
                t('check_status')
              )}
            </motion.button>
          </div>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatusCard
            title={t('aadhaar_linking_status')}
            status={statusData.aadhaarLinked.status}
            message={statusData.aadhaarLinked.message}
            url={statusData.aadhaarLinked.url}
            icon={<FingerPrintIcon className="h-10 w-10 text-blue-500" />}
          />
          <StatusCard
            title={t('dbt_activation_status')}
            status={statusData.dbtEnabled.status}
            message={statusData.dbtEnabled.message}
            url={statusData.dbtEnabled.url}
            icon={<CreditCardIcon className="h-10 w-10 text-green-500" />}
          />
          <StatusCard
            title={t('npci_mapping_status')}
            status={statusData.npciMapping.status}
            message={statusData.npciMapping.message}
            url={statusData.npciMapping.url}
            icon={<InformationCircleIcon className="h-10 w-10 text-yellow-500" />}
          />
        </div>

        {/* OTP Modal */}
        {showOtpModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl"
              initial={{ scale: 0.7, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center mb-6">
                <div className="bg-indigo-100 dark:bg-indigo-900 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <ExclamationCircleIcon className="h-8 w-8 text-indigo-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{t('otp_verification')}</h2>
                <p className="text-gray-600 dark:text-gray-300">
                  {t('otp_sent_message')}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Demo: OTP है {generatedOtp}
                </p>
              </div>
              
              <div className="mb-6">
                <input
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={otp}
                  onChange={(e) => {
                    const value = e.target.value;
                    // Only allow numbers, max 6 digits
                    if (/^[0-9]*$/.test(value) && value.length <= 6) {
                      setOtp(value);
                    }
                  }}
                  placeholder={t('otp_placeholder')}
                  className="w-full text-center text-2xl tracking-widest border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg p-4 focus:border-indigo-500 focus:ring-indigo-500"
                  maxLength={6}
                  autoFocus
                />
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setShowOtpModal(false)}
                  className="flex-1 py-3 px-4 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
                >
                  {t('cancel')}
                </button>
                <button
                  onClick={verifyOtp}
                  disabled={otp.length !== 6}
                  className="flex-1 py-3 px-4 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  {t('verify')}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Receipt Section */}
        {checkCompleted && receipt && (
          <motion.div
            className="mt-12 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="text-center mb-6">
              <DocumentTextIcon className="h-16 w-16 text-indigo-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('status_report')}</h2>
              <p className="text-gray-600 dark:text-gray-300">{t('receipt_id')}: {receipt.id}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{receipt.timestamp}</p>
              <div className="mt-2">
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                  receipt.summary.passed === 4 ? 'bg-green-100 text-green-800' :
                  receipt.summary.passed === 3 ? 'bg-blue-100 text-blue-800' :
                  receipt.summary.passed === 2 ? 'bg-yellow-100 text-yellow-800' :
                  receipt.summary.passed === 1 ? 'bg-orange-100 text-orange-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {receipt.summary.passed === 4 ? '✅ सभी सेवाएं सक्रिय' :
                   receipt.summary.passed === 3 ? '🔵 अधिकतर सेवाएं सक्रिय' :
                   receipt.summary.passed === 2 ? '🟡 कुछ सेवाएं सक्रिय' :
                   receipt.summary.passed === 1 ? '🟠 न्यूनतम सेवाएं सक्रिय' :
                   '🔴 सेवाएं निष्क्रिय'}
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-center">
                <p className="text-2xl font-bold text-indigo-600">{receipt.summary.totalChecks}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">{t('total_checks')}</p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg text-center">
                <p className="text-2xl font-bold text-green-600">{receipt.summary.passed}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">{t('passed')}</p>
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg text-center">
                <p className="text-2xl font-bold text-red-600">{receipt.summary.failed}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">{t('failed')}</p>
              </div>
            </div>
            
            <div className="text-center">
              <motion.button
                onClick={handlePrintReceipt}
                className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <PrinterIcon className="h-5 w-5 mr-2" />
                {t('print_report')}
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default DBTStatusChecker;