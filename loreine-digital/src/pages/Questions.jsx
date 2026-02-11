import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExpandMore } from "@mui/icons-material";

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

const FAQItem = ({ item, index, isActive, onClick }) => (
  <motion.div
    className="border-b border-gray-200 pb-4"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ delay: index * 0.1, duration: 0.6 }}
  >
    <button
      className="flex justify-between items-center w-full text-left py-4"
      onClick={() => onClick(index)}
    >
      <h3 className="text-xl font-medium text-gray-900">{item.q}</h3>
      <div className={`transition-transform duration-300 ${isActive ? 'rotate-180' : ''}`}>
        <ExpandMore className="text-blue-500" />
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
          <p className="text-gray-600 pb-4 text-lg">{item.a}</p>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

const Questions = () => {
  const [activeFAQ, setActiveFAQ] = useState(null);

  const toggleFAQ = useCallback((index) => {
    setActiveFAQ(prev => prev === index ? null : index);
  }, []);

  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-3xl md:text-4xl font-light mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-700">Frequently</span> Asked
          </h2>
          <p className="text-gray-600">Answers to common questions about our futuristic approach</p>
        </motion.div>

        <div className="space-y-4">
          {FAQ_DATA.map((item, index) => (
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
  );
};

export default Questions;