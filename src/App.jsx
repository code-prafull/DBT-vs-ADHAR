import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Compare from "./pages/Compare";
import DBTChecker from "./pages/DBTChecker";
import Resources from "./pages/Resources";
import Notifications from "./pages/Notifications";
import Chatbot from "./pages/Chatbot";
import ChatWidget from "./components/ChatWidget";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Footer from "./pages/Footer";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        {/* Navbar */}
        <Navbar />

        {/* Page Routes */}
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/students" element={<Students />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/dbt-checker" element={<DBTChecker />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/about" element={<About />} />
            <Route path="/chatbot" element={<Chatbot />} />
          </Routes>
        </div>

        {/* Chat Widget */}
        <ChatWidget />

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}



