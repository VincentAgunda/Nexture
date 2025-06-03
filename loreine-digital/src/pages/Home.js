import React, { useState, useEffect, useRef, useCallback, useMemo, createContext, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaLaptopCode, FaMobileAlt, FaBullhorn, FaChevronDown, FaPaintBrush, FaTimes } from "react-icons/fa";
import { FiArrowRight, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import emailjs from "@emailjs/browser";

// Theme Context
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(savedTheme);
  }, []);

  const toggleTheme = () => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

// Theme Toggle Button
const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={`fixed bottom-6 right-6 z-50 p-3 rounded-full shadow-lg flex items-center justify-center ${
        theme === 'dark' ? 'bg-white text-gray-900' : 'bg-gray-900 text-white'
      }`}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
    >
      {theme === 'dark' ? (
        <span className="text-xl">☀️</span>
      ) : (
        <span className="text-xl">🌙</span>
      )}
    </motion.button>
  );
};

// Constants
const FONT_STYLE = {
  fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
  fontWeight: 300
};

const ANIMATION_VARIANTS = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.4, ease: "easeInOut" }
  },
  slideUp: {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  },
  scaleUp: {
    initial: { opacity: 0, scale: 0.96 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

// Data
const PORTFOLIO_ITEMS = [
  {
    id: 1,
    title: "Quantum UI Framework",
    category: "Web Design",
    image: "camera3.webp",
    excerpt: "Next-gen interface system leveraging quantum computing principles"
  },
  {
    id: 2,
    title: "Neural Commerce App",
    category: "Mobile App",
    image: "default-blog1.webp",
    excerpt: "Thought-controlled shopping experience with biometric feedback"
  },
  {
    id: 3,
    title: "Digital Branding",
    category: "Branding",
    image: "camera4.webp",
    excerpt: "3D identity system for spatial computing platforms"
  },
  {
    id: 4,
    title: "AI Marketing Suite",
    category: "Marketing",
    image: "camera1.webp",
    excerpt: "Self-optimizing campaign system with predictive analytics"
  }
];

const NEWS_DATA = [
  {
    title: 'The Future of UI/UX in 2025',
    date: 'Apr 10, 2025',
    image: 'camera1.webp',
    excerpt: "How neural interfaces are revolutionizing design paradigms"
  },
  {
    title: 'The Future of Web Design in 2025',
    date: 'Mar 28, 2025',
    image: 'camera1.webp',
    excerpt: "Building ultra-fast content systems with quantum caching"
  },
  {
    title: 'Neural Interface Design Patterns',
    date: 'Mar 15, 2025',
    image: 'camera1.webp',
    excerpt: "How GPT-5 is automating 80% of frontend development"
  }
];

const FAQ_DATA = [
 {
    q: "What's the timeline for building a website?",
    a: "Basic websites take 2-4 weeks, e-commerce or custom solutions may take longer."
  },
  {
    q: "What's included in the quoted price?",
    a: "Design, development, basic SEO, responsiveness, and agreed features."
  },
  {
    q: "How does payment work?",
    a: "Initial deposit to begin, balance due after you're satisfied."
  },
  {
    q: "Do you offer maintenance?",
    a: "Yes, optional ongoing maintenance packages available."
  }
];

const Home = () => {
  const { theme } = useTheme();

  // Theme-specific styles
  const themeStyles = {
    dark: {
      background: 'bg-gray-950',
      text: 'text-gray-100',
      secondaryText: 'text-gray-400',
      accentText: 'text-cyan-400',
      accentTextHover: 'hover:text-cyan-300',
      border: 'border-gray-800',
      cardBg: 'bg-gray-900/30',
      modalBg: 'bg-gray-900',
      buttonBg: 'bg-cyan-600 hover:bg-cyan-700',
      buttonSecondary: 'border-gray-600 hover:border-cyan-500',
      gradientText: 'from-cyan-400 to-blue-500'
    },
    light: {
      background: 'bg-[#F0F8FF]',
      text: 'text-[#002D62]',
      secondaryText: 'text-[#334155]',
      accentText: 'text-[#007AFF]',
      accentTextHover: 'hover:text-[#005ECB]',
      border: 'border-[#E5E7EB]',
      cardBg: 'bg-white',
      modalBg: 'bg-white',
      buttonBg: 'bg-[#007AFF] hover:bg-[#005ECB]',
      buttonSecondary: 'border-[#E5E7EB] hover:border-[#007AFF]',
      gradientText: 'from-[#007AFF] to-[#005ECB]'
    }
  };

  const currentTheme = themeStyles[theme];

  // State
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    plan: "",
    message: ""
  });
  const [message, setMessage] = useState("");
  const [activeFAQ, setActiveFAQ] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [services] = useState([
    {
      title: "Web Development",
      description: "Crafting seamless and intuitive web experiences with cutting-edge technologies.",
      icon: <FaLaptopCode />
    },
    {
      title: "Mobile App Development",
      description: "Building high-performance mobile applications for iOS and Android platforms.",
      icon: <FaMobileAlt />
    },
    
    {
      title: "UI/UX Design",
      description: "Creating visually stunning and user-centered designs that enhance usability.",
      icon: <FaPaintBrush />
    }
  ]);

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterMessage, setNewsletterMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Refs
  const formRef = useRef();
  const newsContainerRef = useRef();
  const animationFrameRef = useRef();
  const newsletterFormRef = useRef();

  // Memoized data
  const memoizedPortfolioItems = useMemo(() => PORTFOLIO_ITEMS, []);
  const memoizedNewsData = useMemo(() => NEWS_DATA, []);
  const memoizedFaqData = useMemo(() => FAQ_DATA, []);

  // Event handlers
  const handleFormChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const toggleFAQ = useCallback((index) => {
    setActiveFAQ(prev => prev === index ? null : index);
  }, []);

  // Email sending
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
      setMessage("Failed to send message. Please try again later.");
    }
  }, []);

  // Newsletter submission
  const handleNewsletterSubmit = useCallback(async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setNewsletterMessage("Subscribing...");

    try {
      await emailjs.sendForm(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        newsletterFormRef.current,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      );
      setNewsletterMessage("Thank you for subscribing! You'll receive our next update.");
      setNewsletterEmail("");
    } catch (error) {
      setNewsletterMessage("Failed to subscribe. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  // News animation
  useEffect(() => {
    if (!newsContainerRef.current) return;

    const container = newsContainerRef.current;
    const content = container.firstChild;
    let position = 0;
    const speed = 0.5;

    const animate = () => {
      position -= speed;
      if (position <= -content.offsetWidth / 2) {
        position = 0;
      }
      content.style.transform = `translateX(${position}px)`;
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameRef.current);
  }, []);

  // Components
  const MobileMockup = useMemo(() => () => (
    <motion.div
      className="relative"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      <div className={`relative mx-auto w-full max-w-[240px] md:max-w-[280px] aspect-[9/19] ${
        theme === 'dark' ? 'bg-gray-900' : 'bg-white'
      } rounded-[30px] overflow-hidden border-6 ${
        theme === 'dark' ? 'border-gray-800' : 'border-gray-200'
      } shadow-xl p-0.5`}>
        <div className="relative w-full h-full overflow-hidden">
          <img
            src="camera1.webp"
            alt="App interface"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className={`absolute top-0 left-0 right-0 h-8 ${
            theme === 'dark' ? 'bg-black/50' : 'bg-white/80'
          } backdrop-blur-sm flex items-center justify-between px-3 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          } text-[10px]`}>
            <span>9:41</span>
            <div className="flex space-x-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M5 10l-2 0 0 4 2 0 0-4z"/>
              </svg>
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13 8l-2 0 0 8 2 0 0-8z"/>
              </svg>
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17 5l-2 0 0 11 2 0 0-11z"/>
              </svg>
            </div>
          </div>
          <div className={`absolute top-12 right-3 ${
            theme === 'dark' ? 'bg-blue-600/90 text-white' : 'bg-blue-500 text-white'
          } px-2 py-1 rounded-full text-xs font-medium`}>
            Tech Ready
          </div>
          <div className={`absolute bottom-16 left-3 ${
            theme === 'dark' ? 'bg-black/70 text-white' : 'bg-white/90 text-gray-900'
          } px-3 py-1.5 rounded-lg`}>
            <span className="text-xl font-bold">21i</span>
            <span className="block text-[10px]">Track</span>
          </div>
          <div className={`absolute bottom-0 left-0 right-0 h-12 ${
            theme === 'dark' ? 'bg-black/50' : 'bg-white/80'
          } backdrop-blur-sm flex items-center justify-around`}>
            <div className="w-5 h-5 rounded-full bg-blue-500"></div>
            <div className={`w-5 h-5 rounded-full ${
              theme === 'dark' ? 'bg-gray-600' : 'bg-gray-300'
            }`}></div>
            <div className={`w-5 h-5 rounded-full ${
              theme === 'dark' ? 'bg-gray-600' : 'bg-gray-300'
            }`}></div>
          </div>
        </div>
      </div>
      <div className={`absolute -bottom-4 -left-4 w-24 h-24 rounded-full ${
        theme === 'dark' ? 'bg-blue-600/20' : 'bg-blue-400/20'
      } blur-xl`}></div>
    </motion.div>
  ), [theme]);

  const NewsItem = useCallback(({ item }) => (
  <div className="min-w-[300px] max-w-sm group">
    <div className="aspect-video rounded-xl overflow-hidden mb-4 relative">
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        loading="lazy"
      />
    </div>
    <p className={`${
      theme === 'dark' ? 'text-gray-500' : 'text-gray-600'
    } text-base mb-2`}>{item.date}</p>
    <h3 className={`text-xl font-medium mb-2 group-hover:${
      theme === 'dark' ? 'text-cyan-400' : 'text-blue-600'
    } transition-colors ${
      theme === 'dark' ? 'text-white' : 'text-gray-900'
    }`}>
      {item.title}
    </h3>
    <p className={`${
      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
    } text-base mb-3`}>{item.excerpt}</p>
    <a href="/blogs" className={`${ // Changed href from "#" to "/blog"
      theme === 'dark' ? 'text-cyan-400 hover:text-white' : 'text-blue-500 hover:text-blue-700'
    } transition-colors text-base`}>
      Read More →
    </a>
  </div>
), [theme]);

  const FAQItem = useCallback(({ item, index, isActive, onClick }) => (
    <motion.div
      className={`border-b ${
        theme === 'dark' ? 'border-gray-800' : 'border-gray-200'
      } pb-4`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
    >
      <button
        className="flex justify-between items-center w-full text-left py-4"
        onClick={() => onClick(index)}
      >
        <h3 className={`text-xl font-medium ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>{item.q}</h3>
        <div className={`transition-transform ${isActive ? 'rotate-180' : ''}`}>
          <FaChevronDown className={theme === 'dark' ? 'text-cyan-400' : 'text-blue-500'} />
        </div>
      </button>
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className={`${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            } pb-4 text-lg`}>{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  ), [theme]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`min-h-screen ${currentTheme.background} ${currentTheme.text} overflow-x-hidden transition-colors duration-300`}
      style={FONT_STYLE}
    >
      {/* Hero Section */}
      <section className={`relative py-24 px-6 md:px-16 lg:px-32 overflow-hidden ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'blue-700 text-gray-900'
      }`}>
        <div className="absolute inset-0">
          <img
            src="camera1.webp"
            alt="Background"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className={`absolute inset-0 ${
            theme === 'dark' ? 'bg-black/20' : 'bg-white/70'
          } backdrop-blur-sm`}></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight mb-5">
              <span className={`text-transparent bg-clip-text bg-gradient-to-r ${
                theme === 'dark' ? 'from-[#42A5F5] to-[#E91E63]' : 'from-[#007AFF] to-[#005ECB]'
              } font-medium tracking-tight`}>Nexture Digital,</span><br />
              Designing <span className={theme === 'dark' ? 'text-[#E91E63]' : 'text-[#005ECB]'}>futuristic</span> experiences
            </h1>
            <p className={`${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            } text-lg md:text-xl max-w-md mb-6`}>
              We blend AI, neural UX, and modern tech into sleek adaptive interfaces.
            </p>
            <div className="flex flex-wrap gap-4">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setShowModal(true)}
                className={`px-6 py-3 ${
                  theme === 'dark' ? 'bg-[#42A5F5] hover:bg-[#64B5F6]' : 'bg-[#007AFF] hover:bg-[#005ECB]'
                } rounded-lg text-base font-medium shadow-md transition text-white`}
              >
                Book a strategic Call
              </motion.button>
              <motion.a
                href="/services"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`px-6 py-3 border ${
                  theme === 'dark' ? 'border-gray-600 hover:border-[#E91E63]' : 'border-gray-300 hover:border-[#007AFF]'
                } rounded-lg text-base font-medium transition ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                Our Services
              </motion.a>
            </div>
          </motion.div>

          <MobileMockup />
        </div>
      </section>

{/* Services Section */}
<section className={`py-16 md:py-24 px-4 sm:px-6 ${currentTheme.background}`}>
  <div className="max-w-7xl mx-auto">
    {/* Section Header */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="text-center mb-16"
    >
      <h2 className={`text-3xl md:text-4xl font-medium mb-4 ${currentTheme.text}`}>
        Comprehensive <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">Digital Solutions</span>
      </h2>
      <p className={`max-w-2xl mx-auto text-lg ${currentTheme.secondaryText} font-light`}>
        We deliver cutting-edge services tailored to your business needs
      </p>
    </motion.div>

    {/* Services Grid */}
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {services.map((service, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.6 }}
          viewport={{ once: true }}
          className={`group relative overflow-hidden rounded-2xl p-8 h-full flex flex-col ${
            theme === 'dark' ? 'bg-gray-900/30' : 'bg-white'
          } shadow-lg transition-all duration-500 hover:shadow-xl`}
        >
          {/* Icon Container */}
          <div className={`absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-10 ${
            theme === 'dark' ? 'bg-cyan-600/20' : 'bg-blue-500/20'
          } transition-all duration-700 group-hover:opacity-20`}></div>
          
          {/* Service Content */}
          <div className="relative z-10">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${
              theme === 'dark' ? 'bg-cyan-600/20' : 'bg-blue-500/20'
            } shadow-md`}>
              <div className={`text-2xl ${
                theme === 'dark' ? 'text-cyan-400' : 'text-blue-600'
              }`}>
                {service.icon}
              </div>
            </div>
            
            <h3 className={`text-xl font-medium mb-3 ${
              theme === 'dark' ? 'text-gray-100' : 'text-gray-800'
            }`}>
              {service.title}
            </h3>
            
            <p className={`mb-6 ${
              theme === 'dark' ? 'text-gray-300 font-light' : 'text-gray-600 font-light'
            }`}>
              {service.description}
            </p>
          </div>
          
          {/* Features List */}
          <ul className="mt-auto space-y-2">
            {service.features?.slice(0, 3).map((item, i) => (
              <li key={i} className="flex items-start">
                <span className={`inline-block w-2 h-2 rounded-full mt-2 mr-3 ${
                  theme === 'dark' ? 'bg-cyan-400' : 'bg-blue-500'
                }`}></span>
                <span className={`text-sm ${
                  theme === 'dark' ? 'text-gray-300 font-light' : 'text-gray-600 font-light'
                }`}>
                  {item}
                </span>
              </li>
            ))}
          </ul>
          
          <button
            onClick={() => setShowModal(true)}
            className={`mt-6 px-5 py-2 rounded-lg font-medium transition-all ${
              theme === 'dark'
                ? 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                : 'bg-black/5 text-gray-700 hover:bg-black/10 border border-gray-200'
            } w-full text-center`}
          >
            Get Started
          </button>
        </motion.div>
      ))}
    </motion.div>

    {/* CTA Section */}
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className={`mt-20 p-8 md:p-12 rounded-3xl ${
        theme === 'dark' ? 'bg-gradient-to-r from-gray-800 to-gray-900' : 'bg-gradient-to-r from-blue-50 to-white'
      } shadow-lg`}
    >
      <div className="max-w-4xl mx-auto text-center">
        <h3 className={`text-2xl md:text-3xl font-medium mb-4 ${
          theme === 'dark' ? 'text-gray-100' : 'text-gray-800'
        }`}>
          Ready to transform your digital presence?
        </h3>
        <p className={`text-lg mb-8 max-w-2xl mx-auto ${
          theme === 'dark' ? 'text-gray-300 font-light' : 'text-gray-600 font-light'
        }`}>
          Let's discuss how we can help achieve your business goals with our tailored solutions.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => setShowModal(true)}
            className={`px-8 py-3 rounded-full font-medium transition-all ${
              theme === 'dark' ? 'bg-cyan-500 hover:bg-cyan-400' : 'bg-blue-500 hover:bg-blue-600'
            } text-white`}
          >
            Get Started
          </button>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className={`px-8 py-3 rounded-full font-medium transition-all ${
              theme === 'dark'
                ? 'bg-transparent hover:bg-white/10 border border-white/20 text-white'
                : 'bg-transparent hover:bg-black/5 border border-gray-300 text-gray-700'
            }`}
          >
            Learn More
          </button>
        </div>
      </div>
    </motion.div>
  </div>
</section>


      {/* News Section */}
      <section className={`py-20 px-6 overflow-hidden rounded-xl ${
          theme === 'dark' ? 'bg-gray-950' : 'bg-white'
        }`}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="flex justify-between items-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div>
              <h2 className="text-4xl md:text-5xl font-light mb-2">
                <span className={`text-transparent bg-clip-text bg-gradient-to-r ${
                  theme === 'dark' ? 'from-cyan-800 to-blue-500' : 'from-blue-400 to-blue-700'
                }`}>Latest</span> Insights
              </h2>
              <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Stay updated with the frontier of digital interaction</p>
            </div>
            <a href="/blogs" className={`${
              theme === 'dark' ? 'text-cyan-400 hover:text-white' : 'text-blue-500 hover:text-blue-700'
            } transition-colors hidden md:block`}>
              View All →
            </a>
          </motion.div>

          <div className="relative w-full overflow-hidden" ref={newsContainerRef}>
            <div className="flex gap-8 w-max">
              {memoizedNewsData.map((item, index) => (
                <div key={`news-item-wrapper-${index}`} className="bg-[#EDEEEE] rounded-xl p-6">
                  <NewsItem item={item} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className={`py-20 px-6 ${
        theme === 'dark' ? 'bg-gray-950/50' : 'bg-gray-50'
      }`}>
        <div className="max-w-3xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-3xl md:text-4xl font-light mb-4">
              <span className={`text-transparent bg-clip-text bg-gradient-to-r ${
                theme === 'dark' ? 'from-cyan-400 to-blue-500' : 'from-blue-500 to-blue-700'
              }`}>Frequently</span> Asked
            </h2>
            <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Answers to common questions about our futuristic approach</p>
          </motion.div>

          <div className="space-y-4">
            {memoizedFaqData.map((item, index) => (
              <FAQItem
                key={index}
                item={item}
                index={index}
                isActive={activeFAQ === index}
                onClick={toggleFAQ}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Consultation Form Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
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
              className={`relative w-full max-w-md max-h-[90vh] rounded-3xl overflow-hidden ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'} shadow-2xl flex flex-col`}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
            >
              <button
                onClick={() => setShowModal(false)}
                className={`absolute top-3 right-3 z-10 p-2 rounded-full ${theme === 'dark' ? 'text-white hover:bg-gray-800' : 'text-gray-800 hover:bg-gray-100'}`}
                aria-label="Close modal"
              >
                <FaTimes className="text-xl" />
              </button>

              <div className={`overflow-y-auto flex-1 p-6 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
                <motion.h2
                  id="modal-title"
                  className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
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
                      visible: {
                        opacity: 1,
                        transition: {
                          staggerChildren: 0.1
                        }
                      }
                    }}
                  >
                    <motion.div 
                      variants={{
                        hidden: { opacity: 0, y: 10 },
                        visible: { opacity: 1, y: 0 }
                      }}
                    >
                      <label htmlFor="name" className={`block text-sm mb-1 ${theme === 'dark' ? 'text-white/80' : 'text-gray-700'}`}>Your Name</label>
                      <input
                        id="name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className={`w-full rounded-lg px-4 py-3 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'} border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'} focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400 outline-none transition`}
                        required
                      />
                    </motion.div>

                    <motion.div 
                      variants={{
                        hidden: { opacity: 0, y: 10 },
                        visible: { opacity: 1, y: 0 }
                      }}
                    >
                      <label htmlFor="email" className={`block text-sm mb-1 ${theme === 'dark' ? 'text-white/80' : 'text-gray-700'}`}>Email Address</label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className={`w-full rounded-lg px-4 py-3 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'} border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'} focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400 outline-none transition`}
                        required
                      />
                    </motion.div>

                    <motion.div 
                      variants={{
                        hidden: { opacity: 0, y: 10 },
                        visible: { opacity: 1, y: 0 }
                      }}
                    >
                      <label htmlFor="phone" className={`block text-sm mb-1 ${theme === 'dark' ? 'text-white/80' : 'text-gray-700'}`}>Phone Number</label>
                      <input
                        id="phone"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className={`w-full rounded-lg px-4 py-3 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'} border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'} focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400 outline-none transition`}
                      />
                    </motion.div>

                    <motion.div 
                      variants={{
                        hidden: { opacity: 0, y: 10 },
                        visible: { opacity: 1, y: 0 }
                      }}
                    >
                      <label htmlFor="service" className={`block text-sm mb-1 ${theme === 'dark' ? 'text-white/80' : 'text-gray-700'}`}>Interested Service</label>
                      <select
                        id="service"
                        name="service"
                        value={formData.plan}
                        onChange={(e) => setFormData({...formData, plan: e.target.value})}
                        className={`w-full rounded-lg px-4 py-3 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'} border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'} focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400 outline-none transition appearance-none`}
                        required
                      >
                        <option value="">Select a service</option>
                        <option value="Basic Website">Basic Plan</option>
                        <option value="E-commerce Website">E-commerce Website</option>
                        <option value="Custom Solution">Custom Solution</option>
                      </select>
                    </motion.div>

                    <motion.div 
                      variants={{
                        hidden: { opacity: 0, y: 10 },
                        visible: { opacity: 1, y: 0 }
                      }}
                    >
                      <label htmlFor="message" className={`block text-sm mb-1 ${theme === 'dark' ? 'text-white/80' : 'text-gray-700'}`}>Project Details</label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        rows="4"
                        className={`w-full rounded-lg px-4 py-3 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'} border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'} focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400 outline-none transition`}
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

      <ThemeToggle />
    </motion.div>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <Home />
    </ThemeProvider>
  );
};

export default App;