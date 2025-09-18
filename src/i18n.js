import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation resources
const resources = {
  en: {
    translation: {
      // Navigation
      "Home": "Home",
      "AboutUs": "About Us", 
      "Students": "Students",
      "Compare": "Compare",
      "DbtChecker": "DBT Checker",
      "Resources": "Resources",
      "Notifications": "Notifications",
      "Dashboard": "Dashboard",
      "Chatbot": "Chatbot",
      
      // Language Switcher
      "language": "Language",
      "english": "English",
      "hindi": "हिन्दी",
      "punjabi": "ਪੰਜਾਬੀ",
      "gujarati": "ગુજરાતી",
      "bengali": "বাংলা",
      
      // DBT Checker
      "dbt_checker_title": "Check Your DBT Status",
      "dbt_checker_subtitle": "Check your Aadhaar, Bank, and NPCI mapping status at a glance.",
      "aadhaar_placeholder": "Enter your 12-digit Aadhaar number (e.g., 1234 5678 9012)",
      "check_status": "Check Status",
      "checking": "Checking...",
      "cancel": "Cancel",
      "verify": "Verify",
      "otp_verification": "OTP Verification",
      "otp_sent_message": "OTP has been sent to your Aadhaar registered mobile number",
      "otp_placeholder": "Enter 6-digit OTP",
      "aadhaar_linking_status": "Aadhaar Linking Status",
      "dbt_activation_status": "DBT Activation Status", 
      "npci_mapping_status": "NPCI Mapping Status",
      "link_working": "Link Working ✅",
      "check_link": "Check Link ⚠️",
      "visit_portal": "Visit Portal",
      "status_report": "Status Check Report",
      "receipt_id": "Receipt ID",
      "all_services_active": "✅ All Services Active",
      "most_services_active": "🔵 Most Services Active",
      "some_services_active": "🟡 Some Services Active", 
      "services_inactive": "🔴 Services Inactive",
      "total_checks": "Total Checks",
      "passed": "Passed",
      "failed": "Failed",
      "print_report": "Print Report",
      
      // Status Messages
      "aadhaar_linked_success": "Your Aadhaar is successfully linked.",
      "aadhaar_linking_pending": "Aadhaar linking is pending. Please contact your bank.",
      "dbt_active": "Your account is active for DBT.",
      "dbt_activation_pending": "DBT activation is pending. Please visit DBT portal.",
      "npci_mapping_complete": "NPCI mapping has been completed.",
      "npci_mapping_pending": "NPCI mapping is pending. Check with UPI app.",
      "invalid_aadhaar": "Invalid Aadhaar number",
      "aadhaar_12_digits": "Aadhaar number should be 12 digits",
      "otp_verified": "OTP verified! Status check starting...",
      "wrong_otp": "Wrong OTP! Please try again.",
      
      // Chatbot
      "type_message": "Type your message...",
      "send": "Send",
      "typing": "Typing...",
      "type_question": "Type your question...",
      "chatbot_welcome": "Hello 👋! I'm here to help you with your Scholarship and DBT related queries.",
      "api_error_message": "⚠️ Error: Unable to get response from AI. Please try again.",
      "clear_chat": "Clear Chat",
      "quick_questions": "Quick Questions",
      "check_dbt_status": "How do I check my DBT status?",
      "aadhaar_linking_help": "Help with Aadhaar linking",
      "scholarship_info": "Tell me about scholarships",
      "npci_mapping_help": "What is NPCI mapping?",
      "press_enter_send": "Press Enter to send",
      "shift_enter_newline": "Shift+Enter for new line",
      
      // ChatWidget
      "chatwidget_welcome": "Hello! 👋 I'm your AI assistant for DBT, Aadhaar seeding, scholarships, and government schemes. How can I help you today?",
      "ask_about_dbt": "Ask about DBT, scholarships, Aadhaar...",
      "ai_assistant": "AI Assistant",
      
      // About Page
      "about_title": "About DBT Checker",
      "about_description": "DBT Checker is a comprehensive platform for checking Direct Benefit Transfer status and related government services.",
      
      // Resources Page  
      "resources_title": "Help & Resources",
      "resources_subtitle": "Find answers and get support for your DBT and government services queries.",
      "official_guidelines": "Official Guidelines",
      "guidelines_description": "Access the latest official guidelines and documentation for DBT services.",
      "view_guidelines": "View Guidelines",
      "live_chat_support": "Live Chat Support", 
      "chat_support_description": "Get instant help from our support team for any queries or issues.",
      "start_chatting": "Start Chatting",
      "community_group": "Join the Official Community!",
      "community_description": "For the latest updates, personalized help, and peer support, join our official group.",
      "join_now": "Join Now",
      
      // Notifications
      "notifications_title": "Government Notifications",
      "notifications_subtitle": "Stay updated with the latest government announcements and your account status.",
      "mark_all_read": "Mark All as Read",
      "week_ago": "1 week ago",
      "weeks_ago": "2 weeks ago",
      
      // Common
      "government_of_india": "Government of India",
      "direct_benefit_transfer": "Direct Benefit Transfer Department",
      "digitally_signed": "Digitally Signed & Verified",
      "computer_generated": "This is a computer generated document and does not require signature.",
      "authorized_officer": "Authorized Officer",
      "generated_on": "Generated on",
      
      // Dashboard
      "dashboard_main_title": "Where Every Payment Builds a Better Tomorrow",
      "students_benefited": "Students Benefited",
      "indians_touched": "Indians touched by one of our payment systems",
      "get_started": "Get Started",
      
      // About Page
      "about_mission_title": "A Simple, Powerful Mission",
      "about_mission_description": "Make scholarships accessible, understandable, and error-free for every student in India.",
      "about_who_we_are": "Who We Are",
      "about_who_we_are_description": "We are a student-first digital platform focused on simplifying the Direct Benefit Transfer (DBT) process by combining technology, transparency, and awareness. Backed by educational data, NPCI standards, and user feedback, our system is built to bridge the gap between students and their rightful scholarships.",
      "about_why_matters": "Why This Matters",
      "about_why_matters_description": "Every year, thousands of students miss out on government scholarships due to incomplete Aadhaar linking, missing bank seeding, or DBT ineligibility issues — not because they aren't eligible, but because the system is confusing.",
      "about_what_we_do": "What We Do",
      
      // Notifications
      "notification_dbt_success_title": "DBT Payment Successful",
      "notification_dbt_success_message": "Your scholarship payment has been successfully deposited into your account.",
      "notification_update_title": "New Policy Update",
      "notification_update_message": "Information about new changes in the DBT scheme is available.",
      "notification_bank_title": "Bank Details Update",
      "notification_bank_message": "Discrepancy found in your bank account details. Please update.",
      
      // Students Page
      "students_quest_title": "Your Scholarship Quest",
      "students_quest_subtitle": "Embark on a journey to ensure your scholarship reaches you.",
      "stage1_title": "Stage 1: The First Step",
      "stage1_description": "You have your Aadhaar and it's linked to your bank account. Great start! This is a simple identity verification, but it's not the final step for scholarships.",
      "stage2_title": "Stage 2: The Missing Bridge",
      "stage2_description": "Many students stop at stage one. This is the common reason for scholarship delays. Your bank account needs a special connection to the government's system for direct transfers.",
      "stage3_title": "Stage 3: The Golden Key",
      "stage3_description": "This is the crucial part! You must get your bank account 'NPCI mapped' and 'Aadhaar-seeded'. Think of this as getting a special key that allows government funds to enter your specific account.",
      "stage4_title": "Stage 4: The Final Destination",
      "stage4_description": "Congratulations! Your account is now fully DBT-enabled. Government scholarship funds will be directly and securely deposited into your bank account without any delays. Mission accomplished!",
      "need_help_quest": "Need Help on Your Quest?",
      "check_status_or_video": "Check your account status or watch an explainer video.",
      "check_account_now": "Check Your Account Now",
      "watch_video": "Watch Video",
      
      // Resources Page
      "resources_hub_title": "Your Scholarship Resources Hub",
      "resources_hub_description": "Explore guides, videos, and tools to navigate your scholarship journey with confidence.",
      "guides_faqs": "Comprehensive Guides & FAQs",
      "video_tutorials": "Video Tutorials & Explainers",
      "official_documents": "Official Documents & Links",
      "link_aadhaar_bank": "Link your Aadhaar with your bank account correctly.",
      "seed_aadhaar_npci": "Seed your Aadhaar into the NPCI database.",
      "check_dbt_enabled": "Check if your account is DBT-enabled for scholarship disbursal.",
      "understand_errors": "Understand common errors and how to fix them.",
      "dbt_benefits": "Direct Benefit Transfer (DBT) and its benefits.",
      "npci_payments": "How NPCI facilitates scholarship payments.",
      "govt_deadlines": "Important government deadlines and documents.",
      "govt_circulars": "Government circulars related to scholarships and DBT.",
      "npci_guidelines": "NPCI guidelines and FAQs.",
      "scholarship_forms": "Scholarship application forms and tracking portals.",
      "explore_now": "Explore Now",
      "ai_chat_assistant": "AI Chat Assistant",
      "ai_chat_description": "Have questions? Ask our AI-powered chat assistant anytime for instant answers related to DBT, Aadhaar seeding, and scholarships."
    }
  },
  hi: {
    translation: {
      // Navigation  
      "Home": "होम",
      "AboutUs": "हमारे बारे में",
      "Students": "छात्र",
      "Compare": "तुलना करें", 
      "DbtChecker": "डीबीटी चेकर",
      "Resources": "संसाधन",
      "Notifications": "सूचनाएं",
      "Dashboard": "डैशबोर्ड",
      "Chatbot": "चैटबॉट",
      
      // Language Switcher
      "language": "भाषा",
      "english": "English",
      "hindi": "हिन्दी", 
      "punjabi": "ਪੰਜਾਬੀ",
      "gujarati": "ગુજરાતી",
      "bengali": "বাংলা",
      
      // DBT Checker
      "dbt_checker_title": "अपनी DBT स्थिति की जांच करें",
      "dbt_checker_subtitle": "अपने आधार, बैंक और NPCI मैपिंग की स्थिति को एक ही नज़र में जानें।",
      "aadhaar_placeholder": "अपना 12 अंकों का आधार नंबर दर्ज करें (जैसे: 1234 5678 9012)",
      "check_status": "स्थिति जांचें",
      "checking": "जांच हो रही है...",
      "cancel": "रद्द करें",
      "verify": "सत्यापित करें",
      "otp_verification": "OTP सत्यापन",
      "otp_sent_message": "आपके आधार से जुड़े मोबाइल नंबर पर OTP भेजा गया है",
      "otp_placeholder": "6 अंकों का OTP दर्ज करें",
      "aadhaar_linking_status": "आधार लिंकिंग स्थिति",
      "dbt_activation_status": "DBT सक्रियण स्थिति",
      "npci_mapping_status": "NPCI मैपिंग स्थिति",
      "link_working": "लिंक काम कर रहा है ✅",
      "check_link": "लिंक जांचें ⚠️",
      "visit_portal": "पोर्टल पर जाएं",
      "status_report": "स्थिति जांच रिपोर्ट",
      "receipt_id": "रसीद आईडी",
      "all_services_active": "✅ सभी सेवाएं सक्रिय",
      "most_services_active": "🔵 अधिकतर सेवाएं सक्रिय",
      "some_services_active": "🟡 कुछ सेवाएं सक्रिय",
      "services_inactive": "🔴 सेवाएं निष्क्रिय", 
      "total_checks": "कुल जांच",
      "passed": "सफल",
      "failed": "असफल",
      "print_report": "रिपोर्ट प्रिंट करें",
      
      // Status Messages
      "aadhaar_linked_success": "आपका आधार सफलतापूर्वक लिंक है।",
      "aadhaar_linking_pending": "आधार लिंकिंग लंबित है। कृपया अपने बैंक से संपर्क करें।",
      "dbt_active": "आपका खाता DBT के लिए सक्रिय है।",
      "dbt_activation_pending": "DBT सक्रियण लंबित है। कृपया DBT पोर्टल पर जाएं।",
      "npci_mapping_complete": "NPCI मैपिंग पूरी हो गई है।",
      "npci_mapping_pending": "NPCI मैपिंग लंबित है। UPI ऐप से जांचें।",
      "invalid_aadhaar": "अवैध आधार नंबर",
      "aadhaar_12_digits": "आधार नंबर 12 अंकों का होना चाहिए",
      "otp_verified": "OTP सत्यापित! स्थिति जांच शुरू की जा रही है...",
      "wrong_otp": "गलत OTP! कृपया दोबारा कोशिश करें।",
      
      // Chatbot
      "type_message": "अपना संदेश टाइप करें...",
      "send": "भेजें",
      "typing": "टाइप कर रहे हैं...",
      "type_question": "अपना प्रश्न टाइप करें...",
      "chatbot_welcome": "नमस्ते 👋! मैं आपकी छात्रवृत्ति और DBT संबंधी प्रश्नों का समाधान करने के लिए यहाँ हूँ।",
      "api_error_message": "⚠️ त्रुटि: AI से उत्तर नहीं मिला। कृपया पुनः प्रयास करें।",
      "clear_chat": "चैट साफ़ करें",
      "quick_questions": "त्वरित प्रश्न",
      "check_dbt_status": "मैं अपनी DBT स्थिति कैसे जांचूं?",
      "aadhaar_linking_help": "आधार लिंकिंग में सहायता",
      "scholarship_info": "छात्रवृत्ति के बारे में बताएं",
      "npci_mapping_help": "NPCI मैपिंग क्या है?",
      "press_enter_send": "भेजने के लिए Enter दबाएं",
      "shift_enter_newline": "नई लाइन के लिए Shift+Enter",
      
      // ChatWidget
      "chatwidget_welcome": "नमस्ते! 👋 मैं DBT, आधार सीडिंग, छात्रवृत्ति और सरकारी योजनाओं के लिए आपका AI सहायक हूं। आज मैं आपकी कैसे मदद कर सकता हूं?",
      "ask_about_dbt": "DBT, छात्रवृत्ति, आधार के बारे में पूछें...",
      "ai_assistant": "AI सहायक",
      
      // About Page
      "about_title": "DBT चेकर के बारे में",
      "about_description": "DBT चेकर प्रत्यक्ष लाभ हस्तांतरण स्थिति और संबंधित सरकारी सेवाओं की जांच के लिए एक व्यापक मंच है।",
      
      // Resources Page
      "resources_title": "सहायता और संसाधन",
      "resources_subtitle": "अपने DBT और सरकारी सेवाओं के प्रश्नों के लिए उत्तर खोजें और सहायता प्राप्त करें।",
      "resources_hub_title": "आपका छात्रवृत्ति संसाधन केंद्र",
      "resources_hub_description": "अपनी छात्रवृत्ति यात्रा को आत्मविश्वास के साथ नेविगेट करने के लिए गाइड, वीडियो और उपकरण देखें।",
      "guides_faqs": "व्यापक गाइड और FAQ",
      "video_tutorials": "वीडियो ट्यूटोरियल और व्याख्याकर्ता",
      "official_documents": "आधिकारिक दस्तावेज़ और लिंक",
      "link_aadhaar_bank": "अपने आधार को अपने बैंक खाते से सही तरीके से लिंक करें।",
      "seed_aadhaar_npci": "अपने आधार को NPCI डेटाबेस में सीड करें।",
      "check_dbt_enabled": "जांचें कि क्या आपका खाता छात्रवृत्ति वितरण के लिए DBT-सक्षम है।",
      "understand_errors": "सामान्य त्रुटियों को समझें और उन्हें कैसे ठीक करें।",
      "dbt_benefits": "प्रत्यक्ष लाभ हस्तांतरण (DBT) और इसके लाभ।",
      "npci_payments": "NPCI कैसे छात्रवृत्ति भुगतान की सुविधा प्रदान करता है।",
      "govt_deadlines": "महत्वपूर्ण सरकारी समय सीमा और दस्तावेज़।",
      "govt_circulars": "छात्रवृत्ति और DBT से संबंधित सरकारी परिपत्र।",
      "npci_guidelines": "NPCI दिशानिर्देश और FAQ।",
      "scholarship_forms": "छात्रवृत्ति आवेदन पत्र और ट्रैकिंग पोर्टल।",
      "explore_now": "अभी देखें",
      "ai_chat_assistant": "AI चैट सहायक",
      "ai_chat_description": "कोई प्रश्न है? DBT, आधार सीडिंग और छात्रवृत्ति से संबंधित तुरंत उत्तर के लिए हमारे AI-चालित चैट सहायक से कभी भी पूछें।",
      "official_guidelines": "आधिकारिक दिशानिर्देश",
      "guidelines_description": "DBT सेवाओं के लिए नवीनतम आधिकारिक दिशानिर्देश और दस्तावेज़ीकरण प्राप्त करें।",
      "view_guidelines": "दिशानिर्देश देखें",
      "live_chat_support": "लाइव चैट सपोर्ट",
      "chat_support_description": "किसी भी प्रश्न या समस्या के लिए हमारी सहायता टीम से तुरंत सहायता प्राप्त करें।",
      "start_chatting": "चैट शुरू करें",
      "community_group": "आधिकारिक समुदाय में शामिल हों!",
      "community_description": "नवीनतम अपडेट, व्यक्तिगत सहायता और सहकर्मी समर्थन के लिए, हमारे आधिकारिक ग्रुप में शामिल हों।",
      "join_now": "अभी शामिल हों",
      
      // Notifications
      "notifications_title": "सरकारी सूचनाएं",
      "notifications_subtitle": "नवीनतम सरकारी घोषणाओं और अपनी खाता स्थिति के साथ अपडेट रहें।",
      "mark_all_read": "सभी को पढ़ा हुआ चिह्नित करें",
      "week_ago": "1 सप्ताह पहले",
      "weeks_ago": "2 सप्ताह पहले",
      
      // Common
      "government_of_india": "भारत सरकार",
      "direct_benefit_transfer": "प्रत्यक्ष लाभ हस्तांतरण विभाग",
      "digitally_signed": "डिजिटल हस्ताक्षर सत्यापित",
      "computer_generated": "यह एक कंप्यूटर जनरेटेड दस्तावेज है और इसमें हस्ताक्षर की आवश्यकता नहीं है।",
      "authorized_officer": "प्राधिकृत अधिकारी",
      "generated_on": "पर जेनेरेट किया गया",
      
      // Dashboard
      "dashboard_main_title": "जहाँ हर भुगतान एक बेहतर कल का निर्माण करता है",
      "students_benefited": "छात्रों को लाभ",
      "indians_touched": "भारतीय हमारी भुगतान प्रणालियों में से एक से जुड़े हुए हैं",
      "get_started": "शुरू करें",
      
      // About Page
      "about_mission_title": "एक सरल, शक्तिशाली मिशन",
      "about_mission_description": "भारत के हर छात्र के लिए छात्रवृत्ति को सुलभ, समझने योग्य और त्रुटि-मुक्त बनाना।",
      "about_who_we_are": "हम कौन हैं",
      "about_who_we_are_description": "हम एक छात्र-प्राथमिक डिजिटल प्लेटफॉर्म हैं जो प्रौद्योगिकी, पारदर्शिता और जागरूकता को मिलाकर प्रत्यक्ष लाभ हस्तांतरण (DBT) प्रक्रिया को सरल बनाने पर केंद्रित है।",
      "about_why_matters": "यह क्यों मायने रखता है",
      "about_why_matters_description": "हर साल, हजारों छात्र अधूरे आधार लिंकिंग, गुम बैंक सीडिंग, या DBT अपात्रता के मुद्दों के कारण सरकारी छात्रवृत्ति से चूक जाते हैं।",
      "about_what_we_do": "हम क्या करते हैं",
      
      // Notifications
      "notification_dbt_success_title": "DBT भुगतान सफल",
      "notification_dbt_success_message": "आपका छात्रवृत्ति भुगतान सफलतापूर्वक आपके खाते में जमा हो गया है।",
      "notification_update_title": "नई नीति अपडेट",
      "notification_update_message": "DBT योजना में नए बदलाव के बारे में जानकारी उपलब्ध है।",
      "notification_bank_title": "बैंक विवरण अपडेट",
      "notification_bank_message": "आपके बैंक खाते के विवरण में विसंगति पाई गई है। कृपया अपडेट करें।",
      
      // Students Page
      "students_quest_title": "आपकी छात्रवृत्ति यात्रा",
      "students_quest_subtitle": "यह सुनिश्चित करने के लिए एक यात्रा शुरू करें कि आपकी छात्रवृत्ति आप तक पहुंचे।",
      "stage1_title": "चरण 1: पहला कदम",
      "stage1_description": "आपके पास आपका आधार है और यह आपके बैंक खाते से लिंक है। बेहतरीन शुरुआत! यह एक सरल पहचान सत्यापन है, लेकिन छात्रवृत्ति के लिए यह अंतिम चरण नहीं है।",
      "stage2_title": "चरण 2: गुम पुल",
      "stage2_description": "कई छात्र चरण एक पर रुक जाते हैं। यह छात्रवृत्ति में देरी का सामान्य कारण है। आपके बैंक खाते को प्रत्यक्ष हस्तांतरण के लिए सरकारी सिस्टम से विशेष कनेक्शन की आवश्यकता है।",
      "stage3_title": "चरण 3: सुनहरी चाबी",
      "stage3_description": "यह महत्वपूर्ण हिस्सा है! आपको अपने बैंक खाते को 'NPCI मैप्ड' और 'आधार-सीडेड' कराना होगा। इसे एक विशेष चाबी प्राप्त करने के रूप में सोचें जो सरकारी फंड को आपके विशिष्ट खाते में प्रवेश करने की अनुमति देती है।",
      "stage4_title": "चरण 4: अंतिम गंतव्य",
      "stage4_description": "बधाई हो! आपका खाता अब पूरी तरह से DBT-सक्षम है। सरकारी छात्रवृत्ति फंड बिना किसी देरी के सीधे और सुरक्षित रूप से आपके बैंक खाते में जमा हो जाएगा। मिशन पूरा!",
      "need_help_quest": "अपनी यात्रा में मदद चाहिए?",
      "check_status_or_video": "अपनी खाता स्थिति जांचें या व्याख्याकर्ता वीडियो देखें।",
      "check_account_now": "अभी अपना खाता जांचें",
      "watch_video": "वीडियो देखें"
    }
  },
  pa: {
    translation: {
      // Navigation
      "Home": "ਘਰ",
      "AboutUs": "ਸਾਡੇ ਬਾਰੇ",
      "Students": "ਵਿਦਿਆਰਥੀ", 
      "Compare": "ਤੁਲਨਾ ਕਰੋ",
      "DbtChecker": "DBT ਚੈਕਰ",
      "Resources": "ਸਰੋਤ",
      "Notifications": "ਸੂਚਨਾਵਾਂ",
      "Dashboard": "ਡੈਸ਼ਬੋਰਡ",
      "Chatbot": "ਚੈਟਬੋਟ",
      
      // Language Switcher
      "language": "ਭਾਸ਼ਾ",
      "english": "English",
      "hindi": "हिन्दी",
      "punjabi": "ਪੰਜਾਬੀ",
      "gujarati": "ગુજરાતી", 
      "bengali": "বাংলা",
      
      // DBT Checker
      "dbt_checker_title": "ਆਪਣੀ DBT ਸਥਿਤੀ ਦੀ ਜਾਂਚ ਕਰੋ",
      "dbt_checker_subtitle": "ਆਪਣੇ ਆਧਾਰ, ਬੈਂਕ ਅਤੇ NPCI ਮੈਪਿੰਗ ਦੀ ਸਥਿਤੀ ਇੱਕ ਨਜ਼ਰ ਵਿੱਚ ਜਾਣੋ।",
      "aadhaar_placeholder": "ਆਪਣਾ 12 ਅੰਕਾਂ ਦਾ ਆਧਾਰ ਨੰਬਰ ਦਰਜ ਕਰੋ (ਜਿਵੇਂ: 1234 5678 9012)",
      "check_status": "ਸਥਿਤੀ ਜਾਂਚੋ",
      "checking": "ਜਾਂਚ ਹੋ ਰਹੀ ਹੈ...",
      "cancel": "ਰੱਦ ਕਰੋ",
      "verify": "ਪੁਸ਼ਟੀ ਕਰੋ",
      "otp_verification": "OTP ਪੁਸ਼ਟੀ",
      "otp_sent_message": "ਤੁਹਾਡੇ ਆਧਾਰ ਨਾਲ ਜੁੜੇ ਮੋਬਾਈਲ ਨੰਬਰ 'ਤੇ OTP ਭੇਜਿਆ ਗਿਆ ਹੈ",
      "otp_placeholder": "6 ਅੰਕਾਂ ਦਾ OTP ਦਰਜ ਕਰੋ",
      "aadhaar_linking_status": "ਆਧਾਰ ਲਿੰਕਿੰਗ ਸਥਿਤੀ",
      "dbt_activation_status": "DBT ਸਰਗਰਮੀ ਸਥਿਤੀ",
      "npci_mapping_status": "NPCI ਮੈਪਿੰਗ ਸਥਿਤੀ",
      "link_working": "ਲਿੰਕ ਕੰਮ ਕਰ ਰਿਹਾ ਹੈ ✅",
      "check_link": "ਲਿੰਕ ਜਾਂਚੋ ⚠️",
      "visit_portal": "ਪੋਰਟਲ 'ਤੇ ਜਾਓ"
      // ... more translations
    }
  },
  gu: {
    translation: {
      // Navigation
      "Home": "ઘર",
      "AboutUs": "અમારા વિશે",
      "Students": "વિદ્યાર્થીઓ",
      "Compare": "સરખામણી કરો", 
      "DbtChecker": "DBT ચેકર",
      "Resources": "સંસાધનો",
      "Notifications": "સૂચનાઓ",
      "Dashboard": "ડેશબોર્ડ",
      "Chatbot": "ચેટબોટ",
      
      // Language Switcher
      "language": "ભાષા",
      "english": "English", 
      "hindi": "हिन्दी",
      "punjabi": "ਪੰਜਾਬੀ",
      "gujarati": "ગુજરાતી",
      "bengali": "বাংলা"
      // ... more translations
    }
  },
  bn: {
    translation: {
      // Navigation
      "Home": "হোম",
      "AboutUs": "আমাদের সম্পর্কে",
      "Students": "ছাত্রছাত্রী",
      "Compare": "তুলনা করুন",
      "DbtChecker": "DBT চেকার", 
      "Resources": "সম্পদ",
      "Notifications": "বিজ্ঞপ্তি",
      "Dashboard": "ড্যাশবোর্ড",
      "Chatbot": "চ্যাটবট",
      
      // Language Switcher
      "language": "ভাষা",
      "english": "English",
      "hindi": "हिन्दी",
      "punjabi": "ਪੰਜਾਬੀ", 
      "gujarati": "ગુજરાતી",
      "bengali": "বাংলা"
      // ... more translations
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    lng: 'hi', // Default to Hindi for Indian government site
    debug: false,
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
    
    interpolation: {
      escapeValue: false,
    },
    
    react: {
      useSuspense: false,
    }
  });

export default i18n;