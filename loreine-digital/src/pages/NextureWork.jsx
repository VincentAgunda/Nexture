import React, { useRef, useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Plus, X } from "lucide-react"

// Card Colors (Premium Neutral Palette)
const cardColors = [
  { bg: "#000000", text: "text-white", button: "light" },
  { bg: "#F5F5F7", text: "text-black", button: "dark" },
  { bg: "#979797", text: "text-white", button: "light" },
  { bg: "#FAFAFA", text: "text-black", button: "dark" },
]

// Portfolio Data
const portfolio = [
  {
    id: 1,
    title: "Quantum UI Framework",
    category: "Web Design",
    image: "/website1.png",
    description:
      "Next-gen interface system leveraging quantum computing principles.",
    link: "https://tax-act.vercel.app/",
    ...cardColors[0],
  },
  {
    id: 2,
    title: "Neural Commerce App",
    category: "Mobile App",
    image: "/camera4.webp",
    description:
      "Thought-controlled shopping experience with biometric feedback.",
    link: "https://echelon-ecommerce-platform.onrender.com/",
    ...cardColors[1],
  },
  {
    id: 3,
    title: "Marketing Suite",
    category: "Marketing",
    image: "/website2.png",
    description:
      "Self-optimizing campaign system with predictive analytics.",
    link: "https://echelon-ecommerce-platform.onrender.com/",
    ...cardColors[2],
  },
  {
    id: 4,
    title: "Digital Branding",
    category: "Branding",
    image: "/camera1.webp",
    description:
      "3D identity system for spatial computing platforms.",
    link: "https://echelon-ecommerce-platform.onrender.com/",
    ...cardColors[3],
  },
]

// Modal
const PortfolioModal = ({ item, onClose }) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      <motion.div
        initial={{ scale: 0.9, y: 40 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 40 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="relative z-10 w-full max-w-md bg-white rounded-2xl overflow-hidden shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
        >
          <X size={18} />
        </button>

        <div
          className="h-64 w-full flex items-end justify-center"
          style={{ backgroundColor: item.bg }}
        >
          <img
            src={item.image}
            alt={item.title}
            className="h-full object-contain object-bottom"
          />
        </div>

        <div className="p-6">
          <p className="text-sm text-gray-500 mb-1">{item.category}</p>
          <h3 className="text-2xl font-semibold mb-3">{item.title}</h3>
          <p className="text-gray-600">{item.description}</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

const NextureWork = () => {
  const carouselRef = useRef(null)
  const [active, setActive] = useState(0)
  const [selectedItem, setSelectedItem] = useState(null)

  const scrollToIndex = useCallback((index) => {
    const el = carouselRef.current
    if (!el) return
    const card = el.querySelector("[data-snap]")
    if (!card) return
    const cardWidth = card.getBoundingClientRect().width
    const gap = 24
    el.scrollTo({
      left: index * (cardWidth + gap),
      behavior: "smooth",
    })
  }, [])

  const handlePrev = () =>
    scrollToIndex(Math.max(0, active - 1))
  const handleNext = () =>
    scrollToIndex(Math.min(portfolio.length - 1, active + 1))

  useEffect(() => {
    const el = carouselRef.current
    if (!el) return

    const onScroll = () => {
      const card = el.querySelector("[data-snap]")
      if (!card) return
      const cardWidth = card.getBoundingClientRect().width
      const gap = 24
      const index = Math.round(el.scrollLeft / (cardWidth + gap))
      setActive(index)
    }

    el.addEventListener("scroll", onScroll, { passive: true })
    return () => el.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <section className="py-24 bg-[#fdfdfd]">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Title */}
        <h2 className="text-5xl font-semibold text-center mb-16">
          Selected Work.
        </h2>

        {/* Carousel */}
        <div className="relative">
          <div
            ref={carouselRef}
            className="overflow-x-auto scrollbar-none snap-x snap-mandatory grid auto-cols-[minmax(280px,1fr)] md:auto-cols-[minmax(340px,1fr)] grid-flow-col gap-6"
          >
            {portfolio.map((item, i) => (
              <motion.div
                key={item.id}
                data-snap
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
                className="snap-center relative rounded-2xl overflow-hidden h-[420px] group cursor-pointer"
                style={{ backgroundColor: item.bg }}
                onClick={() => setSelectedItem(item)}
              >
                {/* Text */}
                <div className={`p-6 relative z-10 ${item.text}`}>
                  <p className="text-sm mb-1 opacity-80">
                    {item.category}
                  </p>
                  <h3 className="text-2xl font-semibold">
                    {item.title}
                  </h3>
                </div>

                {/* Image */}
                <div className="absolute inset-x-0 bottom-0 h-4/5 pointer-events-none">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-contain object-bottom"
                  />
                </div>

                {/* Plus Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedItem(item)
                  }}
                  className={`absolute bottom-6 right-6 w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg ${
                    item.button === "dark"
                      ? "bg-black text-white"
                      : "bg-white text-black"
                  }`}
                >
                  <Plus size={18} strokeWidth={3} />
                </button>
              </motion.div>
            ))}
          </div>

          {/* Controls */}
          <div className="flex justify-between items-center mt-10">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="flex space-x-2">
              {portfolio.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => scrollToIndex(idx)}
                  className={`w-2.5 h-2.5 rounded-full ${
                    idx === active
                      ? "bg-black"
                      : "bg-gray-300"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedItem && (
          <PortfolioModal
            item={selectedItem}
            onClose={() => setSelectedItem(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

export default NextureWork
