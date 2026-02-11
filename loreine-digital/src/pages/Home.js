import React, { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import { Close } from "@mui/icons-material";

// Components
import Comprehensive from "./Comprehensive";
import NextureWork from "./NextureWork";
import Questions from "./Questions";

const FONT_STYLE = {
  fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
  fontWeight: 300
};

// Mobile Mockup Component (Local to Home)
const MobileMockup = () => (
  <motion.div
    className="relative"
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: 0.2, duration: 0.5 }}
  >
    <div className="relative mx-auto w-full max-w-[240px] md:max-w-[280px] aspect-[9/19] bg-white rounded-[30px] overflow-hidden border-6 border-gray-200 shadow-xl p-0.5">
      <div className="relative w-full h-full overflow-hidden">
        <img
          src="camera1.webp"
          alt="App interface"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute top-0 left-0 right-0 h-8 bg-white/80 backdrop-blur-sm flex items-center justify-between px-3 text-gray-900 text-[10px]">
          <span>9:41</span>
          <div className="flex space-x-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M5 10l-2 0 0 4 2 0 0-4z" />
            </svg>
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M13 8l-2 0 0 8 2 0 0-8z" />
            </svg>
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17 5l-2 0 0 11 2 0 0-11z" />
            </svg>
          </div>
        </div>
        <div className="absolute top-12 right-3 bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium">
          Tech Ready
        </div>
        <div className="absolute bottom-16 left-3 bg-white/90 text-gray-900 px-3 py-1.5 rounded-lg">
          <span className="text-xl font-bold">21i</span>
          <span className="block text-[10px]">Track</span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-white/80 backdrop-blur-sm flex items-center justify-around">
          <div className="w-5 h-5 rounded-full bg-blue-500"></div>
          <div className="w-5 h-5 rounded-full bg-gray-300"></div>
          <div className="w-5 h-5 rounded-full bg-gray-300"></div>
        </div>
      </div>
    </div>
    <div className="absolute -bottom-4 -left-4 w-24 h-24 rounded-full bg-blue-400/20 blur-xl"></div>
  </motion.div>
);

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    plan: "",
    message: ""
  });
  const [message, setMessage] = useState("");
  const formRef = useRef();

  const handleOpenModal = useCallback(() => setShowModal(true), []);

  const sendEmail = useCallback(async (e) => {
    e.preventDefault();
    setMessage("Sending message...");

    try {
      await emailjs.sendForm(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        formRef.current,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      );
      setMessage("Message sent successfully! We'll contact you soon.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        plan: "",
        message: ""
      });
    } catch (error) {
      console.error(error);
      setMessage("Failed to send message. Please try again later.");
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#F0F8FF] text-[#002D62] overflow-x-hidden transition-colors duration-300"
      style={FONT_STYLE}
    >
      {/* Hero Section */}
      <section className="relative py-24 px-6 md:px-16 lg:px-32 overflow-hidden text-gray-900">
        <div className="absolute inset-0">
          <img
            src="camera1.webp"
            alt="Background"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-white/70 backdrop-blur-sm"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight mb-5">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#007AFF] to-[#005ECB] font-medium tracking-tight">Nexture Digital,</span><br />
              Designing <span className="text-[#005ECB]">futuristic</span> experiences
            </h1>
            <p className="text-gray-600 text-lg md:text-xl max-w-md mb-6">
              We blend AI, neural UX, and modern tech into sleek adaptive interfaces.
            </p>
            <div className="flex flex-wrap gap-4">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleOpenModal}
                className="px-6 py-3 bg-[#007AFF] hover:bg-[#005ECB] rounded-lg text-base font-medium shadow-md transition text-white"
              >
                Book a strategic Call
              </motion.button>
              <motion.a
                href="/services"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-6 py-3 border border-gray-300 hover:border-[#007AFF] rounded-lg text-base font-medium transition text-gray-700"
              >
                Our Services
              </motion.a>
            </div>
          </motion.div>

          <MobileMockup />
        </div>
      </section>

      {/* Services Section */}
      <Comprehensive onOpenModal={handleOpenModal} />

      {/* Portfolio Section */}
      <NextureWork />

      {/* FAQ Section */}
      <Questions />

      {/* Consultation Form Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setShowModal(false)}
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, scale: 0.95 },
                visible: { opacity: 1, scale: 1 },
                exit: { opacity: 0, scale: 0.95 }
              }}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative w-full max-w-md max-h-[90vh] rounded-3xl overflow-hidden bg-white shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-3 right-3 z-10 p-2 rounded-full text-gray-800 hover:bg-gray-100"
                aria-label="Close modal"
              >
                <Close className="text-xl" />
              </button>

              <div className="overflow-y-auto flex-1 p-6 bg-white">
                <motion.h2
                  className="text-2xl font-bold mb-6 text-gray-900"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  Get a Free Quote
                </motion.h2>

                <form ref={formRef} onSubmit={sendEmail}>
                  <motion.div
                    className="space-y-4"
                    initial="hidden"
                    animate="visible"
                    variants={{
                      hidden: { opacity: 0 },
                      visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
                    }}
                  >
                    {[
                      { id: "name", label: "Your Name", type: "text", required: true },
                      { id: "email", label: "Email Address", type: "email", required: true },
                      { id: "phone", label: "Phone Number", type: "tel", required: false }
                    ].map((field) => (
                      <motion.div
                        key={field.id}
                        variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                      >
                        <label htmlFor={field.id} className="block text-sm mb-1 text-gray-700">{field.label}</label>
                        <input
                          id={field.id}
                          type={field.type}
                          name={field.id}
                          value={formData[field.id]}
                          onChange={(e) => setFormData({ ...formData, [field.id]: e.target.value })}
                          className="w-full rounded-lg px-4 py-3 bg-gray-100 text-gray-900 border border-gray-300 focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400 outline-none transition"
                          required={field.required}
                        />
                      </motion.div>
                    ))}

                    <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>
                      <label htmlFor="plan" className="block text-sm mb-1 text-gray-700">Interested Service</label>
                      <select
                        id="plan"
                        name="plan"
                        value={formData.plan}
                        onChange={(e) => setFormData({ ...formData, plan: e.target.value })}
                        className="w-full rounded-lg px-4 py-3 bg-gray-100 text-gray-900 border border-gray-300 focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400 outline-none transition appearance-none"
                        required
                      >
                        <option value="">Select a service</option>
                        <option value="Basic Website">Basic Plan</option>
                        <option value="E-commerce Website">E-commerce Website</option>
                        <option value="Custom Solution">Custom Solution</option>
                      </select>
                    </motion.div>

                    <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>
                      <label htmlFor="message" className="block text-sm mb-1 text-gray-700">Project Details</label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        rows="4"
                        className="w-full rounded-lg px-4 py-3 bg-gray-100 text-gray-900 border border-gray-300 focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400 outline-none transition"
                        required
                      ></textarea>
                    </motion.div>
                  </motion.div>

                  {message && (
                    <motion.div
                      className={`mt-4 p-3 rounded-lg ${message.includes("successfully") ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      role="alert"
                    >
                      {message}
                    </motion.div>
                  )}

                  <motion.button
                    type="submit"
                    className="w-full mt-6 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold py-3 px-6 rounded-lg transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {message === "Sending message..." ? "Sending..." : "Send Message"}
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Home;