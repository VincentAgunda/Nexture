import React from "react";
import { motion } from "framer-motion";
import { Computer, Smartphone, Brush } from "@mui/icons-material";

const SERVICES_DATA = [
  {
    title: "Web Development",
    description: "Crafting seamless and intuitive web experiences with cutting-edge technologies.",
    icon: <Computer className="text-2xl" />,
    features: [
      "React/Next.js applications",
      "Headless CMS integration",
      "API development",
      "Performance optimization"
    ]
  },
  {
    title: "Mobile App Development",
    description: "Building high-performance mobile applications for iOS and Android platforms.",
    icon: <Smartphone className="text-2xl" />,
    features: [
      "Cross-platform development",
      "Native iOS/Android apps",
      "Push notifications",
      "App store deployment"
    ]
  },
  {
    title: "UI/UX Design",
    description: "Creating visually stunning and user-centered designs that enhance usability.",
    icon: <Brush className="text-2xl" />,
    features: [
      "User research & testing",
      "Wireframing & prototyping",
      "Design systems",
      "Accessibility compliance"
    ]
  }
];

const Comprehensive = ({ onOpenModal }) => {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 bg-[#F0F8FF]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-medium mb-4 text-[#002D62] tracking-tight">
            Comprehensive{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-gray-600">
              Digital Solutions
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-[#334155] font-light">
            We deliver cutting-edge services tailored to your business needs
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES_DATA.map((service, index) => {
            const cardColors = ["#fbfbfb", "#ebf0f6", "#ffffff"];
            const bgColor = cardColors[index % cardColors.length];

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                style={{ backgroundColor: bgColor }}
                className="group relative overflow-hidden rounded-2xl p-8 h-full flex flex-col border border-gray-100 shadow-sm"
              >
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 bg-gray-100 text-gray-700">
                    <div className="text-2xl">{service.icon}</div>
                  </div>

                  <h3 className="text-xl font-medium mb-3 text-gray-800">
                    {service.title}
                  </h3>

                  <p className="mb-6 text-gray-600 font-light">
                    {service.description}
                  </p>
                </div>

                <ul className="mt-auto space-y-2">
                  {service.features?.slice(0, 3).map((item, i) => (
                    <li key={i} className="flex items-start">
                      <span className="inline-block w-1.5 h-1.5 rounded-full mt-2 mr-3 bg-gray-400"></span>
                      <span className="text-sm text-gray-600 font-light">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  onClick={onOpenModal}
                  className="mt-6 px-5 py-2 rounded-lg font-medium bg-[#0b1b32] hover:bg-[#ACADA8] text-white border border-[#ACADA8] w-full text-center transition-colors"
                >
                  Get Started
                </motion.button>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 p-8 md:p-12 rounded-3xl bg-gradient-to-r from-white to-gray-50 border border-gray-100 shadow-sm"
        >
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-medium mb-4 text-gray-800">
              Ready to transform your digital presence?
            </h3>
            <p className="text-lg mb-8 max-w-2xl mx-auto text-gray-600 font-light">
              Let's discuss how we can help achieve your business goals with our tailored solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                onClick={onOpenModal}
                className="px-8 py-3 rounded-full font-medium bg-[#000000] hover:bg-[#032f30] text-white"
              >
                Get Started
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="px-8 py-3 rounded-full font-medium bg-white hover:bg-gray-50 border border-gray-300 text-gray-700"
              >
                Learn More
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Comprehensive;