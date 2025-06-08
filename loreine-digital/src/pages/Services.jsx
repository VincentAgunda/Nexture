import React, { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { FaLaptopCode, FaMobileAlt, FaPaintBrush, FaBullhorn, FaSun, FaMoon, FaRobot, FaChartLine, FaTimes } from "react-icons/fa";

// Service data with expanded details (new services at the top)
const services = [
  {
    icon: <FaLaptopCode />,
    title: "System Administration and Engineering",
    desc: "Professional system administration and engineering services to ensure your infrastructure runs smoothly and securely.",
    details: [
      "Server setup and maintenance",
      "Network configuration and security",
      "System monitoring and optimization",
      "Disaster recovery planning",
      "Performance tuning"
    ],
    bgDark: "bg-[#5A7F6B]",
    bgLight: "bg-[#E0E9F7]",
    imgBgDark: "bg-gray-900",
    imgBgLight: "bg-white",
  },
  {
    icon: <FaLaptopCode />,
    title: "Database Design",
    desc: "Custom database solutions tailored to your business needs with optimal performance and scalability.",
    details: [
      "Relational database design",
      "NoSQL database implementation",
      "Data modeling and optimization",
      "Database migration services",
      "Performance tuning and indexing"
    ],
    bgDark: "bg-[#5D5179]",
    bgLight: "bg-[#EDEAF2]",
    imgBgDark: "bg-gray-900",
    imgBgLight: "bg-white",
  },
  {
    icon: <FaLaptopCode />,
    title: "Software Testing",
    desc: "Comprehensive testing services to ensure your software is reliable, secure, and performs as expected.",
    details: [
      "Unit and integration testing",
      "Automated testing solutions",
      "Performance and load testing",
      "Security vulnerability testing",
      "QA process implementation"
    ],
    bgDark: "bg-[#8C5E58]",
    bgLight: "bg-[#F5EAE8]",
    imgBgDark: "bg-gray-900",
    imgBgLight: "bg-white",
  },
  {
    icon: <FaLaptopCode />,
    title: "Software and System Maintenance",
    desc: "Ongoing support and maintenance services to keep your systems running at peak performance.",
    details: [
      "Software updates and patches",
      "Bug fixes and troubleshooting",
      "Performance monitoring",
      "Technical support",
      "Documentation updates"
    ],
    bgDark: "bg-[#4D7C8A]",
    bgLight: "bg-[#E4F0F3]",
    imgBgDark: "bg-gray-900",
    imgBgLight: "bg-white",
  },
  {
    icon: <FaLaptopCode />,
    title: "Cloud Management",
    desc: "Expert cloud solutions to help you migrate, optimize, and manage your cloud infrastructure.",
    details: [
      "Cloud architecture design",
      "AWS/Azure/GCP implementation",
      "Cost optimization strategies",
      "Security and compliance",
      "DevOps automation"
    ],
    bgDark: "bg-[#5A7F6B]",
    bgLight: "bg-[#E0ECF1]",
    imgBgDark: "bg-gray-900",
    imgBgLight: "bg-white",
  },
  {
    icon: <FaPaintBrush />,
    title: "UI/UX Design",
    desc: "User-centered design solutions that create intuitive and engaging digital experiences.",
    details: [
      "User research and testing",
      "Wireframing and prototyping",
      "Interaction design",
      "Usability evaluation",
      "Design system creation"
    ],
    bgDark: "bg-[#7D6B8D]",
    bgLight: "bg-[#F1EDF5]",
    imgBgDark: "bg-gray-900",
    imgBgLight: "bg-white",
  },
  {
    icon: <FaPaintBrush />,
    title: "Graphic Design",
    desc: "Creative visual solutions that communicate your brand message effectively.",
    details: [
      "Print and digital media design",
      "Illustration and iconography",
      "Typography and layout",
      "Photo editing and manipulation",
      "Visual content creation"
    ],
    bgDark: "bg-[#9D6B53]",
    bgLight: "bg-[#F7EFEA]",
    imgBgDark: "bg-gray-900",
    imgBgLight: "bg-white",
  },
  {
    icon: <FaLaptopCode />,
    title: "System Management",
    desc: "Comprehensive system management services to optimize your IT infrastructure.",
    details: [
      "IT infrastructure management",
      "Configuration management",
      "Patch management",
      "System health monitoring",
      "Incident management"
    ],
    bgDark: "bg-[#4A6FA5]",
    bgLight: "bg-[#E8F3EC]",
    imgBgDark: "bg-gray-900",
    imgBgLight: "bg-white",
  },
  // Original services below
  {
    icon: <FaLaptopCode />,
    title: "Web Development",
    desc: "Cutting-edge web solutions with responsive design, performance optimization, and seamless UX.",
    details: [
      "Custom website development",
      "E-commerce solutions",
      "CMS integration (WordPress, Shopify)",
      "API development & integration",
      "Performance optimization"
    ],
    bgDark: "bg-[#7B93AA]",
    bgLight: "bg-[#E3EDF7]",
    imgBgDark: "bg-gray-900",
    imgBgLight: "bg-white",
  },
  {
    icon: <FaMobileAlt />,
    title: "Mobile Apps",
    desc: "Native and cross-platform mobile applications with intuitive interfaces and robust functionality.",
    details: [
      "iOS and Android app development",
      "React Native cross-platform apps",
      "UI/UX mobile design",
      "App store optimization",
      "Push notification systems"
    ],
    bgDark: "bg-[#E7E1DA]",
    bgLight: "bg-[#f9f6f2]",
    imgBgDark: "bg-gray-800",
    imgBgLight: "bg-white",
  },
  {
    icon: <FaPaintBrush />,
    title: "Brand Design",
    desc: "Cohesive visual identities that communicate your brand's essence across all touchpoints.",
    details: [
      "Logo design & branding",
      "Visual identity systems",
      "Marketing collateral",
      "Packaging design",
      "Brand guidelines"
    ],
    bgDark: "bg-[#5E7B80]",
    bgLight: "bg-[#dfeae7]",
    imgBgDark: "bg-gray-900",
    imgBgLight: "bg-white",
  },
  {
    icon: <FaBullhorn />,
    title: "Digital Strategy",
    desc: "Data-driven marketing strategies to amplify your reach and engagement across digital channels.",
    details: [
      "Social media strategy",
      "Content marketing plans",
      "SEO optimization",
      "Email marketing campaigns",
      "Analytics & reporting"
    ],
    bgDark: "bg-[#22344C]",
    bgLight: "bg-[#e0e5ea]",
    imgBgDark: "bg-gray-800",
    imgBgLight: "bg-white",
  },
  {
    icon: <FaRobot />,
    title: "AI Integration",
    desc: "Intelligent automation and machine learning solutions to enhance your business processes and decision-making.",
    details: [
      "Custom AI solutions",
      "Machine learning models",
      "Chatbot development",
      "Predictive analytics",
      "Process automation"
    ],
    bgDark: "bg-[#6D466B]",
    bgLight: "bg-[#f0e6ef]",
    imgBgDark: "bg-gray-900",
    imgBgLight: "bg-white",
  },
  {
    icon: <FaChartLine />,
    title: " Consultancy",
    desc: "Expert guidance on technology stack selection, architecture design, and digital transformation strategies.",
    details: [
      "Technology audits",
      "System architecture design",
      "Cloud migration",
      "DevOps implementation",
      "Team training & mentoring"
    ],
    bgDark: "bg-[#3A5A40]",
    bgLight: "bg-[#e6efe7]",
    imgBgDark: "bg-gray-800",
    imgBgLight: "bg-white",
  },
];

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease: "easeOut" },
  },
};

const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    transition: { duration: 0.3 }
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  }
};

const modalItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

// Service card component
const ServiceSection = ({ service, index, darkMode, openServiceDetailsModal }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeInUp}
      className={`relative overflow-hidden ${
        darkMode ? service.bgDark : service.bgLight
      } rounded-[50px] flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-12 py-16 md:py-20 transition-all duration-500`}
    >
      {/* Icon Container */}
      <div
        className={`relative w-60 h-60 md:w-80 md:h-80 rounded-full ${
          darkMode ? service.imgBgDark : service.imgBgLight
        } shadow-2xl mb-8 md:mb-0 ${
          index % 2 === 0 ? "md:mr-12" : "md:ml-12"
        } transition-all duration-500`}
      >
        <div className="absolute inset-0 rounded-full overflow-hidden flex items-center justify-center">
          <div className={`text-5xl md:text-6xl ${darkMode ? "text-white" : "text-black"}`}>
            {service.icon}
          </div>
        </div>
      </div>

      {/* Text Content */}
      <div
        className={`flex-1 max-w-xl text-center md:text-left ${
          index % 2 !== 0 ? "md:order-first md:text-right" : ""
        }`}
      >
        <h3 className={`text-2xl md:text-3xl font-normal mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
          {service.title}
        </h3>
        <p className={`text-base md:text-lg font-normal leading-relaxed mb-6 ${darkMode ? "text-white/80" : "text-gray-700"}`}>
          {service.desc}
        </p>
        <button
          onClick={() => openServiceDetailsModal(service)}
          className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold px-5 py-2 rounded-full transition-all hover:scale-105 active:scale-95"
        >
          Show me more
        </button>
      </div>
    </motion.div>
  );
};

// Consultation Form Component (reusable)
const ConsultationForm = ({ darkMode, onClose, initialService = '' }) => {
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    plan: initialService, // Pre-fill service if provided
    message: ''
  });
  const [message, setMessage] = useState('');

  const sendEmail = (e) => {
    e.preventDefault();
    setMessage("Sending message...");
    // Simulate API call - In a real app, you'd send this data to your backend
    setTimeout(() => {
      setMessage("Message sent successfully! We'll get back to you shortly.");
      setFormData({
        name: '',
        email: '',
        phone: '',
        plan: '',
        message: ''
      });
      // Optionally close the modal after a short delay
      setTimeout(onClose, 2000);
    }, 2000);
  };

  return (
    <div className={`overflow-y-auto flex-1 p-6 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <motion.h2
        id="modal-title"
        className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}
        variants={modalItem} // Use modalItem for animation
      >
        Get a Free Quote
      </motion.h2>

      <form ref={formRef} onSubmit={sendEmail}>
        <motion.div
          className="space-y-4"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={modalItem}>
            <label htmlFor="name" className={`block text-sm mb-1 ${darkMode ? 'text-white/80' : 'text-gray-700'}`}>Your Name</label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className={`w-full rounded-lg px-4 py-3 ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'} border ${darkMode ? 'border-gray-700' : 'border-gray-300'} focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400 outline-none transition`}
              required
            />
          </motion.div>

          <motion.div variants={modalItem}>
            <label htmlFor="email" className={`block text-sm mb-1 ${darkMode ? 'text-white/80' : 'text-gray-700'}`}>Email Address</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className={`w-full rounded-lg px-4 py-3 ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'} border ${darkMode ? 'border-gray-700' : 'border-gray-300'} focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400 outline-none transition`}
              required
            />
          </motion.div>

          <motion.div variants={modalItem}>
            <label htmlFor="phone" className={`block text-sm mb-1 ${darkMode ? 'text-white/80' : 'text-gray-700'}`}>Phone Number </label>
            <input
              id="phone"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className={`w-full rounded-lg px-4 py-3 ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'} border ${darkMode ? 'border-gray-700' : 'border-gray-300'} focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400 outline-none transition`}
            />
          </motion.div>

          <motion.div variants={modalItem}>
            <label htmlFor="service" className={`block text-sm mb-1 ${darkMode ? 'text-white/80' : 'text-gray-700'}`}>Interested Service</label>
            <select
              id="service"
              name="service"
              value={formData.plan}
              onChange={(e) => setFormData({...formData, plan: e.target.value})}
              className={`w-full rounded-lg px-4 py-3 ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'} border ${darkMode ? 'border-gray-700' : 'border-gray-300'} focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400 outline-none transition appearance-none`}
              required
            >
              <option value="">Select a service</option>
              {services.map(s => (
                <option key={s.title} value={s.title}>{s.title}</option>
              ))}
            </select>
          </motion.div>

          <motion.div variants={modalItem}>
            <label htmlFor="message" className={`block text-sm mb-1 ${darkMode ? 'text-white/80' : 'text-gray-700'}`}>Project Details</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              rows="4"
              className={`w-full rounded-lg px-4 py-3 ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'} border ${darkMode ? 'border-gray-700' : 'border-gray-300'} focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400 outline-none transition`}
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
          variants={modalItem}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {message === "Sending message..." ? "Sending..." : "Send Message"}
        </motion.button>
      </form>
    </div>
  );
};

// Service Details Modal component
const ServiceDetailsModal = ({ service, onClose, darkMode, openConsultationModal }) => {
  return (
    <motion.div
      variants={modalVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className={`relative max-w-2xl w-full rounded-3xl overflow-hidden ${darkMode ? 'bg-gray-900' : 'bg-white'} shadow-2xl`}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={onClose}
        className={`absolute top-4 right-4 z-10 p-2 rounded-full ${darkMode ? 'text-white hover:bg-gray-800' : 'text-gray-800 hover:bg-gray-100'}`}
      >
        <FaTimes className="text-xl" />
      </button>

      <div className={`p-8 md:p-12 ${darkMode ? service.bgDark : service.bgLight}`}>
        <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
          <div className={`w-32 h-32 rounded-full flex items-center justify-center ${darkMode ? service.imgBgDark : service.imgBgLight}`}>
            <div className={`text-4xl ${darkMode ? 'text-white' : 'text-black'}`}>
              {service.icon}
            </div>
          </div>
          <div>
            <h2 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {service.title}
            </h2>
            <p className={`text-lg ${darkMode ? 'text-white/80' : 'text-gray-700'}`}>
              {service.desc}
            </p>
          </div>
        </div>

        <div className="mt-8">
          <h3 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            What we offer:
          </h3>
          <ul className="space-y-3">
            {service.details.map((item, i) => (
              <motion.li
                key={i}
                variants={modalItem}
                className={`flex items-start ${darkMode ? 'text-white/90' : 'text-gray-700'}`}
              >
                <span className={`inline-block w-2 h-2 rounded-full mt-2 mr-3 ${darkMode ? 'bg-yellow-400' : 'bg-yellow-500'}`}></span>
                {item}
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={() => openConsultationModal(service.title)} // Pass the service title to pre-fill the form
            className={`px-8 py-3 rounded-full font-semibold transition-all ${darkMode ? 'bg-yellow-400 hover:bg-yellow-300 text-black' : 'bg-blue-600 hover:bg-blue-500 text-white'}`}
          >
            Get Started
          </button>
        </div>
      </div>
    </motion.div>
  );
};


// Main Services Page component
const ServicesPage = () => {
  const [darkMode, setDarkMode] = useState(true); // Dark mode set as default
  const [selectedService, setSelectedService] = useState(null); // State for service details modal
  const [showConsultationModal, setShowConsultationModal] = useState(false); // State for consultation modal
  const [prefilledService, setPrefilledService] = useState(''); // State to pass service to form

  const openServiceDetailsModal = (service) => {
    setSelectedService(service);
    document.body.style.overflow = 'hidden';
  };

  const closeServiceDetailsModal = () => {
    setSelectedService(null);
    document.body.style.overflow = 'auto';
  };

  const openConsultationFormModal = (serviceTitle = '') => {
    setPrefilledService(serviceTitle);
    setShowConsultationModal(true);
    // If a service details modal is open, close it before opening the consultation form
    if (selectedService) {
      closeServiceDetailsModal();
    }
    document.body.style.overflow = 'hidden';
  };

  const closeConsultationFormModal = () => {
    setShowConsultationModal(false);
    setPrefilledService('');
    document.body.style.overflow = 'auto';
  };

  return (
    <section className={`${darkMode ? "bg-black" : "bg-white"} min-h-screen transition-colors duration-500`}>
      <div className="max-w-7xl mx-auto py-20 px-4 md:px-8">
        {/* Theme Toggle */}
        <div className="flex justify-end mb-6">
          <button
            onClick={() => setDarkMode((prev) => !prev)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-full text-sm transition-all"
          >
            {darkMode ? <FaSun /> : <FaMoon />}
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>

        {/* Services Title */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={`text-4xl md:text-5xl font-medium text-center mb-24 tracking-tight ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            Services
          </span>
        </motion.h2>

        {/* Services List */}
        <div className="space-y-24">
          {services.map((service, index) => (
            <ServiceSection
              key={index}
              service={service}
              index={index}
              darkMode={darkMode}
              openServiceDetailsModal={openServiceDetailsModal}
            />
          ))}
        </div>
      </div>

      {/* Service Details Modal */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={closeServiceDetailsModal}
          >
            <ServiceDetailsModal
              service={selectedService}
              onClose={closeServiceDetailsModal}
              darkMode={darkMode}
              openConsultationModal={openConsultationFormModal}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Consultation Form Modal */}
      <AnimatePresence>
        {showConsultationModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeConsultationFormModal}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className={`relative w-full max-w-md max-h-[90vh] rounded-3xl overflow-hidden ${darkMode ? 'bg-gray-900' : 'bg-white'} shadow-2xl flex flex-col`}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
            >
              <button
                onClick={closeConsultationFormModal}
                className={`absolute top-3 right-3 z-10 p-2 rounded-full ${darkMode ? 'text-white hover:bg-gray-800' : 'text-gray-800 hover:bg-gray-100'}`}
                aria-label="Close modal"
              >
                <FaTimes className="text-xl" />
              </button>
              <ConsultationForm
                darkMode={darkMode}
                onClose={closeConsultationFormModal}
                initialService={prefilledService}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ServicesPage;